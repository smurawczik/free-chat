import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { addMessage } from "./chat.slice";

const sendChatMessage = createAsyncThunk<
  void,
  { message: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("chat/sendChatMessage", ({ message }, { getState, dispatch }) => {
  const userId = getState().user.profile?.id;

  dispatch(
    addMessage({
      id: "",
      userId: userId!,
      message,
      timestamp: new Date().toISOString(),
    })
  );

  return;
});

export const chatThunks = {
  sendChatMessage,
};
