import parseISO from "date-fns/parseISO";
import { FC } from "react";
import { useAppSelector } from "../../../store/hooks";
import { userSelectors } from "../../../store/slices/user/user.slice.selectors";
import { StyledConnectionBadge } from "./StyledLastConnectionBadge";

export const LastConnectionBadge: FC<{ contactId: string }> = ({
  contactId,
}) => {
  const lastConnection = useAppSelector(
    userSelectors.userContactById(contactId)
  )?.lastConnection;

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const parsedDate = parseISO(lastConnection ?? "");

  const connected30MinAgo = parsedDate > thirtyMinutesAgo;
  const connected10MinAgo = parsedDate > tenMinutesAgo;

  return (
    <StyledConnectionBadge
      online={connected10MinAgo}
      away={connected30MinAgo}
    />
  );
};
