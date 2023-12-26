import { useCallback, useEffect, useRef } from "react";
import { usersApi } from "../api/users";
import { useAppDispatch } from "../store/hooks";
import { setAuthStatus } from "../store/slices/auth/auth.slice";
import { setUser } from "../store/slices/user/user.slice";
import { useUpdateUserLastConnection } from "./useUpdateUserLastConnection";

interface UseAuthProps {
  initialFetch?: boolean;
}

export const useAuth = ({ initialFetch }: UseAuthProps) => {
  useUpdateUserLastConnection();

  const userFetchRef = useRef(false);
  const dispatch = useAppDispatch();

  const fetchUser = useCallback(async () => {
    if (userFetchRef.current) {
      return;
    }
    userFetchRef.current = true;

    dispatch(setAuthStatus("loading"));
    try {
      const user = await usersApi.getUser();
      dispatch(setUser(user));
      dispatch(setAuthStatus("succeeded"));
    } catch (error) {
      dispatch(setAuthStatus("failed"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialFetch) {
      fetchUser();
    }
  }, [dispatch, fetchUser, initialFetch]);

  return { fetchUser };
};
