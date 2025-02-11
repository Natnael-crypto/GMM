import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { Subscription } from '../schemas/checkout';

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',

  tagTypes: ['Subscription', 'SubscriptionHistory'],

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

    createPaymentIntent: builder.mutation<any, string>({
      query: (data) => ({
        url: 'payments/payment-intent',
        method: 'POST',
        body: { plan: data },
      }),
      transformResponse: (response: any) => response.data,
    }),

    updatePaymentIntent: builder.mutation<
      any,
      { plan: string; paymentIntentId: string }
    >({
      query: (data) => ({
        url: 'payments/payment-intent',
        method: 'PUT',
        body: data,
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
      providesTags: ['Subscription'],
    }),

    getSubscriptionHistory: builder.query<Subscription[], string>({
      query: (userId) => `payments/subscription-history/${userId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ['SubscriptionHistory'],
    }),

    setAutoRenewal: builder.mutation<
      any,
      { autoRenew: boolean; userId: string }
    >({
      query: ({ autoRenew, userId }) => ({
        url: autoRenew
          ? `payments/activate-renewal/${userId}`
          : `payments/cancel-renewal/${userId}`,
        method: autoRenew ? 'PATCH' : 'DELETE',
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ['Subscription'],
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useCreatePaymentIntentMutation,
  useUpdatePaymentIntentMutation,
  useLazyGetCurrentSubscriptionQuery,
  useConfirmFreeSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetSubscriptionHistoryQuery,
  useSetAutoRenewalMutation,
} = checkoutApi;
