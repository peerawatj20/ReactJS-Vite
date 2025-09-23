import {
  type Action,
  type ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';

import authReducer from '@/shared/state/auth.slice';
import loadingReducer from '@/shared/state/loading.slice';
import notificationReducer from '@/shared/state/notification.slice';

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
