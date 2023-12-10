import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../store/hooks";
import { authSelectors } from "../../store/slices/auth/auth.slice.selectors";

export const AppLoading = () => {
  const authLoading = useAppSelector(authSelectors.authIsLoading);

  if (!authLoading) return null;

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};
