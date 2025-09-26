import { baseApi } from '@/shared/api/baseApi';

// 👈 Import baseApi ที่เราสร้างไว้
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from './authApi.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        showLoading: true,
      }),
    }),

    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;
