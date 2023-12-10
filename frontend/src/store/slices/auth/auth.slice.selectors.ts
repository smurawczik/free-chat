import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const authSelector = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);

export const authSelectors = {
  authIsIdle: createSelector(authSelector, (state) => state.status === "idle"),
  authIsLoading: createSelector(
    authSelector,
    (state) => state.status === "loading"
  ),
  authIsSucceeded: createSelector(
    authSelector,
    (state) => state.status === "succeeded"
  ),
  authIsFailed: createSelector(
    authSelector,
    (state) => state.status === "failed"
  ),
};
