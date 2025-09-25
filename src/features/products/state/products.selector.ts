import type { RootState } from '@/app/store';

export const selectProductsState = (state: RootState) =>
  state.feartures.products;

export const selectAllProducts = (state: RootState) =>
  selectProductsState(state)?.items;

export const selectProductsStatus = (state: RootState) =>
  selectProductsState(state)?.status;
