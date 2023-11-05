import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@prisma/client';

import { SignUpType } from '@/app/page';
import { SignInType } from '@/app/login/page';
import thunk from '../createAsyncThunk';
import { PersonalInfo } from '@/app/user-profile/page';
import { ResetPassword } from '@/app/reset-password/page';

const INITIAL_STATE: {
  user: User | null;
  loading: boolean;
  loadingAuto: boolean;
} = {
  user: null,
  loading: false,
  loadingAuto: false,
};

export const logout = thunk('auth/logout', async () => {
  return await axios.get('/api/auth/logout');
});

export const updatePersonalInfo = thunk(
  'auth/update-personal-info',
  async (formValues: PersonalInfo) => {
    return await axios.post('/api/auth/me', formValues);
  }
);

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

export const fetchAuthUser = thunk('auth/autoSignIn', async () => {
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

    [signIn, updatePersonalInfo].map(thunk => {
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

    builder
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(fetchAuthUser.pending, state => {
        state.loadingAuto = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loadingAuto = false;
        state.user = action.payload.data.user;
      })
      .addCase(fetchAuthUser.rejected, state => {
        state.loadingAuto = false;
      });
  },
});

export default auth.reducer;
