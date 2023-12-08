import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "./chat.slice.types";

const initialState: ChatState = {
  conversation: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default chatSlice.reducer;
