import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { User } from '../schemas/user';
import { BaseResponse } from '@/types/base-response';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: constants.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => 'users/me',
      transformResponse: (response: BaseResponse<User>) => response.data,
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
      transformResponse: (response: BaseResponse<User>) => response.data,
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetUserByIdQuery } =
  authApi;
