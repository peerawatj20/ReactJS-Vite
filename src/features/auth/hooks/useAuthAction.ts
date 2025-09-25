import { useAppDispatch } from '@/app/hooks';

import type { LoginSchemaType } from '../schemas/login.schema';
import { login, logout } from '../state/auth.slice';

export const useAuthAction = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials: LoginSchemaType) => {
    await dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    handleLogin,
    handleLogout,
  };
};
