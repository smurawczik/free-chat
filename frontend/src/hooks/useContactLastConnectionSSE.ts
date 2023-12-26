import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSelectors } from "../store/slices/auth/auth.slice.selectors";
import { updateContactLastConnection } from "../store/slices/user/user.slice";

export const useContactLastConnectionSSE = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authSelectors.authIsSucceeded);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    const subscription = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL as string}/events/subscribe`
    );
    subscription.onmessage = (message) => {
      const data = JSON.parse(message.data) as {
        userId: string;
        lastConnection: string;
      };

      if (data.lastConnection) {
        dispatch(
          updateContactLastConnection({
            contactId: data.userId,
            lastConnection: data.lastConnection,
          })
        );
      }
    };
    subscription.onerror = (message) => {
      console.log({ message });
    };

    return () => {
      subscription.close();
    };
  }, [authUser, dispatch]);
};
