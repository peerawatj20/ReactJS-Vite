import { useCallback } from 'react';

import { useAppDispatch } from '@/app/hooks';

import type { LoginSchemaType } from '../schemas/login.schema';
import { login, logout } from '../state/auth.slice';

export const useAuthAction = () => {
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (credentials: LoginSchemaType) => {
      await dispatch(login(credentials));
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    handleLogin,
    handleLogout,
  };
};
