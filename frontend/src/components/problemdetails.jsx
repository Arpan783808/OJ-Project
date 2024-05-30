import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams} from 'react-router-dom';
import './compcss/problemdetails.css';
import Judgenav from "./judgenav.jsx";

const Problemdetails=()=>{
    const {id}=useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [view,setView] =useState('');
    const [output1,setOutput1]=useState('');
    const [language,setLanguage]=useState('cpp');
    useEffect(()=>{
        const fetchProblem=async()=>{
            try{
                const response=await axios.get(`http://localhost:5000/getproblembyid/${id}`);
                setProblem(response.data);
            }
            catch(error){
                console.log('error fetching problem' ,error);
            }
        };
        fetchProblem();
    },[id]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        setView("output");
        console.log("enter");
        setOutput1("compiling...");
        console.log(language);
        const response = await axios.post("http://localhost:5000/run", {
          code,
          language,
          input,
        });
        console.log(response.data);
        setOutput1(response.data.output);
      } catch (error) {
        console.error("code compilation failed", error);
        setOutput1(error.response?.data?.error || error.message);
      }
    };

  
  const handleJudge=()=>{}
  const handleView=(e)=>{
    setView(e.target.value);
  }
  const handleInputChange=(e)=>{
    setInput(e.target.value);
  }
  if (!problem) return <div>Loading...</div>;
   
  return (
    <div className="fullpageproblemcompiler">
      <Judgenav language={language} handleSubmit={handleSubmit} setLanguage={setLanguage} />
      <button className="submitbutton" onClick={handleJudge}>
        Submit
      </button>
      <div className="problemandcompiler">
        <div className="problemdetails">
          <h2>Description</h2>
          <p>{problem.description.statement}</p>
          <h2>Input Format</h2>
          <p>{problem.description.inputFormat}</p>
          <h2>Output Format</h2>
          <p>{problem.description.outputFormat}</p>
          <h2>Input</h2>
          <p>{problem.testCases[0].input}</p>
          <h2>Output</h2>
          <p>{problem.testCases[0].expectedOutput}</p>
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
          </div>
        </div>
      </div>
    </div>
  );

}
export default Problemdetails;