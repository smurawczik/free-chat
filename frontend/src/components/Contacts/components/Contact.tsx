import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { parseISO } from "date-fns";
import { FC } from "react";
import { chatApi } from "../../../api/chat";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setConversation } from "../../../store/slices/chat/chat.slice";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import type { Contact as ContactType } from "../../../store/slices/user/user.slice.types";
import { AnswerRequest } from "./AnswerRequest";
import { StyledAvatar } from "./StyledAvatar";
import { StyledBadge } from "./StyledBadge";
import { StyledListItem } from "./StyledListItem";

export const Contact: FC<{ contact: ContactType }> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.userProfile);

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const parsedDate = parseISO(contact.lastConnection ?? "");

  const connected30MinAgo = parsedDate > thirtyMinutesAgo;
  const connected10MinAgo = parsedDate > tenMinutesAgo;

  const isPending = contact.status === "pending";
  const needAnswer = contact.status === "answer";

  const getOrCreateConversation = async () => {
    if (!user?.id || isPending || needAnswer) return;

    try {
      const conversation = await chatApi.getOrCreateConversation({
        firstParticipant: user.id,
        secondParticipant: contact.id,
      });

      if (conversation) {
        dispatch(setConversation({ ...conversation }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledListItem onClick={getOrCreateConversation}>
      <ListItemButton disabled={isPending} disableRipple={needAnswer}>
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            online={isPending ? false : connected10MinAgo}
            away={isPending ? false : connected30MinAgo}
          >
            <StyledAvatar>
              {contact.firstName[0]}
              {contact.lastName[0]}
            </StyledAvatar>
          </StyledBadge>
        </ListItemAvatar>
        <ListItemText
          primary={`${contact.firstName} ${contact.lastName}`}
          secondary={
            needAnswer ? (
              <AnswerRequest contact={contact} />
            ) : isPending ? (
              "Offline - Pending contact request"
            ) : connected10MinAgo ? (
              "Online"
            ) : connected30MinAgo ? (
              "Away"
            ) : (
              "Offline"
            )
          }
        />
      </ListItemButton>
    </StyledListItem>
  );
};
