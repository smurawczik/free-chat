import Box from "@mui/material/Box";
import { NewChat } from "../../NewChat/components/NewChat";

export const LeftNavHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={2}
    >
      <div>user profile</div>
      <NewChat />
    </Box>
  );
};
