const normalizeOutput = (output) => {
  return output
    .replace(/\r\n/g, "\n") // Convert all \r\n to \n
    .replace(/\r/g, "\n") // Convert all \r to \n
    .replace(/\s+\n/g, "\n") // Remove spaces before \n
    .replace(/\n\s+/g, "\n") // Remove spaces after \n
    .trim(); // Trim leading and trailing white spaces
};

const compareOutputs = (generatedOutput, expectedOutput) => {
  const normalizedGeneratedOutput = normalizeOutput(generatedOutput);
  const normalizedExpectedOutput = normalizeOutput(expectedOutput);
  console.log(normalizedGeneratedOutput);
  console.log(normalizedExpectedOutput);
  return normalizedGeneratedOutput === normalizedExpectedOutput;
};

export default compareOutputs;