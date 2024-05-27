import { Route, Routes } from "react-router-dom";
import  Login from "./components/Login.jsx";
import  Signup from "./components/Signup.jsx";
import Home from "./components/Home";
import CreateProblem from "./components/create";
import compiler from "./components/compiler.js"
import "./app.css";
function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateProblem />}/>
        <Route path="/compiler" element={<compiler />} />
      </Routes>
    </div>
  );
}

export default App;