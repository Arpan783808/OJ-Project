import React from "react";
import { useCookies } from "react-cookie";
import "./compcss/navcss.css";
import {useNavigate} from "react-router-dom";
import logoutlogo from  "../assets/logoutlogo.png"
import logogoj from "../assets/logooj.png";

const Navbar =()=>{
    const navigate=useNavigate();
    // const [cookies, removeCookie] = useCookies([]);
    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const navHome=()=>{
        navigate("/home");
    }
    const navCompiler=()=>{
        navigate("/compiler");
    }
    const navProblem=()=>{
        navigate("/problems");
    }
    const navCreate=()=>{
        navigate("/create");
    }
    const navLeaderboard=()=>{
        navigate("/leaderboard");
    }
    return (
        <>
        <nav class ="navdiv">
            <img src={logogoj} className="logooj" />
        <h1 class="logo">Codester</h1>
        <div>
            <ul class="nav-links">
                <li><a href="" onClick={navHome}>Home</a> </li>
                <li><a href="" onClick={navProblem}>Problems</a> </li>
                <li><a href="" onClick={navCreate}>Create</a> </li>
                <li><a href="" onClick={navCompiler}>Compiler</a> </li>
                <li><a href="" onClick={navLeaderboard}>Leaderboard</a></li>
            </ul>
        </div>
          <div className="logoutdiv">
            <img src={logoutlogo} className="logout" />
            <a href="#" className="cta" onClick={Logout}>Logout </a>
        </div>
        </nav>
        
        </>
    )
}
export default Navbar;