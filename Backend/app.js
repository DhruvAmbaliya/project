const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// var cors = require("cors");
// const http = require("http");
// var app = express();
// const PORT = process.env.PORT || 5001;
// app?.listen(PORT, () => console.log(`Server running at ${PORT}`));
// app.use(cors());
// app.use(express.json({ extended: false, limit: "50mb" }));
// const { Socket } = require("socket.io");
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
app.use(express.json({ extended: false, limit: "50mb" }));


const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/",(req,res)=>{
    res.send("server is running ");
}); 

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});


server.listen(PORT,()=>console.log(`Server running at ${PORT}`));


connectDB();

// api names---
//example => app.use("/api/todo", require("./routes/todo"));

app.use("/api/userlist", require("./routes/userlist"));
app.use("/api/addstudents", require("./routes/addstudents"));
app.use("/api/addcourse", require("./routes/addcourse"));
app.use("/api/newsandannu", require("./routes/newsandannu"));
app.use("/api/request", require("./routes/request"));

