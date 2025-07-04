import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Star, TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';
import { useCourseRecommendations } from '@/hooks/useCourseRecommendations';
import { useNavigate } from 'react-router-dom';

export const CourseRecommendations = () => {
  const navigate = useNavigate();
  const { recommendations, loading, getPersonalizedPath, getSkillProgression } = useCourseRecommendations();
  
  const personalizedPath = getPersonalizedPath();
  const skillProgression = getSkillProgression();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelName = (level: number) => {
    const levels = ['Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level] || 'Novice';
  };

  return (
    <div className="space-y-8">
      {/* Learning Path Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Your Learning Path</CardTitle>
          </div>
          <CardDescription>
            Personalized course progression based on your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {personalizedPath.completed} of {personalizedPath.totalPath} courses completed
            </span>
          </div>
          <Progress 
            value={(personalizedPath.completed / personalizedPath.totalPath) * 100} 
            className="mb-6"
          />
          
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Next Recommended Courses
            </h4>
            <div className="grid gap-2">
              {personalizedPath.next.map((course, index) => (
                <div key={course.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">{course.title}</span>
                      <Badge variant="outline" className={getDifficultyColor(course.level)}>
                        {course.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Progression */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <CardTitle>Skill Progression</CardTitle>
          </div>
          <CardDescription>
            Track your expertise across different financial topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {skillProgression.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.skill}</span>
                  <Badge variant="secondary">
                    {getSkillLevelName(skill.level)}
                  </Badge>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Recommended for You</h3>
        </div>
        
        <div className="grid gap-4">
          {recommendations.slice(0, 4).map((rec) => (
            <Card key={rec.course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{rec.course.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(rec.course.level)}
                      >
                        {rec.course.level}
                      </Badge>
                      {!rec.prerequisitesMet && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Prerequisites Required
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {rec.course.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {rec.course.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {rec.reason}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => navigate(`/course/${rec.course.id}`)}
                        disabled={!rec.prerequisitesMet}
                        className="flex items-center gap-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        {rec.prerequisitesMet ? 'Start Course' : 'View Prerequisites'}
                      </Button>
                      
                      {rec.prerequisitesMet && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ready to Start
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {Math.round(rec.score)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Match Score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};