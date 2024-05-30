// src/components/ProblemList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./compcss/problemlist.css";
import Navbar from "./navbar.jsx";
import { Link } from "react-router-dom";
import Footer from "./footer.jsx";

const ProblemList = () => {
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
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemList;
