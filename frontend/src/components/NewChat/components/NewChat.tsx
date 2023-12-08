import { AddOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.light,
  backgroundColor: "white",
}));

export const NewChat = () => {
  return (
    <StyledIconButton size="small" color="primary">
      <AddOutlined />
    </StyledIconButton>
  );
};
