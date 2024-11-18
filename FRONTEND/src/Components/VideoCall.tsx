import React, { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 

const VideoCall = () => {
  const [peerId, setPeerId] = useState(''); 
  const [remotePeerId, setRemotePeerId] = useState('');
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null); 
  const [currentCall, setCurrentCall] = useState<MediaConnection | null>(null); 
  const myVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer>();

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;

    peer.on('open', id => {
      setPeerId(id);
      socket.emit('join-room', { id });
    });

    peer.on('call', call => {
      setIncomingCall(call); 
    });

  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });
  };

  const callUser = () => {
    if (peerInstance.current && remotePeerId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }

        const call = peerInstance.current?.call(remotePeerId, stream);
        if (call) {
          setCurrentCall(call); 

        
          call.on('stream', remoteStream => {
            if (peerVideo.current) {
              peerVideo.current.srcObject = remoteStream;
            }
          });
        }
      });
    } else {
      alert("Enter a valid remote peer ID to call.");
    }
  };

  const acceptCall = () => {
    if (incomingCall) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        incomingCall.answer(stream); 
        setCurrentCall(incomingCall); 

        incomingCall.on('stream', remoteStream => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });
      });
      setIncomingCall(null); 
    }
  };

  const refuseCall = () => {
    setIncomingCall(null); 
  };

  const endCall = () => {
    if (currentCall) {
      currentCall.close(); 
      setCurrentCall(null); 

      if (myVideo.current) myVideo.current.srcObject = null;
      if (peerVideo.current) peerVideo.current.srcObject = null;
    }
  };

  return (
    <div>
      <h3>Your ID: {peerId}</h3>
      <button onClick={startVideo}>Start Video</button>

      {incomingCall && (
        <div>
          <p>Incoming Call...</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={refuseCall}>Refuse</button>
        </div>
      )}
      
      <input
        type="text"
        placeholder="Enter Remote Peer ID"
        value={remotePeerId}
        onChange={e => setRemotePeerId(e.target.value)}
      />
      <button onClick={callUser}>Call</button>
      <button onClick={endCall} disabled={!currentCall}>End Call</button>

      <video ref={myVideo} autoPlay muted />
      <video ref={peerVideo} autoPlay />
    </div>
  );
};

export default VideoCall;
