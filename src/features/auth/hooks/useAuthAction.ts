import { useAppDispatch } from '@/app/hooks';

import { useLoginMutation } from '@/shared/services/authApi.slice';
import { useGetMeMutation } from '@/shared/services/usersApi.slice';
import { hideLoading, showLoading } from '@/shared/state/loading.slice';
import { executeApiRequest } from '@/shared/utils/api.utils';

import type { LoginSchemaType } from '../schemas/login.schema';
import { clearAuth, logout, setAuth } from '../state/auth.slice';

export const useAuthAction = () => {
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const [getMe] = useGetMeMutation();

  const handleLogin = async (credentials: LoginSchemaType) => {
    executeApiRequest({
      action: async () => {
        dispatch(showLoading());
        const { accessToken, refreshToken } = await login({
          email: credentials.email,
          password: credentials.password,
        }).unwrap();

        const user = await getMe({ accessToken }).unwrap();
        dispatch(hideLoading());
        return { user, accessToken, refreshToken };
      },
      onSuccess: (result) => {
        dispatch(setAuth(result));
      },
      onError: () => {
        dispatch(hideLoading());
        dispatch(clearAuth());
      },
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    handleLogin,
    handleLogout,
  };
};
