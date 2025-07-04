import type { Question } from "./types";

export interface BaseQuestion {
  id: string;
  text: string;
  order: number;
}

export interface BooleanQuestion extends BaseQuestion {
  type: 'BOOLEAN';
  correctAnswer: boolean;
}

export interface InputQuestion extends BaseQuestion {
  type: 'INPUT';
  correctAnswer: string;
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'CHECKBOX';
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerIds: string[];
}

export interface Quiz {
  _id: string;
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface UserAnswers {
  [questionId: string]: boolean | string | string[];
}

export interface UserQuizResults {
  _id: string;
  id: string;
  userId: string;
  quizId: string;
  result: UserAnswers;
}
