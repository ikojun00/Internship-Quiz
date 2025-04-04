import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Quiz } from "@/types";

interface QuizSelectorProps {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
  onChange: (quiz: Quiz) => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({
  quizzes,
  selectedQuiz,
  onChange,
}) => {
  const handleSelectQuiz = (quizId: string) => {
    const selected = quizzes.find((q) => q.id === parseInt(quizId));
    if (selected) onChange(selected);
  };

  return (
    <Select
      value={selectedQuiz?.id?.toString()}
      onValueChange={handleSelectQuiz}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a quiz" />
      </SelectTrigger>
      <SelectContent>
        {quizzes.map((quiz) => (
          <SelectItem key={quiz.id} value={quiz.id?.toString() || ""}>
            {quiz.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuizSelector;
