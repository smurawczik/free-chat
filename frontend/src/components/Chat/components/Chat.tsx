import { styled } from "@mui/material/styles";

const StyledChatContainer = styled("div")(() => ({
  flex: 0.7,
}));

export const Chat = () => {
  return (
    <StyledChatContainer>
      <div> chat header (contact details) + chat actions </div>
      <div> chat messages history (infinite scroll?) </div>
      <div> chat input (send text, image?, emojis?) </div>
    </StyledChatContainer>
  );
};
