import { baseApi } from '@/shared/api/baseApi';

import type { ProfileRequest, ProfileResponse } from './usersApi.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.mutation<ProfileResponse, ProfileRequest>({
      query: ({ accessToken }) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        showLoading: true,
      }),
    }),
  }),
});

export const { getMe } = userApi.endpoints;
export const { useGetMeMutation } = userApi;
