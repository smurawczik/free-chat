import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";

export const PrimaryIconButton = styled(IconButton)(() => ({
  color: "rgba(255, 255, 255, .8)",
  "&:hover": {
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

export const StyledIconButton: FC<PropsWithChildren<{ tooltip?: string }>> = ({
  tooltip = "",
  children,
}) => {
  return (
    <Tooltip title={tooltip} arrow>
      <PrimaryIconButton size="small" color="primary" aria-label={tooltip}>
        {children}
      </PrimaryIconButton>
    </Tooltip>
  );
};
