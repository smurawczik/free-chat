import { useEffect, useRef } from "react";

export const useChatSocket = () => {
  const socketAttached = useRef<boolean>(false);

  // const currentConversation = useAppSelector(chatSelectors.currentConversation);

  useEffect(() => {
    if (socketAttached.current) {
      return;
    }

    socketAttached.current = true;

    // connect socket
    const socket = new WebSocket("ws://localhost:8080");

    // listen for messages
    socket.onopen = function () {
      console.log("Connected");
      socket.send(
        JSON.stringify({
          event: "events",
          data: "test",
        })
      );
    };

    socket.onmessage = function (response: MessageEvent<string>) {
      const jsonData = JSON.parse(response.data) as {
        event: string;
        data: string;
      };
      console.log("client data", jsonData.event, jsonData.data);
    };

    return () => {
      // socket.close();
    };
  }, []);
};
