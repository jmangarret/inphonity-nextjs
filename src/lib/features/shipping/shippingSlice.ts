import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";

export interface Shipping {
  isEsim: boolean;
  isEsimError: string;
  zipCode: string;
  zipCodeError: string;
  neighborhood: string;
  neighborhoodError: string;
  street: string;
  streetError: string;
  number: string;
  numberError: string;
  interiorNumber: string;
  interiorNumberError: string;
  complement: string;
  complementError: string;
  state: string;
  stateError: string;
  city: string;
  cityError: string;
  showTaxDataForm: boolean;
  isValidated: boolean;
}

const initialState: Shipping = {
  isEsim: false,
  isEsimError: "",
  zipCode: "",
  zipCodeError: "",
  neighborhood: "",
  neighborhoodError: "",
  street: "",
  streetError: "",
  number: "",
  numberError: "",
  interiorNumber: "",
  interiorNumberError: "",
  complement: "",
  complementError: "",
  state: "",
  stateError: "",
  city: "",
  cityError: "",
  showTaxDataForm: false,
  isValidated: false,
}

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    resetShipping: (state) => {
      state.isEsim = false;
      state.isEsimError = "";
      state.zipCode = "";
      state.zipCodeError = "";
      state.neighborhood = "";
      state.neighborhoodError = "";
      state.street = "";
      state.streetError = "";
      state.number = "";
      state.numberError = "";
      state.interiorNumber = "";
      state.interiorNumberError = "";
      state.complement = "";
      state.complementError = "";
      state.state = "";
      state.stateError = "";
      state.city = "";
      state.cityError = "";
      state.showTaxDataForm = false;
      state.isValidated = false;
    },
    resetErrors: (state) => {
      state.isEsimError = "";
      state.zipCodeError = "";
      state.neighborhoodError = "";
      state.streetError = "";
      state.numberError = "";
      state.interiorNumberError = "";
      state.complementError = "";
      state.stateError = "";
      state.cityError = "";
    },
    setIsEsim: (state, action: PayloadAction<boolean>) => {
      state.isEsim = action.payload;
    },
    setIsValidation: (state, action: PayloadAction<boolean>) => {
      state.isValidated = action.payload;
    },
    setEsimError: (state, action: PayloadAction<string>) => {
      state.isEsimError = action.payload;
    },
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    setZipCodeError: (state, action: PayloadAction<string>) => {
      state.zipCodeError = action.payload;
    },
    setNeighborhood: (state, action: PayloadAction<string>) => {
      state.neighborhood = action.payload;
    },
    setNeighborhoodError: (state, action: PayloadAction<string>) => {
      state.neighborhoodError = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
    setStreetError: (state, action: PayloadAction<string>) => {
      state.streetError = action.payload;
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    setNumberError: (state, action: PayloadAction<string>) => {
      state.numberError = action.payload;
    },
    setInteriorNumber: (state, action: PayloadAction<string>) => {
      state.interiorNumber = action.payload;
    },
    setInteriorNumberError: (state, action: PayloadAction<string>) => {
      state.interiorNumberError = action.payload;
    },
    setComplement: (state, action: PayloadAction<string>) => {
      state.complement = action.payload;
    },
    setComplementError: (state, action: PayloadAction<string>) => {
      state.complementError = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setStateError: (state, action: PayloadAction<string>) => {
      state.stateError = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCityError: (state, action: PayloadAction<string>) => {
      state.cityError = action.payload;
    },
    setShowTaxDataForm: (state, action: PayloadAction<boolean>) => {
      state.showTaxDataForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.isEsim = !!invitation.pre_registration?.is_esim || false;
      state.zipCode = invitation.pre_registration?.address_zip_code || "";
      state.neighborhood = invitation.pre_registration?.address_neighborhood || "";
      state.street = invitation.pre_registration?.address || "";
      state.number = invitation.pre_registration?.address_number || "";
      state.interiorNumber = invitation.pre_registration?.address_interior_number || "";
      state.complement = invitation.pre_registration?.address_complement || "";
      state.state = invitation.pre_registration?.address_state || "";
      state.city = invitation.pre_registration?.address_city || "";

      if (invitation.pre_registration) {
        state.showTaxDataForm = true;
      }
    });
  },
})

export const {
  resetErrors,
  resetShipping,
  setIsEsim,
  setEsimError,
  setIsValidation,
  setZipCode,
  setZipCodeError,
  setNeighborhood,
  setNeighborhoodError,
  setStreet,
  setStreetError,
  setNumber,
  setNumberError,
  setInteriorNumber,
  setInteriorNumberError,
  setComplement,
  setComplementError,
  setState,
  setStateError,
  setCity,
  setCityError,
  setShowTaxDataForm,
} = shippingSlice.actions;

export default shippingSlice.reducer;
