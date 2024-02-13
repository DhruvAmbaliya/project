const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");


dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));

const io = new Server(8000,{
  cors:true,
  // cors: {
  //   origin: "*", 
  // },
}); 

connectDB();

app.use("/api/userlist", require("./routes/userlist"));
app.use("/api/addstudents", require("./routes/addstudents"));
app.use("/api/addcourse", require("./routes/addcourse"));
app.use("/api/newsandannu", require("./routes/newsandannu"));
app.use("/api/request", require("./routes/request"));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));



const emailTOSocketIdMap = new Map();
const SocketTOemailIdMap = new Map();

io.on("connection",(socket)=>{
    console.log(`socket connection`, socket.id);
    socket.on("room:join", (data)=>{
        const {email,room} = data;
        emailTOSocketIdMap.set(email,socket.id);
        SocketTOemailIdMap.set(socket.id,email);
        io.to(room).emit("user:joined",{email,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join",data);
        console.log(data);
    });

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
      });
    
      socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
      });
    
      socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      });
    
      socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
      });
});


