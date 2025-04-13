import { Quiz } from "../types";

export const calculateQuizScore = (
  quizData: Quiz,
  userAnswers: Record<number, string>
): { score: number; total: number } => {
  let userScore = 0;
  let totalPossibleScore = 0;

  quizData.questions.forEach((question) => {
    totalPossibleScore += question.points;
    const userAnswer = userAnswers[question.id] || "";
    let isCorrect = false;

    switch (question.type) {
      case "ABC":
        const options = JSON.parse(question.options);
        const correctOption = options[parseInt(question.correctAnswer)];
        isCorrect = userAnswer === correctOption;
        break;

      case "FILL_IN":
        isCorrect =
          userAnswer.trim().toLowerCase() ===
          question.correctAnswer.trim().toLowerCase();
        break;

      case "SLIDER":
        isCorrect = userAnswer === question.correctAnswer;
        break;
    }

    if (isCorrect) userScore += question.points;
  });

  return {
    score: userScore,
    total: totalPossibleScore,
  };
};
