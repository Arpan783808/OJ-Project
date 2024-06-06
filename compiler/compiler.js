import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authrouter from "./routes/authrouter.js";
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();
app.use(cors());
app.use(express.json());
app.use("/", authrouter);
app.listen(PORT, () => {
  console.log(`Compiler is running on port ${PORT}`);
});
