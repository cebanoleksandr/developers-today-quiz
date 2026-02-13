import axios from "axios";

export const api = axios.create({
  baseURL: 'https://developers-today-quizz-be-ynvo.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  }
});
