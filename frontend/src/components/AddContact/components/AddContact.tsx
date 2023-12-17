import { PersonAddOutlined } from "@mui/icons-material";
import { StyledIconButton } from "../../StyledIconButton";
import { FC } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setDialogState } from "../../../store/slices/ui/ui.slice";

export const AddContact: FC<{ tooltip?: string }> = ({ tooltip }) => {
  const dispatch = useAppDispatch();

  const onAddContact = () => {
    dispatch(setDialogState({ name: "addContact", status: true }));
  };

  return (
    <StyledIconButton
      tooltip={tooltip ?? "Add contacts"}
      onClick={onAddContact}
    >
      <PersonAddOutlined />
    </StyledIconButton>
  );
};
