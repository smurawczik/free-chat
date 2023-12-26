import { styled } from "@mui/material/styles";

export const StyledConnectionBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "online" && prop !== "away",
})<{
  online: boolean;
  away: boolean;
}>(({ theme, online, away }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRadius: "50%",
  backgroundColor: online
    ? theme.palette.success.main
    : away
    ? theme.palette.warning.main
    : theme.palette.grey[500],
  border: `2px solid #CCC`,
  zIndex: 1,
}));
