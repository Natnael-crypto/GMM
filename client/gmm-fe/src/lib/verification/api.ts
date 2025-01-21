import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { VerificationStatus } from './types';

export const verificationApi = createApi({
  reducerPath: 'verificationApi',

  tagTypes: ['VerificationStatus'],

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
    getLivenessVerificationStatus: builder.query<VerificationStatus, void>({
      query: () => `verification/liveness`,
      transformResponse: (response: BaseResponse<VerificationStatus>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'VerificationStatus' }];
      },
    }),

    createLivenessSession: builder.mutation<string, void>({
      query: () => {
        return {
          url: `verification/liveness`,
          method: 'POST',
        };
      },
      transformResponse: (response: BaseResponse<string>) => {
        return response.data;
      },
      invalidatesTags: (result, error, arg, meta) => {
        return [{ type: 'VerificationStatus' }];
      },
    }),
  }),
});

export const {
  useGetLivenessVerificationStatusQuery,
  useCreateLivenessSessionMutation,
  useLazyGetLivenessVerificationStatusQuery,
} = verificationApi;
