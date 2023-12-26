import parseISO from "date-fns/parseISO";
import { FC, useEffect, useState } from "react";
import { usersApi } from "../../../api/users";
import { StyledConnectionBadge } from "./StyledLastConnectionBadge";

export const LastConnectionBadge: FC<{ contactId: string }> = ({
  contactId,
}) => {
  const [lastConnection, setLastConnection] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastConnection = async () => {
      try {
        const lastConnectionResponse = await usersApi.getUserLastConnection(
          contactId
        );
        if (!lastConnectionResponse?.lastConnection) return;

        setLastConnection(lastConnectionResponse.lastConnection);
      } catch (error) {
        console.log(error);
      }
    };

    if (contactId) fetchLastConnection();
  }, [contactId]);

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
