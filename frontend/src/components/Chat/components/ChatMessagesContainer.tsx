import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";

const StyledChatMessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1),
  height: "100%",
  overflow: "auto",
}));

export const ChatMessagesContainer: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (containerRef.current && currentConversation?.messages.length) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentConversation?.messages.length]);

  return (
    <StyledChatMessagesContainer ref={containerRef}>
      {children}
    </StyledChatMessagesContainer>
  );
};
