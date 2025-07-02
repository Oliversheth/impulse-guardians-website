
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

  const updateVideoProgress = async (progressPercentage: number, currentTime: number, duration: number) => {
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
            video_progress_percentage: Math.round(progressPercentage),
            video_duration_watched: Math.round(currentTime),
            video_watched: progressPercentage >= 90,
            video_completed_at: progressPercentage >= 90 ? new Date().toISOString() : null,
            quiz_passed: false
          })
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      } else {
        // Update existing record
        const updateData: any = {
          video_progress_percentage: Math.round(progressPercentage),
          video_duration_watched: Math.round(currentTime),
          video_watched: progressPercentage >= 90
        };

        // Only set video_completed_at if it wasn't set before and we've reached 90%
        if (progressPercentage >= 90 && !progressData.video_completed_at) {
          updateData.video_completed_at = new Date().toISOString();
        }

        const { data, error } = await supabase
          .from('lesson_progress')
          .update(updateData)
          .eq('id', progressData.id)
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      }

      setProgress(progressData);
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  };

  const updateVideoWatched = async () => {
    if (!user) return;

    try {
      let progressData = progress;
      
      if (!progressData) {
        const { data, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId,
            video_watched: true,
            video_progress_percentage: 100,
            video_completed_at: new Date().toISOString(),
            quiz_passed: false
          })
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      } else {
        const { data, error } = await supabase
          .from('lesson_progress')
          .update({ 
            video_watched: true,
            video_progress_percentage: 100,
            video_completed_at: new Date().toISOString()
          })
          .eq('id', progressData.id)
          .select()
          .single();

        if (error) throw error;
        progressData = data;
      }

      setProgress(progressData);
      
      toast({
        title: "Video Completed!",
        description: "Quiz has been unlocked.",
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
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (lessonsError) throw lessonsError;

      const completedLessons = allLessons?.filter(lesson => lesson.quiz_passed)?.length || 0;
      const totalLessons = 2;
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

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
    updateVideoProgress,
    updateVideoWatched,
    updateQuizPassed,
    isVideoWatched: progress?.video_watched || false,
    isQuizPassed: progress?.quiz_passed || false,
    videoProgress: progress?.video_progress_percentage || 0,
    isVideoCompleted: (progress?.video_progress_percentage || 0) >= 90
  };
};
