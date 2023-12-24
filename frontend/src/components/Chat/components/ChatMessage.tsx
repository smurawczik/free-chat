import Box from "@mui/material/Box";
import format from "date-fns/format";
import { FC } from "react";
import { useAppSelector } from "../../../store/hooks";
import type { ChatMessage as Message } from "../../../store/slices/chat/chat.slice.types";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";

export const ChatMessage: FC<{ message: Message; showHour: boolean }> = ({
  message,
  showHour,
}) => {
  const userId = useAppSelector(userSelectors.userProfile)?.id;
  const isOwnMessage = message?.sender?.id === userId;

  if (!userId || !message?.sender) return null;

  const sentHour = format(new Date(message.timestamp), "HH:mm");

  return (
    <Box
      display="flex"
      justifyContent={isOwnMessage ? "start" : "end"}
      pb={0.5}
      px={0.5}
    >
      <Box display="flex" flexDirection="column">
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
        {showHour && <small>{sentHour}</small>}
      </Box>
    </Box>
  );
};
