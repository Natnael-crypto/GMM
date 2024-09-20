import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseResponse } from '@/types/base-response';
import { constants } from '@/config';
import { RootState } from '../store';
import { Chat } from '../schemas/chat';
import { MessagesResponse } from './type';

export const chatApi = createApi({
  reducerPath: 'chatApi',

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
    getChat: builder.query<Chat, string>({
      query: (id) => `chats/${id}`,
      transformResponse: (response: BaseResponse<Chat>) => response.data,
    }),

    getChats: builder.query<Chat[], void>({
      query: () => 'chats',
      transformResponse: (response: BaseResponse<Chat[]>) => response.data,
    }),

    initiateChat: builder.mutation<Chat, string>({
      query: (userId) => ({
        url: 'chats',
        method: 'POST',
        body: { userId: userId },
      }),
      transformResponse: (response: BaseResponse<Chat>) => response.data,
    }),

    getMessages: builder.query<MessagesResponse, string>({
      query: (roomId) => `chats/${roomId}/messages?limit=100`,
      transformResponse: (response: BaseResponse<MessagesResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetChatQuery,
  useGetChatsQuery,
  useInitiateChatMutation,
  useGetMessagesQuery,
} = chatApi;
