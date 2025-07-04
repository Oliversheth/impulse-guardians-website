import { useState, useEffect } from 'react';
import { useGoals } from '@/hooks/useGoals';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, isAfter, isBefore, addDays } from 'date-fns';

export interface GoalNotification {
  id: string;
  goalId: string;
  type: 'milestone' | 'deadline' | 'celebration' | 'reminder';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'success' | 'error';
  actionRequired?: boolean;
  createdAt: Date;
}

export const useGoalNotifications = () => {
  const [notifications, setNotifications] = useState<GoalNotification[]>([]);
  const { goals } = useGoals();
  const { toast } = useToast();

  // Calculate milestone progress (25%, 50%, 75%, 100%)
  const calculateMilestones = (goal: any) => {
    if (!goal.target_value || !goal.current_value) return [];
    
    const progress = (goal.current_value / goal.target_value) * 100;
    const milestones = [25, 50, 75, 100];
    
    return milestones.filter(milestone => 
      progress >= milestone && 
      !notifications.some(n => 
        n.goalId === goal.id && 
        n.type === 'milestone' && 
        n.message.includes(`${milestone}%`)
      )
    );
  };

  // Check for deadline warnings
  const checkDeadlineWarnings = (goal: any) => {
    if (!goal.target_date || goal.completed_at) return [];
    
    const targetDate = new Date(goal.target_date);
    const today = new Date();
    const daysUntilDeadline = differenceInDays(targetDate, today);
    
    const warnings = [];
    
    // 7 days warning
    if (daysUntilDeadline === 7) {
      warnings.push({
        type: 'deadline' as const,
        severity: 'warning' as const,
        title: 'Deadline Approaching',
        message: `Goal "${goal.title}" is due in 7 days!`,
        actionRequired: true,
      });
    }
    
    // 1 day warning
    if (daysUntilDeadline === 1) {
      warnings.push({
        type: 'deadline' as const,
        severity: 'error' as const,
        title: 'Deadline Tomorrow',
        message: `Goal "${goal.title}" is due tomorrow!`,
        actionRequired: true,
      });
    }
    
    // Overdue
    if (daysUntilDeadline < 0) {
      warnings.push({
        type: 'deadline' as const,
        severity: 'error' as const,
        title: 'Goal Overdue',
        message: `Goal "${goal.title}" is ${Math.abs(daysUntilDeadline)} days overdue!`,
        actionRequired: true,
      });
    }
    
    return warnings.filter(warning => 
      !notifications.some(n => 
        n.goalId === goal.id && 
        n.type === 'deadline' && 
        n.message === warning.message
      )
    );
  };

  // Generate notifications from goals
  const generateNotifications = () => {
    const newNotifications: GoalNotification[] = [];
    
    goals.forEach(goal => {
      // Milestone notifications
      const milestones = calculateMilestones(goal);
      milestones.forEach(milestone => {
        newNotifications.push({
          id: `${goal.id}-milestone-${milestone}`,
          goalId: goal.id,
          type: 'milestone',
          title: 'Milestone Achieved!',
          message: `Great progress! You've reached ${milestone}% of your goal "${goal.title}"`,
          severity: 'success',
          createdAt: new Date(),
        });
      });
      
      // Completion celebration
      if (goal.completed_at && !notifications.some(n => 
        n.goalId === goal.id && n.type === 'celebration'
      )) {
        newNotifications.push({
          id: `${goal.id}-celebration`,
          goalId: goal.id,
          type: 'celebration',
          title: '🎉 Goal Completed!',
          message: `Congratulations! You've successfully completed "${goal.title}"!`,
          severity: 'success',
          createdAt: new Date(),
        });
      }
      
      // Deadline warnings
      const warnings = checkDeadlineWarnings(goal);
      warnings.forEach(warning => {
        newNotifications.push({
          id: `${goal.id}-deadline-${Date.now()}`,
          goalId: goal.id,
          ...warning,
          createdAt: new Date(),
        });
      });
    });
    
    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev]);
      
      // Show toast for high-priority notifications
      newNotifications.forEach(notification => {
        if (notification.actionRequired || notification.type === 'celebration') {
          toast({
            title: notification.title,
            description: notification.message,
            variant: notification.severity === 'error' ? 'destructive' : 'default',
          });
        }
      });
    }
  };

  // Dismiss notification
  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications([]);
  };

  // Get notifications by type
  const getNotificationsByType = (type: GoalNotification['type']) => {
    return notifications.filter(n => n.type === type);
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.length;
  };

  useEffect(() => {
    if (goals.length > 0) {
      generateNotifications();
    }
  }, [goals]);

  return {
    notifications,
    dismissNotification,
    markAllAsRead,
    getNotificationsByType,
    getUnreadCount,
  };
};