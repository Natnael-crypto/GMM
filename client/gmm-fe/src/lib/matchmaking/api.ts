import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import {
  CreateMatchResponse,
  ImageAccessPayload,
  ImageAccessRequest,
  Match,
  MatchStatistics,
  ProfileAccessPayload,
  StageInvitationStatus,
} from './types';
import { UserInMatchPool } from '../schemas/match';

export const matchApi = createApi({
  reducerPath: 'matchApi',

  tagTypes: [
    'Match',
    'MatchCount',
    'UserInMatchPool',
    'RemainingMatches',
    'ImageAccessRequest',
  ],

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
        return [{ type: 'Match' }];
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

    countPotentialMatches: builder.query<MatchStatistics, void>({
      query: () => 'matchmaking/potential-matches',
      transformResponse: (response: BaseResponse<MatchStatistics>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'MatchCount' }];
      },
    }),

    createMatch: builder.mutation<CreateMatchResponse, void>({
      query: () => {
        return {
          url: `matchmaking`,
          method: 'POST',
        };
      },
      transformResponse: (response: CreateMatchResponse) => {
        return response;
      },
      invalidatesTags: (result, error, arg, meta) => {
        return [
          { type: 'Match' },
          { type: 'MatchCount' },
          { type: 'RemainingMatches' },
        ];
      },
    }),

    inviteToNextStep: builder.mutation<Match, { matchId: string }>({
      query: ({ matchId }) => ({
        url: `matchmaking/matches/${matchId}/invitations`,
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match', id: arg.matchId }, { type: 'Match' }];
      },
    }),

    acceptOrRejectInvitation: builder.mutation<
      Match,
      { invitationId: string; action: StageInvitationStatus }
    >({
      query: ({ invitationId, action }) => ({
        url: `matchmaking/matches/invitations/${invitationId}`,
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

    unmatch: builder.mutation<Match, void>({
      query: () => ({
        url: `matchmaking/current-match`,
        method: 'DELETE',
      }),
      transformResponse: (response: BaseResponse<Match>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'Match' }];
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

    getAvailableMatchesLeft: builder.query<number, string>({
      query: (userId) => `/payments/remaining-matches/${userId}`,
      transformResponse: (
        response: BaseResponse<{ remainingMatches: number }>
      ) => {
        return response.data.remainingMatches;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'RemainingMatches' as const }];
      },
    }),

    requestImageAccess: builder.mutation<ImageAccessRequest, void>({
      query: () => {
        return {
          url: 'matchmaking/matches/image-requests',
          method: 'POST',
        };
      },
      transformResponse: (response: BaseResponse<ImageAccessRequest>) => {
        return response.data;
      },
      invalidatesTags: (result, error, arg, meta) => {
        return [{ type: 'ImageAccessRequest' }, { type: 'Match' }];
      },
    }),

    acceptOrRejectImageAccess: builder.mutation<any, ImageAccessPayload>({
      query: ({ status, imageAccessRequestId }) => ({
        url: `matchmaking/matches/image-requests/${imageAccessRequestId}`,
        method: 'PUT',
        body: {
          status,
        },
      }),
      invalidatesTags: (result, error, arg, meta) => {
        return [{ type: 'ImageAccessRequest' }, { type: 'Match' }];
      },
    }),

    allowOrDenyProfileAccess: builder.mutation<any, ProfileAccessPayload>({
      query: ({ status, matchId }) => ({
        url: `matchmaking/matches/matched-user-profile/${matchId}`,
        method: 'PUT',
        body: {
          status,
        },
      }),
      invalidatesTags: (result, error, arg, meta) => {
        return [{ type: 'Match' }];
      },
    }),


    allowOrDenyChatAccess: builder.mutation<any, ProfileAccessPayload>({
      query: ({ status, matchId }) => ({
        url: `matchmaking/matches/matched-chat/${matchId}`,
        method: 'PUT',
        body: {
          status,
        },
      }),
      invalidatesTags: (result, error, arg, meta) => {
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
  useUnmatchMutation,
  useCountPotentialMatchesQuery,
  useGetMatchPoolQuery,
  useGetAllMatchesQuery,
  useInviteToNextStepMutation,
  useAcceptOrRejectInvitationMutation,
  useGetAvailableMatchesLeftQuery,
  useRequestImageAccessMutation,
  useAcceptOrRejectImageAccessMutation,
  useAllowOrDenyProfileAccessMutation,
  useAllowOrDenyChatAccessMutation,
} = matchApi;
