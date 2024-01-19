import { useState, useRef, useMemo, useEffect, useCallback } from "react";

export const useRTCCall = (constraints?: MediaStreamConstraints) => {
  const [callStarted, setCallStarted] = useState(false);

  const messageAttachedRef = useRef(false);

  const localData = useRef<HTMLVideoElement>(null);
  const remoteData = useRef<HTMLVideoElement>(null);

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
        console.log("Message from server ", event.data);

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
    localStream.current = await navigator.mediaDevices.getUserMedia(
      constraints
    );

    if (!localData.current) return;
    localData.current.srcObject = localStream.current;

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
      if (!remoteData.current) return;
      console.log("receiving", remoteStream.current);

      remoteData.current.srcObject = remoteStream.current;
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    ws.send(JSON.stringify({ sdp: offer }));

    setCallStarted(true);
  }, [constraints, ws]);

  const endCall = useCallback(() => {
    ws.close();

    if (!peerConnection.current || !localStream.current) return;
    peerConnection.current.close();
    localStream.current.getTracks().forEach((track) => track.stop());

    if (!localData.current || !remoteData.current) return;
    localData.current.srcObject = null;
    remoteData.current.srcObject = null;

    setCallStarted(false);
  }, [ws]);

  return {
    callStarted,
    localData,
    remoteData,
    startCall,
    endCall,
  };
};
