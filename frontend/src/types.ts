export type User = {
  id: number;
  username: string;
  role: "USER" | "ADMIN";
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
  quizId: number;
};

export type Quiz = {
  id: number;
  title: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  questions: Question[];
  numberOfQuestions: number;
  totalPoints: number;
  userScore: {
    id: number;
    score: number;
    userId: number;
    quizId: number;
  } | null;
};
