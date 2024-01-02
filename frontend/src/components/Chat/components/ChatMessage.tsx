import Box from "@mui/material/Box";
import { FC, useEffect, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import type { ChatMessage as Message } from "../../../store/slices/chat/chat.slice.types";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { MessageTimestamp } from "./MessageTimestamp";
import { chatApi } from "../../../api/chat";

export const ChatMessage: FC<{ message: Message; showHour: boolean }> = ({
  message,
  showHour,
}) => {
  const messageElmRef = useRef<HTMLDivElement>(null);
  const userId = useAppSelector(userSelectors.userProfile)?.id;
  const isOwnMessage = message?.sender?.id === userId;

  useEffect(() => {
    const fetchAudio = async () => {
      if (!message.audioPath) return;

      const audio = await chatApi.getAudioMessage(message.audioPath);
      const audioBlob = new Blob([audio], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = document.createElement("audio");
      audioElement.src = audioUrl;
      audioElement.preload = "auto";
      audioElement.controls = true;
      if (messageElmRef.current) {
        if (messageElmRef.current.children.length > 0) {
          messageElmRef.current.removeChild(messageElmRef.current.children[0]);
        }
        messageElmRef.current.appendChild(audioElement);
      }
    };

    fetchAudio();
  }, [message.audioPath]);

  if (!userId || !message?.sender) return null;

  return (
    <Box
      display="flex"
      justifyContent={isOwnMessage ? "end" : "start"}
      pb={0.5}
      px={0.5}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isOwnMessage ? "end" : "start"}
      >
        <Box
          sx={{
            backgroundColor: isOwnMessage ? "primary.light" : "#e5e5ea",
            color: isOwnMessage ? "primary.contrastText" : "text.primary",
            "& audio": {
              height: "24px",
              marginBottom: "-4px",
            },
          }}
          px={1}
          py={0.5}
          borderRadius={1}
          ref={messageElmRef}
        >
          {message.message}
        </Box>
        {showHour && <MessageTimestamp timestamp={message.timestamp} />}
      </Box>
    </Box>
  );
};
