import type { BooleanQuestion, CheckboxQuestion, InputQuestion } from "./interfaces";

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type User = {
  id: string;
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
