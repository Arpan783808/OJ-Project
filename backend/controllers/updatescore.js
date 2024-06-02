import User from "../models/User.js";
import Leaderboard from "../models/leaderboard.js"

const updateScore=async(userid)=>{
    try {
      // Find the user by userId and update score and problemsSolved by incrementing them by one
      const {username,email}=await User.findById(userid);
      const result = await Leaderboard.findOneAndUpdate(
        { userid },
        {
          $inc: { score: 10, problemsSolved: 1 },
          $setOnInsert: { email, username },
        },
        { new: true, upsert: true } // Create the document if it doesn't exist
      );

      if (result) {
        console.log("User score updated or new user inserted:", result);
      } else {
        console.error("Error updating or inserting user");
      }
    } catch (err) {
      console.error("Error updating user score:", err);
    }
}
export default updateScore;