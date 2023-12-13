import {
  ContactsOutlined,
  HistoryOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Contacts } from "../../Contacts";
import { MenuItems } from "../types";

const StyledLeftNavMenu = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
}));

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== "active",
})<{ active?: boolean }>(({ active }) => ({
  opacity: active ? 1 : 0.7,
  color: "white",
  "&:hover": {
    opacity: 1,
  },
}));

export const LeftNavMenu = () => {
  const [menuState, setMenuState] = useState<MenuItems>(MenuItems.CONTACTS);

  const contactOption = menuState === MenuItems.CONTACTS;
  const recentOption = menuState === MenuItems.RECENT;
  const archiveOption = menuState === MenuItems.ARCHIVE;

  return (
    <>
      <StyledLeftNavMenu>
        <StyledIconButton
          active={recentOption}
          onClick={() => setMenuState(MenuItems.RECENT)}
        >
          <HistoryOutlined />
        </StyledIconButton>
        <StyledIconButton
          active={archiveOption}
          onClick={() => setMenuState(MenuItems.ARCHIVE)}
        >
          <Inventory2Outlined />
        </StyledIconButton>
        <StyledIconButton
          active={contactOption}
          onClick={() => setMenuState(MenuItems.CONTACTS)}
        >
          <ContactsOutlined />
        </StyledIconButton>
      </StyledLeftNavMenu>
      <Box>
        {contactOption && <Contacts />}
        {recentOption && <h1>Recent</h1>}
        {archiveOption && <h1>Archive</h1>}
      </Box>
    </>
  );
};
