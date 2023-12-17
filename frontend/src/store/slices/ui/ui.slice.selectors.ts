import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UIDialogs } from "./ui.slice.types";

const uiSelector = createSelector(
  (state: RootState) => state,
  (state) => state.ui
);

export const uiSelectors = {
  isModalOpen: (key: UIDialogs) =>
    createSelector(uiSelector, (state) => Boolean(state.dialogs[key])),
};
