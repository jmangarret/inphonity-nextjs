import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  mother_last_name: string;
  full_name: string;
  profile_picture: string | null;
  email: string;
  email_verified_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  role: string;
  role_name: string;
  profile_picture_img: string;
  roles: Role[];
};

type Client = {
  id: number;
  user_id: number;
  date_of_birth: string;
  contact_phone_number: string;
  curp: string;
  gender: string;
  bank_name: string | null;
  bank_account_number: string | null;
  interbank_clabe: string | null;
  id_front_picture: string;
  id_back_picture: string;
  address: string;
  address_number: string;
  address_complement: string | null;
  address_neighborhood: string;
  address_zip_code: string;
  address_city: string;
  address_state: string;
  status: string;
  signature_reference: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  referral_id: number;
  user: User;
};

type Network = {
  id: number;
  client_id: number;
  status: string;
  current_plan: string | null;
  alias: string | null;
  sim_id: string;
  contract_id: string;
  msisdn: string;
  iccid: string;
  account_number: string;
  membership_number: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};
export type Product = {
  id: number;
  user_id: number | null;
  type: string;
  name: string;
  price: number;
  image: string | null;
  description: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
export type PreRegistration = {
  address: string;
  address_city: string;
  address_complement: string;
  address_interior_number: string;
  address_neighborhood: string;
  address_number: string;
  address_state: string;
  address_zip_code: string;
  bank_account_number: string;
  bank_name: string;
  cfdi_use: string;
  contact_phone_number: string;
  country: string;
  created_at: string;
  curp: string;
  date_of_birth: string;
  email: string;
  exterior_number: string | null;
  first_name: string;
  fiscal_regime: string;
  gender: string;
  id: number;
  id_back_picture: string;
  id_front_picture: string;
  interbank_clabe: string;
  interior_number: string | null;
  invitation_id: number;
  is_esim: number;
  last_name: string;
  mother_last_name: string;
  municipality: string | null;
  name: string | null;
  neighborhood: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  payment_status: string;
  payment_url: string | null;
  product_id: number;
  product: Product;
  rfc: string | null;
  signature_reference: string | null;
  state: string | null;
  street: string | null;
  tax_email: string | null;
  tax_zip_code: string | null;
  updated_at: string;
  zip_code: string | null;
  occupation: string | null;
  nationality: string | null;
};

export type Invitation = {
  id: number;
  client_id: number;
  network_id: number;
  contact: string;
  status: string;
  expires_at: string;
  accepted_at: string | null;
  rejected_at: string | null;
  cancelled_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  url: string;
  client: Client;
  network: Network;
  pre_registration: PreRegistration | null;
};

export const invitationsApi = createApi({
  reducerPath: 'invitationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInvitationById: builder.query<Invitation, string>({
      query: (id) => `api/invitations/${id}`,
    }),
    rejectInvitation: builder.mutation<Invitation, string>({
      query: (id) => ({
        url: `api/invitations/${id}/reject`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetInvitationByIdQuery,
  useRejectInvitationMutation,
} = invitationsApi;
