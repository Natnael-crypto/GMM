import { constants } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BaseResponse } from "@/types/base-response";

type ContactResponse = {
  success: boolean;
  issueId: string;
};

export const contactApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: constants.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    postContactMessage: builder.mutation<ContactResponse, { message: string }>({
      query: ({ message }) => ({
        url: "contact-message",
        method: "POST",
        body: { message },
      }),
      transformResponse: (response: BaseResponse<ContactResponse>) =>
        response.data,
    }),
  }),
});

export const { usePostContactMessageMutation } = contactApi;
