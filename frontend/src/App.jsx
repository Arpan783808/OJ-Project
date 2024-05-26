import { Route, Routes } from "react-router-dom";
import  Login from "./components/Login.jsx";
import  Signup from "./components/Signup.jsx";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;