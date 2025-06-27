
import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizComponentProps {
  lesson: string;
  onComplete: () => void;
}

const QuizComponent = ({ lesson, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Sample quiz questions - in production, these would come from your database
  const questions = [
    {
      question: `What is the main concept of ${lesson}?`,
      options: [
        'Managing your money effectively',
        'Spending without limits',
        'Avoiding all financial planning',
        'Only saving money'
      ],
      correct: 0
    },
    {
      question: `Which is the best practice for ${lesson.toLowerCase()}?`,
      options: [
        'Ignoring your expenses',
        'Creating a detailed plan',
        'Only thinking about today',
        'Avoiding all financial tools'
      ],
      correct: 1
    },
    {
      question: `What should you prioritize when learning about ${lesson.toLowerCase()}?`,
      options: [
        'Quick fixes only',
        'Understanding the fundamentals',
        'Avoiding all planning',
        'Following trends blindly'
      ],
      correct: 1
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (parseInt(selectedAnswer) === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const passingScore = Math.ceil(questions.length * 0.7); // 70% to pass

  if (showResult) {
    const passed = score >= passingScore;
    
    return (
      <Card className={`${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${passed ? 'text-green-800' : 'text-red-800'}`}>
            {passed ? <CheckCircle className="w-6 h-6 mr-2" /> : <XCircle className="w-6 h-6 mr-2" />}
            Quiz {passed ? 'Completed!' : 'Failed'}
          </CardTitle>
          <CardDescription className={passed ? 'text-green-600' : 'text-red-600'}>
            You scored {score} out of {questions.length} questions correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {Math.round((score / questions.length) * 100)}%
            </div>
            <p className={passed ? 'text-green-700' : 'text-red-700'}>
              {passed 
                ? 'Congratulations! You have successfully completed this lesson.'
                : `You need ${passingScore} correct answers to pass. Please review the material and try again.`
              }
            </p>
            <div className="flex justify-center space-x-4">
              {!passed && (
                <Button onClick={handleRetakeQuiz} variant="outline">
                  Retake Quiz
                </Button>
              )}
              {passed && (
                <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                  Complete Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz: {lesson}</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {questions.length}
        </CardDescription>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-cerulean-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="bg-cerulean-600 hover:bg-cerulean-700"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizComponent;
