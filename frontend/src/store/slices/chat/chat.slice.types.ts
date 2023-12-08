export type ChatState = {
  _id: string;
  name: string;
  description: string;
  users: string[];
  messages: string[];
} | null;
