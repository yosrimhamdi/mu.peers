import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignUpType } from '@/app/page';

const INITIAL_STATE = {
  user: null,
};

export const auth = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signUp: (state, action: PayloadAction<SignUpType>) => {
      console.log(action.payload);

      return state;
    },
  },
});

export const { signUp } = auth.actions;
export default auth.reducer;
