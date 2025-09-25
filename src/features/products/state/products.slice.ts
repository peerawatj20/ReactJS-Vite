import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { productsApi } from '@/shared/services/productsApi.slice';
import type { Product } from '@/shared/types/products.types';

// 1. กำหนดหน้าตาของ State
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 2. กำหนดค่าเริ่มต้นของ State
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // ใช้ RTK Query endpoint เพื่อดึงข้อมูล
      const result = await dispatch(
        productsApi.endpoints.getProductById.initiate(1),
      ).unwrap();
      return [result];
    } catch (error: any) {
      return rejectWithValue(error.data?.message || 'Failed to fetch products');
    }
  },
);

// 4. สร้าง Slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // สามารถเพิ่ม reducers ปกติได้ที่นี่ เช่น clearProducts
    clearProducts: (state) => {
      state.items = [];
    },
  },
  // 5. จัดการ State จาก Thunk ด้วย extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Something went wrong';
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
