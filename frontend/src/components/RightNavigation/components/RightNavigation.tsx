import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";
import { uiSelectors } from "../../../store/slices/ui/ui.slice.selectors";

const StyledRightNavigation = styled("div")(({ theme }) => ({
  flex: 0.3,
  boxShadow: theme.shadows[2],
  backgroundColor: "white",
}));

export const RightNavigation = () => {
  // TODO: this is not the correct condition
  const hasChat = useAppSelector(chatSelectors.hasChat);
  const isContactInfoOpen = useAppSelector(
    uiSelectors.isNavOpen("contactInfo")
  );

  if (!hasChat || !isContactInfoOpen) return null;

  return (
    <StyledRightNavigation>
      <small>contextual navigation</small>
      <small>contact details</small>
      <small>file details</small>
      <small>chat details</small>
    </StyledRightNavigation>
  );
};
