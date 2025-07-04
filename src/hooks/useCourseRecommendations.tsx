import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseProgressIntegration } from '@/hooks/useCourseProgressIntegration';
import { coursesData } from '@/data/coursesData';

interface RecommendedCourse {
  course: typeof coursesData[0];
  score: number;
  reason: string;
  prerequisitesMet: boolean;
}

export const useCourseRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<RecommendedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  // Get progress for all courses
  const courseProgressData = coursesData.map(course => {
    const integration = useCourseProgressIntegration(course.id);
    return {
      courseId: course.id,
      progressPercentage: integration.progressPercentage,
      completed: integration.courseCompletedAt !== null,
      enrolled: integration.progressPercentage > 0
    };
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    generateRecommendations();
  }, [user, courseProgressData]);

  const generateRecommendations = () => {
    const completedCourses = courseProgressData.filter(p => p.completed);
    const inProgressCourses = courseProgressData.filter(p => p.enrolled && !p.completed);
    const notStartedCourses = courseProgressData.filter(p => !p.enrolled);

    const scored: RecommendedCourse[] = [];

    coursesData.forEach(course => {
      const progress = courseProgressData.find(p => p.courseId === course.id);
      if (progress?.completed) return; // Skip completed courses

      let score = 0;
      let reason = '';
      let prerequisitesMet = true;

      // Check prerequisites (based on course difficulty and order)
      const courseIndex = coursesData.findIndex(c => c.id === course.id);
      const hasPrerequisites = courseIndex > 0;
      
      if (hasPrerequisites) {
        const prerequisiteCourse = coursesData[courseIndex - 1];
        const prereqProgress = courseProgressData.find(p => p.courseId === prerequisiteCourse.id);
        prerequisitesMet = prereqProgress?.completed || false;
      }

      // Scoring logic
      if (progress?.enrolled && !progress.completed) {
        score += 50; // High priority for in-progress courses
        reason = 'Continue your learning journey';
      } else if (prerequisitesMet) {
        // Beginner courses for new users
        if (completedCourses.length === 0 && course.level === 'Beginner') {
          score += 40;
          reason = 'Perfect for getting started';
        }
        // Next logical course based on completed courses
        else if (completedCourses.length > 0) {
          const lastCompletedIndex = Math.max(
            ...completedCourses.map(cp => 
              coursesData.findIndex(c => c.id === cp.courseId)
            )
          );
          if (courseIndex === lastCompletedIndex + 1) {
            score += 45;
            reason = 'Natural progression from your completed courses';
          } else if (courseIndex > lastCompletedIndex) {
            score += 25;
            reason = 'Build on your existing knowledge';
          }
        }
        
        // Boost score based on course level match
        if (course.level === 'Beginner' && completedCourses.length <= 1) {
          score += 10;
        } else if (course.level === 'Intermediate' && completedCourses.length >= 1) {
          score += 15;
        } else if (course.level === 'Advanced' && completedCourses.length >= 2) {
          score += 20;
        }
      } else {
        score = 5; // Low score for courses with unmet prerequisites
        reason = 'Prerequisites required';
        prerequisitesMet = false;
      }

      // Boost popular foundational courses
      if (['Personal Finance Basics', 'Budgeting Fundamentals'].includes(course.title)) {
        score += 10;
      }

      scored.push({
        course,
        score,
        reason,
        prerequisitesMet
      });
    });

    // Sort by score and take top recommendations
    const sortedRecommendations = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    setRecommendations(sortedRecommendations);
    setLoading(false);
  };

  const getPersonalizedPath = () => {
    const completedCourses = courseProgressData.filter(p => p.completed);
    const nextCourses = recommendations
      .filter(r => r.prerequisitesMet)
      .slice(0, 3)
      .map(r => r.course);

    return {
      completed: completedCourses.length,
      next: nextCourses,
      totalPath: coursesData.length
    };
  };

  const getSkillProgression = () => {
    const completedCourses = courseProgressData.filter(p => p.completed);
    const skills = {
      'Financial Literacy': 0,
      'Investment Knowledge': 0,
      'Budgeting Skills': 0,
      'Debt Management': 0,
      'Financial Planning': 0
    };

    // Map courses to skills and calculate progression
    completedCourses.forEach(progress => {
      const course = coursesData.find(c => c.id === progress.courseId);
      if (course) {
        // Assign skill points based on course content
        if (course.title.includes('Personal Finance') || course.title.includes('Basics')) {
          skills['Financial Literacy'] += 25;
        }
        if (course.title.includes('Investment') || course.title.includes('Stock')) {
          skills['Investment Knowledge'] += 30;
        }
        if (course.title.includes('Budget')) {
          skills['Budgeting Skills'] += 35;
        }
        if (course.title.includes('Debt') || course.title.includes('Credit')) {
          skills['Debt Management'] += 30;
        }
        if (course.title.includes('Planning') || course.title.includes('Goal')) {
          skills['Financial Planning'] += 25;
        }
      }
    });

    return Object.entries(skills).map(([skill, points]) => ({
      skill,
      level: Math.min(Math.floor(points / 25), 4), // 0-4 levels
      progress: Math.min(points, 100)
    }));
  };

  return {
    recommendations,
    loading,
    getPersonalizedPath,
    getSkillProgression,
    refreshRecommendations: generateRecommendations
  };
};