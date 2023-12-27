import { useCallback, useEffect, useRef } from "react";
import { usersApi } from "../api/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateContactLastConnection,
  updateLastConnection,
} from "../store/slices/user/user.slice";
import { userSelectors } from "../store/slices/user/user.slice.selectors";
import { useSSEEvent } from "./useSSEEvent";

type UserConnectionSSEEvent = {
  userId: string;
  lastConnection: string;
};

export const useUpdateUserLastConnection = () => {
  const initialConnectionUpdateRef = useRef(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(userSelectors.userProfile)?.id;

  const onServerEventReceived = useCallback(
    (data: UserConnectionSSEEvent): void => {
      if (data.lastConnection) {
        dispatch(
          updateContactLastConnection({
            contactId: data.userId,
            lastConnection: data.lastConnection,
          })
        );
      }
    },
    [dispatch]
  );

  const _updateUserLastConnection = useCallback(async () => {
    const lastConnection = new Date().toISOString();
    try {
      if (userId) {
        const updatedLastConnectionResponse =
          await usersApi.updateUserLastConnection(userId, lastConnection);

        // dispatch a post that triggers the SSE event
        usersApi.updateUserLastConnectionEvent(userId, lastConnection);

        if (updatedLastConnectionResponse.lastConnection) {
          dispatch(
            updateLastConnection(updatedLastConnectionResponse.lastConnection)
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, userId]);

  useSSEEvent<UserConnectionSSEEvent>(onServerEventReceived);

  useEffect(() => {
    if (!initialConnectionUpdateRef.current && userId) {
      initialConnectionUpdateRef.current = true;
      setTimeout(_updateUserLastConnection, 500);
    }

    const updateInterval = setInterval(_updateUserLastConnection, 30000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [_updateUserLastConnection, dispatch, userId]);
};
