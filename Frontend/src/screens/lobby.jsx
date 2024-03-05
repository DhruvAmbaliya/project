import React from "react";  
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket,SocketProvider } from "../context/SocketProvider";


const LobbyScreen =()=>{
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();     
    console.log(socket); 
    const navigate = useNavigate();

    const handleSubmitForm = useCallback((e)=>{
        e.preventDefault();
        if (socket) {
            socket.emit("room:join", { email, room });
            console.log(
                    {
                        email,
                        room,
                    });
            navigate(`/room/${room}`);
          } else {
            console.error("Socket connection not established.");
          }
        // socket?.emit("room:join",{email,room});
        // console.log(
        //     {
        //         email,
        //         room,
        //     });
        // navigate(`/room/${room}`);
    }, [email,room,socket,navigate] )

    const handleJoinRoom= useCallback((data)=>{
        const {email,room}= data;
        navigate(`/room/${room}`)
        console.log(email,room);     
    },[navigate])   

    useEffect(()=>{
        socket?.on("room:join", handleJoinRoom);
        return()=>{
            socket?.off("room:join", handleJoinRoom);
        }
    },[socket,handleJoinRoom])

        return(
            <div>
                <h1>lobby</h1>
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="email">Email Id:</label>
                    <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <br/>
                    <label htmlFor="room">room no:</label>
                    <input 
                    type="text" 
                    id="room"
                    value={room} 
                    onChange={(e)=>setRoom(e.target.value)}
                    />
                    <br/>  
                    <button>Join</button>         
                    {/* <button onClick={() => navigate("/Recorder")}> Screen Sharing </button>
                    <button onClick={() => navigate("/Canvas")}> whiteboard </button> */}
                </form>
            </div>
        )
}

export default () => (
    <SocketProvider>
      <LobbyScreen />
    </SocketProvider>
  );
