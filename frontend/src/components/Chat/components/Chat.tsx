import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { ChatSingleton } from "../../../helpers/ChatSingleton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { addMessage } from "../../../store/slices/chat/chat.slice";

const StyledChatContainer = styled("div")(() => ({
  flex: 0.7,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const chatInstance = ChatSingleton.getInstance();

export const Chat = () => {
  const chatInstantiated = useRef(false);
  const dispatch = useAppDispatch();
  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (currentConversation && !chatInstantiated.current) {
      chatInstantiated.current = true;

      chatInstance.joinRoom(currentConversation.id);
      chatInstance.onMessageReceived(({ message }) => {
        dispatch(addMessage(message));
        console.log("message received:", message);
      });
    }
  }, [currentConversation, dispatch]);

  return (
    <StyledChatContainer>
      <div> chat header (contact details) + chat actions </div>
      <ChatMessages />
      <ChatInput />
    </StyledChatContainer>
  );
};
