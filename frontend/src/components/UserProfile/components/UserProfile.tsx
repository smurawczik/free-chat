import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SyntheticEvent, useState } from "react";
import { authApi } from "../../../api/auth";

export const UserProfile = () => {
  const user = useAppSelector(userSelectors.userProfile);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    try {
      const logoutResponse = await authApi.logout();
      if (logoutResponse) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <Box>
      <Button
        size="small"
        color="inherit"
        disableElevation
        onClick={handleClick}
      >
        {user.firstName} {user.lastName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
