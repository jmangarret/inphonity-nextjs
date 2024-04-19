import { Plan } from '@/types/plans';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], null>({
      query: () => 'api/products',
    })
  }),
});

export const {
  useGetPlansQuery,
} = plansApi;
