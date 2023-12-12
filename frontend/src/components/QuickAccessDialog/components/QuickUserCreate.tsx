import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { FC, FormEvent, useRef } from "react";
import { usersApi } from "../../../api/users";
import { useAuth } from "../../../hooks/useAuth";
import { Input } from "../../Input";
import { deepPurple } from "@mui/material/colors";

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2, 3),
}));

export const QuickUserCreate: FC<{ onLoginClick: () => void }> = ({
  onLoginClick,
}) => {
  const { fetchUser } = useAuth({ initialFetch: false });
  const createUserFormRef = useRef<HTMLFormElement>(null);

  const handleQuickUserCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createUserForm = createUserFormRef.current;
    if (!createUserForm) return;

    const formData = new FormData(createUserForm);
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await usersApi.createQuickUser({
      firstName,
      lastName,
      email,
      password,
    });

    await fetchUser();
  };

  return (
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
      <StyledDialogActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <span style={{ color: deepPurple["200"] }}>
            if you already have a user, you can{" "}
          </span>
          <a
            onClick={onLoginClick}
            style={{ cursor: "pointer", color: deepPurple["100"] }}
          >
            login
          </a>
        </Box>
        <Button type="submit" variant="contained" disableElevation>
          Register
        </Button>
      </StyledDialogActions>
    </form>
  );
};
