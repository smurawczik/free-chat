import { useEffect } from "react";
import { usersApi } from "../api/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userSelectors } from "../store/slices/user/user.slice.selectors";
import { updateLastConnection } from "../store/slices/user/user.slice";

export const useUpdateUserLastConnection = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userSelectors.userProfile)?.id;

  useEffect(() => {
    const _updateUserLastConnection = async () => {
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
    };

    const updateInterval = setInterval(_updateUserLastConnection, 10000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [dispatch, userId]);
};
