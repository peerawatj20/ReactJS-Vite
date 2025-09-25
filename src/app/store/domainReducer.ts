import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from '@/features/products/state/products.slice';

export const domainReducer = combineReducers({
  products: productsReducer,
});
