const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./lib/db");
const authRoutes = require("./routes/authRoutes.cjs");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", (req, res, next) => {
  console.log("🔥 API HIT:", req.method, req.url);
  next();
});

app.get("/test", (req, res) => {
  res.json({ message: "server works" });
});


app.use("/api/auth", authRoutes); // 👈 THIS LINE WAS MISSING

app.listen(PORT, () => {
  console.log("Server running on port 3000");
  connectDB();
});