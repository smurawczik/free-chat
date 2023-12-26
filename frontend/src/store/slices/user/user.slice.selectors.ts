import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const userSelector = createSelector(
  (state: RootState) => state,
  (state) => state.user
);

export const userSelectors = {
  hasUser: createSelector(userSelector, (user) => user.profile !== null),
  userProfile: createSelector(userSelector, (user) => user.profile),
  userContacts: createSelector(userSelector, (user) => user.contacts),
  userContactById: (contactId: string) =>
    createSelector(userSelector, (user) =>
      user.contacts.find((contact) => contact.id === contactId)
    ),
};
