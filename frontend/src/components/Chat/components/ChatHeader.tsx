import { VideoChatOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { VoiceCall } from "../../VoiceCall/components/VoiceCall";
import { LastConnectionBadge } from "./LastConnectionBadge";
import { StyledHeaderIconButton } from "./StyledHeaderIconButton";

export const ChatHeader = () => {
  const currentConversation = useAppSelector(chatSelectors.currentConversation);
  const currentUser = useAppSelector(userSelectors.userProfile);

  if (!currentConversation) return null;

  const contactDetails = currentConversation.participants.find(
    (participant) => participant.id !== currentUser?.id
  );

  if (!contactDetails) return null;

  return (
    <Box
      boxShadow={3}
      px={2}
      py={3}
      zIndex={1}
      width="100%"
      display="flex"
      alignItems="center"
      boxSizing="border-box"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <LastConnectionBadge contactId={contactDetails.id} />
        {contactDetails.firstName} {contactDetails.lastName}
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <VoiceCall />
        <StyledHeaderIconButton size="small">
          <VideoChatOutlined />
        </StyledHeaderIconButton>
      </Box>
    </Box>
  );
};
