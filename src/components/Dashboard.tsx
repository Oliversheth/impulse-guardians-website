import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, BookOpen, Calculator, TrendingUp, Star, Plus, BarChart3, Calendar, Clock, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievements } from '@/hooks/useAchievements';
import { useGoals } from '@/hooks/useGoals';
import { useCourseProgressIntegration } from '@/hooks/useCourseProgressIntegration';
import { supabase } from '@/integrations/supabase/client';
import { coursesData } from '@/data/coursesData';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { userAchievements, getTotalPoints, getAchievementsByCategory, loading: achievementsLoading } = useAchievements();
  const { goals, getActiveGoals, getCompletedGoals, getGoalProgress } = useGoals();
  const [calculatorUsage, setCalculatorUsage] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const [learningInsights, setLearningInsights] = useState<any>({});

  // Get integrated course progress for all courses
  const courseProgressData = coursesData.map(course => {
    const integration = useCourseProgressIntegration(course.id);
    return {
      course_id: course.id,
      progress_percentage: integration.progressPercentage,
      completed_at: integration.courseCompletedAt,
      enrolled_at: new Date().toISOString(), // Fallback for recent activity
      title: course.title
    };
  }); // Show all courses regardless of progress

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch calculator usage
      const { data: calcData } = await supabase
        .from('calculator_usage')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setCalculatorUsage(calcData || []);

      // Combine recent activity using integrated course progress
      const activities = [
        ...courseProgressData.map(p => ({
          type: 'course',
          title: `Progress in ${p.title}`,
          date: p.enrolled_at,
          progress: p.progress_percentage
        })),
        ...(calcData || []).map(c => ({
          type: 'calculator',
          title: `Used ${c.calculator_type.replace('_', ' ')} calculator`,
          date: c.created_at
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getFinancialHealthScore = () => {
    const factors = {
      coursesCompleted: courseProgressData.filter(p => p.completed_at).length * 15,
      achievementsUnlocked: userAchievements.length * 8,
      goalsSet: goals.length * 12,
      goalsCompleted: getCompletedGoals().length * 20,
      calculatorsUsed: new Set(calculatorUsage.map(c => c.calculator_type)).size * 10,
      consistency: getStreakData() * 2 // Streak bonus
    };

    const totalScore = Object.values(factors).reduce((sum, score) => sum + score, 0);
    return {
      score: Math.min(totalScore, 100),
      factors,
      breakdown: Object.entries(factors).map(([key, value]) => ({
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        value,
        percentage: (value / totalScore) * 100
      }))
    };
  };

  const getStreakData = () => {
    // Simple streak calculation based on recent activity
    const today = new Date();
    const activities = recentActivity.map(a => new Date(a.date));
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      
      const hasActivity = activities.some(date => 
        date.toDateString() === checkDate.toDateString()
      );
      
      if (hasActivity) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const generateWeeklyProgressData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    // Fixed mock data to prevent chart from jumping around
    const mockData = [2, 1, 3, 0, 2, 1, 2]; // lessons per day
    const mockQuizData = [1, 0, 1, 0, 1, 1, 0]; // quizzes per day

    return last7Days.map((date, index) => ({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      lessons: mockData[index],
      quizzes: mockQuizData[index],
      date: date.toISOString().split('T')[0]
    }));
  };

  const generateLearningInsights = () => {
    const totalLessons = coursesData.reduce((sum, course) => sum + course.lessons.length, 0);
    const completedLessons = courseProgressData.reduce((sum, progress) => {
      return sum + Math.floor((progress.progress_percentage / 100) * 
        (coursesData.find(c => c.id === progress.course_id)?.lessons.length || 0));
    }, 0);

    const avgSessionTime = 25; // Mock data - replace with actual session tracking
    const preferredLearningTime = 'Evening'; // Mock data
    const strongestSkill = 'Budgeting'; // Based on completed courses

    return {
      totalLessons,
      completedLessons,
      completionRate: (completedLessons / totalLessons) * 100,
      avgSessionTime,
      preferredLearningTime,
      strongestSkill,
      weeklyGoal: 5, // lessons per week
      weeklyProgress: 3 // lessons completed this week
    };
  };

  useEffect(() => {
    if (user) {
      setWeeklyProgress(generateWeeklyProgressData());
      setLearningInsights(generateLearningInsights());
    }
  }, [user, courseProgressData]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Required</CardTitle>
            <CardDescription>Please log in to view your dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const healthScore = getFinancialHealthScore();
  const currentStreak = getStreakData();
  const totalPoints = getTotalPoints();
  const achievementsByCategory = getAchievementsByCategory();
  const activeGoals = getActiveGoals();

  const CHART_COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cactus-50 to-cerulean-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cactus-800 mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
          </h1>
          <p className="text-cactus-600">Here's your financial learning journey overview</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Financial Health Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-cerulean-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cactus-800">{healthScore.score}/100</div>
              <Progress value={healthScore.score} className="mt-2" />
              <p className="text-xs text-cactus-600 mt-2">
                {healthScore.score >= 80 ? 'Excellent!' : 
                 healthScore.score >= 60 ? 'Good progress' : 
                 'Keep learning!'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cactus-800">{currentStreak} days</div>
              <p className="text-xs text-cactus-600 mt-2">
                {currentStreak > 0 ? '🔥 Keep it up!' : 'Start your streak today!'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cactus-800">{totalPoints}</div>
              <p className="text-xs text-cactus-600 mt-2">
                From {userAchievements.length} achievements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-cerulean-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cactus-800">{activeGoals.length}</div>
              <p className="text-xs text-cactus-600 mt-2">
                {getCompletedGoals().length} completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="p-2 bg-cerulean-100 rounded-lg">
                          {activity.type === 'course' ? 
                            <BookOpen className="h-4 w-4 text-cerulean-600" /> :
                            <Calculator className="h-4 w-4 text-cerulean-600" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-cactus-800">{activity.title}</p>
                          <p className="text-xs text-cactus-600">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                        {activity.progress && (
                          <Badge variant="secondary">{activity.progress}%</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Continue your financial learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/#courses')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/calculators')}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Use Financial Calculators
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/goals')}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Set New Goal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Health Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Health Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {healthScore.breakdown.map((factor, index) => (
                      <div key={factor.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{factor.name}</span>
                          <span className="font-medium">{factor.value} pts</span>
                        </div>
                        <Progress value={factor.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Learning Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="lessons" fill="#10B981" name="Lessons" />
                      <Bar dataKey="quizzes" fill="#3B82F6" name="Quizzes" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Learning Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Learning Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {learningInsights.completionRate?.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {learningInsights.avgSessionTime}m
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Session</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">
                        {learningInsights.preferredLearningTime}
                      </div>
                      <div className="text-sm text-muted-foreground">Best Time</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">
                        {learningInsights.strongestSkill}
                      </div>
                      <div className="text-sm text-muted-foreground">Top Skill</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Course Progress Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: courseProgressData.filter(p => p.completed_at).length, fill: '#10B981' },
                          { name: 'In Progress', value: courseProgressData.filter(p => p.progress_percentage > 0 && !p.completed_at).length, fill: '#3B82F6' },
                          { name: 'Not Started', value: courseProgressData.filter(p => p.progress_percentage === 0).length, fill: '#9CA3AF' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {courseProgressData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category} Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryAchievements.map((achievement) => {
                        const isUnlocked = userAchievements.some(ua => ua.achievement_id === achievement.id);
                        return (
                          <div
                            key={achievement.id}
                            className={`p-4 rounded-lg border ${
                              isUnlocked 
                                ? 'bg-cactus-50 border-cactus-200' 
                                : 'bg-gray-50 border-gray-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-2xl">{achievement.icon}</span>
                              <div>
                                <h4 className="font-semibold text-cactus-800">{achievement.name}</h4>
                                <p className="text-sm text-cactus-600">{achievement.description}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <Badge variant={isUnlocked ? "default" : "secondary"}>
                                {achievement.points} pts
                              </Badge>
                              {isUnlocked && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✓ Unlocked
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Financial Goals</CardTitle>
                <CardDescription>Track your progress towards financial milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {activeGoals.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cactus-800 mb-2">No active goals</h3>
                    <p className="text-cactus-600 mb-4">Set your first financial goal to get started!</p>
                    <Button onClick={() => navigate('/goals')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Goal
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeGoals.map((goal) => (
                      <div key={goal.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-cactus-800">{goal.title}</h4>
                            {goal.description && (
                              <p className="text-sm text-cactus-600">{goal.description}</p>
                            )}
                          </div>
                          <Badge className="capitalize">{goal.goal_type.replace('_', ' ')}</Badge>
                        </div>
                        {goal.target_value && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>${goal.current_value.toLocaleString()}</span>
                              <span>${goal.target_value.toLocaleString()}</span>
                            </div>
                            <Progress value={getGoalProgress(goal)} />
                            <p className="text-xs text-cactus-600">
                              {getGoalProgress(goal).toFixed(1)}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {courseProgressData.map((progress, index) => (
                       <div key={`${progress.course_id}-${index}`} className="space-y-2">
                         <div className="flex justify-between">
                           <span className="font-medium text-cactus-800">{progress.title}</span>
                           <span className="text-sm text-cactus-600">{progress.progress_percentage}%</span>
                         </div>
                         <Progress value={progress.progress_percentage} />
                       </div>
                     ))}
                   </div>
                 </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calculator Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calculatorUsage.map((usage, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-cactus-50 rounded-lg">
                        <div>
                          <p className="font-medium text-cactus-800 capitalize">
                            {usage.calculator_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-cactus-600">
                            {new Date(usage.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Calculator className="h-5 w-5 text-cerulean-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;