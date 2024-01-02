import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { ChatSingleton } from "../../../helpers/ChatSingleton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addMessage } from "../../../store/slices/chat/chat.slice";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

const StyledChatContainer = styled("div")(() => ({
  flex: 0.7,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const chatInstance = ChatSingleton.getInstance();

export const Chat = () => {
  const dispatch = useAppDispatch();
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (currentConversation) {
      chatInstance.connect();
      chatInstance.joinRoom(currentConversation.id);
      chatInstance.onMessageReceived(({ message }) => {
        dispatch(addMessage(message));
      });
    }
  }, [currentConversation, dispatch]);

  return (
    <StyledChatContainer>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </StyledChatContainer>
  );
};
