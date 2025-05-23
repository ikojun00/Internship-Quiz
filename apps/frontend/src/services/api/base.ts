import axios from "axios";

const isDevelopment = import.meta.env.DEV;
axios.defaults.baseURL = isDevelopment ? "http://localhost:3000" : "";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiClient = axios;

export * from "./quizService";
export * from "./categoryService";
export * from "./scoreService";
export * from "./questionService";
