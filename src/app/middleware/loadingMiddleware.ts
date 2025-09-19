import {
  type Middleware,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { hideLoading, showLoading } from '@/shared/state/loading.slice';

let pendingRequests = 0;

export const loadingMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch } = store;
  console.log(action);
  // 1. ใช้ isPending เพื่อตรวจสอบ Action ที่มาจาก createAsyncThunk เท่านั้น
  if (isPending(action)) {
    if (pendingRequests === 0) {
      dispatch(showLoading());
    }
    pendingRequests++;
  }

  // 2. ใช้ isFulfilled และ isRejected เพื่อตรวจสอบตอน Thunk ทำงานเสร็จ
  if (isFulfilled(action) || isRejected(action)) {
    pendingRequests = Math.max(0, pendingRequests - 1);

    if (pendingRequests === 0) {
      dispatch(hideLoading());
    }
  }

  return next(action);
};
