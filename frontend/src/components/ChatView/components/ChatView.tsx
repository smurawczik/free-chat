import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { Chat } from "../../Chat";
import { NoChat } from "../../NoChat";

export const ChatView = () => {
  const hasChat = useAppSelector(chatSelectors.hasChat);

  if (!hasChat) {
    return <NoChat />;
  }

  return <Chat />;
};
