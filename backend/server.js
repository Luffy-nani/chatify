const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./lib/db");
const authRoutes = require("./routes/authRoutes.js");
const messageRoutes=require(`./routes/messageRoutes`);
const cookieParser = require('cookie-parser');
const cors=require(`cors`);
const {app,server}=require(`./lib/socket`);

const PORT = process.env.PORT || 3000;

app.use(express.json({limit:"5mb"}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log("Server running on port 3000");
  connectDB();
});