import React,{useState} from "react";
import "./compcss/compiler.css";
import Compilernav from "./compilernav.jsx";
import axios from "axios";
const Compiler =()=>{
    const host = process.env.REACT_APP_COMPILER_URL;
    const [input,setInput]=useState('');
    const [code,setCode]=useState('');
    const [output,setOutput]=useState('');
    const [language,setLanguage]=useState('cpp');
    const handleSubmit=async (e)=>{
        e.preventDefault();
       
        try{
            console.log("enter");
            setOutput("compiling...");
            const response = await axios.post(`${host}/run`, {
              code,
              language,
              input,
            });
            console.log(response.data);
            setOutput(response.data.output);
        }
        catch(error){
            console.error("code compilation failed",error);
            setOutput(error.response?.data?.error || error.message);            
        }
    }

    return (
      <div className="fullpagecompiler">
        <Compilernav
          handleSubmit={handleSubmit}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="compiler-container">
          <textarea
            value={code}
            placeholder="write your code here"
            onChange={(e) => setCode(e.target.value)}
            className="codediv"
          ></textarea>

          <div className="inputouput">
            <textarea
              value={input}
              className="input1"
              placeholder="enter input here"
              onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <div className="output1">
              <h2>Output</h2>
              {output && (
                <div  className="output2">
                  {output}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Compiler;
