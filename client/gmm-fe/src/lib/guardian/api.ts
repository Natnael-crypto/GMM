import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { User } from '../schemas/user';

export const guardianApi = createApi({
  reducerPath: 'guardianApi',

  tagTypes: [],

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
    getReceivedRequests: builder.query<any[], void>({
      query: () => `guardians/received-requests`,
      transformResponse: (response: BaseResponse<User[]>) => {
        return response.data;
      },
    }),

    getSentRequests: builder.query<any[], void>({
      query: () => `guardians/sent-requests`,
      transformResponse: (response: BaseResponse<User[]>) => {
        return response.data;
      },
    }),

    sendRequest: builder.mutation<any, { guardianEmail: string }>({
      query: (body) => ({
        url: `guardians`,
        method: 'POST',
        body,
      }),
    }),

    acceptRequest: builder.mutation<any, number>({
      query: (id) => ({
        url: `guardians/${id}/accept`,
        method: 'PUT',
      }),
    }),

    rejectRequest: builder.mutation<any, number>({
      query: (id) => ({
        url: `guardians/${id}/reject`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetReceivedRequestsQuery,
  useGetSentRequestsQuery,
  useSendRequestMutation,
  useAcceptRequestMutation,
  useRejectRequestMutation,
} = guardianApi;
