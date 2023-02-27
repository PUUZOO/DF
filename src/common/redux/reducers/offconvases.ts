import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types";

export type Offconvases = {
  settingsProfileOffcanvas: boolean;
};

const initialStateModals: Offconvases = {
  settingsProfileOffcanvas: false,
};

export const offconvasesSlice = createSlice({
  name: "offconvases",
  initialState: initialStateModals,
  reducers: {
    toggleSettingsProfileOffcanvas: (state) => {
      state.settingsProfileOffcanvas = !state.settingsProfileOffcanvas;
    },
  },
});

export const { toggleSettingsProfileOffcanvas } = offconvasesSlice.actions;

export const selectOffconvases = (state: AppState) => state.offconvases;

export default offconvasesSlice.reducer;
