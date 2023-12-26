import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { closeConversation } from "../store/slices/chat/chat.slice";

export const useGlobalEvents = () => {
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeConversation());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
