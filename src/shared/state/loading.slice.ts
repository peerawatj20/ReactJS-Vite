import type { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  activeRequests: number;
}

const initialState: LoadingState = {
  activeRequests: 0,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.activeRequests++;
    },
    hideLoading: (state) => {
      state.activeRequests = Math.max(0, state.activeRequests - 1);
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

// สร้าง Selector สำหรับดึงค่า isLoading ไปใช้ใน Component
// Component จะเห็น isLoading เป็น true ก็ต่อเมื่อมี request ค้างอยู่ (มากกว่า 0)
export const selectIsLoading = (state: RootState) =>
  state.loading.activeRequests > 0;

export default loadingSlice.reducer;
