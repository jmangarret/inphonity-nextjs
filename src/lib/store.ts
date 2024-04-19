import { configureStore } from '@reduxjs/toolkit'
import personalDataReducer from '@/lib/features/personal-data/personalDataSlice';
import shippingReducer from '@/lib/features/shipping/shippingSlice';
import taxDataReducer from '@/lib/features/tax-data/taxDataSlice';
import accountDataReducer from "@/lib/features/account-data/accountDataSlice";
import planReducer from "@/lib/features/plan/planSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import {invitationsApi} from "@/lib/services/invitationsApi";
import {registersApi} from "@/lib/services/registersApi";
import {validateImeiApi} from "@/lib/services/validateCompatibilityApi";
import { plansApi } from './services/plansApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      personalData: personalDataReducer,
      shipping: shippingReducer,
      taxData: taxDataReducer,
      accountData: accountDataReducer,
      plan: planReducer,
      [invitationsApi.reducerPath]: invitationsApi.reducer,
      [registersApi.reducerPath]: registersApi.reducer,
      [validateImeiApi.reducerPath]: validateImeiApi.reducer,
      [plansApi.reducerPath]: plansApi.reducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        invitationsApi.middleware,
        registersApi.middleware,
        validateImeiApi.middleware,
        plansApi.middleware
      ]),
  })
}

setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
