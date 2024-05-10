import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invitation, invitationsApi } from "@/lib/services/invitationsApi";
import { differenceInYears } from 'date-fns';

export interface PersonalData {
  name: string;
  nameError: string;
  lastName: string;
  lastNameError: string;
  secondLastName: string;
  secondLastNameError: string;
  occupation: string;
  occupationError: string;
  nationality: string;
  nationalityError: string;
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
  idAddressPictureError: string;
  idTaxPicture: string;
  idTaxPictureError: string;
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
  idTaxPicture: "",
  idAddressPictureError: "",
  idTaxPictureError: "",
  occupation: "",
  nationality: "",
  occupationError: "",
  nationalityError: "",
  lastName: "",
  lastNameError: "",
  secondLastName: "",
  secondLastNameError: ""
}

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    resetPersonalData: (state) => {
      state.name = "";
      state.lastName = "";
      state.secondLastName = "";
      state.phone = "";
      state.email = "";
      state.curp = "";
      state.gender = "";
      state.docType = "";
      state.idPassportPicture = "";
      state.idFrontPicture = "";
      state.idBackPicture = "";
      state.dateOfBirth = "";
      state.dayDateOfBirth = "";
      state.monthDateOfBirth = "";
      state.yearDateOfBirth = "";
      state.showShippingForm = false;
      state.idAddressPicture = "";
      state.idTaxPicture = "";
      state.occupation = "";
      state.nationality = "";
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
      state.dayDateOfBirthError = "";
      state.monthDateOfBirthError = "";
      state.yearDateOfBirthError = "";
      state.idAddressPictureError = "";
      state.idTaxPictureError = "";
      state.occupationError = "";
      state.nationalityError = "";
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
    setIdAddressPictureError: (state, action: PayloadAction<string>) => {
      state.idAddressPictureError = action.payload;
    },
    setIdTaxPicture: (state, action: PayloadAction<string>) => {
      state.idTaxPicture = action.payload;
    },
    setIdTaxPictureError: (state, action: PayloadAction<string>) => {
      state.idTaxPictureError = action.payload;
    },
    setOccupation: (state, action: PayloadAction<string>) => {
      state.occupation = action.payload;
    },
    setOccupationError: (state, action: PayloadAction<string>) => {
      state.occupationError = action.payload;
    },
    setNationality: (state, action: PayloadAction<string>) => {
      state.nationality = action.payload;
    },
    setNationalityError: (state, action: PayloadAction<string>) => {
      state.nationalityError = action.payload;
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
      state.nationality = invitation.pre_registration?.nationality || "";
      state.occupation = invitation.pre_registration?.occupation || "";
      state.idFrontPicture = invitation.pre_registration?.id_front_picture || "";
      state.idPassportPicture = invitation.pre_registration?.id_front_picture || "";
      state.idBackPicture = invitation.pre_registration?.id_back_picture || "";

      if (state.idFrontPicture && state.idBackPicture) {
        state.docType = "INE";
      } else if (state.idFrontPicture && !state.idBackPicture) {
        state.docType = "Passport";
      }

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
  setIdAddressPictureError,
  setIdTaxPicture,
  setIdTaxPictureError,
  setOccupation,
  setOccupationError,
  setNationality,
  setNationalityError
} = personalDataSlice.actions;

export default personalDataSlice.reducer;
