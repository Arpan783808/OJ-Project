import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./compcss/update.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Update = () => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const { id } = useParams();
  const [problem, setProblem] = useState({
    problemName: "",
    description: {
      statement: "",
      inputFormat: "",
      outputFormat: "",
    },
    testCases: "",
    tags: "",
  });
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${host}/getproblembyid/${id}`);

        setProblem(response.data);
      } catch (error) {
        console.log("error fetching problem", error);
      }
    };

    fetchProblem();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      description: {
        ...prevProblem.description,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { statement, inputFormat, outputFormat } = problem.description;
      const response = await axios.put(`${host}/update/${id}`, {
        statement,
        inputFormat,
        outputFormat,
      });
      const result = response.data;
      if (result.success) {
        toast.success(result.message, { position: "bottom-right" });
      } else {
        toast.error(result.message, { position: "bottom-left" });
      }
    } catch (error) {
      console.error("Error updating problem:", error);
      toast.error("failed to update problem", { position: "bottom-left" });
    }
  };

  // console.log(problem);
  return (
    <div className="updatefullpage">
      <Navbar />
      <h1 style={{ fontSize: "40px", margin: "0px" }}>{problem.problemName}</h1>
      <form>
        <label>Statement</label>

        <textarea
          name="statement"
          onChange={handleChange}
          defaultValue={problem.description.statement}
        ></textarea>
        <label>Input format</label>
        <textarea
          name="inputFormat"
          defaultValue={problem.description.inputFormat}
          onChange={handleChange}
        ></textarea>
        <label>Output format</label>
        <textarea
          name="outputFormat"
          defaultValue={problem.description.outputFormat}
          onChange={handleChange}
        ></textarea>
      </form>
      <button onClick={handleSubmit}>Update</button>
      <ToastContainer />
    </div>
  );
};
export default Update;
