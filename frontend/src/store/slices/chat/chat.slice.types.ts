import { UserResponse } from "../../../api/types";

export type ChatMessage = {
  id?: string;
  sender: Omit<UserResponse, "lastConnection">;
  message: string;
  timestamp: string;
  audioPath?: string;
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
