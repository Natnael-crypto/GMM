import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { Match } from './types';

export const matchApi = createApi({
  reducerPath: 'matchApi',

  tagTypes: ['Match', 'MatchCount'],

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

    countPotentialMatches: builder.query<number, string>({
      query: (queryString) => `matchmaking/count?${queryString}`,
      transformResponse: (response: BaseResponse<number>) => {
        console.log(response.data);
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'MatchCount', id: arg }];
      },
    }),

    createMatch: builder.mutation<Match, string>({
      query: (queryString) => ({
        url: 'matchmaking?' + queryString,
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match' }];
      },
    }),

    unmatch: builder.mutation<Match, string>({
      query: (id) => ({
        url: `matchmaking/matches/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match', id: arg }];
      },
    }),
  }),
});

export const {
  useGetCurrentMatchQuery,
  useGetMatchesQuery,
  useGetMatchQuery,
  useCreateMatchMutation,
  useUnmatchMutation,
  useCountPotentialMatchesQuery,
} = matchApi;
