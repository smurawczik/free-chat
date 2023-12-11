import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import Button from "@mui/material/Button";

export const UserProfile = () => {
  const user = useAppSelector(userSelectors.userProfile);

  if (!user) return null;

  return (
    <Box>
      <Button size="small" color="inherit" disableElevation>
        {user.firstName} {user.lastName}
      </Button>
    </Box>
  );
};
