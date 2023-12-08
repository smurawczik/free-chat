import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../store/hooks";
import { chatSelectors } from "../../../store/slices/chat/chat.slice.selectors";

const StyledRightNavigation = styled("div")(() => ({
  flex: 0.3,
}));

export const RightNavigation = () => {
  // TODO: this is not the correct condition
  const hasChat = useAppSelector(chatSelectors.hasChat);

  if (!hasChat) return null;

  return (
    <StyledRightNavigation>
      <div>contextual navigation</div>
      <div>contact details</div>
      <div>file details</div>
      <div>chat details</div>
    </StyledRightNavigation>
  );
};
