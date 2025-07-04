import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievements } from '@/hooks/useAchievements';

interface LoginStreak {
  id: string;
  user_id: string;
  login_date: string;
  created_at: string;
}

export const useStreakTracking = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { checkAndUnlockAchievement } = useAchievements();

  useEffect(() => {
    if (user) {
      recordTodaysLogin();
      calculateCurrentStreak();
    }
  }, [user]);

  const recordTodaysLogin = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    try {
      // Check if we already recorded today's login
      const { data: existingLogin } = await (supabase as any)
        .from('user_login_streaks')
        .select('*')
        .eq('user_id', user.id)
        .eq('login_date', today)
        .maybeSingle();

      if (!existingLogin) {
        // Record today's login
        await (supabase as any)
          .from('user_login_streaks')
          .insert({
            user_id: user.id,
            login_date: today
          });
      }
    } catch (error) {
      console.error('Error recording login:', error);
    }
  };

  const calculateCurrentStreak = async () => {
    if (!user) return;

    try {
      const { data: logins } = await (supabase as any)
        .from('user_login_streaks')
        .select('*')
        .eq('user_id', user.id)
        .order('login_date', { ascending: false }) as { data: LoginStreak[] | null };

      if (!logins || logins.length === 0) {
        setCurrentStreak(0);
        setLoading(false);
        return;
      }

      let streak = 0;
      const today = new Date();
      
      for (let i = 0; i < logins.length; i++) {
        const loginDate = new Date(logins[i].login_date + 'T00:00:00');
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        // Normalize dates to compare only the date part
        const loginDateStr = loginDate.toISOString().split('T')[0];
        const expectedDateStr = expectedDate.toISOString().split('T')[0];
        
        if (loginDateStr === expectedDateStr) {
          streak++;
        } else {
          break;
        }
      }

      setCurrentStreak(streak);
      
      // Check for streak achievements
      if (streak >= 3) {
        await checkAndUnlockAchievement('streak', { streakDays: 3 });
      }
      if (streak >= 7) {
        await checkAndUnlockAchievement('streak', { streakDays: 7 });
      }
      
    } catch (error) {
      console.error('Error calculating streak:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStreak,
    loading,
    refreshStreak: calculateCurrentStreak
  };
};