// utils/fileUtils.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generateFilePaths = (language) => {
  const codeFile = {
    cpp: "main.cpp",
    python: "main.py",
    java: "Main.java",
  }[language];

  const inputFile = "input.txt";
  const outputFile = "output.txt";

  const baseDir = path.join(__dirname, "./codes");
  const codePath = path.join(baseDir, codeFile);
  const inputPath = path.join(baseDir, inputFile);
  const outputPath = path.join(baseDir, outputFile);
  // console.log(codePath);
  return { codePath, inputPath, outputPath };
};

const ensureCodesDirectory = () => {
  const codesDir = path.join(__dirname, "./codes");
  if (!fs.existsSync(codesDir)) {
    fs.mkdirSync(codesDir);
  }
};

export { generateFilePaths, ensureCodesDirectory };
