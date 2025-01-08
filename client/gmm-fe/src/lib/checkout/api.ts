import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { Subscription } from '../schemas/checkout';

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
      transformResponse: (response: any) => response.data,
    }),

    createPaymentIntent: builder.mutation<any, any>({
      query: (data) => ({
        url: 'payments/create-payment-intent',
        method: 'POST',
        body: { plan: data },
      }),
      transformResponse: (response: any) => response.data,
    }),

    confirmFreeSubscription: builder.mutation<any, void>({
      query: () => ({
        url: 'payments/checkout/success',
        method: 'GET',
      }),
    }),

    getCurrentSubscription: builder.query<Subscription, string>({
      query: (userId) => `payments/current-subscription/${userId}`,
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useCreatePaymentIntentMutation,
  useLazyGetCurrentSubscriptionQuery,
  useConfirmFreeSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
} = checkoutApi;
