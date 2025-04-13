import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type QuizResultsProps = {
  score: { score: number; total: number };
  onBack: () => void;
};

const QuizResults: React.FC<QuizResultsProps> = ({ score, onBack }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">
          You scored {score.score} out of {score.total}!
        </h2>
        <p className="text-lg mb-6">
          {score.score === score.total
            ? "Perfect score! Excellent work!"
            : score.score > score.total / 2
            ? "Good job! You did well."
            : "Keep practicing. You can do better next time!"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onBack}>Back to Quizzes</Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
