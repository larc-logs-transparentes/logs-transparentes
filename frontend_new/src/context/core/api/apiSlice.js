import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Sections'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
});
