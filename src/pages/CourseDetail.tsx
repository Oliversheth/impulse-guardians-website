
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Users, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { coursesData } from '@/data/coursesData';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { isAuthenticated } = useAuth();
  const course = coursesData.find(c => c.id === Number(courseId));
  const { progress, loading, enrollInCourse, isEnrolled } = useCourseProgress(Number(courseId) || 0);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cactus-800 mb-4">Course Not Found</h1>
          <Link to="/">
            <Button className="bg-cerulean-600 hover:bg-cerulean-700 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBackToCourses = () => {
    // Navigate to home page and scroll to courses section
    window.location.href = '/#courses';
  };

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = course.lessons.length;
  const progressPercentage = isEnrolled && progress 
    ? progress.progress_percentage 
    : totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={handleBackToCourses}
            className="inline-flex items-center text-cerulean-600 hover:text-cerulean-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
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
                <BookOpen className="h-6 w-6 text-cerulean-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-cactus-800 mb-2">{course.title}</h1>
              <p className="text-lg text-cactus-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-cactus-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0">
              {!isAuthenticated ? (
                <div className="text-center">
                  <p className="text-sm text-cactus-600 mb-2">Sign in to track your progress</p>
                  <Button className="bg-cerulean-600 hover:bg-cerulean-700 text-white">
                    Sign In to Start
                  </Button>
                </div>
              ) : !isEnrolled ? (
                <Button 
                  onClick={enrollInCourse}
                  className="bg-cerulean-600 hover:bg-cerulean-700 text-white"
                  disabled={loading}
                >
                  {loading ? 'Enrolling...' : 'Enroll in Course'}
                </Button>
              ) : (
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-cerulean-600">{Math.round(progressPercentage)}%</span>
                    <span className="text-sm text-cactus-600 ml-1">complete</span>
                  </div>
                  <Progress value={progressPercentage} className="w-32" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
                <CardDescription>
                  Complete all lessons to finish the course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <PlayCircle className="h-6 w-6 text-cerulean-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-cactus-800">{lesson.title}</h3>
                          <p className="text-sm text-cactus-600">{lesson.description}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1 text-cactus-500" />
                            <span className="text-xs text-cactus-500">{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {isAuthenticated && isEnrolled ? (
                          <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
                            <Button variant="outline" size="sm">
                              {lesson.completed ? 'Review' : 'Start'}
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            {!isAuthenticated ? 'Sign In Required' : 'Enroll Required'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.topics.map((topic, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-cerulean-600" />
                      <span className="text-sm text-cactus-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-cerulean-600">{completedLessons}</div>
                        <div className="text-xs text-cactus-600">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cactus-600">{totalLessons - completedLessons}</div>
                        <div className="text-xs text-cactus-600">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
