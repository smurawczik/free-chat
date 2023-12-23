import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChatInput } from "./ChatInput";
import { ChatSingleton } from "../../../helpers/ChatSingleton";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";

const StyledChatContainer = styled("div")(() => ({
  flex: 0.7,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const chatInstance = ChatSingleton.getInstance();

export const Chat = () => {
  const chatInstantiated = useRef(false);
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (currentConversation && !chatInstantiated.current) {
      chatInstantiated.current = true;

      chatInstance.joinRoom(currentConversation.id);
      chatInstance.handleMessageReceived(({ message }) => {
        console.log("message received:", message);
      });
    }
  }, [currentConversation]);

  return (
    <StyledChatContainer>
      <div> chat header (contact details) + chat actions </div>
      <Box flex={1}> chat messages history (infinite scroll?) </Box>
      <ChatInput />
    </StyledChatContainer>
  );
};
