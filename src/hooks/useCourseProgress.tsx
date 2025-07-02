
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useCourseProgress = (courseId: number) => {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchProgress();
  }, [user, courseId]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching course progress:', error);
      } else {
        setProgress(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('course_progress')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: 0
        })
        .select()
        .single();

      if (error) throw error;
      setProgress(data);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const updateProgress = async (progressPercentage: number) => {
    if (!user || !progress) return;

    try {
      const updateData: any = {
        progress_percentage: progressPercentage
      };

      // Mark course as completed if 100%
      if (progressPercentage >= 100) {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('course_progress')
        .update(updateData)
        .eq('id', progress.id)
        .select()
        .single();

      if (error) throw error;
      setProgress(data);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return {
    progress,
    loading,
    enrollInCourse,
    updateProgress,
    isEnrolled: !!progress
  };
};
