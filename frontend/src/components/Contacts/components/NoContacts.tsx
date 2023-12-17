import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AddContact } from "../../AddContact";

export const NoContacts = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      py={1}
      pl={1}
    >
      <Typography variant="body1" color="white" fontSize={20} fontWeight={100}>
        No contacts <AddContact tooltip="Add new contacts" />
      </Typography>
    </Box>
  );
};
