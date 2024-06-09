import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authrouter from "./routes/authrouter.js";
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();
app.use(
  cors({
    origin: ["https://codester-virid.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/", authrouter);

app.listen(PORT, (res) => {
  console.log(`Compiler is running on port ${PORT}`);
});
