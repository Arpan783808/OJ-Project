import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar.jsx";
import "./compcss/leaderboard.css";
import leaderphoto from "../assets/leaderphoto.png"
const Leaderboard = () => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${host}/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="leaderboardfull">
      <Navbar />
      <div className="leaderboardhead">
        <img src={leaderphoto} />
        <h1>LEADERBOARD</h1>
        <img src={leaderphoto} />
      </div>
      <table className="leaderboardtable">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
              <td>{user.problemsSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Leaderboard;
