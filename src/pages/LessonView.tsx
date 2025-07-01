
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import QuizComponent from '@/components/QuizComponent';
import { coursesData, Course, Lesson } from '@/data/coursesData';
import { useToast } from '@/hooks/use-toast';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useAuth } from '@/contexts/AuthContext';

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState<'video' | 'quiz' | 'completed'>('video');
  const [activeSection, setActiveSection] = useState('courses');
  const [videoWatched, setVideoWatched] = useState(false);

  const courseIdNum = parseInt(courseId || '0');
  const lessonIdNum = parseInt(lessonId || '0');

  const { 
    progress: lessonProgress, 
    markVideoWatched, 
    markQuizPassed,
    videoWatched: dbVideoWatched,
    quizPassed: dbQuizPassed,
    isCompleted 
  } = useLessonProgress(courseIdNum, lessonIdNum);

  const { updateProgress } = useCourseProgress(courseIdNum);

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === courseIdNum);
    if (foundCourse) {
      setCourse(foundCourse);
      const foundLesson = foundCourse.lessons.find(l => l.id === lessonIdNum);
      if (foundLesson) {
        setLesson(foundLesson);
        setVideoWatched(dbVideoWatched);
        
        // Set current step based on progress
        if (isCompleted) {
          setCurrentStep('completed');
        } else if (dbVideoWatched && !dbQuizPassed) {
          setCurrentStep('quiz');
        } else {
          setCurrentStep('video');
        }
      }
    }
  }, [courseIdNum, lessonIdNum, isCompleted, dbVideoWatched, dbQuizPassed]);

  const handleVideoComplete = async () => {
    setVideoWatched(true);
    if (isAuthenticated) {
      await markVideoWatched();
    }
    setCurrentStep('quiz');
    toast({
      title: "Video completed!",
      description: "Now take the quiz to complete this lesson.",
    });
  };

  const handleQuizComplete = async (passed: boolean, score: number) => {
    if (passed) {
      if (isAuthenticated) {
        await markQuizPassed(score);
        
        // Update course progress
        if (course) {
          const completedLessons = course.lessons.filter((l, index) => 
            l.id === lesson?.id || index < course.lessons.findIndex(cl => cl.id === lesson?.id)
          ).length;
          const progressPercentage = Math.min(100, (completedLessons / course.lessons.length) * 100);
          await updateProgress(progressPercentage);
        }
      }
      
      setCurrentStep('completed');
      toast({
        title: "Congratulations!",
        description: `You passed the quiz with ${score}%! Lesson completed.`,
      });
    } else {
      toast({
        title: "Quiz not passed",
        description: `You scored ${score}%. You need 70% to pass. Try again!`,
        variant: "destructive",
      });
    }
  };

  const getNextLesson = () => {
    if (!course || !lesson) return null;
    const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
    return currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;
  };

  const handleNavigateToSection = (section: string) => {
    setActiveSection(section);
    navigate('/');
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen">
        <Header 
          activeSection={activeSection} 
          setActiveSection={handleNavigateToSection}
          onAuthRequired={() => {}}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-cactus-800">Lesson not found</h1>
            <Link to="/" className="text-cerulean-600 hover:underline mt-4 inline-block">
              ← Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={handleNavigateToSection}
        onAuthRequired={() => {}}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to={`/course/${courseId}`}
            className="inline-flex items-center text-cerulean-600 hover:text-cerulean-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {course.title}
          </Link>
          
          <div className="text-sm text-cactus-600">
            Lesson {course.lessons.findIndex(l => l.id === lesson.id) + 1} of {course.lessons.length}
          </div>
        </div>

        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-sm border border-cactus-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-cactus-800">{lesson.title}</h1>
            {isCompleted && (
              <CheckCircle className="h-8 w-8 text-green-500" />
            )}
          </div>
          <p className="text-lg text-cactus-600 mb-4">{lesson.description}</p>
          <div className="flex items-center text-sm text-cactus-500">
            <Clock className="h-4 w-4 mr-1" />
            {lesson.duration}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-cactus-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-cactus-800 mb-4">Lesson Progress</h2>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              currentStep === 'video' ? 'text-cerulean-600' : 
              videoWatched ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'video' ? 'bg-cerulean-100' : 
                videoWatched ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {videoWatched ? <CheckCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </div>
              <span className="font-medium">Watch Video</span>
            </div>
            
            <div className={`h-px flex-1 ${videoWatched ? 'bg-green-300' : 'bg-gray-300'}`} />
            
            <div className={`flex items-center space-x-2 ${
              currentStep === 'quiz' ? 'text-cerulean-600' : 
              dbQuizPassed ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'quiz' ? 'bg-cerulean-100' : 
                dbQuizPassed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {dbQuizPassed ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm font-bold">?</span>}
              </div>
              <span className="font-medium">Take Quiz</span>
            </div>
            
            <div className={`h-px flex-1 ${dbQuizPassed ? 'bg-green-300' : 'bg-gray-300'}`} />
            
            <div className={`flex items-center space-x-2 ${
              currentStep === 'completed' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'completed' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 'video' && (
          <Card className="border-cactus-200 mb-6">
            <CardHeader>
              <CardTitle className="text-cactus-800">Lesson Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Video: {lesson.title}</p>
                  <p className="text-sm opacity-75">Duration: {lesson.duration}</p>
                  <p className="text-xs opacity-50 mt-2">Click "Mark as Watched" when finished</p>
                </div>
              </div>
              <Button 
                onClick={handleVideoComplete}
                className="w-full bg-cerulean-600 hover:bg-cerulean-700 text-white"
                disabled={videoWatched}
              >
                {videoWatched ? 'Video Completed ✓' : 'Mark Video as Watched'}
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 'quiz' && lesson.quiz && (
          <QuizComponent 
            quiz={lesson.quiz}
            onComplete={handleQuizComplete}
          />
        )}

        {currentStep === 'completed' && (
          <Card className="border-green-200 bg-green-50 mb-6">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Lesson Completed!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Congratulations! You've successfully completed this lesson.
              </p>
              <div className="flex space-x-4">
                {nextLesson ? (
                  <Button 
                    onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                    className="bg-cerulean-600 hover:bg-cerulean-700 text-white"
                  >
                    Next Lesson: {nextLesson.title}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="bg-cactus-600 hover:bg-cactus-700 text-white"
                  >
                    Course Complete! Return to Course
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/course/${courseId}`)}
                >
                  Course Overview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonView;
