import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDialogState } from "../../../store/slices/ui/ui.slice";
import { uiSelectors } from "../../../store/slices/ui/ui.slice.selectors";
import { SearchContactAutocomplete } from "./SearchContactAutocomplete";
import { UserResponse } from "../../../api/types";
import { useState } from "react";

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2, 3),
}));

export const AddContactDialog = () => {
  const dispatch = useAppDispatch();
  const isAddContactDialogOpen = useAppSelector(
    uiSelectors.isModalOpen("addContact")
  );
  const [value, setValue] = useState<UserResponse | null>(null);

  return (
    <Dialog
      open={isAddContactDialogOpen}
      onClose={() => {
        dispatch(setDialogState({ name: "addContact", status: false }));
      }}
      sx={{
        backdropFilter: "blur(5px)",
      }}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "rgba(72, 40, 128, 0.9)",
          color: "white",
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <form style={{ flex: 1 }}>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogContent>
            <SearchContactAutocomplete onSelect={(user) => setValue(user)} />
          </DialogContent>
          <StyledDialogActions sx={{ justifyContent: "space-between" }}>
            <span />
            <Button
              type="submit"
              disabled={Boolean(!value)}
              variant="contained"
              disableElevation
            >
              Send Request
            </Button>
          </StyledDialogActions>
        </form>
      </Box>
    </Dialog>
  );
};
