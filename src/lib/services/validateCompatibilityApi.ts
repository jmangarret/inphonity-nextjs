import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type ValidateImeiResponse = {
  success: boolean;
  errors: any[];
  message: string;
  data: {
    esim: boolean;
    model: string;
    brand: string;
  };
}

export const validateImeiApi = createApi({
  reducerPath: 'validateImeiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crmxpace.com/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    validateImei: builder.query<ValidateImeiResponse, string>({
      query: (imei) => `api/esim/validate-imei?operator_id=18&imei=${imei}`,
    }),
  }),
});

export const {
  useValidateImeiQuery,
  useLazyValidateImeiQuery,
} = validateImeiApi;
