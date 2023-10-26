import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SignUpType } from '@/app/page';
import thunk from '../createAsyncThunk';

const INITIAL_STATE = {
  user: null,
  loading: false,
};

export const signUp = thunk('auth/signup', async (formValues: SignUpType) => {
  await axios.post('/api/register', formValues);
});

export const auth = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(signUp.rejected, state => {
        state.loading = false;
      });
  },
});

export default auth.reducer;
