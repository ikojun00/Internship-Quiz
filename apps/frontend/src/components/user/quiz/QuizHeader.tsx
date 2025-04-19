import React from "react";

type QuizHeaderProps = {
  title: string;
  category: string;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
};

const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  category,
  currentQuestion,
  totalQuestions,
  progress,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>{category}</span>
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <div className="w-full bg-accent rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizHeader;
