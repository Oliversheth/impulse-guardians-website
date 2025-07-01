
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
    const { message, threadId } = await req.json()
    
    // Create Supabase client to verify user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
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
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers,
      });
      
      if (!threadResponse.ok) {
        const errorText = await threadResponse.text();
        console.error('Failed to create thread:', errorText);
        throw new Error(`Failed to create thread: ${threadResponse.status} ${errorText}`);
      }
      
      const threadData = await threadResponse.json();
      currentThreadId = threadData.id;
      console.log('Created thread:', currentThreadId);
    }

    // Step 2: Add message to thread
    console.log('Adding message to thread...');
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        role: 'user',
        content: message
      })
    });

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.error('Failed to add message:', errorText);
      throw new Error(`Failed to add message to thread: ${messageResponse.status} ${errorText}`);
    }

    // Step 3: Run the assistant
    console.log('Running assistant...');
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error('Failed to run assistant:', errorText);
      throw new Error(`Failed to run assistant: ${runResponse.status} ${errorText}`);
    }

    const runData = await runResponse.json();
    const runId = runData.id;
    console.log('Started run:', runId);

    // Step 4: Poll for completion
    let runStatus = 'in_progress';
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds max wait time

    while (runStatus === 'in_progress' || runStatus === 'queued') {
      if (attempts >= maxAttempts) {
        throw new Error('Assistant response timeout after 60 seconds');
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runId}`, {
        headers
      });
      
      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Failed to check run status:', errorText);
        throw new Error(`Failed to check run status: ${statusResponse.status} ${errorText}`);
      }
      
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      attempts++;
      
      console.log(`Run status: ${runStatus} (attempt ${attempts})`);
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
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      headers
    });

    if (!messagesResponse.ok) {
      const errorText = await messagesResponse.text();
      console.error('Failed to fetch messages:', errorText);
      throw new Error(`Failed to fetch messages: ${messagesResponse.status} ${errorText}`);
    }

    const messagesData = await messagesResponse.json();
    const assistantMessages = messagesData.data.filter((msg: any) => msg.role === 'assistant');
    
    if (assistantMessages.length === 0) {
      throw new Error('No assistant response found');
    }

    const latestResponse = assistantMessages[0];
    const responseContent = latestResponse.content[0]?.text?.value || 'Sorry, I could not generate a response.';

    console.log('Successfully got assistant response');

    // Store conversation in database
    try {
      await supabaseClient
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          message: message,
          response: responseContent,
          thread_id: currentThreadId
        })
    } catch (dbError) {
      console.error('Failed to store conversation in database:', dbError);
      // Don't fail the request if database storage fails
    }

    return new Response(
      JSON.stringify({ 
        response: responseContent,
        threadId: currentThreadId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: 'Please check the function logs for more information'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
