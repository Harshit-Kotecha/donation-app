import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "constants/local-storage-keys";

export interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem(localStorageKeys.themeMode) ||
    "dark") as PaletteMode,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem(localStorageKeys.themeMode, newMode);
      state.mode = newMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
