
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion } from '@/data/coursesData';

interface QuizResultsProps {
  questions: QuizQuestion[];
  selectedAnswers: { [key: number]: number };
  score: number;
  passingScore: number;
  passed: boolean;
  onRetake: () => void;
  onComplete: () => void;
}

const QuizResults = ({ 
  questions, 
  selectedAnswers, 
  score, 
  passingScore, 
  passed, 
  onRetake, 
  onComplete 
}: QuizResultsProps) => {
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
              : `You need ${passingScore}% to pass. You scored ${score}%.`
            }
          </p>
        </div>

        {/* Question Review */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-800">Review Your Answers:</h3>
          {questions.map((question, index) => {
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
              onClick={onComplete}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Complete Lesson
            </Button>
          ) : (
            <Button 
              onClick={onRetake}
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
};

export default QuizResults;
