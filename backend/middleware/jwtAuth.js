import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const jwtAuth = (req, res)=> {
  const {token} = req.body;
  if (!token) {
    console.log("not");
    return res.json({ status: false });
  }
  console.log("auth");
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

export  {jwtAuth};
