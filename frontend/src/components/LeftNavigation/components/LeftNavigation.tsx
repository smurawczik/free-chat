import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { ContactSearch } from "../../ContactSearch/components/ContactSearch";
import { LeftNavHeader } from "./LeftNavHeader";

const StyledLeftNavigation = styled("div")(({ theme }) => ({
  flex: 0.3,
  backgroundColor: deepPurple["A200"],
  color: "white",
  padding: theme.spacing(1, 2),
}));

export const LeftNavigation = () => {
  return (
    <StyledLeftNavigation>
      <LeftNavHeader />
      <ContactSearch />
      <div> navigation (contacts, archived, etc) </div>
      <div> chat list </div>
      <div> chat list </div>
      <div> chat list </div>
    </StyledLeftNavigation>
  );
};
