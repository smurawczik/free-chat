import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { parseISO } from "date-fns";
import { FC } from "react";
import type { Contact as ContactType } from "../../../store/slices/user/user.slice.types";
import { StyledAvatar } from "./StyledAvatar";
import { StyledBadge } from "./StyledBadge";
import { StyledListItem } from "./StyledListItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setConversation } from "../../../store/slices/chat/chat.slice";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";

export const Contact: FC<{ contact: ContactType }> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.userProfile);

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const parsedDate = parseISO(contact.lastConnection ?? "");

  const connected30MinAgo = parsedDate > thirtyMinutesAgo;
  const connected10MinAgo = parsedDate > tenMinutesAgo;

  const isPending = contact.status === "pending";

  return (
    <StyledListItem
      onClick={() => {
        if (!user?.id) return;

        dispatch(
          setConversation({
            _id: "",
            messages: [],
            users: {
              to: contact.id,
              from: user.id,
            },
          })
        );
      }}
    >
      <ListItemButton disabled={isPending}>
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
            isPending
              ? "Offline - Pending contact request"
              : connected10MinAgo
              ? "Online"
              : connected30MinAgo
              ? "Away"
              : "Offline"
          }
        />
      </ListItemButton>
    </StyledListItem>
  );
};
