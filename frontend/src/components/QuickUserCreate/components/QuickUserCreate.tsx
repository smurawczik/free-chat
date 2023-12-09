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
import { FormEvent, useRef } from "react";
import { usersApi } from "../../../api/users";

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2, 3),
}));

export const QuickUserCreate = () => {
  const hasUser = useAppSelector(userSelectors.hasUser);
  const createUserFormRef = useRef<HTMLFormElement>(null);

  const handleQuickUserCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createUserForm = createUserFormRef.current;
    if (!createUserForm) return;

    const formData = new FormData(createUserForm);
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    usersApi.createQuickUser({
      firstName,
      lastName,
      email,
      password,
    });
  };

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
      <form ref={createUserFormRef} onSubmit={handleQuickUserCreate}>
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
              name="first_name"
              type="text"
              placeholder="Enter your first name"
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
            />
          </Box>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
          <Box marginBottom={2} />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter a password"
          />
        </DialogContent>
        <StyledDialogActions>
          <Button type="submit" variant="contained" disableElevation>
            Create User
          </Button>
        </StyledDialogActions>
      </form>
    </Dialog>
  );
};
