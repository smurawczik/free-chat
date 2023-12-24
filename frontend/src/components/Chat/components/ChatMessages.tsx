import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { ChatMessage } from "./ChatMessage";
import format from "date-fns/format";

export const ChatMessages = () => {
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  if (!currentConversation) return null;

  return (
    <Box flex={1} display="flex" flexDirection="column" px={1} py={0.5}>
      {currentConversation.messages.map((message, i) => {
        // this logic needs to be updated to check if the next message is from the same user
        const messagesLength = currentConversation.messages.length - 1;
        const nextHour = format(
          new Date(
            currentConversation.messages?.[
              i < messagesLength ? i + 1 : i
            ].timestamp
          ),
          "HH:mm"
        );
        const hour = format(new Date(message.timestamp), "HH:mm");

        return (
          <ChatMessage
            key={`${message.id}-${message.timestamp}-${i}`}
            message={message}
            showHour={nextHour !== hour || i === messagesLength}
          />
        );
      })}
    </Box>
  );
};
