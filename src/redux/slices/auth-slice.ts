import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SignUpType } from '@/app/page';
import { SignInType } from '@/app/login/page';
import thunk from '../createAsyncThunk';

const INITIAL_STATE = {
  user: null,
  loading: true,
};

export const autoSignIn = thunk('auth/autoSignIn', async () => {
  return await axios.get('/api/auth/me');
});

export const signIn = thunk('auth/signIn', async (formValues: SignInType) => {
  return await axios.post('/api/auth/login', formValues);
});

export const signUp = thunk('auth/signUp', async (formValues: SignUpType) => {
  await axios.post('/api/auth/register', formValues);
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

    [signIn, autoSignIn].map(thunk => {
      builder
        .addCase(thunk.pending, state => {
          state.loading = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.data.user;
        })
        .addCase(thunk.rejected, state => {
          state.loading = false;
        });
    });
  },
});

export default auth.reducer;
