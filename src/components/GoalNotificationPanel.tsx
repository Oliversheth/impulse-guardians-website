import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bell, X, CheckCircle, AlertTriangle, Target, Calendar } from 'lucide-react';
import { useGoalNotifications } from '@/hooks/useGoalNotifications';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export const GoalNotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    dismissNotification, 
    markAllAsRead, 
    getUnreadCount 
  } = useGoalNotifications();

  const unreadCount = getUnreadCount();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Target className="h-4 w-4 text-blue-600" />;
      case 'celebration':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'deadline':
      case 'reminder':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative rounded-full w-12 h-12 shadow-lg"
          variant="default"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Goal Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount}</Badge>
              )}
            </CardTitle>
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
              <p className="text-sm">Your goal updates will appear here</p>
            </div>
          ) : (
            <ScrollArea className="h-96">
              <div className="p-4 space-y-3">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div 
                      className={cn(
                        'border-l-4 p-3 rounded-r-lg transition-all',
                        getNotificationColor(notification.severity)
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => dismissNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {notification.actionRequired && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                          >
                            View Goal
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {index < notifications.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};