import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";

export const ChatMessages = () => {
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  if (!currentConversation) return null;

  return (
    <Box flex={1}>
      {currentConversation.messages.map((message) => (
        <div key={message.timestamp}>{message.message}</div>
      ))}
    </Box>
  );
};
