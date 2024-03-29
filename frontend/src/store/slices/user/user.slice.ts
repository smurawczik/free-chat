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
    updateLastConnection: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.lastConnection = action.payload;
      }
    },
    updateContactLastConnection: (
      state,
      action: PayloadAction<{ contactId: string; lastConnection: string }>
    ) => {
      const { contactId, lastConnection } = action.payload;

      if (contactId === state.profile?.id) return;

      const contact = state.contacts.find(
        (contact) => contact.id === contactId
      );

      if (contact) {
        contact.lastConnection = new Date(lastConnection).toISOString();
      }
    },
    updateContactStatus: (
      state,
      action: PayloadAction<{ contactId: string; status: Contact["status"] }>
    ) => {
      const { contactId, status } = action.payload;

      if (contactId === state.profile?.id) return;

      const contact = state.contacts.find(
        (contact) => contact.id === contactId
      );

      if (contact) {
        contact.status = status;
      }
    },
    removeContactById: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setUserContacts,
  addNewContact,
  updateLastConnection,
  updateContactLastConnection,
  updateContactStatus,
  removeContactById,
} = userSlice.actions;

export default userSlice.reducer;
