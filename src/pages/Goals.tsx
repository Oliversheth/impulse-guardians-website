import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Target, Calendar, TrendingUp, Award } from 'lucide-react';
import { useGoals } from '@/hooks/useGoals';
import { GoalProgressIndicator } from '@/components/GoalProgressIndicator';
import { GoalNotificationPanel } from '@/components/GoalNotificationPanel';
import CreateGoalDialog from '@/components/CreateGoalDialog';

const Goals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { goals, loading } = useGoals();

  // Filter goals based on search and tab
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case 'active':
        return !goal.completed_at;
      case 'completed':
        return !!goal.completed_at;
      case 'overdue':
        return !goal.completed_at && goal.target_date && new Date(goal.target_date) < new Date();
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = {
    total: goals.length,
    active: goals.filter(g => !g.completed_at).length,
    completed: goals.filter(g => !!g.completed_at).length,
    overdue: goals.filter(g => !g.completed_at && g.target_date && new Date(g.target_date) < new Date()).length,
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">My Goals</h1>
            <p className="text-muted-foreground">
              Track your financial goals and celebrate your achievements
            </p>
          </div>
          <CreateGoalDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.overdue}</p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Tabs */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({stats.active})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({stats.completed})
                </TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue ({stats.overdue})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      {filteredGoals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'No goals found' : 'No goals yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters.'
                  : 'Create your first financial goal to start tracking your progress.'
                }
              </p>
              {searchTerm ? (
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  Clear Search
                </Button>
              ) : (
                <CreateGoalDialog trigger={
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Goal
                  </Button>
                } />
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredGoals.map((goal) => (
            <GoalProgressIndicator
              key={goal.id}
              goal={goal}
              variant="detailed"
            />
          ))}
        </div>
      )}

      {/* Notification Panel */}
      <GoalNotificationPanel />
    </div>
  );
};

export default Goals;