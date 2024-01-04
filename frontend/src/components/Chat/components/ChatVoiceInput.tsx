import {
  KeyboardVoiceOutlined,
  RadioButtonCheckedOutlined,
} from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setChatRecordingState } from "../../../store/slices/ui/ui.slice";
import { uiSelectors } from "../../../store/slices/ui/ui.slice.selectors";
import { StyledChatIconButton } from "./StyledChatIconButton";

export const ChatVoiceInput: FC<{
  onAudioRecorded: (audioBlob: Blob) => void;
}> = ({ onAudioRecorded }) => {
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector(uiSelectors.isChatRecording);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stream = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      dispatch(setChatRecordingState({ status: true }));
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream.current);

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        chunksRef.current.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        onAudioRecorded(audioBlob);
        chunksRef.current = [];
      });

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    dispatch(setChatRecordingState({ status: false }));
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording" &&
      stream?.current
    ) {
      mediaRecorderRef.current.stop();
      stream?.current.getTracks().forEach((track) => track.stop());
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
