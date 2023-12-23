import { Socket, io } from "socket.io-client";

export class ChatSingleton {
  private static instance: ChatSingleton;
  private socket: Socket;
  private socketConnectedToRoom: boolean = false;
  private roomId: string = "";

  private constructor() {
    this.socket = io("http://localhost:3033");
    this.socket.on("connect", () => {
      console.log("Connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    this.attachListeners();
  }

  public static getInstance(): ChatSingleton {
    console.log("Getting instance");

    if (!ChatSingleton.instance) {
      ChatSingleton.instance = new ChatSingleton();
    }

    return ChatSingleton.instance;
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

  public handleMessageReceived(
    callback: ({ message }: { message: string }) => void
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

  public sendMessage(message: string) {
    if (this.getIsSocketConnectedToRoom()) {
      this.socket.emit("send-message", {
        roomId: this.roomId,
        message,
      });
    }
  }
}
