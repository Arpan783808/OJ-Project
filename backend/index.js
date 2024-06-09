import express from "express";
import authrouter from "./routes/authrouter.js";
import connectDB from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(
  cors({
    origin: ["https://codester-virid.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.set("trust proxy",1);
// Routes
app.use("/", authrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
