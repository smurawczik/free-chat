export interface ChatMessage {
  _id: string;
  from: string;
  to: string;
  message: string;
  createdAt: string;
}

export interface ChatData {
  _id: string;
  users: {
    from: string;
    to: string;
  };
  messages: ChatMessage[];
}

export type ChatState = { conversation: ChatData | null };
