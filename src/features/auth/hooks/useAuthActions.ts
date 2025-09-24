import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/hooks';

import type { LoginSchemaType } from '../schemas/login.schema';
import { login, logout } from '../state/auth.slice';

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (credentials: LoginSchemaType) => {
      await dispatch(login(credentials)).unwrap();
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return {
    handleLogin,
    handleLogout,
  };
};
