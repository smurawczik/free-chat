import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const userSelector = createSelector(
  (state: RootState) => state,
  (state) => state.user
);

export const userSelectors = {
  hasUser: createSelector(userSelector, (user) => user.profile !== null),
  userProfile: createSelector(userSelector, (user) => user.profile),
};
