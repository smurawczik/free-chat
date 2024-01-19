import { VideoChatOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import { StyledHeaderIconButton } from "../../Chat/components/StyledHeaderIconButton";
import { useRTCCall } from "../hooks/useRTCCall";

export const VideoCall = () => {
  const { callStarted, endCall, localData, remoteData, startCall } = useRTCCall(
    { video: true, audio: true }
  );

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box
          position="fixed"
          height="80%"
          width="80%"
          top={0}
          left={0}
          right={0}
          bottom={0}
          sx={{ display: callStarted ? "block" : "none" }}
        >
          <Box position="relative" height="100%" width="100%">
            <video
              style={{
                left: "5%",
                right: "10%",
                bottom: "5%",
                top: "5%",
                width: window.innerWidth - 140,
                height: window.innerHeight - 140,
                aspectRatio: "16/9",
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: 8,
              }}
              playsInline
              muted
              ref={remoteData}
              autoPlay
            ></video>
            <video
              style={{
                width: "30%",
                height: "20%",
                bottom: 100,
                right: 100,
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: 8,
              }}
              playsInline
              ref={localData}
              autoPlay
              muted
            ></video>
          </Box>
        </Box>
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
        <VideoChatOutlined />
      </StyledHeaderIconButton>
    </>
  );
};
