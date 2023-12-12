import { useEffect } from "react";
import { contactsApi } from "../api/contacts";
import { useAppSelector } from "../store/hooks";
import { userSelectors } from "../store/slices/user/user.slice.selectors";

export const useUserContacts = () => {
  const hasUser = useAppSelector(userSelectors.hasUser);

  const fetchUserContacts = async () => {
    try {
      const response = await contactsApi.userContacts();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasUser) return;

    fetchUserContacts();
  }, [hasUser]);
};
