import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types";
import QuestionInput from "./QuestionInput";

type QuizQuestionProps = {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isPreviousDisabled: boolean;
  isSubmitButton: boolean;
  isSubmitDisabled: boolean;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  onSubmit,
  isPreviousDisabled,
  isSubmitButton,
  isSubmitDisabled,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">{question.text}</h2>
          <QuestionInput
            question={question}
            answer={answer}
            onChange={onAnswerChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
        >
          Previous
        </Button>

        {isSubmitButton ? (
          <Button onClick={onSubmit} disabled={isSubmitDisabled}>
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={onNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
