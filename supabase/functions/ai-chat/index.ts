
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
    
    // Create Supabase client to verify user and fetch course data
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

    // Fetch user's course progress and learning context
    console.log('Fetching user course progress...');
    const { data: courseProgress } = await supabaseClient
      .from('course_progress')
      .select('course_id, progress_percentage, completed_at, enrolled_at')
      .eq('user_id', user.id);

    const { data: lessonProgress } = await supabaseClient
      .from('lesson_progress')
      .select('course_id, lesson_id, quiz_passed, video_watched, completed_at')
      .eq('user_id', user.id);

    const { data: achievements } = await supabaseClient
      .from('user_achievements')
      .select('achievement_id, earned_at')
      .eq('user_id', user.id);

    console.log('Course progress data fetched:', { 
      coursesEnrolled: courseProgress?.length || 0,
      lessonsCompleted: lessonProgress?.filter(l => l.quiz_passed).length || 0,
      achievementsEarned: achievements?.length || 0
    });

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
    // Build personalized context based on user's learning progress
    let learningContext = '';
    if (courseProgress && courseProgress.length > 0) {
      const completedCourses = courseProgress.filter(c => c.completed_at).length;
      const totalProgress = courseProgress.reduce((sum, c) => sum + (c.progress_percentage || 0), 0) / courseProgress.length;
      
      learningContext += `\n\nUser's Learning Context:
- Enrolled in ${courseProgress.length} course(s)
- Completed ${completedCourses} course(s)
- Average progress: ${Math.round(totalProgress)}%`;

      if (lessonProgress && lessonProgress.length > 0) {
        const completedLessons = lessonProgress.filter(l => l.quiz_passed).length;
        learningContext += `
- Completed ${completedLessons} lesson(s)`;
        
        // Add recent learning activity
        const recentLessons = lessonProgress
          .filter(l => l.completed_at)
          .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
          .slice(0, 3);
          
        if (recentLessons.length > 0) {
          learningContext += `
- Recent lessons completed: Course ${recentLessons.map(l => `${l.course_id} Lesson ${l.lesson_id}`).join(', ')}`;
        }
      }

      if (achievements && achievements.length > 0) {
        learningContext += `
- Earned ${achievements.length} achievement(s)`;
      }
    }

    const systemPrompt = `You are Budget Bot, a helpful AI financial education assistant. You help users learn about personal finance, budgeting, investing, and money management. 

IMPORTANT: You have access to this user's learning progress and should provide personalized, contextual responses based on their journey:
${learningContext}

When responding:
1. Reference their completed courses/lessons when relevant
2. Suggest next steps based on their current progress
3. Build upon concepts they've already learned
4. Recommend specific courses if they haven't started learning yet
5. Celebrate their achievements and progress
6. If they ask about topics they've already covered, provide advanced insights

Available courses in the system:
- Course 1: Budgeting Basics (Essential budgeting fundamentals)
- Course 2: Emergency Fund Planning (Building financial security)
- Course 3: Debt Management (Strategies for debt elimination)
- Course 4: Investing 101 (Introduction to investing)
- Course 5: Advanced Investing (Portfolio diversification and strategies)

Provide clear, educational responses about financial topics. If images are provided, analyze them in the context of financial education.`;
    
    const messages = [
      { 
        role: 'system', 
        content: systemPrompt
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
