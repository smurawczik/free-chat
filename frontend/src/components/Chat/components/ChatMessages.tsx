import format from "date-fns/format";
import { groupBy } from "lodash";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { ChatMessage } from "./ChatMessage";
import { ChatMessagesContainer } from "./ChatMessagesContainer";

export const ChatMessages = () => {
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  if (!currentConversation) return null;

  const groupedMessages = groupBy(currentConversation.messages, (message) => {
    return [
      format(new Date(message.timestamp), "dd/MM/yyyy HH:mm"),
      message.sender.id,
    ];
  });

  console.log({ groupedMessages });

  return (
    <ChatMessagesContainer>
      {currentConversation.messages.map((message, i) => {
        // this logic needs to be updated to check if the next message is from the same user
        const messagesLength = currentConversation.messages.length - 1;
        const nextMessage =
          currentConversation.messages?.[i < messagesLength ? i + 1 : i];

        const isSamerUser = nextMessage?.sender.id === message.sender.id;

        const nextHour = format(new Date(nextMessage.timestamp), "HH:mm");
        const hour = format(new Date(message.timestamp), "HH:mm");

        return (
          <ChatMessage
            key={`${message.id}-${message.timestamp}-${i}`}
            message={message}
            showHour={nextHour !== hour || !isSamerUser || i === messagesLength}
          />
        );
      })}
    </ChatMessagesContainer>
  );
};
