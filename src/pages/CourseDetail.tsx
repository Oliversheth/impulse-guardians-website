
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, BookOpen, Lock, CheckCircle, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { coursesData, Course } from '@/data/coursesData';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeSection, setActiveSection] = useState('courses');

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(courseId || '0'));
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          onAuthRequired={() => {}}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cactus-800">Course not found</h1>
            <Link to="/" className="text-cerulean-600 hover:underline mt-4 inline-block">
              ← Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = course.lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onAuthRequired={() => {}}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-cerulean-600 hover:text-cerulean-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm border border-cactus-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
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
              
              <h1 className="text-4xl font-bold text-cactus-800 mb-4">{course.title}</h1>
              <p className="text-xl text-cactus-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-cactus-500 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  {totalLessons} lessons
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-cactus-700">Your Progress</h3>
                  <span className="text-sm text-cactus-600">
                    {completedLessons} of {totalLessons} lessons completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-cactus-500 mt-1">
                  {Math.round(progressPercentage)}% complete
                </p>
              </div>
            </div>

            {/* Course Stats Card */}
            <div className="lg:w-80">
              <Card className="border-cactus-200">
                <CardHeader>
                  <CardTitle className="text-lg text-cactus-800">Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-cactus-700 mb-2">Learning Objectives</h4>
                      <ul className="text-sm text-cactus-600 space-y-1">
                        {course.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-3 w-3 mr-2 mt-1 text-cerulean-600 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-cactus-700 mb-2">Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-lg shadow-sm border border-cactus-200">
          <div className="p-6 border-b border-cactus-200">
            <h2 className="text-2xl font-bold text-cactus-800">Course Lessons</h2>
            <p className="text-cactus-600 mt-1">Complete lessons in order to unlock the next one</p>
          </div>
          
          <div className="divide-y divide-cactus-200">
            {course.lessons.map((lesson, index) => (
              <div key={lesson.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : lesson.locked ? (
                        <Lock className="h-8 w-8 text-gray-400" />
                      ) : (
                        <Play className="h-8 w-8 text-cerulean-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg font-semibold ${
                          lesson.completed ? 'text-green-700' : 
                          lesson.locked ? 'text-gray-400' : 'text-cactus-800'
                        }`}>
                          Lesson {index + 1}: {lesson.title}
                        </h3>
                        {lesson.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        lesson.locked ? 'text-gray-400' : 'text-cactus-600'
                      }`}>
                        {lesson.description}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-cactus-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    {lesson.locked ? (
                      <Button disabled variant="outline" className="opacity-50">
                        Locked
                      </Button>
                    ) : lesson.completed ? (
                      <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
                        <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                          Review
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
                        <Button className="bg-cerulean-600 hover:bg-cerulean-700 text-white">
                          Start Lesson
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
