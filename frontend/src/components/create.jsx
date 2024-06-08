import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./compcss/createproblem.css";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.jsx";

const CreateProblem = () => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    problemName: "",
    description: {
      statement: "",
      inputFormat: "",
      outputFormat: "",
    },
    tags: [""],
    testCases: [{ input: "", expectedOutput: "" }],
    difficulty: "Easy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("description.")) {
      const [_, key] = name.split(".");
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          [key]: value,
        },
      });
    } else if (name.startsWith("tags.")) {
      const index = parseInt(name.split(".")[1], 10);
      const tags = [...formData.tags];
      tags[index] = value;
      setFormData({ ...formData, tags });
    } else if (name.startsWith("testCases.")) {
      const [_, index, key] = name.split(".");
      const testCases = [...formData.testCases];
      testCases[index][key] = value;
      setFormData({ ...formData, testCases });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ""],
    });
  };

  const removeTag = (index) => {
    const tags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags });
  };
  const removeTest = (index) => {
    const testCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases });
  };
  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: "", expectedOutput: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim()), // Filter out any empty tags
      };
      console.log(data.testCases);
      const response = await axios.post(`${host}/create`, data);
      const { success, message } = response.data;
      if (success) toast.success(message, { position: "bottom-right" });
      else toast.error(message, { position: "bottom-left" });
      setFormData({
        problemName: "",
        description: {
          statement: "",
          inputFormat: "",
          outputFormat: "",
        },
        tags: [""],
        testCases: [{ input: "", expectedOutput: "" }],
        difficulty: "Easy",
      });
    } catch (error) {
      console.error("Error saving problem:", error);
      alert("Error saving problem. Please try again.");
    }
  };
  return (
    <div className="full">
      <Navbar />
      <div className="form-container">
        <h2 className="heading">CREATE A NEW PROBLEM</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="problemName"
              value={formData.problemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Statement</label>
            <textarea
              id="statement"
              name="description.statement"
              value={formData.description.statement}
              onChange={handleChange}
              required
            />
            <label>Input Format</label>
            <textarea
              id="inputFormat"
              name="description.inputFormat"
              value={formData.description.inputFormat}
              onChange={handleChange}
              required
            />
            <label>Output Format</label>
            <textarea
              id="outputFormat"
              name="description.outputFormat"
              value={formData.description.outputFormat}
              onChange={handleChange}
              required
            />
          </div>
          <label className="taglabel">Tags:</label>
          <br />
          <br />
          <div className="alltags">
            {formData.tags.map((tag, index) => (
              <div key={index}>
                <input
                  className="individualtag"
                  type="text"
                  id={`tag-${index}`}
                  name={`tags.${index}`}
                  value={tag}
                  onChange={handleChange}
                />
                <button
                  className="individualtag removebutton"
                  type="button"
                  onClick={() => removeTag(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTag} className="addtagbutton">
            Add Tag
          </button>
          <br />
          <br />
          <label className="testcaselabel">Test Cases:</label>
          <div className="test-cases-container">
            {formData.testCases.map((testCase, index) => (
              <div className="individualtestcase" key={index}>
                <label
                  htmlFor={`input-${index}`}
                  style={{
                    marginRight: "10px",
                    fontFamily: "none",
                    color: "black",
                    fontSize: "25px",
                    letterSpacing: "0px",
                  }}
                >
                  Input:
                </label>

                <textarea
                  id={`input-${index}`}
                  name={`testCases.${index}.input`}
                  value={testCase.input}
                  onChange={handleChange}
                />
                <br />
                <label
                  htmlFor={`expectedOutput-${index}`}
                  style={{
                    marginRight: "10px",
                    fontFamily: "none",
                    color: "black",
                    fontSize: "25px",
                    letterSpacing: "0px",
                  }}
                >
                  Expected Output:
                </label>

                <textarea
                  id={`expectedOutput-${index}`}
                  name={`testCases.${index}.expectedOutput`}
                  value={testCase.expectedOutput}
                  onChange={handleChange}
                />
                <button
                  className="removebutton"
                  type="button"
                  onClick={() => removeTest(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="addtestcasebutton"
            type="button"
            onClick={addTestCase}
          >
            Add Test Case
          </button>
          <div className="selectdifficult1">
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="buttondiv">
            <button type="submit" className="button-container">
              Create Problem
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default CreateProblem;
