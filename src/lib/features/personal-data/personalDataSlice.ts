import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";
import { differenceInYears } from 'date-fns';

export interface PersonalData {
  name: string;
  nameError: string;
  phone: string;
  phoneError: string;
  email: string;
  emailError: string;
  curp: string;
  curpError: string;
  gender: string;
  genderError: string;
  docType: string,
  idPassportPicture: string,
  idFrontPicture: string;
  idFrontPictureError: string;
  idBackPicture: string;
  idBackPictureError: string;
  dateOfBirth: string;
  dateOfBirthError: string;
  dayDateOfBirth: string;
  dayDateOfBirthError: string;
  monthDateOfBirth: string;
  monthDateOfBirthError: string;
  yearDateOfBirth: string;
  yearDateOfBirthError: string;
  showShippingForm: boolean;
  idAddressPicture: string;
  idTaxPicture: string;
}

const initialState: PersonalData = {
  name: "",
  nameError: "",
  phone: "",
  phoneError: "",
  email: "",
  emailError: "",
  curp: "",
  curpError: "",
  gender: "",
  genderError: "",
  docType: "",
  idPassportPicture: "",
  idFrontPicture: "",
  idFrontPictureError: "",
  idBackPicture: "",
  idBackPictureError: "",
  dateOfBirth: "",
  dateOfBirthError: "",
  dayDateOfBirth: "",
  dayDateOfBirthError: "",
  monthDateOfBirth: "",
  monthDateOfBirthError: "",
  yearDateOfBirth: "",
  yearDateOfBirthError: "",
  showShippingForm: false,
  idAddressPicture: "",
  idTaxPicture: ""
}

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    resetPersonalData: (state) => {
      state.name = "";
      state.nameError = "";
      state.phone = "";
      state.phoneError = "";
      state.email = "";
      state.emailError = "";
      state.curp = "";
      state.curpError = "";
      state.gender = "";
      state.genderError = "";
      state.docType = "";
      state.idPassportPicture = "";
      state.idFrontPicture = "";
      state.idFrontPictureError = "";
      state.idBackPicture = "";
      state.idBackPictureError = "";
      state.dateOfBirth = "";
      state.dateOfBirthError = "";
      state.dayDateOfBirth = "";
      state.dayDateOfBirthError = "";
      state.monthDateOfBirth = "";
      state.monthDateOfBirthError = "";
      state.yearDateOfBirth = "";
      state.yearDateOfBirthError = "";
      state.showShippingForm = false;
      state.idAddressPicture = "";
      state.idTaxPicture = "";
    },
    resetErrors: (state) => {
      state.nameError = "";
      state.phoneError = "";
      state.emailError = "";
      state.curpError = "";
      state.genderError = "";
      state.idFrontPictureError = "";
      state.idBackPictureError = "";
      state.dateOfBirthError = "";
      state.dayDateOfBirthError = "";
      state.monthDateOfBirthError = "";
      state.yearDateOfBirthError = "";
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNameError: (state, action: PayloadAction<string>) => {
      state.nameError = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPhoneError: (state, action: PayloadAction<string>) => {
      state.phoneError = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setEmailError: (state, action: PayloadAction<string>) => {
      state.emailError = action.payload;
    },
    setCurp: (state, action: PayloadAction<string>) => {
      state.curp = action.payload;
    },
    setCurpError: (state, action: PayloadAction<string>) => {
      state.curpError = action.payload;
    },
    setDocType: (state, action: PayloadAction<string>) => {
      state.docType = action.payload;
    },
    setIdPassportPicture: (state, action: PayloadAction<string>) => {
      state.idPassportPicture = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setGenderError: (state, action: PayloadAction<string>) => {
      state.genderError = action.payload;
    },
    setIdFrontPicture: (state, action: PayloadAction<string>) => {
      state.idFrontPicture = action.payload;
    },
    setIdFrontPictureError: (state, action: PayloadAction<string>) => {
      state.idFrontPictureError = action.payload;
    },
    setIdBackPicture: (state, action: PayloadAction<string>) => {
      state.idBackPicture = action.payload;
    },
    setIdBackPictureError: (state, action: PayloadAction<string>) => {
      state.idBackPictureError = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setDateOfBirthError: (state, action: PayloadAction<string>) => {
      state.dateOfBirthError = action.payload;
    },
    setDayDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dayDateOfBirth = action.payload;
    },
    setDayDateOfBirthError: (state, action: PayloadAction<string>) => {
      state.dayDateOfBirthError = action.payload;
    },
    setMonthDateOfBirth: (state, action: PayloadAction<string>) => {
      state.monthDateOfBirth = action.payload;
    },
    setMonthDateOfBirthError: (state, action: PayloadAction<string>) => {
      state.monthDateOfBirthError = action.payload;
    },
    setYearDateOfBirth: (state, action: PayloadAction<string>) => {
      state.yearDateOfBirth = action.payload;
    },
    setYearDateOfBirthError: (state, action: PayloadAction<string>) => {
      state.yearDateOfBirthError = action.payload;
    },
    setShowShippingForm: (state, action: PayloadAction<boolean>) => {
      state.showShippingForm = action.payload;
    },
    setIdAddressPicture: (state, action: PayloadAction<string>) => {
      state.idAddressPicture = action.payload;
    },
    setIdTaxPicture: (state, action: PayloadAction<string>) => {
      state.idTaxPicture = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.name = invitation.pre_registration?.first_name || "";
      state.phone = invitation.pre_registration?.contact_phone_number || "";
      state.email = invitation.pre_registration?.email || "";
      state.curp = invitation.pre_registration?.curp || "";
      state.gender = invitation.pre_registration?.gender || "";
      state.idFrontPicture = invitation.pre_registration?.id_front_picture || "";
      state.idBackPicture = invitation.pre_registration?.id_back_picture || "";

      if (invitation.pre_registration?.date_of_birth) {
        // format date of birth for input type date
        const dateOfBirth = new Date(invitation.pre_registration.date_of_birth);
        state.dateOfBirth = dateOfBirth.toISOString().split("T")[0];

        // calculate age and validate
        const age = differenceInYears(new Date(), dateOfBirth);
        if (age < 18) {
          state.dateOfBirthError = 'Debes tener al menos 18 años';
        } else {
          state.dateOfBirthError = ''; // clear any previous error message
        }
      }

      if (invitation.pre_registration) {
        state.showShippingForm = true;
      }
    });
  },
});

export const {
  resetPersonalData,
  resetErrors,
  setName,
  setNameError,
  setPhone,
  setPhoneError,
  setEmail,
  setEmailError,
  setCurp,
  setCurpError,
  setDocType,
  setIdPassportPicture,
  setGender,
  setGenderError,
  setIdFrontPicture,
  setIdFrontPictureError,
  setIdBackPicture,
  setIdBackPictureError,
  setDateOfBirth,
  setDateOfBirthError,
  setDayDateOfBirth,
  setDayDateOfBirthError,
  setMonthDateOfBirth,
  setMonthDateOfBirthError,
  setYearDateOfBirth,
  setYearDateOfBirthError,
  setShowShippingForm,
  setIdAddressPicture,
  setIdTaxPicture
} = personalDataSlice.actions;

export default personalDataSlice.reducer;
