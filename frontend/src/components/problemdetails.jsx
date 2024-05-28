import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar.jsx";
import { useParams} from 'react-router-dom';
import './compcss/problemdetails.css';
import Footer from "./footer.jsx";
const Problemdetails=()=>{
    const {id}=useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

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
    const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/compile`, {
        code,
        testcases: problem.testcases
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running code', error);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (   
       
    <div className="problem-details-container"> 
    <Navbar />     
    <div className="problemcompiler">  
      <div className="problemdetail">
        <h2>{problem.problemname}</h2>
        <p>{problem.description}</p>
      </div>
      <div className="compiler1">
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Write your code here"
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div className="output-container">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
      </div>
    </div>
    <Footer />
    </div>
    
  );

}
export default Problemdetails;