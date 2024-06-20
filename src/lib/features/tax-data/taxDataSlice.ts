import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";

export interface TaxData {
  name: string;
  rfc: string;
  fiscalRegime: string;
  rfcError: string;
  street: string;
  streetError: string;
  exteriorNumber: string;
  exteriorNumberError: string;
  interiorNumber: string;
  interiorNumberError: string;
  email: string;
  emailError: string;
  neighborhood: string;
  neighborhoodError: string;
  zipCode: string;
  zipCodeError: string;
  taxZipCode: string;
  taxZipCodeError: string;
  state: string;
  stateError: string;
  municipality: string;
  municipalityError: string;
  showAccountDataForm: boolean;
}

const initialState: TaxData = {
  name: "",
  rfc: "",
  fiscalRegime: '',
  rfcError: "",
  street: "",
  streetError: "",
  exteriorNumber: "",
  exteriorNumberError: "",
  interiorNumber: "",
  interiorNumberError: "",
  email: "",
  emailError: "",
  neighborhood: "",
  neighborhoodError: "",
  zipCode: "",
  zipCodeError: "",
  taxZipCode: "",
  taxZipCodeError: "",
  state: "",
  stateError: "",
  municipality: "",
  municipalityError: "",
  showAccountDataForm: false,
}

const taxDataSlice = createSlice({
name: "taxData",
  initialState,
  reducers: {
    resetTaxData: (state) => {
      state.name = "";
      state.rfc = "";
      state.fiscalRegime = '';
      state.rfcError = "";
      state.street = "";
      state.streetError = "";
      state.exteriorNumber = "";
      state.exteriorNumberError = "";
      state.interiorNumber = "";
      state.interiorNumberError = "";
      state.email = "";
      state.emailError = "";
      state.neighborhood = "";
      state.neighborhoodError = "";
      state.zipCode = "";
      state.zipCodeError = "";
      state.taxZipCode = "";
      state.taxZipCodeError = "";
      state.state = "";
      state.stateError = "";
      state.municipality = "";
      state.municipalityError = "";
      state.showAccountDataForm = false;
    },
    resetErrors: (state) => {
      state.rfcError = "";
      state.fiscalRegime = '';
      state.streetError = "";
      state.exteriorNumberError = "";
      state.interiorNumberError = "";
      state.emailError = "";
      state.neighborhoodError = "";
      state.zipCodeError = "";
      state.taxZipCodeError = "";
      state.stateError = "";
      state.municipalityError = "";
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRfc: (state, action: PayloadAction<string>) => {
      state.rfc = action.payload;
    },
    setRfcError: (state, action: PayloadAction<string>) => {
      state.rfcError = action.payload;
    },
    setFiscalRegime: (state, action: PayloadAction<string>) => {
      state.fiscalRegime = action.payload;
    },
    setFiscalRegimeError: (state, action: PayloadAction<string>) => {
      state.fiscalRegime = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
    setStreetError: (state, action: PayloadAction<string>) => {
      state.streetError = action.payload;
    },
    setExteriorNumber: (state, action: PayloadAction<string>) => {
      state.exteriorNumber = action.payload;
    },
    setExteriorNumberError: (state, action: PayloadAction<string>) => {
      state.exteriorNumberError = action.payload;
    },
    setInteriorNumber: (state, action: PayloadAction<string>) => {
      state.interiorNumber = action.payload;
    },
    setInteriorNumberError: (state, action: PayloadAction<string>) => {
      state.interiorNumberError = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setEmailError: (state, action: PayloadAction<string>) => {
      state.emailError = action.payload;
    },
    setNeighborhood: (state, action: PayloadAction<string>) => {
      state.neighborhood = action.payload;
    },
    setNeighborhoodError: (state, action: PayloadAction<string>) => {
      state.neighborhoodError = action.payload;
    },
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    setZipCodeError: (state, action: PayloadAction<string>) => {
      state.zipCodeError = action.payload;
    },
    setTaxZipCode: (state, action: PayloadAction<string>) => {
      state.taxZipCode = action.payload;
    },
    setTaxZipCodeError: (state, action: PayloadAction<string>) => {
      state.taxZipCodeError = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setStateError: (state, action: PayloadAction<string>) => {
      state.stateError = action.payload;
    },
    setMunicipality: (state, action: PayloadAction<string>) => {
      state.municipality = action.payload;
    },
    setMunicipalityError: (state, action: PayloadAction<string>) => {
      state.municipalityError = action.payload;
    },
    setShowAccountDataForm: (state, action: PayloadAction<boolean>) => {
      state.showAccountDataForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.rfc = invitation.pre_registration?.rfc || "";
      state.fiscalRegime = invitation.pre_registration?.fiscal_regime || '';
      state.street = invitation.pre_registration?.street || "";
      state.exteriorNumber = invitation.pre_registration?.exterior_number || "";
      state.interiorNumber = invitation.pre_registration?.interior_number || "";
      state.email = invitation.pre_registration?.email || "";
      state.neighborhood = invitation.pre_registration?.neighborhood || "";
      state.zipCode = invitation.pre_registration?.zip_code || "";
      state.taxZipCode = invitation.pre_registration?.tax_zip_code || "";
      state.state = invitation.pre_registration?.state || "";
      state.municipality = invitation.pre_registration?.municipality || "";

      if (invitation.pre_registration) {
        state.showAccountDataForm = true;
      }
    });
  },
});

export const {
  resetErrors,
  resetTaxData,
  setName,
  setRfc,
  setRfcError,
  setFiscalRegime,
  setFiscalRegimeError,
  setStreet,
  setStreetError,
  setExteriorNumber,
  setExteriorNumberError,
  setInteriorNumber,
  setInteriorNumberError,
  setEmail,
  setEmailError,
  setNeighborhood,
  setNeighborhoodError,
  setZipCode,
  setZipCodeError,
  setTaxZipCode,
  setTaxZipCodeError,
  setState,
  setStateError,
  setMunicipality,
  setMunicipalityError,
  setShowAccountDataForm,
} = taxDataSlice.actions;

export default taxDataSlice.reducer;
