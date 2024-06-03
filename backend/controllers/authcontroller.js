import User from "../models/User.js";
import Leaderboard from "../models/leaderboard.js";
import createsecrettoken from "../util/secrettoken.js";
import bcrypt from "bcryptjs";
import problem from "../models/problem.js";
import { generateFilePaths, ensureCodesDirectory } from "../generateFile.js";
import { executeCode } from "./executecode.js";
import fs from "fs";
import compareOutput from "./compare.js";
import axios from "axios";
import updateScore from "./updatescore.js";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createsecrettoken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({
        message: "User logged in successfully",
        success: true,
        userid: user._id,
      });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return res.json({ message: "User already exist" });
    }

    const user = await User.create({ username, email, password });

    user.password = await bcrypt.hash(password, 12);
    await user.save();
    const token = createsecrettoken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

export const create = async (req, res, next) => {
  console.log("request");
  const { problemName, description, testCases, tags, difficulty } = req.body;
  // console.log(problemname + description + testcases.input + testcases.output);
  const probfound = await problem.findOne({ problemName });
  // console.log(problemName + description + testCases + tags + difficulty);
  if (probfound) {
    console.log("not created");
    return res.json({ message: "problem already exist", success: false });
  }
  try {
    const Problem = await problem.create({
      problemName,
      description,
      testCases,
      tags,
      difficulty,
    });
    await Problem.save();
    return res.status(201).json({
      message: "problem created successfully",
      success: true,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};
export const getAllProblems = async (req, res) => {
  const { problemName } = req.query;
  try {
    let query = {};
    if (problemName) {
      query.problemName = { $regex: problemName, $options: "i" }; // Case-insensitive search
    }
    const problems = await problem.find(query);
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export const showproblem=async(req,res,next)=>{
//   try{

//   }

// }
export const getproblembyid = async (req, res) => {
  const { id } = req.params;
  try {
    const Problem = await problem.findById(id);
    if (!Problem) {
      return res.json({ message: "problem not found" });
    }
    res.json(Problem);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

export const runcode = async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code  is required" });
  }
  console.log("entered");
  ensureCodesDirectory();
  const { codePath, inputPath, outputPath } = generateFilePaths(language);
  const hasInput = Boolean(input);

  try {
    fs.writeFileSync(codePath, code);
    console.log(`Successfully wrote code to ${codePath}`);
  } catch (error) {
    console.error(`Error writing code to ${codePath}: ${error}`);
    return res
      .status(500)
      .json({ error: `Error writing code file: ${error.message}` });
  }

  try {
    if (hasInput) {
      fs.writeFileSync(inputPath, input);
      console.log(`Successfully wrote input to ${inputPath}`);
    } else {
      // Ensure the input file is empty if no input is provided
      fs.writeFileSync(inputPath, "");
      console.log(
        `No input provided, created empty input file at ${inputPath}`
      );
    }
  } catch (error) {
    console.error(`Error writing input to ${inputPath}: ${error}`);
    return res
      .status(500)
      .json({ error: `Error writing input file: ${error.message}` });
  }
  //  console.log(fs.readFileSync);
  executeCode(
    language,
    codePath,
    inputPath,
    outputPath,
    hasInput,
    (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: stderr });
      }
      const output = fs.readFileSync(outputPath, "utf-8");
      console.log(stdout);
      res.json({ output });
    }
  );
};
export const judge = async (req, res) => {
  const { language = "cpp", code, id, userid } = req.body;
  const Problem = await problem.findById(id);
  const testcase = Problem.testCases;
  try {
    for (var i = 0; i < testcase.length; i++) {
      const input = testcase[i].input;
      const result = await axios.post("http://localhost:5000/run", {
        code,
        language,
        input,
      });
      // console.log(result.data);
      // console.log(result.data);
      console.log(testcase[i].expectedOutput);
      const isCorrect = compareOutput(
        result.data.output,
        testcase[i].expectedOutput
      );
      if (!isCorrect) {
        console.log("testcase failed");
        return res.send({
          success: false,
          message: `testcase {i} failed`,
          testcase: i,
        });
      }
    }
    console.log("passed");
    updateScore(userid);
    return res.json({
      success: true,
      message: "testcases passed",
      testcase: testcase.length,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const deleteproblem = async (req, res) => {
  const { id } = req.params;
  try {
    const Problem = await problem.findByIdAndDelete(id);
    if (!Problem) {
      return res.json({ message: "problem not found", success: false });
    }
    res.json({ message: "problem deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  const { statement, inputFormat, outputFormat } = req.body;
  const updatedFields = {
    "description.statement": statement,
    "description.inputFormat": inputFormat,
    "description.outputFormat": outputFormat,
  };
  try {
    const Problem = await problem.findByIdAndUpdate(id, {
      $set: updatedFields,
    });
    if (!Problem) {
      return res.json({ message: "problem not found", success: false });
    }
    res.json({ message: "problem updated successfully", success: true });
    console.log(Problem.problemName);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
export const getleaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    const formattedLeaderboard = leaderboard.map((user) => ({
      username: user.username,
      score: user.score,
      problemsSolved: user.problemsSolved,
    }));
    // console.log(formattedLeaderboard);
    res.json(formattedLeaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard", err);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
};
export const getbydifficulty = async (req, res) => {
  const { difficulty } = req.query;
  if (!difficulty) {
    return res.status(400).json({ message: "Difficulty is required" });
  }
  try {
    const problems = await problem.find({ difficulty });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
