import { apiClient } from "./base";

export interface QuizData {
  id?: number;
  title: string;
  categoryId: number;
}

export const quizService = {
  getAll: async (search?: string, categoryId?: number) => {
    let url = "/api/quiz";
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (categoryId) params.append("category", categoryId.toString());

    const response = await apiClient.get(url, { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/api/quiz/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId: number) => {
    const response = await apiClient.get(`/api/quiz/category/${categoryId}`);
    return response.data;
  },

  create: async (quizData: QuizData) => {
    const response = await apiClient.post("/api/quiz", quizData);
    return response.data;
  },

  update: async (id: number, quizData: QuizData) => {
    const response = await apiClient.patch(`/api/quiz/${id}`, quizData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/quiz/${id}`);
    return response.data;
  },
};
