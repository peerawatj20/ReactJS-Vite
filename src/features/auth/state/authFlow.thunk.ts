import i18n from '@/app/i18n';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from '@/shared/services/auth.service';
import { withAppFlowHandler } from '@/shared/utils/thunk.utils';

import type { LoginSchemaType } from '../schemas/login.schema';

export const loginFlow = createAsyncThunk(
  'auth/loginFlow',
  withAppFlowHandler(
    i18n.t('translation:features.auth.login.flowName', {
      postProcess: 'returnKey',
    }),
    async (credentials: LoginSchemaType) => {
      const loginResponse = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });
      return loginResponse;
    },
  ),
);
