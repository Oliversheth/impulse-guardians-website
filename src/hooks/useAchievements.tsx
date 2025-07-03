import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirement_type: string;
  requirement_value: any;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
  achievement?: Achievement;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchAchievements();
    if (user) {
      fetchUserAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchUserAchievements = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserAchievements(data || []);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndUnlockAchievement = async (requirementType: string, data: any) => {
    if (!user) return;

    try {
      // Find matching achievements
      const eligibleAchievements = achievements.filter(
        achievement => achievement.requirement_type === requirementType
      );

      for (const achievement of eligibleAchievements) {
        // Check if user already has this achievement
        const hasAchievement = userAchievements.some(
          ua => ua.achievement_id === achievement.id
        );

        if (hasAchievement) continue;

        // Check if requirement is met
        const requirementMet = checkRequirement(achievement, data);

        if (requirementMet) {
          // Unlock achievement
          await unlockAchievement(achievement.id);
          
          // Show celebration toast
          toast({
            title: "🎉 Achievement Unlocked!",
            description: `${achievement.icon} ${achievement.name} - ${achievement.description}`,
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const checkRequirement = (achievement: Achievement, data: any): boolean => {
    const req = achievement.requirement_value;

    switch (achievement.requirement_type) {
      case 'lesson_completion':
        return data.lessonCount >= req.count;
      case 'course_completion':
        return data.courseCount >= req.count;
      case 'quiz_score':
        return data.quizScore >= req.min_score && data.quizCount >= req.count;
      case 'calculator_use':
        if (req.type) {
          return data.calculatorType === req.type && data.count >= req.count;
        }
        return data.uniqueCalculators >= req.unique_types;
      case 'goal_creation':
        return data.goalCount >= req.count;
      case 'note_creation':
        return data.noteCount >= req.count;
      case 'bookmark_creation':
        return data.bookmarkCount >= req.count;
      default:
        return false;
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId
        });

      if (error) throw error;
      await fetchUserAchievements();
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const getTotalPoints = () => {
    return userAchievements.reduce((total, ua) => {
      return total + (ua.achievement?.points || 0);
    }, 0);
  };

  const getAchievementsByCategory = () => {
    const categories: { [key: string]: Achievement[] } = {};
    achievements.forEach(achievement => {
      if (!categories[achievement.category]) {
        categories[achievement.category] = [];
      }
      categories[achievement.category].push(achievement);
    });
    return categories;
  };

  const isAchievementUnlocked = (achievementId: string) => {
    return userAchievements.some(ua => ua.achievement_id === achievementId);
  };

  return {
    achievements,
    userAchievements,
    loading,
    checkAndUnlockAchievement,
    getTotalPoints,
    getAchievementsByCategory,
    isAchievementUnlocked
  };
};