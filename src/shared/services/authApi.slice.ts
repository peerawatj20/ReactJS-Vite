import { baseApi } from '@/shared/api/baseApi';

// 👈 Import baseApi ที่เราสร้างไว้
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from './authApi.types';

// "ฉีด" endpoint ของ auth เข้าไปใน baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. เปลี่ยนฟังก์ชัน login มาเป็น `builder.mutation`
    login: builder.mutation<LoginResponse, LoginRequest>({
      // `query` จะ return object ที่บอกว่าจะยิง API อย่างไร
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // 2. เปลี่ยนฟังก์ชัน refresh มาเป็น `builder.mutation`
    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// 3. Export hook ที่ RTK Query สร้างให้โดยอัตโนมัติ
export const { useLoginMutation, useRefreshMutation } = authApi;
