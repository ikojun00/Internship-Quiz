import React from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useQuizzes } from "@/services/hooks/useQuizzes";
import { CategoryFilter } from "@/components/user/quizzes/CategoryFilter";
import { QuizGrid } from "@/components/user/quizzes/QuizGrid";

const QuizzesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedCategoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category") as string)
    : undefined;

  const { quizzes, categories, isLoading } = useQuizzes(
    searchQuery,
    selectedCategoryId
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value ? searchParams.set("search", value) : searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    categoryId
      ? searchParams.set("category", categoryId.toString())
      : searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Available Quizzes</h1>
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleCategoryFilter}
        />
      </div>

      <QuizGrid
        quizzes={quizzes}
        isLoading={isLoading}
        searchQuery={searchQuery}
        selectedCategoryId={selectedCategoryId}
        clearFilters={() => setSearchParams({})}
      />
    </div>
  );
};

export default QuizzesPage;
