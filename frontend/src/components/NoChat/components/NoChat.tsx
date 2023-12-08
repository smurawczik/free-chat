import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const StyledNoChatContainer = styled("div")(() => ({
  flex: 0.7,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const StyledIconContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  borderRadius: "50%",
  border: `4px solid ${theme.palette.primary.light}`,
  padding: theme.spacing(2),
}));

export const NoChat = () => {
  return (
    <StyledNoChatContainer>
      <StyledIconContainer>
        <QuestionAnswerIcon sx={{ fontSize: 80 }} color="primary" />
      </StyledIconContainer>
      <Typography color="primary" variant="h4">
        No hay chats seleccionados
      </Typography>
    </StyledNoChatContainer>
  );
};
