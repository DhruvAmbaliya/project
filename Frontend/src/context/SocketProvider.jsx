import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");
socket.connect();
console.log(socket)

const SocketContext = createContext(null);

export const useSocket = ()=>{
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props) =>{
        return(
            <SocketContext.Provider value={socket}>
                {props.children}
            </SocketContext.Provider>
        );
};