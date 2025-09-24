import apiClient from '../api/apiClient';
import type { ServiceMethod } from '../types/service.types';
import type { ProfileRequest, ProfileResponse } from './users.types';

const collectionPath = '/users';

interface UsersService {
  getMe: ServiceMethod<ProfileRequest, ProfileResponse>;
}

export const usersService: UsersService = {
  getMe: async (data: ProfileRequest) => {
    const response = await apiClient.get<ProfileResponse>(
      `${collectionPath}/me`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      },
    );
    return response.data;
  },
};
