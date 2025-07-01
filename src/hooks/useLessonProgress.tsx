
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useLessonProgress = (courseId: number, lessonId: number) => {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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
        .maybeSingle();

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

  const updateVideoWatched = async () => {
    if (!user) return;

    try {
      let progressData = progress;
      
      if (!progressData) {
        // Create new progress record
        const { data, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId,
            video_watched: true,
            quiz_passed: false
          })
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      } else {
        // Update existing record
        const { data, error } = await supabase
          .from('lesson_progress')
          .update({ video_watched: true })
          .eq('id', progressData.id)
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      }

      setProgress(progressData);
      
      toast({
        title: "Progress Saved",
        description: "Video completion has been recorded.",
      });
    } catch (error) {
      console.error('Error updating video progress:', error);
      toast({
        title: "Error",
        description: "Failed to save video progress.",
        variant: "destructive",
      });
    }
  };

  const updateQuizPassed = async () => {
    if (!user) return;

    try {
      let progressData = progress;
      
      if (!progressData) {
        // Create new progress record
        const { data, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId,
            video_watched: false,
            quiz_passed: true,
            completed_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      } else {
        // Update existing record
        const { data, error } = await supabase
          .from('lesson_progress')
          .update({ 
            quiz_passed: true,
            completed_at: new Date().toISOString()
          })
          .eq('id', progressData.id)
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      }

      setProgress(progressData);
      
      // Also update course progress
      await updateCourseProgress();
      
      toast({
        title: "Lesson Completed!",
        description: "Your progress has been saved.",
      });
    } catch (error) {
      console.error('Error updating quiz progress:', error);
      toast({
        title: "Error",
        description: "Failed to save quiz progress.",
        variant: "destructive",
      });
    }
  };

  const updateCourseProgress = async () => {
    if (!user) return;

    try {
      // Get all lesson progress for this course
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (lessonsError) throw lessonsError;

      // Calculate overall progress (assuming we know total lessons)
      const completedLessons = allLessons?.filter(lesson => lesson.quiz_passed)?.length || 0;
      
      // For now, assume 2 lessons per course (you can adjust this based on your course structure)
      const totalLessons = 2;
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

      // Update or create course progress
      const { error: courseError } = await supabase
        .from('course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: progressPercentage,
          completed_at: progressPercentage >= 100 ? new Date().toISOString() : null
        });

      if (courseError) throw courseError;

    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateVideoWatched,
    updateQuizPassed,
    isVideoWatched: progress?.video_watched || false,
    isQuizPassed: progress?.quiz_passed || false
  };
};
