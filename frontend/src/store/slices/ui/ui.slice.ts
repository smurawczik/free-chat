import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UIDialogs, UINavs, UIState } from "./ui.slice.types";

const initialState: UIState = {
  dialogs: {
    addContact: false,
  },
  navs: {
    contactInfo: false,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDialogState: (
      state,
      action: PayloadAction<{ name: UIDialogs; status: boolean }>
    ) => {
      state.dialogs[action.payload.name] = action.payload.status;
    },
    setNavState: (
      state,
      action: PayloadAction<{ name: UINavs; status: boolean }>
    ) => {
      state.navs[action.payload.name] = action.payload.status;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDialogState } = uiSlice.actions;

export default uiSlice.reducer;
