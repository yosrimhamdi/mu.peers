import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { SignUpType } from '@/app/page';
import { SignInType } from '@/app/login/page';
import thunk from '../createAsyncThunk';

const INITIAL_STATE = {
  user: null,
  loading: false,
};

interface ResetPassword {
  password: string;
  passwordConfirm: string;
  userId: string;
  token: string;
}

export const resetPassword = thunk(
  'auth/reset-password',
  async (formValues: ResetPassword) => {
    return await axios.post('/api/auth/reset-password', formValues);
  }
);

export const forgotPassword = thunk(
  'auth/forgot-password',
  async (formValues: { email: string }) => {
    return await axios.post('/api/auth/forgot-password', formValues);
  }
);

export const autoSignIn = thunk('auth/autoSignIn', async () => {
  return await axios.get('/api/auth/me');
});

export const signIn = thunk('auth/signIn', async (formValues: SignInType) => {
  return await axios.post('/api/auth/login', formValues);
});

export const signUp = thunk('auth/signUp', async (formValues: SignUpType) => {
  return await axios.post('/api/auth/register', formValues);
});

export const auth = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(builder) {
    [signUp, forgotPassword, resetPassword].map(thunk => {
      builder
        .addCase(thunk.pending, state => {
          state.loading = true;
        })
        .addCase(thunk.fulfilled, state => {
          state.loading = false;
        })
        .addCase(thunk.rejected, state => {
          state.loading = false;
        });
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
