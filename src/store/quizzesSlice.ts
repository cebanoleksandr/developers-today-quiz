import { createSlice } from '@reduxjs/toolkit';
import type { Quiz } from '../utils/interfaces';

interface QuizzesState {
  items: Quiz[];
}

const initialState: QuizzesState = {
  items: [],
};

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzesAC: (state, action: { payload: Quiz[] }) => {
      state.items = action.payload;
    },
  },
});

export const { setQuizzesAC } = quizzesSlice.actions;
export default quizzesSlice.reducer;
