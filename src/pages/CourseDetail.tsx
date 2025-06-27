
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Lock, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { coursesData, Course } from '@/data/coursesData';
import { useAuth } from '@/contexts/AuthContext';
import LessonView from '@/components/LessonView';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(courseId || '0'));
    if (foundCourse) {
      setCourse(foundCourse);
      // TODO: Load user progress from database
      setCompletedLessons([]); // Placeholder - would come from database
    }
  }, [courseId]);

  const handleLessonComplete = (lessonIndex: number) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
      // TODO: Save progress to database
    }
  };

  const calculateProgress = () => {
    if (!course) return 0;
    return (completedLessons.length / course.topics.length) * 100;
  };

  if (currentLesson !== null && course) {
    return (
      <LessonView
        course={course}
        lessonIndex={currentLesson}
        onComplete={() => handleLessonComplete(currentLesson)}
        onBack={() => setCurrentLesson(null)}
        isCompleted={completedLessons.includes(currentLesson)}
      />
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-cerulean-600 hover:text-cerulean-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
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
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Course Progress</span>
                <span className="text-sm text-gray-500">{completedLessons.length}/{course.topics.length} lessons completed</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll learn</h3>
                <ul className="space-y-2">
                  {course.topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Stats</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Students enrolled:</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total lessons:</span>
                    <span className="font-medium">{course.topics.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
          {course.topics.map((topic, index) => {
            const isCompleted = completedLessons.includes(index);
            const isLocked = index > 0 && !completedLessons.includes(index - 1) && completedLessons.length === 0;
            
            return (
              <Card key={index} className={`transition-all duration-200 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' : isLocked ? 'bg-gray-300' : 'bg-cerulean-100 text-cerulean-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">Lesson {index + 1}: {topic}</CardTitle>
                        <CardDescription>
                          {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Ready to start'}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentLesson(index)}
                      disabled={isLocked}
                      className={isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {isCompleted ? 'Review' : <><Play className="w-4 h-4 mr-2" />Start</>}
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
