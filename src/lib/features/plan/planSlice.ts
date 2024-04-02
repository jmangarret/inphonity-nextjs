import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";

export interface Plan {
  id: number | null;
  isPaid: boolean;
  supportEsim?: boolean;
}

const initialState: Plan = {
  id: 2,
  isPaid: false,
  supportEsim: false,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setIsPaid: (state, action: PayloadAction<boolean>) => {
      state.isPaid = action.payload;
    },
    setSupportEsim: (state, action: PayloadAction<boolean>) => {
      state.supportEsim = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;

      state.id = action.payload.pre_registration?.product_id || 2;

      if (invitation.pre_registration?.payment_status === 'paid') {
        state.isPaid = true;
      }
    });
  },
});

export const {
  setPlan,
  setIsPaid,
  setSupportEsim,
} = planSlice.actions;

export default planSlice.reducer;
