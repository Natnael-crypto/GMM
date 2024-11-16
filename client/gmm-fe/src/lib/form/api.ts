import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';

export const formApi = createApi({
  reducerPath: 'formApi',

  tagTypes: ['Form', 'FormData'],

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
    getForm: builder.query<any, string>({
      query: (slug) => `forms/${slug}`,
      transformResponse: (response: BaseResponse<any>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'Form', id: arg }];
      },
    }),

    getFormData: builder.query<any, { slug: string; userId: string }>({
      query: ({ slug, userId }) => `forms/${slug}/submissions/${userId}`,
      transformResponse: (response: BaseResponse<any>) => {
        return response.data;
      },
      providesTags: (result, error, arg, meta) => {
        return [{ type: 'FormData', id: `${arg.slug}_${arg.userId}` }];
      },
    }),

    submitForm: builder.mutation<
      any,
      { slug: string; data: any; userId: string }
    >({
      query: ({ slug, data }) => ({
        url: `forms/${slug}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags(result, error, arg, meta) {
        return [{ type: 'FormData', id: `${arg.slug}_${arg.userId}` }];
      },
    }),
  }),
});

export const { useGetFormQuery, useGetFormDataQuery, useSubmitFormMutation } =
  formApi;
