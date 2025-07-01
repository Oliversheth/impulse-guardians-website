
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Award, Play, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { coursesData } from '@/data/coursesData';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import AuthDialog from '@/components/AuthDialog';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  
  const course = coursesData.find(c => c.id.toString() === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeSection="courses" 
          setActiveSection={() => {}}
          onAuthRequired={() => setIsAuthDialogOpen(true)}
        />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-cactus-800 mb-4">Course Not Found</h1>
          <Link to="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
        <AuthDialog 
          isOpen={isAuthDialogOpen} 
          onClose={() => setIsAuthDialogOpen(false)} 
        />
      </div>
    );
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = course.lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleLessonClick = (lessonId: number, isLocked: boolean) => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
      return;
    }
    
    if (isLocked) {
      return; // Don't navigate to locked lessons
    }
    
    // Navigate to lesson
    window.location.href = `/course/${courseId}/lesson/${lessonId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection="courses" 
        setActiveSection={() => {}}
        onAuthRequired={() => setIsAuthDialogOpen(true)}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-cerulean-600 hover:text-cerulean-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge 
                    variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
                    className={
                      course.level === 'Beginner' 
                        ? 'bg-cerulean-100 text-cerulean-700 mb-4' 
                        : course.level === 'Intermediate'
                        ? 'bg-cactus-100 text-cactus-700 mb-4'
                        : 'bg-cerulean-600 text-white mb-4'
                    }
                  >
                    {course.level}
                  </Badge>
                  <h1 className="text-3xl font-bold text-cactus-800 mb-4">{course.title}</h1>
                  <p className="text-lg text-cactus-600 mb-6">{course.description}</p>
                </div>
                <BookOpen className="h-12 w-12 text-cerulean-600" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-cerulean-600 mr-2" />
                    <span className="font-semibold text-cactus-800">{course.duration}</span>
                  </div>
                  <p className="text-sm text-cactus-600">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-cerulean-600 mr-2" />
                    <span className="font-semibold text-cactus-800">{course.students.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-cactus-600">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-cerulean-600 mr-2" />
                    <span className="font-semibold text-cactus-800">{totalLessons}</span>
                  </div>
                  <p className="text-sm text-cactus-600">Lessons</p>
                </div>
              </div>

              {/* Progress Section */}
              {isAuthenticated && progressPercentage > 0 && (
                <div className="mb-8 p-4 bg-cerulean-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-cactus-700">Your Progress</h3>
                    <span className="text-cerulean-600 font-semibold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <p className="text-sm text-cactus-600">{completedLessons} of {totalLessons} lessons completed</p>
                </div>
              )}

              {/* Learning Objectives */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-cactus-800 mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-cerulean-600 flex-shrink-0" />
                      <span className="text-cactus-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-cactus-800">Course Lessons</CardTitle>
                <CardDescription>
                  Complete lessons in order to unlock the next one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => {
                    const isLocked = index > 0 && !course.lessons[index - 1].completed;
                    const canAccess = isAuthenticated && !isLocked;
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          lesson.completed
                            ? 'bg-green-50 border-green-200'
                            : canAccess
                            ? 'bg-white border-gray-200 hover:border-cerulean-300'
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                        onClick={() => handleLessonClick(lesson.id, isLocked)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {lesson.completed ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Award className="h-3 w-3 text-white" />
                              </div>
                            ) : isLocked ? (
                              <Lock className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Play className="h-5 w-5 text-cerulean-600" />
                            )}
                            <div>
                              <h4 className="font-medium text-cactus-800 text-sm">{lesson.title}</h4>
                              <p className="text-xs text-cactus-600">{lesson.duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {!isAuthenticated && (
                  <div className="mt-6 p-4 bg-cerulean-50 rounded-lg text-center">
                    <p className="text-sm text-cactus-600 mb-3">Sign in to track your progress and unlock lessons</p>
                    <Button 
                      onClick={() => setIsAuthDialogOpen(true)}
                      className="bg-cerulean-600 hover:bg-cerulean-700 text-white"
                    >
                      Sign In to Start
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
      />
    </div>
  );
};

export default CourseDetail;
