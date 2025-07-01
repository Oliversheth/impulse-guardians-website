
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { QuizQuestion as QuizQuestionType } from '@/data/coursesData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizProgress from './quiz/QuizProgress';

interface QuizComponentProps {
  quiz: {
    questions: QuizQuestionType[];
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
      <QuizResults
        questions={quiz.questions}
        selectedAnswers={selectedAnswers}
        score={score}
        passingScore={quiz.passingScore}
        passed={passed}
        onRetake={handleRetakeQuiz}
        onComplete={handleFinishQuiz}
      />
    );
  }

  return (
    <Card className="border-cactus-200">
      <CardHeader>
        <QuizProgress 
          currentQuestion={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
        />
      </CardHeader>
      
      <CardContent>
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
        />

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
