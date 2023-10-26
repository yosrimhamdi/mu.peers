import { createAsyncThunk } from '@reduxjs/toolkit';

const asyncThunk = (name: string, callback: Function) => {
  return createAsyncThunk(name, async (args, thunkApi) => {
    try {
      return await callback(args, thunkApi);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  });
};

export default asyncThunk;
