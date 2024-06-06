// utils/fileUtils.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generateFilePaths = (language) => {
  const uuidpath = uuid();
  const codeFile = {
    cpp: ".cpp",
    python: ".py",
    java: ".java",
  }[language];
  const codeFile1 = uuidpath + codeFile;
  const inputFile = "input.txt";
  const outputFile = "output.txt";
  const inputFile1 = uuidpath + inputFile;
  const outputFile1 = uuidpath + outputFile;

  const baseDir = path.join(__dirname, "./codes");

  const codePath = path.join(baseDir, codeFile1);
  const inputPath = path.join(baseDir, inputFile1);
  const outputPath = path.join(baseDir, outputFile1);
  // console.log(codePath);
  return { codePath, inputPath, outputPath };
};

const ensureCodesDirectory = () => {
  const codesDir = path.join(__dirname, "./codes");
  if (fs.existsSync(codesDir)) {
    fs.rmSync(codesDir,{recursive:true});
  } 
  fs.mkdirSync(codesDir);
};

export { generateFilePaths, ensureCodesDirectory };
