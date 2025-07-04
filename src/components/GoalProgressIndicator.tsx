import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { differenceInDays, format, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  description?: string;
  goal_type: string;
  target_value?: number;
  current_value?: number;
  target_date?: string;
  completed_at?: string;
  created_at: string;
}

interface GoalProgressIndicatorProps {
  goal: Goal;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onUpdate?: (goalId: string) => void;
}

export const GoalProgressIndicator = ({ 
  goal, 
  variant = 'default',
  showActions = true,
  onUpdate 
}: GoalProgressIndicatorProps) => {
  // Calculate progress percentage
  const progressPercentage = goal.target_value && goal.current_value 
    ? Math.min((goal.current_value / goal.target_value) * 100, 100)
    : 0;

  // Calculate days remaining
  const daysRemaining = goal.target_date 
    ? differenceInDays(new Date(goal.target_date), new Date())
    : null;

  // Determine status
  const getStatus = () => {
    if (goal.completed_at) return 'completed';
    if (daysRemaining !== null && daysRemaining < 0) return 'overdue';
    if (daysRemaining !== null && daysRemaining <= 7) return 'urgent';
    if (progressPercentage >= 75) return 'on-track';
    return 'active';
  };

  const status = getStatus();

  // Status colors and icons
  const statusConfig = {
    completed: {
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      progressColor: 'bg-green-500',
      icon: <Target className="h-4 w-4 text-green-600" />,
      badge: { text: 'Completed', variant: 'default' as const, className: 'bg-green-100 text-green-700' }
    },
    overdue: {
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      progressColor: 'bg-red-500',
      icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
      badge: { text: 'Overdue', variant: 'destructive' as const, className: '' }
    },
    urgent: {
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      progressColor: 'bg-orange-500',
      icon: <Calendar className="h-4 w-4 text-orange-600" />,
      badge: { text: 'Urgent', variant: 'secondary' as const, className: 'bg-orange-100 text-orange-700' }
    },
    'on-track': {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      progressColor: 'bg-blue-500',
      icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
      badge: { text: 'On Track', variant: 'secondary' as const, className: 'bg-blue-100 text-blue-700' }
    },
    active: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 border-gray-200',
      progressColor: 'bg-gray-500',
      icon: <Target className="h-4 w-4 text-gray-600" />,
      badge: { text: 'Active', variant: 'outline' as const, className: '' }
    }
  };

  const config = statusConfig[status];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg">
        {config.icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{goal.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={progressPercentage} className="flex-1 h-2" />
            <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        <Badge 
          variant={config.badge.variant} 
          className={config.badge.className}
        >
          {config.badge.text}
        </Badge>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('transition-all hover:shadow-md', config.bgColor)}>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {config.icon}
                  <h3 className="font-semibold text-lg">{goal.title}</h3>
                </div>
                {goal.description && (
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                )}
              </div>
              <Badge 
                variant={config.badge.variant} 
                className={config.badge.className}
              >
                {config.badge.text}
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className={config.color}>
                  {goal.current_value?.toLocaleString() || 0} / {goal.target_value?.toLocaleString() || 0}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {Math.round(progressPercentage)}% complete
              </p>
            </div>

            {/* Timeline */}
            {goal.target_date && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Due {format(new Date(goal.target_date), 'MMM dd, yyyy')}</span>
                </div>
                {daysRemaining !== null && (
                  <span className={cn(
                    daysRemaining < 0 ? 'text-red-600' : 
                    daysRemaining <= 7 ? 'text-orange-600' : 
                    'text-muted-foreground'
                  )}>
                    {daysRemaining < 0 
                      ? `${Math.abs(daysRemaining)} days overdue`
                      : `${daysRemaining} days remaining`
                    }
                  </span>
                )}
              </div>
            )}

            {/* Milestones */}
            <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
              <div className={cn('flex flex-col items-center', progressPercentage >= 25 && 'text-green-600')}>
                <div className={cn('w-2 h-2 rounded-full border-2', 
                  progressPercentage >= 25 ? 'bg-green-500 border-green-500' : 'border-gray-300'
                )} />
                <span className="mt-1">25%</span>
              </div>
              <div className={cn('flex flex-col items-center', progressPercentage >= 50 && 'text-green-600')}>
                <div className={cn('w-2 h-2 rounded-full border-2', 
                  progressPercentage >= 50 ? 'bg-green-500 border-green-500' : 'border-gray-300'
                )} />
                <span className="mt-1">50%</span>
              </div>
              <div className={cn('flex flex-col items-center', progressPercentage >= 75 && 'text-green-600')}>
                <div className={cn('w-2 h-2 rounded-full border-2', 
                  progressPercentage >= 75 ? 'bg-green-500 border-green-500' : 'border-gray-300'
                )} />
                <span className="mt-1">75%</span>
              </div>
              <div className={cn('flex flex-col items-center', progressPercentage >= 100 && 'text-green-600')}>
                <div className={cn('w-2 h-2 rounded-full border-2', 
                  progressPercentage >= 100 ? 'bg-green-500 border-green-500' : 'border-gray-300'
                )} />
                <span className="mt-1">100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="transition-all hover:shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {config.icon}
              <h4 className="font-medium">{goal.title}</h4>
            </div>
            <Badge 
              variant={config.badge.variant} 
              className={config.badge.className}
            >
              {config.badge.text}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {goal.target_date && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Due {format(new Date(goal.target_date), 'MMM dd')}</span>
              {daysRemaining !== null && (
                <span className={cn(
                  daysRemaining < 0 ? 'text-red-600' : 
                  daysRemaining <= 7 ? 'text-orange-600' : 
                  'text-muted-foreground'
                )}>
                  {daysRemaining < 0 
                    ? `${Math.abs(daysRemaining)}d overdue`
                    : `${daysRemaining}d left`
                  }
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};