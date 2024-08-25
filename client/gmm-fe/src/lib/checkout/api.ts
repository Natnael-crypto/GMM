import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',

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
    createCheckout: builder.mutation<any, any>({
      query: (data) => ({
        url: 'payments/checkout-session',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateCheckoutMutation } = checkoutApi;
