import i18n from '@/app/i18n';
import type { AppDispatch, RootState } from '@/app/store';
import { config } from '@/config/app.config';
import axios, { AxiosError } from 'axios';

import { refreshAccessToken } from '@/features/auth/state/auth.slice';

import { logout } from '../../features/auth/state/auth.slice';
import { ApiErrorCode } from '../constants/api.constants';
import type { ApiError } from '../types/error.types';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

type AppStore = {
  dispatch: AppDispatch;
  getState: () => RootState;
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleTokenRefresh = async (store: AppStore): Promise<string | null> => {
  try {
    const resultAction = await store.dispatch(refreshAccessToken());

    if (refreshAccessToken.fulfilled.match(resultAction)) {
      const accessToken = resultAction.payload;
      processQueue(null, accessToken);
      return accessToken;
    }
    throw new Error('Failed to refresh token');
  } catch (error) {
    processQueue(error as Error, null);
    store.dispatch(logout());
    return Promise.reject(error as Error);
  } finally {
    isRefreshing = false;
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

      if (!originalRequest) return Promise.reject(error);

      const { data, status } = error.response || {};

      // Unauthorized
      if (
        error.response?.status === 401 &&
        error.response.data.code === ApiErrorCode.TOKEN_EXPIRED
      ) {
        // --- ส่วนจัดการคิว ---
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err as Error);
            });
        }

        isRefreshing = true;

        const newAccessToken = await handleTokenRefresh(store);
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      }

      if (axios.isAxiosError(error)) {
        switch (status) {
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
