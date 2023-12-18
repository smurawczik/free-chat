import { styled } from "@mui/material/styles";
import { useChatSocket } from "../../../hooks/useChatSocket";
import Box from "@mui/material/Box";
import { ChatInput } from "./ChatInput";

const StyledChatContainer = styled("div")(() => ({
  flex: 0.7,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const Chat = () => {
  useChatSocket();

  return (
    <StyledChatContainer>
      <div> chat header (contact details) + chat actions </div>
      <Box flex={1}> chat messages history (infinite scroll?) </Box>
      <ChatInput />
    </StyledChatContainer>
  );
};
