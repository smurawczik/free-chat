import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChatInput } from "./ChatInput";
import { ChatSingleton } from "../../../helpers/ChatSingleton";
import { useEffect } from "react";
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
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (currentConversation) {
      chatInstance.joinRoom(currentConversation.id);
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
