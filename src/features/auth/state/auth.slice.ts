import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { pushNotification } from '@/shared/state/notification.slice';
import type { User } from '@/shared/types/user.types';
import { getErrorMessage } from '@/shared/utils/error.utils';
import { withLoadingHandler } from '@/shared/utils/loading.utils';

import type { LoginSchemaType } from '../schemas/login.schema';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  withLoadingHandler(
    async (credentials: LoginSchemaType, { dispatch, rejectWithValue }) => {
      try {
        const data = await authService.login({
          email: credentials.email,
          password: credentials.password,
        });

        return data;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        dispatch(
          pushNotification({
            message: errorMessage,
            type: 'error',
          }),
        );
        return rejectWithValue(errorMessage);
      }
    },
  ),
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
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
