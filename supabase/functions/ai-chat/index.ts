
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    let hasImages = false;

    if (files && files.length > 0) {
      console.log('Processing files:', files.length);
      for (const file of files) {
        console.log('Processing file:', file.name, file.type);
        
        if (file.type.startsWith('image/')) {
          // Add image to content for vision analysis
          contentArray.push({
            type: 'image_url',
            image_url: {
              url: `data:${file.type};base64,${file.content}`
            }
          });
          hasImages = true;
          console.log('Added image file:', file.name);
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          // Decode text file content
          try {
            const textContent = atob(file.content);
            messageContent += `\n\nContent from ${file.name}:\n${textContent}`;
            console.log('Added text file content:', file.name);
          } catch (error) {
            console.error('Failed to decode text file:', error);
            messageContent += `\n\n[Could not read file: ${file.name}]`;
          }
        } else {
          // For other file types, just mention the file
          messageContent += `\n\n[File attached: ${file.name} (${file.type}) - Please note that I can only process images and text files directly. For other file types, please describe the content or convert to a supported format.]`;
          console.log('Referenced unsupported file:', file.name, file.type);
        }
      }
    }

    // Use chat completions API directly for better reliability
    console.log('Using chat completions API...');
    
    // Choose model based on whether we have images
    const model = hasImages ? 'gpt-4o' : 'gpt-4o-mini';
    console.log('Using model:', model);
    
    const messages = [
      { 
        role: 'system', 
        content: "You are Budget Bot, a helpful AI financial education assistant. You help users learn about personal finance, budgeting, investing, and money management. Provide clear, educational responses about financial topics. If images are provided, analyze them in the context of financial education - this could include receipts, budgets, financial documents, charts, or any visual content related to money management." 
      },
      { 
        role: 'user', 
        content: hasImages ? contentArray : messageContent 
      }
    ];

    console.log('Making request to OpenAI...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const responseContent = data.choices[0].message.content || 'Sorry, I could not generate a response.';

    // Generate a thread ID if not provided (for conversation tracking)
    const currentThreadId = threadId || `thread_${user.id}_${Date.now()}`;

    // Store conversation in database
    try {
      console.log('Storing conversation in database...');
      const { error: dbError } = await supabaseClient
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          message: messageContent,
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
        error: `AI service error: ${errorMessage}`,
        details: 'Check the function logs for more information'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
