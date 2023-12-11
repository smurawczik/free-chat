import { AddOutlined } from "@mui/icons-material";
import { StyledIconButton } from "../../StyledIconButton";

export const NewChat = () => {
  return (
    <StyledIconButton tooltip="Start a conversation">
      <AddOutlined />
    </StyledIconButton>
  );
};
