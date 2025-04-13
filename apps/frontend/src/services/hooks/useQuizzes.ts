import { useState, useEffect } from "react";
import { quizService, categoryService, scoreService } from "@/services/api/api";
import { useAuth } from "@/contexts/AuthContext";
import { Category, Quiz } from "@/types";

export const useQuizzes = (
  searchQuery: string,
  selectedCategoryId?: number
) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [quizzesData, categoriesData] = await Promise.all([
          quizService.getAll(searchQuery, selectedCategoryId),
          categoryService.getAll(),
        ]);

        const filteredQuizzes = quizzesData.filter(
          (quiz: Quiz) => quiz.numberOfQuestions >= 5
        );

        let userScores = [];
        if (user?.id) {
          userScores = await Promise.all(
            filteredQuizzes.map((quiz: Quiz) =>
              scoreService.getScore(quiz.id).catch(() => null)
            )
          );
        }

        const quizzesWithScores = filteredQuizzes.map(
          (quiz: Quiz, index: number) => ({
            ...quiz,
            userScore: userScores[index],
          })
        );

        setQuizzes(quizzesWithScores);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, selectedCategoryId, user?.id]);

  return {
    quizzes,
    categories,
    isLoading,
  };
};
