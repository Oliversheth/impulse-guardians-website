
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useLessonProgress = (courseId: number, lessonId: number) => {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchProgress();
  }, [user, courseId, lessonId]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lesson progress:', error);
      } else {
        setProgress(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markVideoWatched = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          video_watched: true,
          completed_at: progress?.quiz_passed ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;
      setProgress(data);
    } catch (error) {
      console.error('Error marking video as watched:', error);
    }
  };

  const markQuizPassed = async (score: number) => {
    if (!user) return;

    const passed = score >= 70;
    
    try {
      // Record quiz attempt
      await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          score: score,
          passed: passed
        });

      // Update lesson progress
      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          video_watched: progress?.video_watched || false,
          quiz_passed: passed,
          completed_at: passed && progress?.video_watched ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;
      setProgress(data);
      return passed;
    } catch (error) {
      console.error('Error recording quiz result:', error);
      return false;
    }
  };

  return {
    progress,
    loading,
    markVideoWatched,
    markQuizPassed,
    isCompleted: progress?.completed_at !== null,
    videoWatched: progress?.video_watched || false,
    quizPassed: progress?.quiz_passed || false
  };
};
