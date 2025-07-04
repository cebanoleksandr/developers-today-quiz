import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../utils/types';

interface UserState {
  item: User | null;
}

const initialState: UserState = {
  item: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAC: (state, action: { payload: User }) => {
      state.item = action.payload;
    },
  },
});

export const { setUserAC } = userSlice.actions;
export default userSlice.reducer;
