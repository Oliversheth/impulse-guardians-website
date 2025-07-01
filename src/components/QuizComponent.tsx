
import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/data/coursesData';

interface QuizComponentProps {
  quiz: {
    questions: QuizQuestion[];
    passingScore: number;
  };
  onComplete: (passed: boolean, score: number) => void;
}

const QuizComponent = ({ quiz, onComplete }: QuizComponentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const handleFinishQuiz = () => {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;
    onComplete(passed, score);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;

    return (
      <Card className={`border-2 ${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${passed ? 'text-green-800' : 'text-red-800'}`}>
            {passed ? <CheckCircle className="h-6 w-6 mr-2" /> : <XCircle className="h-6 w-6 mr-2" />}
            Quiz {passed ? 'Passed!' : 'Not Passed'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className={`text-lg ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed 
                ? `Congratulations! You passed with ${score}%.`
                : `You need ${quiz.passingScore}% to pass. You scored ${score}%.`
              }
            </p>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-800">Review Your Answers:</h3>
            {quiz.questions.map((question, index) => {
              const selectedAnswer = selectedAnswers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800">
                      Question {index + 1}: {question.question}
                    </h4>
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className={`p-2 rounded ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      <strong>Your answer:</strong> {question.options[selectedAnswer]}
                    </div>
                    
                    {!isCorrect && (
                      <div className="p-2 rounded bg-green-100">
                        <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                      </div>
                    )}
                    
                    {question.explanation && (
                      <div className="p-2 rounded bg-blue-50">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex space-x-4">
            {passed ? (
              <Button 
                onClick={handleFinishQuiz}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Complete Lesson
              </Button>
            ) : (
              <Button 
                onClick={handleRetakeQuiz}
                className="flex-1 bg-cerulean-600 hover:bg-cerulean-700 text-white"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cactus-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cactus-800">Lesson Quiz</CardTitle>
          <span className="text-sm text-cactus-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-cactus-800 mb-4">
            {currentQuestion.question}
          </h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion.id]?.toString() || ""} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className="bg-cerulean-600 hover:bg-cerulean-700 text-white"
            >
              {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Passing Score:</strong> {quiz.passingScore}% · You can retake this quiz if needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
