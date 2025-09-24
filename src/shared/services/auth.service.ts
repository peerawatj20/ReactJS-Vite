import apiClient from '@/shared/api/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from '@/shared/services/auth.types';

import type { ServiceMethod } from '../types/service.types';

const collectionPath = '/auth';

interface AuthService {
  login: ServiceMethod<LoginRequest, LoginResponse>;
  refresh: ServiceMethod<RefreshRequest, RefreshResponse>;
}

export const authService: AuthService = {
  login: async (data) => {
    const response = await apiClient.post<LoginResponse>(
      `${collectionPath}/login`,
      data,
    );
    return response.data;
  },
  refresh: async (data) => {
    const response = await apiClient.post<RefreshResponse>(
      `${collectionPath}/refresh`,
      data,
    );
    return response.data;
  },
};
