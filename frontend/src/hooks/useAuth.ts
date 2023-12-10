import { useEffect, useRef } from "react";
import { usersApi } from "../api/users";
import { useAppDispatch } from "../store/hooks";
import { setAuthStatus } from "../store/slices/auth/auth.slice";
import { setUser } from "../store/slices/user/user.slice";

export const useAuth = () => {
  const userFetchRef = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (userFetchRef.current) {
        return;
      }
      userFetchRef.current = true;

      dispatch(setAuthStatus("loading"));
      try {
        setTimeout(async () => {
          const user = await usersApi.getUser();
          dispatch(setUser(user));
          dispatch(setAuthStatus("succeeded"));
        }, 500);
      } catch (error) {
        dispatch(setAuthStatus("failed"));
      }
    };

    fetchUser();
  }, [dispatch]);
};
