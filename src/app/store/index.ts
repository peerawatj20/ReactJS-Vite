import {
  type Action,
  type ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  type PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { baseApi } from '@/shared/api/baseApi';
import loadingReducer from '@/shared/state/loading.slice';
import notificationReducer from '@/shared/state/notification.slice';

import authReducer, { logout } from '@/features/auth/state/auth.slice';

import { featureReducer } from './featureReducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const appReducer = combineReducers({
  loading: loadingReducer,
  notification: notificationReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  feartures: featureReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
) as unknown as typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
