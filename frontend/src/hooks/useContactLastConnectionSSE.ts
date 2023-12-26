import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { userSelectors } from "../store/slices/user/user.slice.selectors";

export const useContactLastConnectionSSE = () => {
  const userId = useAppSelector(userSelectors.userProfile)?.id;

  useEffect(() => {
    const subscription = new EventSource(`http://localhost:3000/events/events`);
    subscription.onmessage = (message) => {
      console.log({ message });
    };
    subscription.onerror = (message) => {
      console.log({ message });
    };

    return () => {
      subscription.close();
    };
  }, []);

  useEffect(() => {
    const postToEvent = async () => {
      if (!userId) {
        return;
      }

      try {
        // const response = await usersApi.emitSSETest(userId);
        // console.log({ response });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(postToEvent, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [userId]);
};
