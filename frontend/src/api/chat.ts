import { axiosChatInstance } from ".";
import { ConversationRequest, ConversationResponse } from "./types";

export const chatApi = {
  getOrCreateConversation: async (conversationRequest: ConversationRequest) => {
    const response = await axiosChatInstance.post<ConversationResponse>(
      `/conversation`,
      {
        ...conversationRequest,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
