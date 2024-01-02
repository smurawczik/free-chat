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
  sendAudioMessage: async (audio: Blob) => {
    const response = await axiosChatInstance.postForm<string>(
      `/message/audio`,
      {
        file: audio,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
  getAudioMessage: async (audioPath: string) => {
    const response = await axiosChatInstance.post<Blob>(
      `/message/file`,
      {
        audioPath,
      },
      {
        withCredentials: true,
        responseType: "blob",
      }
    );
    return response.data;
  },
};
