import React from "react";
import { useCookies } from "react-cookie";
import "./compcss/navcss.css";
import {useNavigate} from "react-router-dom";
import logoutlogo from  "../assets/logoutlogo.png"
const Navbar =()=>{
    const navigate=useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const Logout = () => {
    removeCookie("token");
    navigate("/login");
    };
    const navHome=()=>{
        navigate("");
    }
    const navCompiler=()=>{
        navigate("");
    }
    const navProblem=()=>{
        navigate("");
    }
    return (
        <>
        <div class ="navdiv">
        <h1 class="logo">Codester</h1>
        <nav>
            <ul class="nav-links">
                <li><a href="#" onClick={navHome}>Home</a> </li>
                <li><a href="#" onClick={navProblem}>Problems</a> </li>
                <li><a href="#" onClick={navCompiler}>Compiler</a> </li>
            </ul>
        </nav>
        <div className="logoutdiv">
            <img src={logoutlogo} className="logout" />
            <a href="#" class="cta" onClick={Logout}>Logout </a>
        </div>
        </div>
        </>
    )
}
export default Navbar;