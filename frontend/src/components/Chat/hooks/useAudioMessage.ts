import { useEffect } from "react";
import { chatApi } from "../../../api/chat";
import type { ChatMessage as Message } from "../../../store/slices/chat/chat.slice.types";

export const useAudioMessage = (
  message: Message,
  messageElmRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const fetchAudio = async () => {
      if (!message.audioPath) return;

      const audio = await chatApi.getAudioMessage(message.audioPath);
      const audioBlob = new Blob([audio], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = document.createElement("audio");
      audioElement.src = audioUrl;
      audioElement.preload = "auto";
      audioElement.controls = true;
      if (messageElmRef.current) {
        if (messageElmRef.current.children.length > 0) {
          messageElmRef.current.removeChild(messageElmRef.current.children[0]);
        }
        messageElmRef.current.appendChild(audioElement);
      }
    };

    fetchAudio();
  }, [message.audioPath, messageElmRef]);
};
