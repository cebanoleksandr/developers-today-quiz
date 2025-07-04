import type { Question } from "../utils/types";
import { api } from "./";

export type CreateQuizDTO = {
  title: string;
  questions: Question[];
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchQuizzes = async () => {
  return await api.get('/quizzes');
}

export const getQuizById = async (id: string) => {
  return await api.get(`/quizzes/${id}`);
}

export const createQuiz = async (createQuizDTO: CreateQuizDTO) => {
  return await api.post('/quizzes', { quiz: createQuizDTO });
}

export const deleteQuiz = async (id: string) => {
  return await api.delete(`/quizzes/${id}`);
}
