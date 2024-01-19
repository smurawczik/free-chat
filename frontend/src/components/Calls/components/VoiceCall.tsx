import { WifiCallingOutlined } from "@mui/icons-material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import { StyledHeaderIconButton } from "../../Chat/components/StyledHeaderIconButton";
import { useRTCCall } from "../hooks/useRTCCall";

export const VoiceCall = () => {
  const { callStarted, endCall, localData, remoteData, startCall } = useRTCCall(
    { audio: true }
  );

  return (
    <>
      <Box display="flex" flexDirection="column">
        <audio
          style={{ width: 100, top: -100, position: "absolute" }}
          ref={remoteData}
          autoPlay
          controls
        ></audio>
        <audio
          style={{ width: 100, top: -100, position: "absolute" }}
          ref={localData}
          controls
          muted
        ></audio>
      </Box>
      <StyledHeaderIconButton
        size="small"
        sx={callStarted ? { color: deepOrange["300"] } : {}}
        onClick={() => {
          if (callStarted) {
            endCall();
          } else {
            startCall();
          }
        }}
      >
        {callStarted ? <PhoneInTalkIcon /> : <WifiCallingOutlined />}
      </StyledHeaderIconButton>
    </>
  );
};
