import {
  type Action,
  type ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';

import loadingReducer from '@/shared/state/loading.slice';
import notificationReducer from '@/shared/state/notification.slice';

import authReducer from '../features/auth/state/auth.slice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    notification: notificationReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
