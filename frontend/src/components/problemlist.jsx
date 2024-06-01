// src/components/ProblemList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./compcss/problemlist.css";
import Navbar from "./navbar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate ,useNavigate} from "react-router-dom";
import Footer from "./footer.jsx";
import deletelogo from "../assets/deletelogo.png";
import Update from "./update.jsx";
const ProblemList = () => {
  const navigate=useNavigate();
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");

  
    useEffect(() => {
      const fetchProblems = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/getAllProblems",
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
        const response = await axios.get(
          "http://localhost:5000/getAllProblems",
          {
            params: { problemName: search },
          }
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems", error);
      }
    };
  const handledelete=async(id)=>{
    if (window.confirm("Are you sure you want to delete this problem?")) {
      
      const response=await axios.get(`http://localhost:5000/deleteproblem/${id}`);
      if(response.data.success){
        toast.success(response.data.message,{position:"bottom-right"});
        fetchProblems();
      }
      else{
        toast.error(response.data.message,{position:"bottom-left"});
      }
    }
  }
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
              <div className="alltagsshow">
                {problem.tags.map((tag) => (
                  <div className="singletagshow">
                    <h2>{tag}</h2>{" "}
                  </div>
                ))}
              </div>
              <button onClick={()=>handledelete(problem._id)} className="deletelogo">
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
