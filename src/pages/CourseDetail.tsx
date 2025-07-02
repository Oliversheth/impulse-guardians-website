
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Users, Award, BookOpen, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { coursesData } from '@/data/coursesData';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useCourseProgressIntegration } from '@/hooks/useCourseProgressIntegration';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { isAuthenticated } = useAuth();
  const course = coursesData.find(c => c.id === Number(courseId));
  const { progress, loading, enrollInCourse, isEnrolled } = useCourseProgress(Number(courseId) || 0);
  const integratedProgress = useCourseProgressIntegration(Number(courseId) || 0);

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
    window.location.href = '/#courses';
  };

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
                {integratedProgress.courseCompleted && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Course Completed
                  </Badge>
                )}
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
                    <span className="text-2xl font-bold text-cerulean-600">{integratedProgress.progressPercentage}%</span>
                    <span className="text-sm text-cactus-600 ml-1">complete</span>
                  </div>
                  <Progress value={integratedProgress.progressPercentage} className="w-32" />
                  <p className="text-xs text-cactus-500 mt-1">
                    {integratedProgress.completedLessons} of {integratedProgress.totalLessons} lessons
                  </p>
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
                  Complete lessons in order to progress through the course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integratedProgress.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : lesson.locked ? (
                            <Lock className="h-6 w-6 text-gray-400" />
                          ) : (
                            <PlayCircle className="h-6 w-6 text-cerulean-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${lesson.locked ? 'text-gray-500' : 'text-cactus-800'}`}>
                            {lesson.title}
                          </h3>
                          <p className={`text-sm ${lesson.locked ? 'text-gray-400' : 'text-cactus-600'}`}>
                            {lesson.description}
                          </p>
                          <div className="flex items-center mt-1 space-x-4">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-cactus-500" />
                              <span className="text-xs text-cactus-500">{lesson.duration}</span>
                            </div>
                            {lesson.videoProgress > 0 && !lesson.completed && (
                              <div className="flex items-center">
                                <span className="text-xs text-cerulean-600">
                                  Video: {lesson.videoProgress}% watched
                                </span>
                              </div>
                            )}
                            {lesson.completed && lesson.completedAt && (
                              <div className="flex items-center">
                                <span className="text-xs text-green-600">
                                  ✓ Completed {new Date(lesson.completedAt).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {isAuthenticated && isEnrolled ? (
                          lesson.locked ? (
                            <Button variant="outline" size="sm" disabled>
                              Locked
                            </Button>
                          ) : (
                            <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
                              <Button variant="outline" size="sm">
                                {lesson.completed ? 'Review' : lesson.videoProgress > 0 ? 'Continue' : 'Start'}
                              </Button>
                            </Link>
                          )
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
                        <span>{integratedProgress.progressPercentage}%</span>
                      </div>
                      <Progress value={integratedProgress.progressPercentage} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-cerulean-600">{integratedProgress.completedLessons}</div>
                        <div className="text-xs text-cactus-600">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cactus-600">{integratedProgress.totalLessons - integratedProgress.completedLessons}</div>
                        <div className="text-xs text-cactus-600">Remaining</div>
                      </div>
                    </div>

                    {integratedProgress.courseCompleted && (
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                        <h3 className="font-semibold text-green-800">Course Completed!</h3>
                        <p className="text-sm text-green-600 mt-1">
                          Completed on {integratedProgress.courseCompletedAt 
                            ? new Date(integratedProgress.courseCompletedAt).toLocaleDateString()
                            : 'Recently'
                          }
                        </p>
                      </div>  
                    )}
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
