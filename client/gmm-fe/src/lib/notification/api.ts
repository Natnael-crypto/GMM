import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';
import { Notification } from '../schemas/notification';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',

  tagTypes: ['Notification', 'UnreadNotification'],

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
    getNotifications: builder.query<Notification[], undefined>({
      query: () => 'notifications/my-notifications',
      transformResponse: (response: BaseResponse<Notification[]>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'Notification' }];
      },
    }),

    getUnreadNotifications: builder.query<Notification[], undefined>({
      query: () => 'notifications/my-unread-notifications',
      transformResponse: (response: BaseResponse<Notification[]>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'UnreadNotification' }];
      },
    }),

    markAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `notifications/${id}`,
        method: 'PUT',
      }),

      invalidatesTags: [
        { type: 'UnreadNotification' },
        { type: 'Notification' },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkAsReadMutation,
} = notificationApi;
