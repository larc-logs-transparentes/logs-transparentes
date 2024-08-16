import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'http://localhost:8080';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Sections'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
});
