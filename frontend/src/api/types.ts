export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastConnection: string | null;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ContactResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastConnection: string | null;
  status: "accepted" | "pending" | "rejected";
}

export interface ContactRequest {
  userId: string;
}

export interface MessageResponse {
  id: string;
  sender: UserResponse;
  message: string;
  timestamp: string;
}

export interface ConversationRequest {
  firstParticipant: string;
  secondParticipant: string;
  conversationId?: string;
}

export interface ConversationResponse {
  id: string;
  participants: [UserResponse, UserResponse];
  messages: MessageResponse[];
}
