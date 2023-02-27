import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../types";

type DynamicType = {
  accountId: string | null;
  hotelId: string | null;
};

const initialState: DynamicType = {
  accountId: null,
  hotelId: null,
};

export const dynamicSlice = createSlice({
  name: "dynamic",
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<DynamicType["accountId"]>) => {
      state.accountId = action.payload;
    },
    setHotelId: (state, action: PayloadAction<DynamicType["hotelId"]>) => {
      state.hotelId = action.payload;
    },
  },
});

export const { setAccountId, setHotelId } = dynamicSlice.actions;

export const selectDynamic = (state: AppState) => state.dynamic;

export default dynamicSlice.reducer;
