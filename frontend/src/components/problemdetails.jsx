import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Compilernav from "./compilernav.jsx";
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
    <div className="fullpageproblemcompiler">
      <Compilernav />
      <div className="problemandcompiler">
        <div className="problemdetails">

        </div>
        <div className="compilerandoutput">
          <div className="compileralone">

          </div>
          <div className="output">
            
          </div>
        </div>
      </div>
    </div>
    
  );

}
export default Problemdetails;