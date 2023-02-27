import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../types";

type UserRole = {
  id: string;
  accountId: string | null;
  role: RoleType | "";
};

const initialState: UserRole = {
  id: "",
  accountId: null,
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { type: string; payload: UserRole }) => {
      if (action.payload) {
        state.id = action.payload.id;
        state.role = action.payload.role;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
