import { styled } from "@mui/material/styles";

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  fontWeight: 500,
  padding: theme.spacing(1.25, 1),
  boxSizing: "border-box",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.9)",
  borderRadius: theme.spacing(0.5),
  "&::placeholder": {
    color: "rgba(255,255,255,0.6)",
  },
}));
