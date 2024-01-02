import IconButton from "@mui/material/IconButton";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const StyledChatIconButton = styled(IconButton)(() => ({
  color: "white",
  backgroundColor: deepPurple["300"],
  "&:hover": {
    backgroundColor: deepPurple["400"],
    color: deepOrange["100"],
  },
}));
