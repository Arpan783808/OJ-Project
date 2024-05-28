import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./compcss/createproblem.css";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.jsx"
const CreateProblem = () => {
  const [problemname, setProblemName] = useState('');
  const [description, setDescription] = useState('');
  const [testcases, setTestCases] = useState([{ input: '', output: '' }]);
  const navigate = useNavigate();
  
  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testcases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };
    const inputvalue={problemname,description,testcases};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create', {
        ...inputvalue,
      });
      const { success, message} = response.data;
      console.log(response);
      if (success) {
        toast.success(message, {
        position: "bottom-right",     
        });
        navigate("/create");
      } else {
        toast.error(message, {
        position: "bottom-left",
        });
      }  
    } catch (error) {
      alert('Failed to create problem');
    }
  };
  return (
    < div className="full">
    <Navbar />
    <div className="form-container">
      <h2 className="heading">CREATE A NEW PROBLEM</h2>
      <form   onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>TITLE</label>
          <input
            type="text"
            value={problemname}
            onChange={(e) => setProblemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="test-cases-container">
          <label>TEST CASES</label>
          {testcases.map((testcase, index) => (
            <div key={index} className="test-case">
              <textarea className="input"
                type="text"
                placeholder="Input"
                value={testcase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                required
              />
              <textarea className="input"
                type="text"
                placeholder="Output"
                value={testcase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                required
              />
            </div>
          ))}
          <div className="buttondiv">
          <button type="submit" className="button-container" >Create Problem</button>
          </div>
        </div >
        
      </form>
      
      <ToastContainer />
    </div>
    <Footer />
    </div>
  );
};

export default CreateProblem;
