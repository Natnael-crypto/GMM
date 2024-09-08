import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { Match } from './types';

export const matchApi = createApi({
  reducerPath: 'matchApi',

  tagTypes: ['Match'],

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
    getMatches: builder.query<Match, undefined>({
      query: () => 'matchmaking',
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'Match', id: result?.id }];
      },
    }),

    getCurrentMatch: builder.query<Match, undefined>({
      query: () => 'matchmaking/current-match',
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'Match', id: result?.id }];
      },
    }),

    getMatch: builder.query<Match, string>({
      query: (id) => `matchmaking/matches/${id}`,
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'Match', id: arg }];
      },
    }),

    createMatch: builder.mutation<Match, undefined>({
      query: () => ({
        url: 'matchmaking',
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match' }];
      },
    }),
  }),
});

export const {
  useGetCurrentMatchQuery,
  useGetMatchesQuery,
  useGetMatchQuery,
  useCreateMatchMutation,
} = matchApi;
