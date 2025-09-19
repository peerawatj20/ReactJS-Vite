import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { showNotification } from '@/shared/state/notification.slice';
import type { User } from '@/shared/types/user';

import type { LoginSchemaType } from '../schemas/login.schema';

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginSchemaType, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(
        showNotification({
          message: 'Login failed!',
          type: 'error',
        }),
      );
      return rejectWithValue(errorMessage);
    }
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
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
