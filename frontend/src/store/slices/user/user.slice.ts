import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./user.slice.types";

const initialState: UserState = { profile: null, contacts: [] };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.profile = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        id: action.payload.id,
      };
    },
    setUserContacts: (state, action: PayloadAction<User[]>) => {
      state.contacts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserContacts } = userSlice.actions;

export default userSlice.reducer;
