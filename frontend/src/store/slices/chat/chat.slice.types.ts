export type ChatMessage = {
  id?: string;
  userId: string;
  message: string;
  timestamp: string;
};

export type ChatParticipant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export interface ChatData {
  id: string;
  participants: [ChatParticipant, ChatParticipant];
  messages: ChatMessage[];
}

export type ChatState = { conversation: ChatData | null };
