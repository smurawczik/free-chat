import { SendRounded } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import { useState } from "react";

const StyledChatInput = styled("input")(() => ({
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
  "&:focus": {
    outline: "none",
  },
}));

const StyledChatContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  backgroundColor: grey[300],
  padding: theme.spacing(1),
  boxSizing: "border-box",
}));

const StyledIconButton = styled(IconButton)(() => ({
  color: "white",
  backgroundColor: deepPurple["300"],
  "&:hover": {
    backgroundColor: deepPurple["400"],
    color: deepOrange["100"],
  },
}));

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    setIsTyping(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") return;
    setMessage("");
    setIsTyping(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledChatContainer display="flex">
        <StyledChatInput
          placeholder="Type your message here..."
          type="text"
          value={message}
          onChange={handleChange}
        />
        <StyledIconButton type="submit" size="small">
          <SendRounded />
        </StyledIconButton>
      </StyledChatContainer>
    </form>
  );
};
