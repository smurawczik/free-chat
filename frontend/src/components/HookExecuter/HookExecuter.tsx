import { useAuth } from "../../hooks/useAuth";
import { useGlobalEvents } from "../../hooks/useGlobalEvents";
import { useSSEEvent } from "../../hooks/useSSEEvent";
import { useUpdateUserLastConnection } from "../../hooks/useUpdateUserLastConnection";
import { useAppDispatch } from "../../store/hooks";
import {
  removeContactById,
  updateContactStatus,
} from "../../store/slices/user/user.slice";

export const HookExecuter = () => {
  const dispatch = useAppDispatch();

  useGlobalEvents();
  useAuth({ initialFetch: true });
  useUpdateUserLastConnection();

  // Server Sent Events
  useSSEEvent<{ contactId: string; accepted: boolean }>(
    "contactAccepted",
    (event) => {
      dispatch(
        event.accepted
          ? updateContactStatus({
              contactId: event.contactId,
              status: event.accepted ? "accepted" : "rejected",
            })
          : removeContactById(event.contactId)
      );
    }
  );

  return null;
};
