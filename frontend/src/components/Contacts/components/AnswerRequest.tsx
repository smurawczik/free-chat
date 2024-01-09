import {
  CheckCircleOutlineOutlined,
  HighlightOffOutlined,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { green, red } from "@mui/material/colors";
import { FC } from "react";
import { Contact } from "../../../store/slices/user/user.slice.types";
import { contactsApi } from "../../../api/contacts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import {
  removeContactById,
  updateContactStatus,
} from "../../../store/slices/user/user.slice";

export const AnswerRequest: FC<{ contact: Contact }> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const ownId = useAppSelector(userSelectors.userProfile)?.id;

  if (!ownId) return null;

  const onAccept = async () => {
    try {
      const acceptContact = await contactsApi.acceptContact(contact.id);
      if (!acceptContact) {
        throw new Error("Something went wrong");
      }

      contactsApi.acceptContactEvent(ownId);
      dispatch(
        updateContactStatus({ contactId: contact.id, status: "accepted" })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDecline = async () => {
    try {
      const rejectContact = await contactsApi.rejectContact(contact.id);
      if (!rejectContact) {
        throw new Error("Something went wrong");
      }

      contactsApi.rejectContactEvent(ownId);
      dispatch(removeContactById(contact.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();

          onAccept();
        }}
        sx={{ color: green[300], p: 0.25 }}
      >
        <CheckCircleOutlineOutlined />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();

          onDecline();
        }}
        sx={{ color: red[300], p: 0.25 }}
      >
        <HighlightOffOutlined />
      </IconButton>
    </>
  );
};
