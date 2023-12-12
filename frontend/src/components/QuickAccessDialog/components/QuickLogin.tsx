import {
  Box,
  Button,
  DialogActions,
  DialogContent,
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

const StyledForm = styled("form")(() => ({
  flex: 1,
}));

export const QuickLogin: FC<{ onRegisterClick: () => void }> = ({
  onRegisterClick,
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
    <StyledForm ref={createUserFormRef} onSubmit={handleQuickUserCreate}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
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
        <Box marginRight={2}>
          <span style={{ color: deepPurple["200"] }}>
            if you don't have a user, you can{" "}
          </span>
          <a
            onClick={onRegisterClick}
            style={{ cursor: "pointer", color: deepPurple["100"] }}
          >
            register
          </a>
        </Box>
        <Button type="submit" variant="contained" disableElevation>
          Login
        </Button>
      </StyledDialogActions>
    </StyledForm>
  );
};
