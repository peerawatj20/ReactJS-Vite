import apiClient from '@/shared/api/apiClient';
import type { LoginRequest, LoginResponse } from '@/shared/services/auth.types';

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};

export const authService = {
  login,
};
