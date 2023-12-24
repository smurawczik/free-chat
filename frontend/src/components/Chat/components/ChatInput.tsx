import { SendRounded } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { chatThunks } from "../../../store/slices/chat/chat.slice.thunks";

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
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") return;
    setMessage("");
    dispatch(chatThunks.sendChatMessage({ message }));
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
