import type { RootState } from '@/app/store';

export const selectIsLoggedIn = (state: RootState): boolean =>
  !!state.auth.accessToken;

export const selectCurrentUser = (state: RootState) => state.auth.user;
