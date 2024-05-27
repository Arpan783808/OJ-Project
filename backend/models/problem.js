import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  problemname: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  testcases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true }
    }
  ]

});

const problem = mongoose.model("Problem",ProblemSchema);
export default problem;
