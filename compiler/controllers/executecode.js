// utils/executeCode.js
import { exec } from "child_process";
import path from "path";
const executeCppCode = (
  codePath,
  inputPath,
  outputPath,
  hasInput,
  callback
) => {
  const compileCmd = `g++ ${codePath} -o ${codePath}.out`;
  const runCmd = `${codePath}.out${
    hasInput ? ` < ${inputPath}` : ""
  } > ${outputPath}`;
  exec(`${compileCmd} && ${runCmd}`, callback);
};

const executePythonCode = (
  codePath,
  inputPath,
  outputPath,
  hasInput,
  callback
) => {
  const runCmd = `python ${codePath}${
    hasInput ? ` < ${inputPath}` : ""
  } > ${outputPath}`;
  exec(runCmd, callback);
};

const executeJavaCode = (
  codePath,
  inputPath,
  outputPath,
  hasInput,
  callback
) => {
  const compileCmd = `javac ${codePath}`;
  const runCmd = `java -cp ${path.dirname(codePath)} Main${
    hasInput ? ` < ${inputPath}` : ""
  } > ${outputPath}`;
  exec(`${compileCmd} && ${runCmd}`, callback);
};

const executeCode = (language, codePath, inputPath, outputPath,hasInput, callback) => {
  if (language === "cpp") {
    executeCppCode(codePath, inputPath, outputPath, hasInput, callback);
  } else if (language === "python") {
    executePythonCode(codePath, inputPath, outputPath, hasInput, callback);
  } else if (language === "java") {
    executeJavaCode(codePath, inputPath, outputPath, hasInput, callback);
  }
};

export { executeCode };
