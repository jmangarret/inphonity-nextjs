import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invitation, invitationsApi} from "@/lib/services/invitationsApi";
import { plansApi } from "@/lib/services/plansApi";
import { Plan, Status, Type } from '@/types/plans';

const initialState: Plan = {
  id: 2,
  isPaid: false,
  supportEsim: false,
  price: 0,
  name: '',
  user_id: null,
  type: Type.Plan,
  internet: "",
  share_data: 0,
  minutes: 0,
  sms: 0,
  duration: 0,
  background: "",
  has_wa: 0,
  has_ig: 0,
  has_fb: 0,
  has_fm: 0,
  has_tt: 0,
  has_x: 0,
  has_tl: 0,
  has_sc: 0,
  portability_promo: "",
  code: "",
  status: Status.Active,
  created_at: "",
  updated_at: "",
  deleted_at: null
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
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(plansApi.endpoints.getPlans.matchFulfilled, (state, action: PayloadAction<Plan[]>) => {
      const planes = action.payload;
      const currentPlan = planes.find(plan => plan.id == state.id && plan.type == 'plan');
      if (currentPlan){
        state.isPaid = currentPlan?.isPaid
        state.supportEsim= currentPlan?.supportEsim
        state.price= currentPlan?.price
        state.name= currentPlan?.name
        state.user_id= currentPlan?.user_id
        state.type= currentPlan?.type
        state.internet= currentPlan?.internet
        state.share_data= currentPlan?.share_data
        state.minutes= currentPlan?.minutes
        state.sms= currentPlan?.sms
        state.duration= currentPlan?.duration
        state.background= currentPlan?.background
        state.has_wa= currentPlan?.has_wa
        state.has_ig= currentPlan?.has_ig
        state.has_fb= currentPlan?.has_fb
        state.has_fm= currentPlan?.has_fm
        state.has_tt= currentPlan?.has_tt
        state.has_x= currentPlan?.has_x
        state.has_tl= currentPlan?.has_tl
        state.has_sc= currentPlan?.has_sc
        state.portability_promo= currentPlan?.portability_promo
        state.code= currentPlan?.code
        state.status= currentPlan?.status
      }
    }),
    builder.addMatcher(invitationsApi.endpoints.getInvitationById.matchFulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;
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
  setPrice,
  setName
} = planSlice.actions;

export default planSlice.reducer;
