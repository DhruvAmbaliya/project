import React, { useEffect, useCallback, useState,useRef } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal"
import peer from "./peer";
import { useSocket } from "../context/SocketContext";
import { Navigate,useNavigate } from "react-router-dom";
import Canvas from "../screens/whiteboard";
import Recorder from "../screens/ScreenShare";
  
const RoomPage = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const connectionRef = useRef();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [callEnded, setCallEnded] = useState(false);
  const [showCanvas,setShowCanvas] = useState(false);
  const [showRecorder,setShowRecorder] = useState(false);

  const closeCanvas = ()=> {
    return setShowCanvas(false);
  }
  const closeRecorder = ()=> {
    return setShowRecorder(false);
  }
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      //video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        // video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const leaveCall = useCallback(() => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload();
  }, []); 

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);
    socket?.on("callEnded", leaveCall); 

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
      socket?.off("callEnded", leaveCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    leaveCall,
  ]);

  return (
    <div className="first">
    <div className="room">
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      </div>
      <div className="button">
      <button style={{margin:10,}} onClick={() => navigate("/LobbyScreen")}>LobbyScreen</button>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button style={{margin:10,}} onClick={handleCallUser}>CALL</button>}
      {remoteSocketId && <button style={{margin:10,}} onClick={leaveCall}>End Call</button>} 
      {remoteSocketId && <button style={{margin:10,}} onClick={() => setShowCanvas(true)}>whiteboard</button>}
      <Modal isOpen={showCanvas} onRequestClose={()=>setShowCanvas(false)} 
        style={{overlay:{ background:"#f0f0f0" },
          // content:{ width:"500px",height:"500px" }
        }}
      >
        <Canvas closeModal={closeCanvas} />
      </Modal>
      {remoteSocketId && <button style={{margin:10,}} onClick={() => setShowRecorder(true)}>ScreenShare</button>}
      </div>
      {/* {showCanvas && <Canvas closeModal={closeCanvas} />} */}
      {showRecorder && <Recorder closeModal={closeRecorder} />} 
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
      
    </div>
  );
};

export default RoomPage;