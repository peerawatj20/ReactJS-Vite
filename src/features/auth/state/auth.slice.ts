import type { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authApi } from '@/shared/services/authApi.slice';

import type { User } from '../../../shared/types/user.types';

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
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { logout, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
