import type { RootState } from '@/app/store';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsLoggedIn = (state: RootState): boolean =>
  !!selectAuthState(state).accessToken;

export const selectCurrentUser = (state: RootState) =>
  selectAuthState(state).user;
