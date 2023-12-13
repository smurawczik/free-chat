import { useCallback, useEffect, useRef } from "react";
import { contactsApi } from "../api/contacts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userSelectors } from "../store/slices/user/user.slice.selectors";
import { setUserContacts } from "../store/slices/user/user.slice";

export const useUserContacts = () => {
  const dispatch = useAppDispatch();
  const contactsFetchRef = useRef(false);
  const hasUser = useAppSelector(userSelectors.hasUser);

  const fetchUserContacts = useCallback(async () => {
    if (contactsFetchRef.current) {
      return;
    }
    contactsFetchRef.current = true;

    try {
      const response = await contactsApi.userContacts();
      dispatch(setUserContacts(response));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasUser) return;

    fetchUserContacts();
  }, [fetchUserContacts, hasUser]);
};
