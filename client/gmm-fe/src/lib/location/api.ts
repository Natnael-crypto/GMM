import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { constants } from '@/config';
import { RootState } from '../store';
import { BaseResponse } from '@/types/base-response';

export interface Country {
  id: number;
  name: string;
  currency: string;
  states: State[];
}

export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
}

export const locationApi = createApi({
  reducerPath: 'locationApi',

  tagTypes: ['Country', 'State', 'City'],

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
    getCountries: builder.query<Country[], void>({
      query: () => `locations/countries`,
      transformResponse: (response: BaseResponse<Country[]>) => {
        return response.data;
      },
      providesTags: ['Country'],
    }),

    getStates: builder.query<State[], string>({
      query: (countryId) => `locations/countries/${countryId}`,
      transformResponse: (response: BaseResponse<Country>) => {
        return response.data.states;
      },
      providesTags: ['State'],
    }),

    getCountryCities: builder.query<City[], string>({
      query: (countryId) => `locations/countries/${countryId}/cities`,
      transformResponse: (response: BaseResponse<City[]>) => {
        return response.data;
      },
      providesTags: ['City'],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCountryCitiesQuery,
} = locationApi;
