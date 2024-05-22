import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB", err.message);
    process.exit(1);
  }
};

export default connectDB;
