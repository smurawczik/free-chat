import { PersonAddOutlined } from "@mui/icons-material";
import { StyledIconButton } from "../../StyledIconButton";

export const AddContact = () => {
  return (
    <StyledIconButton tooltip="Add contacts">
      <PersonAddOutlined />
    </StyledIconButton>
  );
};
