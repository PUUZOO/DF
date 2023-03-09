import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types";

export type Offconvases = {
  settingsProfileOffcanvas: boolean;
  addOrderOffcanvas: boolean;
};

const initialStateModals: Offconvases = {
  settingsProfileOffcanvas: false,
  addOrderOffcanvas: false,
};

export const offconvasesSlice = createSlice({
  name: "offconvases",
  initialState: initialStateModals,
  reducers: {
    toggleSettingsProfileOffcanvas: (state) => {
      state.settingsProfileOffcanvas = !state.settingsProfileOffcanvas;
    },
    toggleAddOrderOffcanvas: (state) => {
      state.addOrderOffcanvas = !state.addOrderOffcanvas;
    },
  },
});

export const { toggleSettingsProfileOffcanvas, toggleAddOrderOffcanvas } = offconvasesSlice.actions;

export const selectOffconvases = (state: AppState) => state.offconvases;

export default offconvasesSlice.reducer;
