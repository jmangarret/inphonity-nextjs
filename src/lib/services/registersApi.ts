import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type RegisterRequest = {
  invitation_id: string;
  first_name: string;
  last_name: string;
  mother_last_name: string;
  contact_phone_number: string;
  curp?: string;
  gender?: string;
  id_address_picture?: string;
  id_tax_picture?: string;
  bank_name?: string;
  bank_account_number: string;
  bank_account_number_confirmation: string;
  interbank_clabe: string;
  interbank_clabe_confirmation: string;
  email: string;
  date_of_birth: string;
  id_front_picture: string;
  id_back_picture: string;
  address_zip_code: string;
  address_state: string;
  address_city: string;
  address_neighborhood: string;
  address_complement?: string;
  address_number: string;
  address_interior_number?: string;
  address: string;
  name?: string;
  rfc?: string;
  fiscal_regime?: string;
  tax_zip_code?: string;
  street?: string;
  exterior_number?: string;
  interior_number?: string;
  neighborhood?: string;
  zip_code?: string;
  municipality?: string;
  state?: string;
  tax_email?: string;
  product_id: number;
  is_esim: boolean;
};

type RegisterResponse = {
  message: string;
}

export type PaymentMethod =  'card' | 'cash' | 'spei' | 'card-legacy'

type InitialPaymentRequest = {
  invitation_id: number;
  payment_method: PaymentMethod;
  token_id?: string;
  deviceIdHiddenFieldName?: string;
}

type InitialPaymentResponse = {
  id: number;
  invitation_id: number;
  first_name: string;
  last_name: string;
  mother_last_name: string;
  contact_phone_number: string;
  curp?: string;
  gender?: string;
  id_address_picture?: string;
  id_tax_picture?: string;
  bank_name?: string;
  bank_account_number?: string;
  interbank_clabe?: string;
  email: string;
  date_of_birth: string;
  id_front_picture: string;
  id_back_picture: string;
  address_zip_code: string;
  address_state: string;
  address_city: string;
  address_neighborhood: string;
  address_complement?: string;
  address_number: string;
  address_interior_number?: string;
  address: string;
  name?: string;
  rfc?: string;
  cfdi_use?: string;
  fiscal_regime?: string;
  tax_zip_code?: string;
  street?: string;
  exterior_number?: string;
  interior_number?: string;
  neighborhood?: string;
  zip_code?: string;
  municipality?: string;
  state?: string;
  country?: string;
  tax_email?: string;
  product_id?: number;
  is_esim: boolean;
  payment_method?: string;
  payment_url?: string;
  payment_reference?: string;
  payment_status: string;
  signature_reference?: string;
  created_at: string;
  updated_at: string;
};

type SignatureRequest = {
  invitation_id: number;
  new_password: string;
  new_password_confirmation: string;
}
type SignatureResponse = 'success' | 'error';

export type ApiValidationError = {
  status: number;
  data: {
    message: string;
    errors: Record<string, string[]>;
  };
};

export const registersApi = createApi({
  reducerPath: 'registersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse | ApiValidationError, RegisterRequest>({
      query: (register) => ({
        url: `api/pre-register`,
        method: 'POST',
        body: register,
      }),
    }),
    initialPayment: builder.mutation<InitialPaymentResponse | ApiValidationError, InitialPaymentRequest>({
      query: (initialPayment) => ({
        url: `api/pre-register/${initialPayment.invitation_id}/initial-payment`,
        method: 'POST',
        body: initialPayment,
      }),
    }),
    signature: builder.mutation<SignatureResponse | ApiValidationError, SignatureRequest>({
      query: (signature) => ({
        url: `api/pre-register/${signature.invitation_id}/signature`,
        method: 'POST',
        body: signature,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useInitialPaymentMutation,
  useSignatureMutation
} = registersApi;
