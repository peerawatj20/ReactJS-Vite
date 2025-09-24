import i18n from '@/app/i18n';
import type { RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { usersService } from '@/shared/services/users.service';
import { withAppFlowHandler } from '@/shared/utils/thunk.utils';

import type { LoginSchemaType } from '../schemas/login.schema';

export const loginFlow = createAsyncThunk(
  'auth/loginFlow',
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
