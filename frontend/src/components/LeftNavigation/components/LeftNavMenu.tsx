import {
  ContactsOutlined,
  HistoryOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledLeftNavMenu = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
}));

const StyledIconButton = styled(IconButton)(() => ({
  opacity: 0.7,
  color: "white",
  "&:hover": {
    opacity: 1,
  },
}));

export const LeftNavMenu = () => {
  return (
    <>
      <StyledLeftNavMenu>
        <StyledIconButton>
          <HistoryOutlined />
        </StyledIconButton>
        <StyledIconButton>
          <Inventory2Outlined />
        </StyledIconButton>
        <StyledIconButton>
          <ContactsOutlined />
        </StyledIconButton>
      </StyledLeftNavMenu>
      <Box> chat list </Box>
      <div> chat list </div>
      <div> chat list </div>
      <div> chat list </div>
    </>
  );
};
