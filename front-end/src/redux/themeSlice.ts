import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "constants/local-storage-keys";

interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: localStorage.getItem(localStorageKeys.mode) as PaletteMode,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem(localStorageKeys.mode, newMode);
      state.mode = newMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
