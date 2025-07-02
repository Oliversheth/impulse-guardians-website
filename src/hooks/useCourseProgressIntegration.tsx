
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { coursesData } from '@/data/coursesData';

interface LessonProgressData {
  lesson_id: number;
  video_watched: boolean;
  quiz_passed: boolean;
  video_progress_percentage: number;
  completed_at: string | null;
  video_completed_at: string | null;
}

interface CourseProgressIntegration {
  courseId: number;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lessons: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    videoProgress: number;
    videoCompleted: boolean;
    quizPassed: boolean;
    completedAt: string | null;
  }>;
  isLoading: boolean;
  courseCompleted: boolean;
  courseCompletedAt: string | null;
}

export const useCourseProgressIntegration = (courseId: number): CourseProgressIntegration => {
  const [lessonProgressData, setLessonProgressData] = useState<LessonProgressData[]>([]);
  const [courseProgress, setCourseProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const course = coursesData.find(c => c.id === courseId);

  useEffect(() => {
    if (!user || !course) {
      setIsLoading(false);
      return;
    }

    fetchAllProgress();
  }, [user, courseId, course]);

  const fetchAllProgress = async () => {
    try {
      // Fetch lesson progress
      const { data: lessonData, error: lessonError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('course_id', courseId);

      if (lessonError && lessonError.code !== 'PGRST116') {
        console.error('Error fetching lesson progress:', lessonError);
      } else {
        setLessonProgressData(lessonData || []);
      }

      // Fetch course progress
      const { data: courseData, error: courseError } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (courseError && courseError.code !== 'PGRST116') {
        console.error('Error fetching course progress:', courseError);
      } else {
        setCourseProgress(courseData);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Merge static course data with database progress
  const getIntegratedProgress = (): CourseProgressIntegration => {
    if (!course) {
      return {
        courseId,
        totalLessons: 0,
        completedLessons: 0,
        progressPercentage: 0,
        lessons: [],
        isLoading,
        courseCompleted: false,
        courseCompletedAt: null,
      };
    }

    const lessons = course.lessons.map((lesson, index) => {
      const progressData = lessonProgressData.find(p => p.lesson_id === lesson.id);
      const isCompleted = progressData?.quiz_passed || false;
      const isPrevLessonCompleted = index === 0 || course.lessons
        .slice(0, index)
        .every(prevLesson => 
          lessonProgressData.find(p => p.lesson_id === prevLesson.id)?.quiz_passed || false
        );

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        completed: isCompleted,
        locked: !isPrevLessonCompleted && !isCompleted,
        videoProgress: progressData?.video_progress_percentage || 0,
        videoCompleted: progressData?.video_watched || false,
        quizPassed: progressData?.quiz_passed || false,
        completedAt: progressData?.completed_at || null,
      };
    });

    const completedLessons = lessons.filter(l => l.completed).length;
    const totalLessons = lessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const courseCompleted = completedLessons === totalLessons && totalLessons > 0;

    return {
      courseId,
      totalLessons,
      completedLessons,
      progressPercentage,
      lessons,
      isLoading,
      courseCompleted,
      courseCompletedAt: courseProgress?.completed_at || null,
    };
  };

  return getIntegratedProgress();
};
