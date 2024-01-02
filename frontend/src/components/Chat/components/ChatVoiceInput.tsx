import {
  KeyboardVoiceOutlined,
  RadioButtonCheckedOutlined,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { FC, useRef, useState } from "react";
import { StyledChatIconButton } from "./StyledChatIconButton";

export const ChatVoiceInput: FC<{
  onAudioRecorded: (audioBlob: Blob) => void;
}> = ({ onAudioRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: BlobPart[] = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          onAudioRecorded(audioBlob);
        });

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <StyledChatIconButton
        size="small"
        onClick={() => (isRecording ? stopRecording() : startRecording())}
      >
        {isRecording ? (
          <RadioButtonCheckedOutlined sx={{ color: deepOrange["400"] }} />
        ) : (
          <KeyboardVoiceOutlined />
        )}
      </StyledChatIconButton>
    </div>
  );
};
