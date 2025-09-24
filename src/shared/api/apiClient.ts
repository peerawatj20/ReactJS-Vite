import i18n from '@/app/i18n';
import type { AppDispatch, RootState } from '@/app/store';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { refreshAccessToken } from '@/features/auth/state/authFlow.thunk';

import { ApiErrorCode } from '../constants/api.constants';
import { logout } from '../state/auth.slice';
import type { ApiError } from '../types/error.types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

type AppStore = {
  dispatch: AppDispatch;
  getState: () => RootState;
};

const handleTokenRefresh = async (
  store: AppStore,
  originalRequest: InternalAxiosRequestConfig,
) => {
  originalRequest._retry = true;

  try {
    await store.dispatch(refreshAccessToken());
    return apiClient(originalRequest);
  } catch (refreshError) {
    store.dispatch(logout());
    return Promise.reject(refreshError as Error);
  }
};
export const setupAxiosInterceptors = (store: AppStore) => {
  // ✅ Interceptor ฝั่ง Request: มีหน้าที่ "เตรียม" คำขอก่อนส่ง
  apiClient.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().auth;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      // จัดการ Error ที่เกิด "ก่อน" การส่ง Request เช่น Network Error
      console.error('Request Error:', error);
      return Promise.reject(error);
    },
  );

  // ✅ Interceptor ฝั่ง Response: มีหน้าที่ "จัดการ" ผลลัพธ์ที่ได้รับกลับมา
  apiClient.interceptors.response.use(
    (response) => {
      // ทางสำเร็จ: ถ้า server ตอบกลับด้วย status 2xx ให้ส่งข้อมูลกลับไปตามปกติ
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config;
      const { data, status } = error.response || {};

      // Unauthorized
      if (
        status === 401 &&
        data?.code === ApiErrorCode.TOKEN_EXPIRED &&
        originalRequest &&
        !originalRequest._retry
      ) {
        return handleTokenRefresh(store, originalRequest);
      }
      if (axios.isAxiosError(error)) {
        switch (status) {
          case 401:

          case 403: // Forbidden
            error.message = i18n.t('common:error.api.forbidden');
            break;

          case 404: // Not Found
            error.message = i18n.t('common:error.api.not_found');
            break;

          case 500: // Internal Server Error
            error.message = i18n.t('common:error.api.server_error');
            break;

          default:
            error.message = data?.message || i18n.t('common:error.api.unknown');
            break;
        }
      } else {
        console.error('An unexpected error occurred:', error);
      }

      return Promise.reject(error);
    },
  );
};
export default apiClient;
