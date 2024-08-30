import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { WorldlyLifestyle } from '../schemas/worldly-lifestyle';
import { BaseResponse } from '@/types/base-response';
import { UpdateWorldlyLifestyle } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',

  tagTypes: ['WorldlyLifestyle'],

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
  }),
});

export const {
  useGetWorldlyLifestyleQuery,
  useUpdateWorldlyLifestyleMutation,
} = userApi;
