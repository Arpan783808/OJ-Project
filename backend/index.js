import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "./models/User.js";
import jwtAuth from "./middleware/jwtAuth.js";

dotenv.config(); // Ensure dotenv is configured at the very start

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes

// Register new user
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login user
app.post("/login", async (req, res) => {
  
  try {
    const { email, password } = req.body;

    // check that all the data should exists
    if (!(email && password)) {
      return res.status(400).send("Please enter all the information");
    }

    //find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found!");
    }

    //match the password
    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.status(401).send("Password is incorrect");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;

    //store cookies
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //only manipulate by server not by client/user
    };

    //send the token
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Example protected route
app.get("/", jwtAuth, (req, res) => {
  res.send("This is the dashboard");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
