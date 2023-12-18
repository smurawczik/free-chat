import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useChatSocket = () => {
  const socketAttached = useRef<boolean>(false);

  useEffect(() => {
    if (socketAttached.current) {
      return;
    }

    socketAttached.current = true;

    const socket = io("http://localhost:3000");
    socket.on("connect", function () {
      console.log("Connected");

      socket.emit("events", { test: "test" });
      socket.emit("identity", 0, (response: number) =>
        console.log("Identity:", response)
      );
    });
    socket.on("evento", function (data) {
      console.log("evento", data);
    });
    socket.on("events", function (data) {
      console.log("event", data);
    });
    socket.on("exception", function (data) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });

    return () => {
      // socket.close();
    };
  }, []);
};
