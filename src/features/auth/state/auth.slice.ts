import type { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authApi } from '@/shared/services/authApi.slice';
import { userApi } from '@/shared/services/usersApi.slice';
import { getFlowName, withAppFlowHandler } from '@/shared/utils/flow.utils';

import type { User } from '../../../shared/types/user.types';
import type { LoginSchemaType } from '../schemas/login.schema';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const login = createAsyncThunk(
  'auth/login',
  withAppFlowHandler(
    getFlowName('auth', 'login', 'loginFlow'),
    async (credentials: LoginSchemaType, { dispatch }) => {
      const { accessToken, refreshToken } = await dispatch(
        authApi.endpoints.login.initiate({
          email: credentials.email,
          password: credentials.password,
        }),
      ).unwrap();

      const user = await dispatch(
        userApi.endpoints.getMe.initiate({ accessToken }),
      ).unwrap();

      return { user, accessToken, refreshToken };
    },
  ),
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState() as RootState;
      const { refreshToken } = auth;
      if (refreshToken) {
        const response = await dispatch(
          authApi.endpoints.refresh.initiate({ refreshToken }),
        ).unwrap();
        return response.accessToken;
      }
      throw new Error('Failed to refresh token');
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
