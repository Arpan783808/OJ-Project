// src/components/ProblemList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./compcss/problemlist.css";
import Navbar from "./navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "./footer.jsx";
import deletelogo from "../assets/deletelogo.png";
import Update from "./update.jsx";
const ProblemList = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const host = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${host}/getAllProblems`,
          {
            params: { problemName: search },
          }
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems", error);
      }
    };
    fetchProblems();
  }, [search]);
  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${host}/getAllProblems`, {
        params: { problemName: search },
      });
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems", error);
    }
  };
  const handledelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      const response = await axios.get(
        `${host}/deleteproblem/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message, { position: "bottom-right" });
        fetchProblems();
      } else {
        toast.error(response.data.message, { position: "bottom-left" });
      }
    }
  };
  useEffect(()=>{
    const fetchByDiff=async()=>{
      try {
        if(difficulty&&difficulty!=="All"){
        const response = await axios.get(
          `${host}/getbydifficulty?difficulty=${difficulty}`);
          setProblems(response.data);
          console.log(response.data);
        }
        else{
          fetchProblems();
        }
      } catch (error) {
        console.log(error.message);
      }
    }   
    fetchByDiff(); 
  },[difficulty]);
  const handleDifficult = async (e) => {
    setDifficulty(e.target.value);    
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  // const handleProblemto = () => {};
  return (
    <div className="fullproblem">
      <Navbar />

      <div className="problem-list-container">
        <h2>ALL PROBLEMS</h2>
        <input
          className="search"
          type="text"
          placeholder="Search by problem-name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="selectdifficult">
        <select value={difficulty} onChange={handleDifficult}>
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="undernav">
        <div className="problem-list">
          {problems.map((problem) => (
            <div className="problemfulldetails">
              <Link
                to={`/getproblem/${problem._id}`}
                key={problem._id}
                className="problem-item"
              >
                <h3>{problem.problemName}</h3>
              </Link>
              <div className="difficultydiv">
                {problem.difficulty === "Easy" && (
                  <h2 style={{ color: "blue" }}>{problem.difficulty}</h2>
                )}
                {problem.difficulty === "Medium" && (
                  <h2 style={{ color: "green" }}>{problem.difficulty}</h2>
                )}
                {problem.difficulty === "Hard" && (
                  <h2 style={{ color: "red" }}>{problem.difficulty}</h2>
                )}
              </div>
              <div className="alltagsshow">
                {problem.tags.map((tag) => (
                  <div className="singletagshow">
                    <h2>{tag}</h2>{" "}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handledelete(problem._id)}
                className="deletelogo"
              >
                <img src={deletelogo} alt="delete" />
              </button>
              <Link to={`/update/${problem._id}`} className="updatebutton">
                <h1>Update</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProblemList;
