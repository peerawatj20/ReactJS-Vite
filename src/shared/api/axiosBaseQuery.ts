import i18n from '@/app/i18n';
import type { RootState } from '@/app/store';
import { config } from '@/config/app.config';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

import { logout, refreshAccessToken } from '@/features/auth/state/auth.slice';

import { ApiErrorCode } from '../constants/api.constants';
import type { ApiError } from '../types/error.types';

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token),
  );
  failedQueue = [];
};

interface CustomArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  showLoading?: boolean;
}

export const axiosBaseQuery: BaseQueryFn<CustomArgs, unknown, {}> = async (
  args,
  thunkAPI,
) => {
  const { url, method = 'get', body, params, headers: baseHeaders } = args;
  const { getState, dispatch } = thunkAPI;

  // 1. ดึง Token จาก State
  const { accessToken } = (getState() as RootState).auth;
  const headers: AxiosRequestConfig['headers'] = { ...baseHeaders };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    // 2. ยิง API ครั้งแรก
    const result = await axiosInstance({
      url,
      method,
      data: body,
      params,
      headers,
    });
    return { data: result.data };
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    const originalRequest = error.config;

    // --- ส่วนจัดการ Refresh Token และคิว ---
    if (
      error.response?.status === 401 &&
      error.response.data.code === ApiErrorCode.TOKEN_EXPIRED &&
      originalRequest
    ) {
      if (isRefreshing) {
        // ถ้ากำลัง Refresh อยู่ ให้ไปต่อคิว
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(async (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            const result = await axiosInstance(originalRequest);
            return { data: result.data };
          })
          .catch((promiseError) => {
            return {
              error: { status: 'CUSTOM_ERROR', error: promiseError.message },
            };
          });
      }

      isRefreshing = true;

      try {
        const refreshResult = await dispatch(refreshAccessToken());

        if (refreshAccessToken.fulfilled.match(refreshResult)) {
          const newAccessToken = refreshResult.payload;
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          const result = await axiosInstance(originalRequest);
          return { data: result.data };
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        dispatch(logout());
        return {
          error: {
            status: 'CUSTOM_ERROR',
            error: (refreshError as Error).message,
          },
        };
      } finally {
        isRefreshing = false;
      }
    }

    // --- ส่วนจัดการ Error อื่นๆ ---
    let errorMessage =
      error.response?.data.message || i18n.t('common:error.api.unknown');
    switch (error.response?.status) {
      case 403:
        errorMessage = i18n.t('common:error.api.forbidden');
        break;
      case 404:
        errorMessage = i18n.t('common:error.api.not_found');
        break;
      case 500:
        errorMessage = i18n.t('common:error.api.server_error');
        break;
    }

    return {
      error: {
        status: error.response?.status,
        data: { message: errorMessage, code: error.response?.data.code },
      },
    };
  }
};
