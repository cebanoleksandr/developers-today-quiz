import axios from "axios";

export const api = axios.create({
  baseURL: 'developers-today-quizz-be-ynvo-rfeqzn768.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  }
});
