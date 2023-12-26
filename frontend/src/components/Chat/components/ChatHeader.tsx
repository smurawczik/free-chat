import { VideoChatOutlined, WifiCallingOutlined } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { deepPurple } from "@mui/material/colors";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { LastConnectionBadge } from "./LastConnectionBadge";

const StyledHeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: deepPurple[50],
  "&:hover": {
    backgroundColor: deepPurple[100],
  },
}));

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
        <StyledHeaderIconButton size="small">
          <WifiCallingOutlined />
        </StyledHeaderIconButton>
        <StyledHeaderIconButton size="small">
          <VideoChatOutlined />
        </StyledHeaderIconButton>
      </Box>
    </Box>
  );
};
