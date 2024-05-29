import User from "../models/User.js";
import createsecrettoken from "../util/secrettoken.js";
import bcrypt from "bcryptjs";
import problem from "../models/problem.js";
import {generateFilePaths,ensureCodesDirectory} from "../generateFile.js";
import {executeCode} from "./executecode.js";
import fs from "fs";
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
      .json({ message: "User logged in successfully", success: true });
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
  try {
    console.log("request");
    const { problemname, description, testcases } = req.body;
    console.log(problemname + description + testcases.input + testcases.output);
    const probfound = await problem.findOne({ problemname });
    if (probfound) {
      console.log("not created");
      return res.json({ message: "problem already exist", success: false });
    }
    const Problem = await problem.create({
      problemname,
      description,
      testcases,
    });
    await Problem.save();
    return res.status(201).json({
      message: "problem created successfully",
      success: true
    });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};
export const getAllProblems = async (req, res) => {
  const { problemname } = req.query;
  try {
    let query = {};
    if (problemname) {
      query.problemname = { $regex: problemname, $options: "i" }; // Case-insensitive search
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
export const getproblembyid= async (req,res) =>{
  const { id } = req.params;
  try{
  const Problem=await problem.findById(id);
  if(!Problem){
    return res.json({message:"problem not found"});
  }
  res.json(Problem);
  }
  catch(error){
    console.log(error);
    res.json({ message : error.message});
  } 
};

export const runcode =async(req,res)=>{

     
     const { language = "cpp", code,input } = req.body;   
     if (!code ) {
       return res
         .status(400)
         .json({ error: "Code  is required" });
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
         res.json({ output});
       }
     );
   
};