import React from "react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/types";

interface QuizTableProps {
  quizzes: Quiz[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuizTable: React.FC<QuizTableProps> = ({ quizzes, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Questions</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="border-b">
              <td className="py-3 px-4">{quiz.id}</td>
              <td className="py-3 px-4">{quiz.title}</td>
              <td className="py-3 px-4">{quiz.category.name}</td>
              <td className="py-3 px-4">{quiz.numberOfQuestions}</td>
              <td className="py-3 px-4 text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(quiz.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(quiz.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
