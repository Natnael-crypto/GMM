import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { Match, MatchPreference, StageInvitationStatus } from './types';
import { UserInMatchPool } from '../schemas/match';

export const matchApi = createApi({
  reducerPath: 'matchApi',

  tagTypes: ['Match', 'MatchCount', 'UserInMatchPool'],

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
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'MatchCount', id: arg }];
      },
    }),

    createMatch: builder.mutation<Match, MatchPreference>({
      query: ({ tolerance }) => {
        return {
          url: `matchmaking?&min_requirement=${tolerance}`,
          method: 'POST',
        };
      },
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match' }];
      },
    }),

    inviteToNextStep: builder.mutation<Match, { matchId: string }>({
      query: ({ matchId }) => ({
        url: `matchmaking/matches/${matchId}/stage-invitation`,
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match', id: arg.matchId }];
      },
    }),

    acceptOrRejectInvitation: builder.mutation<
      Match,
      { invitationId: string; action: StageInvitationStatus }
    >({
      query: ({ invitationId, action }) => ({
        url: `matchmaking/matches/${invitationId}/stage-invitation`,
        method: 'PUT',
        body: { action: action },
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

    getMatchPool: builder.query<UserInMatchPool[], undefined>({
      query: () => 'matchmaking/users-in-pool',
      transformResponse: (response: BaseResponse<UserInMatchPool[]>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return result
          ? [
              { type: 'UserInMatchPool' as const, id: 'LIST' },
              ...result.map((user) => ({
                type: 'UserInMatchPool' as const,
                id: user.userId,
              })),
            ]
          : [{ type: 'UserInMatchPool' as const }];
      },
    }),

    getAllMatches: builder.query<Match[], undefined>({
      query: () => 'matchmaking/all-matches',
      transformResponse: (response: BaseResponse<Match[]>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return result
          ? [
              { type: 'Match' as const, id: 'LIST' },
              ...result.map((match) => ({
                type: 'Match' as const,
                id: match.id,
              })),
            ]
          : [{ type: 'Match' as const }];
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
  useGetMatchPoolQuery,
  useGetAllMatchesQuery,
  useInviteToNextStepMutation,
  useAcceptOrRejectInvitationMutation,
} = matchApi;
