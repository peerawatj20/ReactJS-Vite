import apiClient from '../api/apiClient';
import type { ProfileRequest, ProfileResponse } from './users.types';

const collectionPath = '/users';

const getMe = async (data: ProfileRequest) => {
  const response = await apiClient.get<ProfileResponse>(
    `${collectionPath}/me`,
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    },
  );
  return response.data;
};

export const usersService = {
  getMe,
};
