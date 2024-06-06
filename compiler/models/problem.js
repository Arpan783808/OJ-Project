import mongoose from "mongoose";

const { Schema } = mongoose;

const testCaseSchema = new Schema(
  {
    input: { type: String },
    expectedOutput: { type: String },
  },
  { _id: false }
);

const problemSchema = new Schema({
  problemName: { type: String, required: true, unique: true },
  description: {
    statement: { type: String, required: true },
    inputFormat: { type: String, required: true },
    outputFormat: { type: String, required: true },
  },
  tags: [String],
  testCases: [testCaseSchema],
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
});

// Create the Problem model
const problem = mongoose.model("problem", problemSchema);

export default problem;
