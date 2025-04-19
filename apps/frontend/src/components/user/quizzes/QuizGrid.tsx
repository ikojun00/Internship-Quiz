import React from "react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/types";
import { QuizCard } from "./QuizCard";
import LoadingSpinner from "../../LoadingSpinner";

interface QuizGridProps {
  quizzes: Quiz[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategoryId?: number;
  clearFilters: () => void;
}

export const QuizGrid: React.FC<QuizGridProps> = ({
  quizzes,
  isLoading,
  searchQuery,
  selectedCategoryId,
  clearFilters,
}) => {
  if (isLoading) <LoadingSpinner />;

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No quizzes found</p>
        {(searchQuery || selectedCategoryId) && (
          <Button variant="link" onClick={clearFilters} className="mt-2">
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};
