import { List } from "@mui/material";
import Box from "@mui/material/Box";
import { useUserContacts } from "../../../hooks/useUserContacts";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { Contact } from "./Contact";
import { NoContacts } from "./NoContacts";
import { AddContactDialog } from "../../AddContactDialog";

export const Contacts = () => {
  useUserContacts();

  const contacts = useAppSelector(userSelectors.userContacts);

  return (
    <Box>
      <AddContactDialog />
      {!contacts?.length ? (
        <NoContacts />
      ) : (
        <List dense>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </List>
      )}
    </Box>
  );
};
