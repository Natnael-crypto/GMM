import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import {
  ExpectedWorldlyLifestyle,
  WorldlyLifestyle,
} from '../schemas/worldly-lifestyle';
import { BaseResponse } from '@/types/base-response';
import {
  UpdateWorldlyLifestyle,
  UpdateExpectedWorldlyLifestyle,
  UpdateIslamicLifestyle,
  UpdateExpectedIslamicLifestyle,
  UpdateMarriageDiscussion,
  UploadFileInfo,
  UrlResponse,
  UpdateFamilyIntroduction,
  UpdateUser,
} from './types';
import { User } from '../schemas/user';
import {
  ExpectedIslamicLifestyle,
  IslamicLifestyle,
} from '../schemas/islamic-lifestyle';
import { MarriageDiscussion } from '../schemas/marriage-discussion';
import { Preference } from '../schemas/preference';
import { FamilyIntroduction } from '../schemas/family-introduction';

export const userApi = createApi({
  reducerPath: 'userApi',

  tagTypes: [
    'User',
    'WorldlyLifestyle',
    'ExpectedWorldlyLifestyle',
    'IslamicLifestyle',
    'ExpectedIslamicLifestyle',
    'MarriageDiscussion',
    'FamilyIntroduction',
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
    getUsers: builder.query<User[], string>({
      query: (queryString) => `users?${queryString}`,
      transformResponse: (response: BaseResponse<User[]>) => {
        return response.data;
      },
    }),

    updateUser: builder.mutation<User, UpdateUser>({
      query: ({ user }) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      transformResponse: (response: BaseResponse<User>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'User', id: arg.user.id }];
      },
    }),

    updatePreference: builder.mutation<Preference, Preference>({
      query: (preference) => ({
        url: `matchmaking/preference`,
        method: 'PUT',
        body: preference,
      }),
      transformResponse: (response: BaseResponse<Preference>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'User' }];
      },
    }),

    getWorldlyLifestyle: builder.query<WorldlyLifestyle, string>({
      query: (id) => `users/${id}/worldly-lifestyle`,
      transformResponse: (response: BaseResponse<WorldlyLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'WorldlyLifestyle', id: arg }];
      },
    }),

    updateWorldlyLifestyle: builder.mutation<
      WorldlyLifestyle,
      UpdateWorldlyLifestyle
    >({
      query: ({ userId, worldlyLifestyle }) => ({
        url: `users/${userId}/worldly-lifestyle`,
        method: 'PUT',
        body: worldlyLifestyle,
      }),
      transformResponse: (response: BaseResponse<WorldlyLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'WorldlyLifestyle', id: arg.userId }];
      },
    }),

    getExpectedWorldlyLifestyle: builder.query<
      ExpectedWorldlyLifestyle,
      string
    >({
      query: (id) => `users/${id}/expected-worldly-lifestyle`,
      transformResponse: (response: BaseResponse<ExpectedWorldlyLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'ExpectedWorldlyLifestyle', id: arg }];
      },
    }),

    updateExpectedWorldlyLifestyle: builder.mutation<
      ExpectedWorldlyLifestyle,
      UpdateExpectedWorldlyLifestyle
    >({
      query: ({ userId, expectedWorldlyLifestyle }) => ({
        url: `users/${userId}/expected-worldly-lifestyle`,
        method: 'PUT',
        body: expectedWorldlyLifestyle,
      }),
      transformResponse: (response: BaseResponse<ExpectedWorldlyLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'ExpectedWorldlyLifestyle', id: arg.userId }];
      },
    }),

    getIslamicLifestyle: builder.query<IslamicLifestyle, string>({
      query: (id) => `users/${id}/islamic-lifestyle`,
      transformResponse: (response: BaseResponse<IslamicLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'IslamicLifestyle', id: arg }];
      },
    }),

    updateIslamicLifestyle: builder.mutation<
      IslamicLifestyle,
      UpdateIslamicLifestyle
    >({
      query: ({ userId, islamicLifestyle }) => ({
        url: `users/${userId}/islamic-lifestyle`,
        method: 'PUT',
        body: islamicLifestyle,
      }),
      transformResponse: (response: BaseResponse<IslamicLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'IslamicLifestyle', id: arg.userId }];
      },
    }),

    getExpectedIslamicLifestyle: builder.query<
      ExpectedIslamicLifestyle,
      string
    >({
      query: (id) => `users/${id}/expected-islamic-lifestyle`,
      transformResponse: (response: BaseResponse<ExpectedIslamicLifestyle>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'ExpectedIslamicLifestyle', id: arg }];
      },
    }),

    updateExpectedIslamicLifestyle: builder.mutation<
      ExpectedIslamicLifestyle,
      UpdateExpectedIslamicLifestyle
    >({
      query: ({ userId, expectedIslamicLifestyle }) => ({
        url: `users/${userId}/expected-islamic-lifestyle`,
        method: 'PUT',
        body: expectedIslamicLifestyle,
      }),
      transformResponse: (response: BaseResponse<ExpectedIslamicLifestyle>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'ExpectedIslamicLifestyle', id: arg.userId }];
      },
    }),

    getMarriageDiscussion: builder.query<MarriageDiscussion, string>({
      query: (id) => `users/${id}/marriage-discussion`,
      transformResponse: (response: BaseResponse<MarriageDiscussion>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'MarriageDiscussion', id: arg }];
      },
    }),

    updateMarriageDiscussion: builder.mutation<
      MarriageDiscussion,
      UpdateMarriageDiscussion
    >({
      query: ({ userId, marriageDiscussion }) => ({
        url: `users/${userId}/marriage-discussion`,
        method: 'PUT',
        body: marriageDiscussion,
      }),
      transformResponse: (response: BaseResponse<MarriageDiscussion>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'MarriageDiscussion', id: arg.userId }];
      },
    }),

    getFamilyIntroduction: builder.query<FamilyIntroduction, string>({
      query: (id) => `users/${id}/family-introduction`,
      transformResponse: (response: BaseResponse<FamilyIntroduction>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'FamilyIntroduction', id: arg }];
      },
    }),

    updateFamilyIntroduction: builder.mutation<
      FamilyIntroduction,
      UpdateFamilyIntroduction
    >({
      query: ({ userId, familyIntroduction }) => ({
        url: `users/${userId}/family-introduction`,
        method: 'PUT',
        body: familyIntroduction,
      }),
      transformResponse: (response: BaseResponse<FamilyIntroduction>) => {
        return response.data;
      },
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'FamilyIntroduction', id: arg.userId }];
      },
    }),

    createUploadUrl: builder.mutation<UrlResponse, UploadFileInfo>({
      query: (fileInfo) => ({
        url: 'storage/presigned-url',
        method: 'POST',
        body: fileInfo,
      }),
      transformResponse: (response: BaseResponse<UrlResponse>) => {
        return response.data;
      },
    }),

    createDownloadUrl: builder.mutation<string, string>({
      query: (key) => ({
        url: `storage/presigned-url/${key}`,
        method: 'GET',
      }),
      transformResponse: (response: BaseResponse<UrlResponse>) => {
        return response.data.url;
      },
    }),

    getDownloadUrl: builder.query<string, string>({
      query: (key) => `storage/presigned-url/${key}`,
      transformResponse: (response: BaseResponse<UrlResponse>) => {
        return response.data.url;
      },
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useUpdatePreferenceMutation,
  useUpdateUserMutation,
  useGetWorldlyLifestyleQuery,
  useUpdateWorldlyLifestyleMutation,
  useGetExpectedWorldlyLifestyleQuery,
  useUpdateExpectedWorldlyLifestyleMutation,
  useGetIslamicLifestyleQuery,
  useUpdateIslamicLifestyleMutation,
  useGetExpectedIslamicLifestyleQuery,
  useUpdateExpectedIslamicLifestyleMutation,
  useGetMarriageDiscussionQuery,
  useUpdateMarriageDiscussionMutation,
  useGetFamilyIntroductionQuery,
  useUpdateFamilyIntroductionMutation,
  useCreateUploadUrlMutation,
  useCreateDownloadUrlMutation,
  useGetDownloadUrlQuery,
} = userApi;
