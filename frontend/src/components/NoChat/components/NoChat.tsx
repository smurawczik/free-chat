import { styled } from "@mui/material/styles";

const StyledNoChatContainer = styled("div")(() => ({
  flex: 0.7,
}));

export const NoChat = () => {
  return (
    <StyledNoChatContainer>
      <div> no chat view </div>
    </StyledNoChatContainer>
  );
};
