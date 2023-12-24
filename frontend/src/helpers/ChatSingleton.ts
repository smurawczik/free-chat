import { Socket, io } from "socket.io-client";
import { ChatMessage } from "../store/slices/chat/chat.slice.types";

export class ChatSingleton {
  private static instance: ChatSingleton;
  private socket: Socket;
  private socketConnectedToRoom: boolean = false;
  private roomId: string = "";

  public static getInstance(): ChatSingleton {
    console.log("Getting instance");

    if (!ChatSingleton.instance) {
      ChatSingleton.instance = new ChatSingleton();
    }

    return ChatSingleton.instance;
  }

  private constructor() {
    this.socket = io("http://localhost:3033", {
      // retries: 3,
      // reconnectionAttempts: 3,
      // reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("Connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    this.attachListeners();
  }

  private attachListeners() {
    this.socket.on("message", (message) => {
      console.log("Message received");
      console.log(message);
    });

    this.socket.on("joined-chat-room", ({ roomId }) => {
      console.log("Joined chat room", roomId);
      this.socketConnectedToRoom = true;
    });

    this.socket.on("left-chat-room", ({ roomId }) => {
      console.log("Left chat room", roomId);
      this.socketConnectedToRoom = false;
    });
  }

  private getIsSocketConnectedToRoom() {
    return this.socketConnectedToRoom;
  }

  public onMessageReceived(
    callback: ({ message }: { message: ChatMessage }) => void
  ) {
    this.socket.on("receive-message", callback);
  }

  public joinRoom(roomId: string) {
    if (this.roomId && roomId !== this.roomId) {
      this.leaveRoom();
    }

    this.roomId = roomId;
    this.socket.emit("join-chat-room", { roomId });
  }

  public leaveRoom() {
    this.socket.emit("leave-chat-room", { roomId: this.roomId });
  }

  public sendMessage(message: ChatMessage) {
    if (this.getIsSocketConnectedToRoom()) {
      const chatMessageData = {
        roomId: this.roomId,
        ...message,
      };
      this.socket.emit("send-message", chatMessageData);
    }
  }
}