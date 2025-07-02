import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ASSISTANT_ID = 'asst_dYJ7oTJzgp9PxeMVtYDV5wOE';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('AI Chat function invoked');
    const { message, threadId, files = [] } = await req.json()
    console.log('Request data:', { 
      message: message?.substring(0, 100), 
      threadId, 
      filesCount: files.length 
    });
    
    // Create Supabase client to verify user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Verify user is authenticated
    console.log('Verifying user authentication...');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    console.log('User authenticated:', user.id);

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    console.log('OpenAI API key found');

    // Process files and create content array
    let messageContent = message;
    const contentArray = [{ type: 'text', text: message }];

    if (files && files.length > 0) {
      console.log('Processing files:', files.length);
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          // Add image to content for vision analysis
          contentArray.push({
            type: 'image_url',
            image_url: {
              url: `data:${file.type};base64,${file.content}`
            }
          });
          console.log('Added image file:', file.name);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          // Decode text file content
          try {
            const textContent = atob(file.content);
            messageContent += `\n\nContent from ${file.name}:\n${textContent}`;
            console.log('Added text file content:', file.name);
          } catch (error) {
            console.error('Failed to decode text file:', error);
          }
        } else {
          // For other file types, just mention the file
          messageContent += `\n\n[File attached: ${file.name} (${file.type})]`;
          console.log('Referenced file:', file.name, file.type);
        }
      }
    }

    const headers = {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    };

    let currentThreadId = threadId;

    // Step 1: Create a thread if one doesn't exist
    if (!currentThreadId) {
      console.log('Creating new thread...');
      try {
        const threadResponse = await fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers,
        });
        
        if (!threadResponse.ok) {
          const errorText = await threadResponse.text();
          console.error('Failed to create thread:', threadResponse.status, errorText);
          throw new Error(`Failed to create thread: ${threadResponse.status} ${errorText}`);
        }
        
        const threadData = await threadResponse.json();
        currentThreadId = threadData.id;
        console.log('Created thread:', currentThreadId);
      } catch (error) {
        console.error('Thread creation error:', error);
        throw new Error(`Thread creation failed: ${error.message}`);
      }
    }

    // Step 2: Add message to thread (with files if vision model supports it)
    console.log('Adding message to thread...');
    try {
      const messageBody = files.some(f => f.type.startsWith('image/')) 
        ? { role: 'user', content: contentArray }
        : { role: 'user', content: messageContent };

      const messageResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
        method: 'POST',
        headers,
        body: JSON.stringify(messageBody)
      });

      if (!messageResponse.ok) {
        const errorText = await messageResponse.text();
        console.error('Failed to add message:', messageResponse.status, errorText);
        throw new Error(`Failed to add message to thread: ${messageResponse.status} ${errorText}`);
      }
      console.log('Message added to thread successfully');
    } catch (error) {
      console.error('Message addition error:', error);
      throw new Error(`Message addition failed: ${error.message}`);
    }

    // Step 3: Run the assistant
    console.log('Running assistant...');
    let runId;
    try {
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      });

      if (!runResponse.ok) {
        const errorText = await runResponse.text();
        console.error('Failed to run assistant:', runResponse.status, errorText);
        
        // If assistant not found, try fallback to chat completions
        if (runResponse.status === 404) {
          console.log('Assistant not found, falling back to chat completions...');
          return await fallbackToChatCompletions(messageContent, contentArray, files, openaiApiKey, user.id, supabaseClient, currentThreadId);
        }
        
        throw new Error(`Failed to run assistant: ${runResponse.status} ${errorText}`);
      }

      const runData = await runResponse.json();
      runId = runData.id;
      console.log('Started run:', runId);
    } catch (error) {
      console.error('Assistant run error:', error);
      
      // Try fallback if assistant fails
      if (error.message.includes('404') || error.message.includes('not found')) {
        console.log('Falling back to chat completions due to assistant error...');
        return await fallbackToChatCompletions(messageContent, contentArray, files, openaiApiKey, user.id, supabaseClient, currentThreadId);
      }
      
      throw error;
    }

    // Step 4: Poll for completion
    console.log('Polling for completion...');
    let runStatus = 'in_progress';
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max wait time

    while (runStatus === 'in_progress' || runStatus === 'queued') {
      if (attempts >= maxAttempts) {
        console.error('Assistant response timeout after 60 seconds');
        throw new Error('Assistant response timeout after 60 seconds');
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      try {
        const statusResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`, {
          headers
        });
        
        if (!statusResponse.ok) {
          const errorText = await statusResponse.text();
          console.error('Failed to check run status:', statusResponse.status, errorText);
          throw new Error(`Failed to check run status: ${statusResponse.status} ${errorText}`);
        }
        
        const statusData = await statusResponse.json();
        runStatus = statusData.status;
        attempts++;
        
        console.log(`Run status: ${runStatus} (attempt ${attempts})`);
      } catch (error) {
        console.error('Status check error:', error);
        throw error;
      }
    }

    if (runStatus === 'failed') {
      console.error('Assistant run failed:', runStatus);
      throw new Error('Assistant run failed - please try again');
    }

    if (runStatus !== 'completed') {
      console.error('Assistant run ended with unexpected status:', runStatus);
      throw new Error(`Assistant run failed with status: ${runStatus}`);
    }

    // Step 5: Get the assistant's response
    console.log('Fetching assistant response...');
    let responseContent;
    try {
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
        headers
      });

      if (!messagesResponse.ok) {
        const errorText = await messagesResponse.text();
        console.error('Failed to fetch messages:', messagesResponse.status, errorText);
        throw new Error(`Failed to fetch messages: ${messagesResponse.status} ${errorText}`);
      }

      const messagesData = await messagesResponse.json();
      const assistantMessages = messagesData.data.filter((msg: any) => msg.role === 'assistant');
      
      if (assistantMessages.length === 0) {
        throw new Error('No assistant response found');
      }

      const latestResponse = assistantMessages[0];
      responseContent = latestResponse.content[0]?.text?.value || 'Sorry, I could not generate a response.';
      console.log('Successfully got assistant response');
    } catch (error) {
      console.error('Response fetch error:', error);
      throw error;
    }

    // Store conversation in database
    try {
      console.log('Storing conversation in database...');
      const { error: dbError } = await supabaseClient
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          message: message,
          response: responseContent,
          thread_id: currentThreadId
        });
      
      if (dbError) {
        console.error('Database storage error:', dbError);
        // Don't fail the request if database storage fails, but log it
      } else {
        console.log('Conversation stored successfully');
      }
    } catch (dbError) {
      console.error('Failed to store conversation in database:', dbError);
      // Don't fail the request if database storage fails
    }

    console.log('AI Chat function completed successfully');
    return new Response(
      JSON.stringify({ 
        response: responseContent,
        threadId: currentThreadId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-chat function:', error)
    
    // Return detailed error information for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error ? error.stack : 'No stack trace available';
    
    console.error('Error details:', { message: errorMessage, stack: errorDetails });
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Check the function logs for more information'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Updated fallback function to handle files
async function fallbackToChatCompletions(messageContent: string, contentArray: any[], files: any[], openaiApiKey: string, userId: string, supabaseClient: any, threadId: string | null) {
  console.log('Using fallback chat completions API...');
  
  try {
    // Use vision model if images are present
    const hasImages = files.some(f => f.type.startsWith('image/'));
    const model = hasImages ? 'gpt-4o' : 'gpt-4o-mini';
    
    const messages = [
      { 
        role: 'system', 
        content: "You are Budget Bot, a helpful AI financial education assistant. You help users learn about personal finance, budgeting, investing, and money management. Provide clear, educational responses about financial topics. If images are provided, analyze them in the context of financial education." 
      },
      { 
        role: 'user', 
        content: hasImages ? contentArray : messageContent 
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fallback API error:', response.status, errorText);
      throw new Error(`Fallback API failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Store conversation in database
    try {
      await supabaseClient
        .from('ai_conversations')
        .insert({
          user_id: userId,
          message: messageContent,
          response: responseContent,
          thread_id: threadId
        });
    } catch (dbError) {
      console.error('Failed to store fallback conversation:', dbError);
    }

    console.log('Fallback response generated successfully');
    return new Response(
      JSON.stringify({ 
        response: responseContent,
        threadId: threadId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Fallback error:', error);
    throw error;
  }
}
