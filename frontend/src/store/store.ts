import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice";
import chatReducer from "./slices/chat/chat.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
