import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useAppSelector } from "../../../store/hooks";
import { authSelectors } from "../../../store/slices/auth/auth.slice.selectors";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { QuickUserCreate } from "./QuickUserCreate";
import { QuickLogin } from "./QuickLogin";
import { useState } from "react";

export const QuickAccessDialog = () => {
  const authFailed = useAppSelector(authSelectors.authIsFailed);
  const hasUser = useAppSelector(userSelectors.hasUser);

  const [register, setRegister] = useState(true);

  if (authFailed) {
    return (
      <Dialog
        open={!hasUser}
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
        <Box display="flex" alignItems="center">
          {register ? (
            <QuickUserCreate onLoginClick={() => setRegister(!register)} />
          ) : (
            <QuickLogin onRegisterClick={() => setRegister(!register)} />
          )}
        </Box>
      </Dialog>
    );
  }

  return null;
};
