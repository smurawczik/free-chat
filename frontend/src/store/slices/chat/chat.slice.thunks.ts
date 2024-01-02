import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { addMessage } from "./chat.slice";
import { ChatMessage } from "./chat.slice.types";
import { ChatSingleton } from "../../../helpers/ChatSingleton";

const chatInstance = ChatSingleton.getInstance();

const sendChatMessage = createAsyncThunk<
  void,
  { message: string; audioPath?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("chat/sendChatMessage", ({ message, audioPath }, { getState, dispatch }) => {
  const userProfile = getState().user.profile;

  if (!userProfile) {
    return;
  }

  const chatMessage: ChatMessage = {
    sender: {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
    },
    message,
    audioPath,
    timestamp: new Date().toUTCString(),
  };

  chatInstance.sendMessage(chatMessage);

  dispatch(addMessage(chatMessage));
});

export const chatThunks = {
  sendChatMessage,
};
