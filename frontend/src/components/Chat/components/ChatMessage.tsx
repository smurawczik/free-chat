import Box from "@mui/material/Box";
import { FC } from "react";
import { useAppSelector } from "../../../store/hooks";
import type { ChatMessage as Message } from "../../../store/slices/chat/chat.slice.types";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { MessageTimestamp } from "./MessageTimestamp";

export const ChatMessage: FC<{ message: Message; showHour: boolean }> = ({
  message,
  showHour,
}) => {
  const userId = useAppSelector(userSelectors.userProfile)?.id;
  const isOwnMessage = message?.sender?.id === userId;

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
          }}
          px={1}
          py={0.5}
          borderRadius={1}
        >
          {message.message}
        </Box>
        {showHour && <MessageTimestamp timestamp={message.timestamp} />}
      </Box>
    </Box>
  );
};
