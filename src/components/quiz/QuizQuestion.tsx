
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizQuestion as QuizQuestionType } from '@/data/coursesData';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | undefined;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
}

const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect, questionNumber }: QuizQuestionProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-cactus-800 mb-4">
        Question {questionNumber}: {question.question}
      </h3>
      
      <RadioGroup 
        value={selectedAnswer?.toString() || ""} 
        onValueChange={(value) => onAnswerSelect(parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
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
  );
};

export default QuizQuestion;
