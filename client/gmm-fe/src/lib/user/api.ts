import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import {
  ExpectedWorldlyLifestyle,
  WorldlyLifestyle,
} from '../schemas/worldly-lifestyle';
import { BaseResponse } from '@/types/base-response';
import {
  UpdateWorldlyLifestyle,
  UpdateExpectedWorldlyLifestyle,
} from './types';
import { User } from '../schemas/user';

export const userApi = createApi({
  reducerPath: 'userApi',

  tagTypes: ['WorldlyLifestyle', 'ExpectedWorldlyLifestyle', 'User'],

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
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      transformResponse: (response: BaseResponse<User>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'User', id: arg.id }];
      },
    }),

    getWorldlyLifestyle: builder.query<WorldlyLifestyle, string>({
      query: (id) => `users/${id}/worldy-lifestyle`,
      transformResponse: (response: BaseResponse<WorldlyLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'WorldlyLifestyle', id: arg }];
      },
    }),

    updateWorldlyLifestyle: builder.mutation<
      WorldlyLifestyle,
      UpdateWorldlyLifestyle
    >({
      query: ({ userId, worldlyLifestyle }) => ({
        url: `users/${userId}/worldy-lifestyle`,
        method: 'PUT',
        body: worldlyLifestyle,
      }),
      transformResponse: (response: BaseResponse<WorldlyLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'WorldlyLifestyle', id: arg.userId }];
      },
    }),

    getExpectedWorldlyLifestyle: builder.query<
      ExpectedWorldlyLifestyle,
      string
    >({
      query: (id) => `users/${id}/expected-worldy-lifestyle`,
      transformResponse: (response: BaseResponse<ExpectedWorldlyLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'ExpectedWorldlyLifestyle', id: arg }];
      },
    }),

    updateExpectedWorldlyLifestyle: builder.mutation<
      ExpectedWorldlyLifestyle,
      UpdateExpectedWorldlyLifestyle
    >({
      query: ({ userId, expectedWorldlyLifestyle }) => ({
        url: `users/${userId}/expected-worldy-lifestyle`,
        method: 'PUT',
        body: expectedWorldlyLifestyle,
      }),
      transformResponse: (response: BaseResponse<ExpectedWorldlyLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'ExpectedWorldlyLifestyle', id: arg.userId }];
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetWorldlyLifestyleQuery,
  useUpdateWorldlyLifestyleMutation,
  useGetExpectedWorldlyLifestyleQuery,
  useUpdateExpectedWorldlyLifestyleMutation,
} = userApi;
