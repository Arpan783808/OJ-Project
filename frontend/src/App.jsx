import { Route, Routes } from "react-router-dom";
import  Login from "./components/Login.jsx";
import  Signup from "./components/Signup.jsx";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateProblem from "./components/create.jsx";
import compiler from "./components/compiler.js";
import ProblemList from "./components/problemlist.jsx"
import "./app.css";
import Problemdetails from "./components/problemdetails.jsx";
function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateProblem />}/>
        <Route path="/compiler" element={<compiler />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/getproblem/:id" element={<Problemdetails />}/>
      </Routes>
    </div>
  );
}

export default App;