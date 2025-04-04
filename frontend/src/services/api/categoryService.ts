import { apiClient } from "./api";

export interface Category {
  id?: number;
  name: string;
}

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get("/api/categories");
    return response.data;
  },

  create: async (name: string) => {
    const response = await apiClient.post("/api/categories", { name });
    return response.data;
  },

  update: async (id: number, name: string) => {
    const response = await apiClient.patch(`/api/categories/${id}`, { name });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/categories/${id}`);
    return response.data;
  },
};
