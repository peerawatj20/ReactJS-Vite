import i18n from '@/app/i18n';
import type { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { usersService } from '@/shared/services/users.service';
import { withAppFlowHandler } from '@/shared/utils/thunk.utils';

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
    i18n.t('translation:features.auth.login.flowName', {
      postProcess: 'returnKey',
    }),
    async (credentials: LoginSchemaType) => {
      const { accessToken, refreshToken } = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      const user = await usersService.getMe({ accessToken });

      return { user, accessToken, refreshToken };
    },
  ),
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const { refreshToken } = auth;
      if (refreshToken) {
        const response = await authService.refresh({ refreshToken });
        return response.accessToken;
      }
      throw new Error('Refresh token not found');
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
