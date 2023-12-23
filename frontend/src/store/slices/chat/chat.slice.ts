import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatData, ChatState } from "./chat.slice.types";

const initialState: ChatState = {
  conversation: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<ChatData>) => {
      state.conversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatData["messages"][0]>) => {
      if (state.conversation) {
        state.conversation.messages.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConversation, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
