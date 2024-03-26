import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";

export interface AccountData {
  bankName: string;
  bankNameError: string;
  bankAccountNumber: string;
  bankAccountNumberError: string;
  bankAccountNumberConfirmation: string;
  interbankClabe: string;
  interbankClabeError: string;
  interbankClabeConfirmation: string;
  showPaymentForm: boolean;
}

const initialState: AccountData = {
  bankName: "",
  bankNameError: "",
  bankAccountNumber: "",
  bankAccountNumberError: "",
  bankAccountNumberConfirmation: "",
  interbankClabe: "",
  interbankClabeError: "",
  interbankClabeConfirmation: "",
  showPaymentForm: false,
}

const accountDataSlice = createSlice({
  name: "accountData",
  initialState,
  reducers: {
    resetAccountData: (state) => {
      state.bankName = "";
      state.bankNameError = "";
      state.bankAccountNumber = "";
      state.bankAccountNumberError = "";
      state.bankAccountNumberConfirmation = "";
      state.interbankClabe = "";
      state.interbankClabeError = "";
      state.interbankClabeConfirmation = "";
      state.showPaymentForm = false;
    },
    resetErrors: (state) => {
      state.bankNameError = "";
      state.bankAccountNumberError = "";
      state.interbankClabeError = "";
    },
    setBankName: (state, action: PayloadAction<string>) => {
      state.bankName = action.payload;
    },
    setBankNameError: (state, action: PayloadAction<string>) => {
      state.bankNameError = action.payload;
    },
    setBankAccountNumber: (state, action: PayloadAction<string>) => {
      state.bankAccountNumber = action.payload;
    },
    setBankAccountNumberError: (state, action: PayloadAction<string>) => {
      state.bankAccountNumberError = action.payload;
    },
    setBankAccountNumberConfirmation: (state, action: PayloadAction<string>) => {
      state.bankAccountNumberConfirmation = action.payload;
    },
    setInterbankClabe: (state, action: PayloadAction<string>) => {
      state.interbankClabe = action.payload;
    },
    setInterbankClabeError: (state, action: PayloadAction<string>) => {
      state.interbankClabeError = action.payload;
    },
    setInterbankClabeConfirmation: (state, action: PayloadAction<string>) => {
      state.interbankClabeConfirmation = action.payload;
    },
    setShowPaymentForm: (state, action: PayloadAction<boolean>) => {
      state.showPaymentForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.bankName = invitation.pre_registration?.bank_name || "";
      state.bankAccountNumber = invitation.pre_registration?.bank_account_number || "";
      state.bankAccountNumberConfirmation = invitation.pre_registration?.bank_account_number || "";
      state.interbankClabe = invitation.pre_registration?.interbank_clabe || "";
      state.interbankClabeConfirmation = invitation.pre_registration?.interbank_clabe || "";

      if (invitation.pre_registration) {
        state.showPaymentForm = true;
      }
    });
  },
});

export const {
  resetErrors,
  resetAccountData,
  setBankName,
  setBankNameError,
  setBankAccountNumber,
  setBankAccountNumberError,
  setBankAccountNumberConfirmation,
  setInterbankClabe,
  setInterbankClabeError,
  setInterbankClabeConfirmation,
  setShowPaymentForm,
} = accountDataSlice.actions;

export default accountDataSlice.reducer;
