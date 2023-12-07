import { styled } from "@mui/material/styles";

const StyledRightNavigation = styled("div")(() => ({
  flex: 0.3,
}));

export const RightNavigation = () => {
  return (
    <StyledRightNavigation>
      <div>contextual navigation</div>
      <div>contact details</div>
      <div>file details</div>
      <div>chat details</div>
    </StyledRightNavigation>
  );
};
