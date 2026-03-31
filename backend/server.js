const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./lib/db");
const authRoutes = require("./routes/authRoutes.cjs");
const messageRoutes=require(`./routes/messageRoutes`);
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
  connectDB();
});