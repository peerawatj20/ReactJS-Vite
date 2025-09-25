import { baseApi } from '@/shared/api/baseApi';

import type { ProfileRequest, ProfileResponse } from './usersApi.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<ProfileResponse, ProfileRequest>({
      query: ({ accessToken }) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { getMe } = userApi.endpoints;
export const { useGetMeQuery } = userApi;
