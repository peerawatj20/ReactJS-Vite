import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/state/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
