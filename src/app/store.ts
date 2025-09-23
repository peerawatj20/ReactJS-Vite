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

import authReducer, { logout } from '@/shared/state/auth.slice';
import loadingReducer from '@/shared/state/loading.slice';
import notificationReducer from '@/shared/state/notification.slice';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const appReducer = combineReducers({
  loading: loadingReducer,
  notification: notificationReducer,
  auth: authReducer,
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
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
