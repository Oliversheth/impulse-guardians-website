
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/data/coursesData';
import QuizComponent from '@/components/QuizComponent';

interface LessonViewProps {
  course: Course;
  lessonIndex: number;
  onComplete: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

const LessonView = ({ course, lessonIndex, onComplete, onBack, isCompleted }: LessonViewProps) => {
  const [currentStep, setCurrentStep] = useState<'video' | 'quiz' | 'completed'>('video');
  const [videoCompleted, setVideoCompleted] = useState(false);

  const handleVideoComplete = () => {
    setVideoCompleted(true);
    setCurrentStep('quiz');
  };

  const handleQuizComplete = () => {
    setCurrentStep('completed');
    onComplete();
  };

  const lesson = course.topics[lessonIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-cerulean-600 hover:text-cerulean-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lesson {lessonIndex + 1}: {lesson}
          </h1>
          <p className="text-gray-600 mb-4">From {course.title}</p>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                currentStep === 'video' ? 'bg-cerulean-600 text-white' : 
                videoCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {videoCompleted ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium text-gray-700">Video</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div className={`h-full rounded transition-all duration-300 ${
                videoCompleted ? 'bg-green-500 w-full' : 'bg-cerulean-600 w-1/2'
              }`} />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                currentStep === 'quiz' ? 'bg-cerulean-600 text-white' : 
                currentStep === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep === 'completed' ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-medium text-gray-700">Quiz</span>
            </div>
          </div>
        </div>

        {currentStep === 'video' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="w-5 h-5 mr-2 text-cerulean-600" />
                Video Lesson
              </CardTitle>
              <CardDescription>
                Watch the video to learn about {lesson.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                  <p className="text-lg font-medium">Video: {lesson}</p>
                  <p className="text-sm opacity-70 mt-2">
                    This is a placeholder for the video content
                  </p>
                  <p className="text-xs opacity-50 mt-2">
                    In production, this would be replaced with actual video content
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleVideoComplete} className="bg-cerulean-600 hover:bg-cerulean-700">
                  Complete Video & Continue to Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'quiz' && (
          <QuizComponent
            lesson={lesson}
            onComplete={handleQuizComplete}
          />
        )}

        {currentStep === 'completed' && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">Lesson Completed!</h2>
                <p className="text-green-600 mb-6">
                  Great job! You've successfully completed the lesson on {lesson}.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={onBack} variant="outline">
                    Back to Course
                  </Button>
                  {lessonIndex < course.topics.length - 1 && (
                    <Button 
                      onClick={() => {
                        onBack();
                        // This would ideally navigate to the next lesson
                      }}
                      className="bg-cerulean-600 hover:bg-cerulean-700"
                    >
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonView;
