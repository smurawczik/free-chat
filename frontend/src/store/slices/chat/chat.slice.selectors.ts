import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const chatSelector = createSelector(
  (state: RootState) => state,
  (state) => state.chat
);

export const chatSelectors = {
  hasChat: createSelector(chatSelector, (chat) => !!chat.conversation),
};
