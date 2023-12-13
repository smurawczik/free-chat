import { ListItemAvatar, ListItemText } from "@mui/material";
import { parseISO } from "date-fns";
import { FC } from "react";
import { User } from "../../../store/slices/user/user.slice.types";
import { StyledAvatar } from "./StyledAvatar";
import { StyledListItem } from "./StyledListItem";
import { StyledBadge } from "./StyledBadge";

export const Contact: FC<{ contact: User }> = ({ contact }) => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const parsedDate = parseISO(contact.lastConnection ?? "");

  const connected30MinAgo = parsedDate > thirtyMinutesAgo;
  const connected10MinAgo = parsedDate > tenMinutesAgo;

  return (
    <StyledListItem>
      <ListItemAvatar>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          online={connected10MinAgo}
          away={connected30MinAgo}
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
          connected10MinAgo ? "Online" : connected30MinAgo ? "Away" : "Offline"
        }
      />
    </StyledListItem>
  );
};
