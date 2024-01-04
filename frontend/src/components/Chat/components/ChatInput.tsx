import { SendRounded } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatThunks } from "../../../store/slices/chat/chat.slice.thunks";
import { ChatVoiceInput } from "./ChatVoiceInput";
import { StyledChatIconButton } from "./StyledChatIconButton";
import { chatApi } from "../../../api/chat";
import { uiSelectors } from "../../../store/slices/ui/ui.slice.selectors";

const StyledChatInput = styled("input")(() => ({
  width: "100%",
  border: "none",
  backgroundColor: "transparent",
  "&:focus": {
    outline: "none",
  },
}));

const StyledChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: grey[300],
  padding: theme.spacing(1),
  boxSizing: "border-box",
  gap: theme.spacing(1),
}));

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector(uiSelectors.isChatRecording);
  const [message, setMessage] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "" && !audioBlob) return;
    if (audioBlob) {
      const audioFileUploadResponse = await sendAudio();
      if (audioFileUploadResponse) {
        setMessage("");
        setAudioBlob(null);
        dispatch(
          chatThunks.sendChatMessage({
            message: "",
            audioPath: audioFileUploadResponse,
          })
        );
      }
    } else {
      setAudioBlob(null);
      setMessage("");
      dispatch(chatThunks.sendChatMessage({ message }));
    }
  };

  const sendAudio = async () => {
    try {
      if (!audioBlob) return;

      const sentAudioResponse = await chatApi.sendAudioMessage(audioBlob);
      return sentAudioResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const onAudioRecorded = (audioBlob: Blob) => {
    setAudioBlob(audioBlob);
  };

  return (
    <StyledChatContainer>
      <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
        {!isRecording && !audioBlob ? (
          <StyledChatInput
            placeholder="Type your message here..."
            type="text"
            value={message}
            onChange={handleChange}
          />
        ) : audioBlob ? (
          <audio
            src={URL.createObjectURL(audioBlob)}
            controls
            style={{ width: "100%", height: "34px", marginRight: "8px" }}
          />
        ) : null}
        <StyledChatIconButton type="submit" size="small" disabled={isRecording}>
          <SendRounded />
        </StyledChatIconButton>
      </form>
      <ChatVoiceInput onAudioRecorded={onAudioRecorded} />
    </StyledChatContainer>
  );
};
