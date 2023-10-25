import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_STATE = {
  user: null,
};

export const signUp = createAsyncThunk('auth/signup', async formValues => {
  await axios.post('/api/register', formValues);
});

export const auth = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUp.fulfilled, () => {
      console.log('redirect to login');
    });
  },
});

export default auth.reducer;
