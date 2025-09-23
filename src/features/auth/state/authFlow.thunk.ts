import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { withAppHandler } from '@/shared/utils/thunk.utils';

import type { LoginSchemaType } from '../schemas/login.schema';

export const loginFlow = createAsyncThunk(
  'auth/loginFlow',
  withAppHandler('Login', async (credentials: LoginSchemaType) => {
    const loginResponse = await authService.login({
      email: credentials.email,
      password: credentials.password,
    });
    return loginResponse;
  }),
);
