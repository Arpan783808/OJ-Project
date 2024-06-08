import problem from "../models/problem.js";
import axios from "axios";
import updateScore from "./updatescore.js";
import { generateFilePaths, ensureCodesDirectory } from "../generateFile.js";
import fs from "fs";
import { executeCode } from "./executecode.js";
import compareOutput from "./compare.js";

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
  console.log(process.env.COMPILER_URL);
  try {
    let test = [];
    for (var i = 0; i < testcase.length; i++) {
      const input = testcase[i].input;
      const result = await axios.post(`${process.env.COMPILER_URL}/run`, {
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
        test.push({ testcase: i + 1, success: false });
        console.log("testcase failed");
        return res.send({
          success: false,
          message: `Testcase ${i + 1} failed`,
          test: test,
        });
      } else {
        test.push({ testcase: i + 1, success: true });
      }
    }
    console.log("passed");
    updateScore(userid);
    return res.json({
      success: true,
      message: "testcases passed",
      test: test,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
