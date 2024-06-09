import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./compcss/compilernav.css";
import axios from "axios";
const Compilernav = ({ handleSubmit,language, setLanguage }) => {
  const navigate = useNavigate();

  return (
    <nav className="compilernav">
      <button
        className="homebutton"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <select 
        className="selectlang"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <button className="runbutton" onClick={handleSubmit } >
        Run
      </button>
    </nav>
  );
};
export default Compilernav;
