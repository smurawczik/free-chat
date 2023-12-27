import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSelectors } from "../store/slices/auth/auth.slice.selectors";

export function useSSEEvent<T extends Record<string, string>>(
  eventHandler: (data: T) => void
) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authSelectors.authIsSucceeded);

  useEffect(() => {
    if (!authUser) {
      return;
    }

    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL as string}/events/subscribe`
    );
    eventSource.onmessage = (message) => {
      const data = JSON.parse(message.data) as T;

      eventHandler(data);
    };
    eventSource.onerror = (message) => {
      console.error({ message });
    };

    return () => {
      eventSource?.close();
    };
  }, [authUser, dispatch, eventHandler]);
}
