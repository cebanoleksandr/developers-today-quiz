import { configureStore } from "@reduxjs/toolkit";
import alertSlice from './alertSlice';
import userSlice from './userSlice';
import quizzesSlice from './quizzesSlice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    user: userSlice,
    quizzes: quizzesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;