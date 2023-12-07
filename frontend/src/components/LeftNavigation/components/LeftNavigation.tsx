import { styled } from "@mui/material/styles";

const StyledLeftNavigation = styled("div")(() => ({
  flex: 0.3,
}));

export const LeftNavigation = () => {
  return (
    <StyledLeftNavigation>
      <div>user profile + start chat</div>
      <div> search bar </div>
      <div> navigation (contacts, archived, etc) </div>
      <div> chat list </div>
      <div> chat list </div>
      <div> chat list </div>
    </StyledLeftNavigation>
  );
};
