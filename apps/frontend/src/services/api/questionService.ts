import axios from "axios";
import { Question } from "@/types";

const BASE_URL = "/api/questions";

export const questionService = {
  getById: async (id: number): Promise<Question> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (question: Question): Promise<Question> => {
    const response = await axios.post(BASE_URL, question);
    return response.data;
  },

  update: async (id: number, question: Question): Promise<Question> => {
    const response = await axios.patch(`${BASE_URL}/${id}`, question);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
