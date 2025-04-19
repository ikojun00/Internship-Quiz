import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/types";
import { RetryQuizDialog } from "./RetryQuizDialog";
import Knowledge from "@/assets/knowledge.svg?react";
import Science from "@/assets/science.svg?react";
import Student from "@/assets/student.svg?react";

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStartQuiz = () =>
    quiz.userScore ? setIsDialogOpen(true) : navigate(`/quizzes/${quiz.id}`);

  const handleConfirmRetry = () => {
    setIsDialogOpen(false);
    navigate(`/quizzes/${quiz.id}`);
  };

  const getCategoryIcon = () => {
    switch (quiz.category.name) {
      case "Science":
        return <Science className="w-1/2 h-1/2" />;
      case "General Knowledge":
        return <Knowledge className="w-1/2 h-1/2" />;
      default:
        return <Student className="w-1/2 h-1/2" />;
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 relative">
        <div className="bg-secondary h-40 flex items-center justify-center">
          {getCategoryIcon()}
        </div>
        {quiz.userScore && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            Done - Score: {quiz.userScore.score}/{quiz.totalPoints}
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{quiz.category.name}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {quiz.numberOfQuestions} Questions
          </p>
          <Button className="w-full" onClick={handleStartQuiz}>
            {quiz.userScore ? "Try Again" : "Start Quiz"}
          </Button>
        </CardContent>
      </Card>

      <RetryQuizDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmRetry}
      />
    </>
  );
};
