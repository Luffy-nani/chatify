const {Server}=require(`socket.io`);
const dotenv=require(`dotenv`);
dotenv.config();
const http=require(`http`);
const express=require(`express`);
const socketAuthMiddleware=require("../middleware/socketAuthMiddleware");
const app=express();


const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:[process.env.CLIENT_URL],
        credentials:true,
    },
});

//apply auth middleware to all socket connections
io.use(socketAuthMiddleware);

const userSocketMap={};

io.on("connection",(socket)=>{
    console.log("A user is connected", socket.user.fullName);
    const userId=socket.userId;
    userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

module.exports = { app, server, io };