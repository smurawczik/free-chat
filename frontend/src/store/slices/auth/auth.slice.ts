import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./auth.slice.types";

const initialState: AuthState = { status: "idle" };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthState["status"]>) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
