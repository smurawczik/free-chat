import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Contact, User, UserState } from "./user.slice.types";

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
        lastConnection: action.payload.lastConnection,
      };
    },
    setUserContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addNewContact: (state, action: PayloadAction<User>) => {
      state.contacts.push({ ...action.payload, status: "pending" });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserContacts, addNewContact } = userSlice.actions;

export default userSlice.reducer;
