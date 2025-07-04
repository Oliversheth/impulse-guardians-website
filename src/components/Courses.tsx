
import { useState } from 'react';
import { BookOpen, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { coursesData } from '@/data/coursesData';
import { useCourseProgressIntegration } from '@/hooks/useCourseProgressIntegration';
import { useAuth } from '@/contexts/AuthContext';
import { CourseRecommendations } from '@/components/CourseRecommendations';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }: { course: any }) => {
  const { isAuthenticated } = useAuth();
  const integratedProgress = useCourseProgressIntegration(course.id);

  return (
    <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 border-cactus-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <Badge 
              variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
              className={
                course.level === 'Beginner' 
                  ? 'bg-cerulean-100 text-cerulean-700' 
                  : course.level === 'Intermediate'
                  ? 'bg-cactus-100 text-cactus-700'
                  : 'bg-cerulean-600 text-white'
              }
            >
              {course.level}
            </Badge>
            {integratedProgress.courseCompleted && (
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <BookOpen className="h-6 w-6 text-cerulean-600" />
        </div>
        <CardTitle className="text-xl text-cactus-800">{course.title}</CardTitle>
        <CardDescription className="text-cactus-600">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-cactus-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {course.students.toLocaleString()} students
          </div>
        </div>

        {/* Progress Section - Only show if authenticated and has progress */}
        {isAuthenticated && integratedProgress.progressPercentage > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-cactus-600">Progress</span>
              <span className="text-cactus-600">{integratedProgress.progressPercentage}%</span>
            </div>
            <Progress value={integratedProgress.progressPercentage} className="h-2" />
            <p className="text-xs text-cactus-500 mt-1">
              {integratedProgress.completedLessons} of {integratedProgress.totalLessons} lessons completed
            </p>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-semibold text-cactus-700 mb-2">What you'll learn:</h4>
          <ul className="text-sm text-cactus-600 space-y-1">
            {course.topics.slice(0, 3).map((topic: string, index: number) => (
              <li key={index} className="flex items-center">
                <Award className="h-3 w-3 mr-2 text-cerulean-600" />
                {topic}
              </li>
            ))}
            {course.topics.length > 3 && (
              <li className="text-cerulean-600 font-medium">
                +{course.topics.length - 3} more topics
              </li>
            )}
          </ul>
        </div>

        <Link to={`/course/${course.id}`}>
          <Button className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white">
            {integratedProgress.courseCompleted 
              ? 'Review Course' 
              : integratedProgress.progressPercentage > 0 
                ? 'Continue Course' 
                : 'Start Course'
            }
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user ? "recommended" : "all");

  const filterCoursesByLevel = (level: string) => {
    return coursesData.filter(course => course.level === level);
  };

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cactus-800 mb-4">
            Personal Finance Courses
          </h2>
          <p className="text-xl text-cactus-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers everything from basic budgeting to advanced investment strategies, 
            designed specifically for students at every level.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${user ? 'grid-cols-4' : 'grid-cols-3'}`}>
            {user && <TabsTrigger value="recommended">Recommended</TabsTrigger>}
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="Beginner">Beginner</TabsTrigger>
            <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="Advanced">Advanced</TabsTrigger>
          </TabsList>

          {user && (
            <TabsContent value="recommended" className="mt-8">
              <CourseRecommendations />
            </TabsContent>
          )}
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesData.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Beginner" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterCoursesByLevel('Beginner').map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Intermediate" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterCoursesByLevel('Intermediate').map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="Advanced" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterCoursesByLevel('Advanced').map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Courses;
