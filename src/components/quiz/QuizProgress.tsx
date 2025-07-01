
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-cactus-800">Lesson Quiz</h2>
        <span className="text-sm text-cactus-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>
      <div className="w-48">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default QuizProgress;
