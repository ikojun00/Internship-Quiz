export type QuizInQuizzes = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  numberOfQuestions: number;
  totalPoints: number;
  userScore?: {
    id: number;
    score: number;
    userId: number;
    quizId: number;
  } | null;
};

export type Category = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  text: string;
  type: "ABC" | "FILL_IN" | "SLIDER";
  options: string;
  correctAnswer: string;
  points: number;
};

export type Quiz = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  questions: Question[];
};
