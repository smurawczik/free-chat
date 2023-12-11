import Box from "@mui/material/Box";
import { NewChat } from "../../NewChat";
import { AddContact } from "../../AddContact";
import { UserProfile } from "../../UserProfile";

export const LeftNavHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
    >
      <UserProfile />
      <Box gap={1} display="flex">
        <AddContact />
        <NewChat />
      </Box>
    </Box>
  );
};
