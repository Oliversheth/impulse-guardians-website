
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { coursesData } from '@/data/coursesData';

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
      const updateData = {
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        video_progress_percentage: Math.round(progressPercentage),
        video_duration_watched: Math.round(currentTime),
        video_watched: progressPercentage >= 90,
        video_completed_at: progressPercentage >= 90 ? new Date().toISOString() : null,
        quiz_passed: false
      };

      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert(updateData, {
          onConflict: 'user_id,course_id,lesson_id'
        })
        .select()
        .single();

      if (error) throw error;
      setProgress(data);

      // Show toast only when reaching 90% for the first time
      if (progressPercentage >= 90 && (!progress?.video_watched || progress?.video_progress_percentage < 90)) {
        toast({
          title: "Video Completed!",
          description: "Quiz has been unlocked.",
        });
      }
    } catch (error) {
      console.error('Error updating video progress:', error);
      toast({
        title: "Error",
        description: "Failed to save video progress.",
        variant: "destructive",
      });
    }
  };

  const updateVideoWatched = async () => {
    if (!user) return;

    try {
      const updateData = {
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        video_watched: true,
        video_progress_percentage: 100,
        video_completed_at: new Date().toISOString(),
        quiz_passed: false
      };

      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert(updateData, {
          onConflict: 'user_id,course_id,lesson_id'
        })
        .select()
        .single();

      if (error) throw error;
      setProgress(data);
      
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
      console.log(`Starting course progress update for course ${courseId}, user ${user.id}`);
      
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (lessonsError) {
        console.error('Error fetching lesson progress:', lessonsError);
        throw lessonsError;
      }

      console.log(`Found ${allLessons?.length || 0} lesson progress records:`, allLessons);
      
      const completedLessons = allLessons?.filter(lesson => lesson.quiz_passed)?.length || 0;
      const course = coursesData.find(c => c.id === courseId);
      const totalLessons = course?.lessons.length || 0;
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      console.log(`Course progress calculation: ${completedLessons}/${totalLessons} lessons completed = ${progressPercentage}%`);
      
      const upsertData = {
        user_id: user.id,
        course_id: courseId,
        progress_percentage: progressPercentage,
        completed_at: progressPercentage >= 100 ? new Date().toISOString() : null
      };
      
      console.log('Upserting course progress:', upsertData);
      
      const { data: courseData, error: courseError } = await supabase
        .from('course_progress')
        .upsert(upsertData, {
          onConflict: 'user_id,course_id'
        })
        .select();

      if (courseError) {
        console.error('Error upserting course progress:', courseError);
        throw courseError;
      }

      console.log('Course progress updated successfully:', courseData);

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
    resetLessonProgress: async () => {
      if (!user) return;

      try {
        if (progress) {
          const { error } = await supabase
            .from('lesson_progress')
            .delete()
            .eq('id', progress.id);

          if (error) throw error;
        }

        setProgress(null);
        
        toast({
          title: "Lesson Reset",
          description: "Your progress has been reset. You can start over.",
        });
      } catch (error) {
        console.error('Error resetting lesson progress:', error);
        toast({
          title: "Error",
          description: "Failed to reset lesson progress.",
          variant: "destructive",
        });
      }
    },
    recalculateAllCourseProgress: async () => {
      if (!user) return;
      
      try {
        console.log('Recalculating all course progress for user:', user.id);
        
        // Get all courses the user has lesson progress for
        const { data: allLessonProgress, error } = await supabase
          .from('lesson_progress')
          .select('course_id, quiz_passed')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        // Group by course and calculate progress
        const courseProgressMap = new Map();
        
        allLessonProgress?.forEach(lesson => {
          if (!courseProgressMap.has(lesson.course_id)) {
            courseProgressMap.set(lesson.course_id, { completed: 0, total: 0 });
          }
          const courseData = courseProgressMap.get(lesson.course_id);
          courseData.total++;
          if (lesson.quiz_passed) {
            courseData.completed++;
          }
        });
        
        // Update course progress for each course
        for (const [courseId, data] of courseProgressMap) {
          const course = coursesData.find(c => c.id === courseId);
          const totalLessons = course?.lessons.length || data.total;
          const progressPercentage = Math.round((data.completed / totalLessons) * 100);
          
          console.log(`Updating course ${courseId}: ${data.completed}/${totalLessons} = ${progressPercentage}%`);
          
          await supabase
            .from('course_progress')
            .upsert({
              user_id: user.id,
              course_id: courseId,
              progress_percentage: progressPercentage,
              completed_at: progressPercentage >= 100 ? new Date().toISOString() : null
            }, {
              onConflict: 'user_id,course_id'
            });
        }
        
        toast({
          title: "Progress Recalculated",
          description: "All course progress has been updated.",
        });
        
      } catch (error) {
        console.error('Error recalculating course progress:', error);
        toast({
          title: "Error",
          description: "Failed to recalculate progress.",
          variant: "destructive",
        });
      }
    },
    isVideoWatched: progress?.video_watched || false,
    isQuizPassed: progress?.quiz_passed || false,
    videoProgress: progress?.video_progress_percentage || 0,
    isVideoCompleted: (progress?.video_progress_percentage || 0) >= 90
  };
};
