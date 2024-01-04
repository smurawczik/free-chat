import { WifiCallingOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyledHeaderIconButton } from "../../Chat/components/StyledHeaderIconButton";

export const VoiceCall = () => {
  const [callStarted, setCallStarted] = useState(false);

  const messageAttachedRef = useRef(false);

  const startButton = useRef<HTMLButtonElement>(null);
  const localAudio = useRef<HTMLAudioElement>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);

  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  // WebSocket for signaling
  const ws = useMemo(() => new WebSocket("ws://localhost:5665"), []);

  useEffect(() => {
    if (!messageAttachedRef.current) {
      messageAttachedRef.current = true;

      ws.binaryType = "arraybuffer"; // Set binary type to 'arraybuffer'

      ws.addEventListener("message", async (event) => {
        if (typeof event.data === "string") {
          // Handle text data
          const message = JSON.parse(event.data);

          if (message.sdp) {
            if (!peerConnection.current) return;

            await peerConnection.current.setRemoteDescription(
              new RTCSessionDescription(message.sdp)
            );

            if (message.sdp.type === "offer") {
              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);

              ws.send(JSON.stringify({ sdp: answer }));
            }
          } else if (message.candidate) {
            try {
              if (!peerConnection.current) return;

              await peerConnection.current.addIceCandidate(
                new RTCIceCandidate(message.candidate)
              );
            } catch (e) {
              console.error("Error adding ice candidate:", e);
            }
          }
        } else if (event.data instanceof ArrayBuffer) {
          // Handle binary data (assuming it's related to SDP or ICE candidates)
          const binaryData = event.data;
          // Convert ArrayBuffer to string or process the binary data as needed
          const textData = new TextDecoder().decode(binaryData);
          const message = JSON.parse(textData);

          if (message.sdp) {
            if (!peerConnection.current) return;

            await peerConnection.current.setRemoteDescription(
              new RTCSessionDescription(message.sdp)
            );

            if (message.sdp.type === "offer") {
              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);

              ws.send(JSON.stringify({ sdp: answer }));
            }
          } else if (message.candidate) {
            try {
              if (!peerConnection.current) return;

              await peerConnection.current.addIceCandidate(
                new RTCIceCandidate(message.candidate)
              );
            } catch (e) {
              console.error("Error adding ice candidate:", e);
            }
          }
        }
      });
    }
  }, [ws]);

  const startCall = useCallback(async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    if (!localAudio.current) return;
    localAudio.current.srcObject = localStream.current;

    peerConnection.current = new RTCPeerConnection();

    if (!localStream.current) return;
    localStream.current.getTracks().forEach((track) => {
      if (!peerConnection.current || !localStream.current) return;

      peerConnection.current.addTrack(track, localStream.current);
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    peerConnection.current.ontrack = (event) => {
      // Received remote audio stream
      remoteStream.current = event.streams[0];
      if (!remoteAudio.current) return;
      remoteAudio.current.srcObject = remoteStream.current;
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    ws.send(JSON.stringify({ sdp: offer }));

    setCallStarted(true);
  }, [ws]);

  const endCall = useCallback(() => {
    if (!peerConnection.current || !localStream.current) return;
    peerConnection.current.close();
    localStream.current.getTracks().forEach((track) => track.stop());

    if (!localAudio.current || !remoteAudio.current) return;
    localAudio.current.srcObject = null;
    remoteAudio.current.srcObject = null;

    setCallStarted(false);
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <audio style={{ width: 100 }} ref={remoteAudio} controls></audio>
        <audio style={{ width: 100 }} ref={localAudio} controls muted></audio>
      </Box>
      <StyledHeaderIconButton
        size="small"
        ref={startButton}
        onClick={() => {
          if (callStarted) {
            endCall();
          } else {
            startCall();
          }
        }}
      >
        <WifiCallingOutlined />
      </StyledHeaderIconButton>
    </>
  );
};
