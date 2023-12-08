export interface ChatData {
  _id: string;
  name: string;
  description: string;
  users: string[];
  messages: string[];
}

export type ChatState = { conversation: ChatData | null };
