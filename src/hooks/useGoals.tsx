import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_value?: number;
  current_value: number;
  goal_type: string;
  target_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert({
          ...goalData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      await fetchGoals();
      return data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', goalId);

      if (error) throw error;
      await fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;
      await fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  };

  const completeGoal = async (goalId: string) => {
    await updateGoal(goalId, {
      completed_at: new Date().toISOString(),
      current_value: goals.find(g => g.id === goalId)?.target_value || 0
    });
  };

  const updateProgress = async (goalId: string, newValue: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const updates: Partial<Goal> = { current_value: newValue };
    
    // Auto-complete if target reached
    if (goal.target_value && newValue >= goal.target_value && !goal.completed_at) {
      updates.completed_at = new Date().toISOString();
    }

    await updateGoal(goalId, updates);
  };

  const getGoalProgress = (goal: Goal): number => {
    if (!goal.target_value) return 0;
    return Math.min((goal.current_value / goal.target_value) * 100, 100);
  };

  const getActiveGoals = () => goals.filter(goal => !goal.completed_at);
  const getCompletedGoals = () => goals.filter(goal => goal.completed_at);

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
    updateProgress,
    getGoalProgress,
    getActiveGoals,
    getCompletedGoals
  };
};