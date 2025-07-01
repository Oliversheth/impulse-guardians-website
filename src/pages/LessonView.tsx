
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { coursesData } from '@/data/coursesData';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useAuth } from '@/contexts/AuthContext';
import QuizComponent from '@/components/QuizComponent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');

  const course = coursesData.find(c => c.id === parseInt(courseId || '0'));
  const lesson = course?.lessons.find(l => l.id === parseInt(lessonId || '0'));
  
  const { 
    progress, 
    loading, 
    updateVideoWatched, 
    updateQuizPassed, 
    isVideoWatched, 
    isQuizPassed 
  } = useLessonProgress(parseInt(courseId || '0'), parseInt(lessonId || '0'));

  useEffect(() => {
    if (isVideoWatched) {
      setVideoWatched(true);
    }
  }, [isVideoWatched]);

  const handleAuthRequired = () => {
    // Handle auth requirement if needed
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onAuthRequired={handleAuthRequired}
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p>Lesson not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];

  const handleVideoComplete = () => {
    if (!videoWatched) {
      setVideoWatched(true);
      updateVideoWatched();
    }
  };

  const handleQuizComplete = () => {
    updateQuizPassed();
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const canTakeQuiz = videoWatched || isVideoWatched;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onAuthRequired={handleAuthRequired}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/course/${courseId}`)}
            className="text-cerulean-600 hover:text-cerulean-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-cerulean-100 text-cerulean-700">
                    Lesson {lesson.id}
                  </Badge>
                  {isQuizPassed && (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl text-cactus-800">{lesson.title}</CardTitle>
              </CardHeader>
            </Card>

            {/* Video Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2 text-cerulean-600" />
                  Video Lesson
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                    <p className="text-lg font-semibold">{lesson.title}</p>
                    <p className="text-sm opacity-70">Video content would be here</p>
                    {!videoWatched && !isVideoWatched && (
                      <Button 
                        onClick={handleVideoComplete}
                        className="mt-4 bg-cerulean-600 hover:bg-cerulean-700"
                      >
                        Mark as Watched
                      </Button>
                    )}
                  </div>
                </div>
                {(videoWatched || isVideoWatched) && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Video completed</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Check</CardTitle>
              </CardHeader>
              <CardContent>
                {!canTakeQuiz ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Complete the video lesson to unlock the quiz
                    </p>
                    <Button disabled variant="outline">
                      Quiz Locked
                    </Button>
                  </div>
                ) : isQuizPassed ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Quiz Completed!</h3>
                    <p className="text-gray-600 mb-4">You've successfully completed this lesson.</p>
                    {nextLesson ? (
                      <Button 
                        onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                        className="bg-cerulean-600 hover:bg-cerulean-700"
                      >
                        Next Lesson
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => navigate(`/course/${courseId}`)}
                        className="bg-cerulean-600 hover:bg-cerulean-700"
                      >
                        Back to Course
                      </Button>
                    )}
                  </div>
                ) : !showQuiz ? (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold mb-4">Ready for the quiz?</h3>
                    <p className="text-gray-600 mb-4">
                      Test your knowledge with a 10-question quiz to complete this lesson.
                    </p>
                    <Button 
                      onClick={() => setShowQuiz(true)}
                      className="bg-cerulean-600 hover:bg-cerulean-700"
                    >
                      Start Quiz
                    </Button>
                  </div>
                ) : (
                  <QuizComponent
                    quiz={lesson.quiz}
                    onComplete={handleQuizComplete}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((courseLesson, index) => (
                    <div 
                      key={courseLesson.id}
                      className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                        courseLesson.id === lesson.id 
                          ? 'bg-cerulean-50 border border-cerulean-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => navigate(`/course/${courseId}/lesson/${courseLesson.id}`)}
                    >
                      <div className="mr-3">
                        {courseLesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          courseLesson.id === lesson.id ? 'text-cerulean-700' : 'text-gray-700'
                        }`}>
                          Lesson {index + 1}: {courseLesson.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {prevLesson && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.id}`)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous Lesson
                    </Button>
                  )}
                  {nextLesson && (
                    <Button 
                      className="w-full bg-cerulean-600 hover:bg-cerulean-700"
                      onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                      disabled={!isQuizPassed && !showQuiz}
                    >
                      Next Lesson
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LessonView;
