import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";
import { differenceInYears } from 'date-fns';

export interface PersonalData {
  name: string;
  nameError: string;
  lastName: string;
  lastNameError: string;
  secondLastName: string;
  secondLastNameError: string;
  phone: string;
  phoneError: string;
  email: string;
  emailError: string;
  curp: string;
  curpError: string;
  gender: string;
  genderError: string;
  idFrontPicture: string;
  idFrontPictureError: string;
  idBackPicture: string;
  idBackPictureError: string;
  dateOfBirth: string;
  dateOfBirthError: string;
  showShippingForm: boolean;
}

const initialState: PersonalData = {
  name: "",
  nameError: "",
  lastName: "",
  lastNameError: "",
  secondLastName: "",
  secondLastNameError: "",
  phone: "",
  phoneError: "",
  email: "",
  emailError: "",
  curp: "",
  curpError: "",
  gender: "",
  genderError: "",
  idFrontPicture: "",
  idFrontPictureError: "",
  idBackPicture: "",
  idBackPictureError: "",
  dateOfBirth: "",
  dateOfBirthError: "",
  showShippingForm: false,
}

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    resetPersonalData: (state) => {
      state.name = "";
      state.nameError = "";
      state.lastName = "";
      state.lastNameError = "";
      state.secondLastName = "";
      state.secondLastNameError = "";
      state.phone = "";
      state.phoneError = "";
      state.email = "";
      state.emailError = "";
      state.curp = "";
      state.curpError = "";
      state.gender = "";
      state.genderError = "";
      state.idFrontPicture = "";
      state.idFrontPictureError = "";
      state.idBackPicture = "";
      state.idBackPictureError = "";
      state.dateOfBirth = "";
      state.dateOfBirthError = "";
      state.showShippingForm = false;
    },
    resetErrors: (state) => {
      state.nameError = "";
      state.lastNameError = "";
      state.secondLastNameError = "";
      state.phoneError = "";
      state.emailError = "";
      state.curpError = "";
      state.genderError = "";
      state.idFrontPictureError = "";
      state.idBackPictureError = "";
      state.dateOfBirthError = "";
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNameError: (state, action: PayloadAction<string>) => {
      state.nameError = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setLastNameError: (state, action: PayloadAction<string>) => {
      state.lastNameError = action.payload;
    },
    setSecondLastName: (state, action: PayloadAction<string>) => {
      state.secondLastName = action.payload;
    },
    setSecondLastNameError: (state, action: PayloadAction<string>) => {
      state.secondLastNameError = action.payload;
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
    setShowShippingForm: (state, action: PayloadAction<boolean>) => {
      state.showShippingForm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.name = invitation.pre_registration?.first_name || "";
      state.lastName = invitation.pre_registration?.last_name || "";
      state.secondLastName = invitation.pre_registration?.mother_last_name || "";
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
  setLastName,
  setLastNameError,
  setSecondLastName,
  setSecondLastNameError,
  setPhone,
  setPhoneError,
  setEmail,
  setEmailError,
  setCurp,
  setCurpError,
  setGender,
  setGenderError,
  setIdFrontPicture,
  setIdFrontPictureError,
  setIdBackPicture,
  setIdBackPictureError,
  setDateOfBirth,
  setDateOfBirthError,
  setShowShippingForm
} = personalDataSlice.actions;

export default personalDataSlice.reducer;
