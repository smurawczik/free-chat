import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== "online" && prop !== "away",
})<{ online?: boolean; away?: boolean }>(({ theme, online, away }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: online ? "#44b700" : away ? "#ff9800" : "#aaaaaa",
    color: online ? "#44b700" : away ? "#ff9800" : "#aaaaaa",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: online ? "ripple 2s infinite ease-in-out" : "none",
      border: online ? "1px solid currentColor" : "none",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "50%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },
}));
