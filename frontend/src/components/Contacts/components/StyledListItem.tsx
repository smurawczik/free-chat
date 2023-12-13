import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.25),
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
}));
