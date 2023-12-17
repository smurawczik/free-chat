import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0),
  borderRadius: theme.spacing(0.5),
}));
