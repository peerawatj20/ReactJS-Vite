import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import type { User } from '@/shared/types/user';

import type { LoginSchemaType } from '../schemas/login.schema';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginSchemaType) => {
    const data = await authService.login({
      email: credentials.email,
      password: credentials.password,
    });
    return data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducers ปกติ (Sync) สำหรับจัดการ State โดยตรง
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  // 3. extraReducers สำหรับจัดการ State ที่มาจาก Thunk (Async)
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
