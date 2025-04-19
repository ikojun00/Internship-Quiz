import React from "react";
import { Button } from "@/components/ui/button";
import { Question } from "@/types";

interface QuestionListProps {
  questions: Question[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const tryParseJson = (jsonString: string, defaultValue: any) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return defaultValue;
  }
};

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{question.type}</span>
              <span className="font-semibold">{question.points} pts</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(question.id)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(question.id)}
              >
                Delete
              </Button>
            </div>
          </div>
          <p className="text-lg font-medium mb-2">{question.text}</p>
          {question.type === "ABC" && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Options:</p>
              <div className="grid grid-cols-2 gap-2">
                {tryParseJson(question.options, []).map(
                  (option: string, index: number) => (
                    <div
                      key={index}
                      className={`p-2 rounded border ${
                        question.correctAnswer === String(index)
                          ? "border-green-500"
                          : "border-border"
                      }`}
                    >
                      {option}
                      {question.correctAnswer === String(index) && (
                        <span className="ml-2 text-green-500">✓</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {question.type !== "ABC" && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                Answer: {question.correctAnswer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
