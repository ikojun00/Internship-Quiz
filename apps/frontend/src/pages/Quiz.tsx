import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizService, scoreService } from "@/services/api/base";
import { Quiz } from "@/types";
import { calculateQuizScore } from "@/utils/quizCalculator";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import QuizResults from "@/components/user/quiz/QuizResults";
import QuizHeader from "@/components/user/quiz/QuizHeader";
import QuizQuestion from "@/components/user/quiz/QuizQuestion";

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ score: number; total: number } | null>(
    null
  );

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      setIsLoading(true);
      try {
        const data = await quizService.getById(parseInt(quizId));

        if (data.questions.length < 5) {
          setError(
            "This quiz has fewer than 5 questions and cannot be played."
          );
          return;
        }

        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Failed to load the quiz. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    try {
      const result = calculateQuizScore(quiz, answers);
      setScore(result);
      setSubmitted(true);
      (await scoreService.getScore(quiz.id))
        ? await scoreService.updateScore(quiz.id, result.score)
        : await scoreService.createScore(quiz.id, result.score);
    } catch (error) {
      console.error("Error calculating or updating score:", error);
      setError("Failed to calculate or update your score. Please try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message={error} onBack={() => navigate("/quizzes")} />;
  if (!quiz)
    return (
      <ErrorMessage
        message="Quiz not found."
        onBack={() => navigate("/quizzes")}
      />
    );
  if (submitted && score)
    return <QuizResults score={score} onBack={() => navigate("/quizzes")} />;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isAllQuestionsAnswered =
    Object.keys(answers).length === quiz.questions.length;

  return (
    <div className="max-w-3xl mx-auto">
      <QuizHeader
        title={quiz.title}
        category={quiz.category.name}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        progress={progress}
      />

      <QuizQuestion
        question={currentQuestion}
        answer={answers[currentQuestion.id] || ""}
        onAnswerChange={(answer) =>
          handleAnswerChange(currentQuestion.id, answer)
        }
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isPreviousDisabled={currentQuestionIndex === 0}
        isSubmitButton={isLastQuestion}
        isSubmitDisabled={!isAllQuestionsAnswered}
      />
    </div>
  );
};

export default QuizPage;
