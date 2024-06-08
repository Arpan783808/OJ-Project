import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import "./compcss/problemdetails.css";
import Judgenav from "./judgenav.jsx";

const Problemdetails = () => {
  const { id } = useParams();
  const host = process.env.REACT_APP_COMPILER_URL;
  const host1 = process.env.REACT_APP_BACKEND_URL;
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [view, setView] = useState("");
  const [output1, setOutput1] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [verdict, setVerdict] = useState("");
  const [result, setResult] = useState();
  const [test, setTest] = useState([]);
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `${host1}/getproblembyid/${id}`
        );

        setProblem(response.data);
        // console.log(problem);
      } catch (error) {
        console.log("error fetching problem", error);
      }
    };
    fetchProblem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setView("output");
      setOutput1("compiling...");

      const response = await axios.post(`${host}/run`, {
        code,
        language,
        input,
      });
      // console.log(response.data);
      setOutput1(response.data.output);
    } catch (error) {
      console.error("code compilation failed", error);
      setOutput1(error.response?.data?.error || error.message);
    }
  };

  const handleJudge = async (e) => {
    e.preventDefault();
    setView("verdict");
    setVerdict("Compiling...");
    const userid = localStorage.getItem("useremail");

    const response = await axios.post(`${host}/judge`, {
      userid,
      code,
      language,
      id,
    });
    setResult(response.data);
    setTest(response.data.test);
    // console.log(result.test[0]);
    if (response.data.success) {
      setVerdict("Accepted");
    } else {
      setVerdict("Failed");
    }
  };
  console.log(verdict);
  const handleView = (e) => {
    setView(e.target.value);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="fullpageproblemcompiler">
      <Judgenav
        language={language}
        handleSubmit={handleSubmit}
        setLanguage={setLanguage}
      />
      <button className="submitbutton" onClick={handleJudge}>
        Submit
      </button>
      <div className="problemandcompiler">
        <div className="problemdetails">
          <h1>{problem.problemName}</h1>
          <h2>Description</h2>
          <p>{problem.description.statement}</p>
          <h2>Input Format</h2>
          <p>{problem.description.inputFormat}</p>
          <h2>Output Format</h2>
          <p>{problem.description.outputFormat}</p>
          <h2>Input</h2>
          <pre>{problem.testCases[0].input}</pre>
          <h2>Output</h2>
          <pre>{problem.testCases[0].expectedOutput}</pre>
        </div>
        <div className="compilerandoutput">
          <textarea
            value={code}
            placeholder="write your code here"
            className="compileralone"
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <div className="viewset">
            <button value="input" onClick={handleView}>
              Input
            </button>
            <button value="output" onClick={handleView}>
              Ouput
            </button>
            <button value="verdict" onClick={handleView}>
              Verdict
            </button>
          </div>
          <div className="viewbox">
            {view === "input" && (
              <textarea
                value={input}
                placeholder="input here"
                onChange={handleInputChange}
                className="inputview"
              ></textarea>
            )}
            {view === "output" && (
              <div className="inputview">
                <h2>Output</h2>
                {output1 && <div className="output2">{output1}</div>}
              </div>
            )}
            {view === "verdict" && (
              <div className="inputview">
                {verdict === "Accepted" && (
                  <h2 style={{ color: "green" }}>Accepted</h2>
                )}
                {verdict === "Failed" && (
                  <h2 style={{ color: "red" }}>Failed</h2>
                )}
                {verdict === "Compiling..." && (
                  <h2 style={{ color: "grey" }}>Compiling...</h2>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Problemdetails;
