import { IconButton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const StyledHeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: deepPurple[50],
  "&:hover": {
    backgroundColor: deepPurple[100],
  },
}));
