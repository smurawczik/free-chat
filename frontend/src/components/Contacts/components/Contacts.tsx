import { List, ListItemAvatar, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import { useUserContacts } from "../../../hooks/useUserContacts";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { StyledAvatar } from "./StyledAvatar";
import { StyledListItem } from "./StyledListItem";

export const Contacts = () => {
  useUserContacts();

  const contacts = useAppSelector(userSelectors.userContacts);

  return (
    <Box>
      <List dense>
        {contacts.map((contact) => (
          <StyledListItem>
            <ListItemAvatar>
              <StyledAvatar sx={{ backgroundColor: deepOrange["300"] }}>
                {contact.firstName[0]}
                {contact.lastName[0]}
              </StyledAvatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${contact.firstName} ${contact.lastName}`}
            />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
};
