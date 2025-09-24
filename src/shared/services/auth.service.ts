import apiClient from '@/shared/api/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from '@/shared/services/auth.types';

const collectionPath = '/auth';

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      `${collectionPath}/login`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};

const refresh = async (data: RefreshRequest): Promise<RefreshResponse> => {
  try {
    const response = await apiClient.post<RefreshResponse>(
      `${collectionPath}/refresh`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching refresh:', error);
    throw error;
  }
};

export const authService = {
  login,
  refresh,
};
