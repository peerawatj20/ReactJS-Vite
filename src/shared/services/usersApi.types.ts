import type { User } from '../types/user.types';

export interface ProfileRequest {
  accessToken: string;
}

export type ProfileResponse = User;
