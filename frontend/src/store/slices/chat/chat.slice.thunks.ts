import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { addMessage } from "./chat.slice";
import { ChatMessage } from "./chat.slice.types";
import { ChatSingleton } from "../../../helpers/ChatSingleton";

const chatInstance = ChatSingleton.getInstance();

const sendChatMessage = createAsyncThunk<
  void,
  { message: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("chat/sendChatMessage", ({ message }, { getState, dispatch }) => {
  const userId = getState().user.profile?.id;

  if (!userId) {
    return;
  }

  const chatMessage: ChatMessage = {
    userId,
    message,
    timestamp: new Date().toUTCString(),
  };

  chatInstance.sendMessage(chatMessage);

  dispatch(addMessage(chatMessage));
});

export const chatThunks = {
  sendChatMessage,
};
