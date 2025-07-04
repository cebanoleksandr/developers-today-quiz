import { api } from ".";

export const login = async (email: string, password: string) => {
  return await api.post('/auth/login', { email, password });
}

export const register = async (email: string, password: string) => {
  return await api.post('/auth/register', { email, password });
}
