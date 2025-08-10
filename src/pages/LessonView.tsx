import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Lock, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useConfetti } from '@/hooks/useConfetti';
import { ConfettiCelebration } from '@/components/ConfettiCelebration';
import { coursesData } from '@/data/coursesData';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseProgressIntegration } from '@/hooks/useCourseProgressIntegration';
import { useAuth } from '@/contexts/AuthContext';
import QuizComponent from '@/components/QuizComponent';
import YouTubePlayer from '@/components/YouTubePlayer';
import { NotesSection } from '@/components/NotesSection';
import { BookmarkButton } from '@/components/BookmarkButton';

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { isActive: confettiActive, triggerConfetti } = useConfetti();
  const [showQuiz, setShowQuiz] = useState(false);

  const course = coursesData.find(c => c.id === parseInt(courseId || '0'));
  const lesson = course?.lessons.find(l => l.id === parseInt(lessonId || '0'));
  const integratedProgress = useCourseProgressIntegration(parseInt(courseId || '0'));
  
  const { 
    progress, 
    loading, 
    updateVideoProgress,
    updateVideoWatched, 
    updateQuizPassed,
    resetLessonProgress,
    isVideoWatched, 
    isQuizPassed,
    videoProgress,
    isVideoCompleted
  } = useLessonProgress(parseInt(courseId || '0'), parseInt(lessonId || '0'));

  const currentLessonData = integratedProgress.lessons.find(l => l.id === parseInt(lessonId || '0'));

  if (!course || !lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p>Lesson not found</p>
      </div>
    );
  }

  // Check if lesson is locked
  if (currentLessonData?.locked) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Lesson Locked</h1>
          <p className="text-gray-500 mb-6">
            Complete the previous lesson to unlock this one.
          </p>
          <Button 
            onClick={() => navigate(`/course/${courseId}`)}
            className="bg-cerulean-600 hover:bg-cerulean-700"
          >
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];

  // Check if next lesson is unlocked
  const nextLessonData = nextLesson ? integratedProgress.lessons.find(l => l.id === nextLesson.id) : null;
  const isNextLessonUnlocked = nextLessonData ? !nextLessonData.locked : false;

  const handleVideoProgressUpdate = (progressPercentage: number, currentTime: number, duration: number) => {
    updateVideoProgress(progressPercentage, currentTime, duration);
  };

  const handleVideoCompleted = () => {
    updateVideoWatched();
    triggerConfetti();
    toast({
      title: "Lesson Completed! 🎉",
      description: "Great job! You've finished watching this lesson.",
    });
  };

  const handleQuizComplete = (passed: boolean, score: number) => {
    if (passed) {
      updateQuizPassed();
      triggerConfetti();
      toast({
        title: "Quiz Passed! 🎉",
        description: `Excellent work! You scored ${score}% on the quiz.`,
      });
      // Navigate to next lesson if available and unlocked, otherwise back to course
      if (nextLesson && isNextLessonUnlocked) {
        navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
      } else {
        navigate(`/course/${courseId}`);
      }
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoUrl = "https://www.youtube.com/watch?v=50GVPFj66CY";
  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lesson Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
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
                <BookmarkButton 
                  courseId={parseInt(courseId || '0')} 
                  lessonId={parseInt(lessonId || '0')}
                  type="lesson"
                />
              </div>
              <CardTitle className="text-2xl text-cactus-800">{lesson.title}</CardTitle>
            </CardHeader>
          </Card>

          {/* Video Section */}
          <Card>
            <CardHeader>
              <CardTitle>Video Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.videoUrl ? (
                lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                  <YouTubePlayer
                    videoId={getYouTubeVideoId(lesson.videoUrl)}
                    onProgressUpdate={handleVideoProgressUpdate}
                    onVideoCompleted={handleVideoCompleted}
                    initialProgress={videoProgress}
                    isCompleted={isVideoCompleted}
                  />
                ) : lesson.videoUrl.includes('docs.google.com/presentation') ? (
                  <iframe
                    src={lesson.videoUrl}
                    width="100%"
                    height="480"
                    allowFullScreen
                    frameBorder="0"
                    title="Lesson Slide"
                    style={{ borderRadius: 12, marginBottom: 24 }}
                  />
                ) : (
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-lg font-semibold">Video not available</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-lg font-semibold">Video not available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes Section */}
          <NotesSection 
            courseId={parseInt(courseId || '0')}
            lessonId={parseInt(lessonId || '0')}
            lessonTitle={lesson.title}
          />

          {/* Quiz Section */}
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              {!isVideoCompleted ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Watch at least 90% of the video to unlock the quiz
                  </p>
                  <div className="text-sm text-gray-400">
                    Current progress: {Math.round(videoProgress)}%
                  </div>
                  <Button disabled variant="outline" className="mt-4">
                    Quiz Locked
                  </Button>
                </div>
              ) : isQuizPassed ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Quiz Completed!</h3>
                  <p className="text-gray-600 mb-4">You've successfully completed this lesson with 90% or higher.</p>
                  {nextLesson ? (
                    <Button 
                      onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                      className="bg-cerulean-600 hover:bg-cerulean-700"
                      disabled={!isNextLessonUnlocked}
                    >
                      {isNextLessonUnlocked ? 'Next Lesson' : 'Complete Course to Continue'}
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
                    Test your knowledge with a quiz. You need to score 90% or higher to complete this lesson.
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
                  courseId={parseInt(courseId || '0')}
                  lessonId={parseInt(lessonId || '0')}
                  onComplete={handleQuizComplete}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lesson Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cactus-700 mb-2">What You'll Learn</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Understanding the fundamentals covered in this lesson</li>
                    <li>• Practical applications and real-world examples</li>
                    <li>• Key concepts to master before moving forward</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cactus-700 mb-2">Learning Objectives</h4>
                  <p className="text-sm text-gray-600">
                    By the end of this lesson, you'll have a solid understanding of the core concepts
                    and be ready to apply them in practical scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integratedProgress.lessons.map((courseLesson, index) => (
                  <div 
                    key={courseLesson.id}
                    className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                      courseLesson.id === lesson.id 
                        ? 'bg-cerulean-50 border border-cerulean-200' 
                        : courseLesson.locked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      if (!courseLesson.locked) {
                        navigate(`/course/${courseId}/lesson/${courseLesson.id}`)
                      }
                    }}
                  >
                    <div className="mr-3">
                      {courseLesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : courseLesson.locked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        courseLesson.id === lesson.id 
                          ? 'text-cerulean-700' 
                          : courseLesson.locked 
                          ? 'text-gray-400'
                          : 'text-gray-700'
                      }`}>
                        Lesson {index + 1}: {courseLesson.title}
                      </p>
                      {courseLesson.videoProgress > 0 && !courseLesson.completed && (
                        <p className="text-xs text-cerulean-600">
                          {courseLesson.videoProgress}% watched
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation & Reset */}
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
                    disabled={!isQuizPassed || !isNextLessonUnlocked}
                  >
                    Next Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                
                {/* Reset Lesson Progress */}
                {(videoProgress > 0 || isQuizPassed) && (
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset your progress for this lesson? This will clear your video progress and quiz completion.')) {
                        resetLessonProgress();
                        setShowQuiz(false);
                      }
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Lesson
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Confetti Celebration */}
      <ConfettiCelebration isActive={confettiActive} />
    </div>
  );
};

export default LessonView;
