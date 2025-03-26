import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_API_URL;
import bu_api_url from '../../../lib/server_config';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Sections'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    bu_api_url,
  }),
});
