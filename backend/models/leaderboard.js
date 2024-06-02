import mongoose from "mongoose";
import User from "./User.js";
const leaderboardSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User', 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  problemsSolved: {
    type: Number,
    default: 0,
  },
}); 
const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;