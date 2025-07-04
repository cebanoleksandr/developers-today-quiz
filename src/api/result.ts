import type { UserAnswers } from "../utils/interfaces";
import { api } from "./";

export type CreateResultDTO = {
  userId: string;
  quizId: string;
  result: UserAnswers;
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

export const fetchResult = async ({ quizId, userId }: { quizId: string, userId: string }) => {
  return await api.get(`/results/${quizId}/${userId}`);
}

export const createResult = async (createResultDTO: CreateResultDTO) => {
  return await api.post('/results', { result: createResultDTO });
}

export const deleteResult = async (id: string) => {
  return await api.delete(`/results/${id}`);
}
