import { apiClient } from "./api";

export interface Score {
  quizId: number;
  score: number;
  userId?: number;
}

export interface UserRanking {
  rank: number;
  totalScore: number;
}

export const scoreService = {
  getScore: async (quizId: number) => {
    const response = await apiClient.get(`/api/scores/${quizId}`);
    return response.data;
  },

  updateScore: async (quizId: number, score: number) => {
    const response = await apiClient.patch(`/api/scores/${quizId}`, { score });
    return response.data;
  },

  getAllScores: async () => {
    const response = await apiClient.get("/api/scores/summary");
    return response.data;
  },

  getUserRanking: async () => {
    const response = await apiClient.get("/api/scores/my-rank");
    return response.data;
  },
};
