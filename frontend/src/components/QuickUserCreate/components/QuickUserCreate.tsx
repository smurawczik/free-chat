import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { Input } from "../../Input";

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2, 3),
}));

export const QuickUserCreate = () => {
  const hasUser = useAppSelector(userSelectors.hasUser);

  return (
    <Dialog
      open={!hasUser}
      fullWidth
      sx={{
        backdropFilter: "blur(5px)",
      }}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(72, 40, 128, 0.9)",
          color: "white",
        },
      }}
    >
      <DialogTitle>Create a user</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={2} color="white">
          To be able to use this chat, you need to have a user. Please enter
          your email address to create a user.
        </DialogContentText>
        <Box display="flex" gap={2} marginBottom={2}>
          <Input
            autoFocus
            id="first_name"
            type="text"
            placeholder="Enter your first name"
          />
          <Input
            id="last_name"
            type="text"
            placeholder="Enter your last name"
          />
        </Box>
        <Input id="email" type="email" placeholder="Enter your email address" />
      </DialogContent>
      <StyledDialogActions>
        <Button onClick={() => {}} variant="contained" disableElevation>
          Create User
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};
