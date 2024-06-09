import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home";
import Leaderboard from "./components/leaderboard.jsx";
import CreateProblem from "./components/create.jsx";
import Update from "./components/update.jsx";
import ProblemList from "./components/problemlist.jsx";
import "./app.css";
import Problemdetails from "./components/problemdetails.jsx";
import Compiler from "./components/compiler.jsx";

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateProblem />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/getproblem/:id" element={<Problemdetails />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </div>
    
  );
}

export default App;
