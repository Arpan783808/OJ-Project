import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Desktop from "./desktop.jsx";
import Navbar from "./navbar.jsx";
import "./compcss/home.css";
import snippet from "../assets/snippet.png";
import Footer from "./footer.jsx";
const host = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const verifyCookie = async () => {
      const { data } = await axios.post(`${host}`, {token});
      const { status, user } = data;
      setUsername(user);
      console.log(status);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (localStorage.removeItem("token"), navigate("/"));
    };
    verifyCookie();
  }, [navigate]);
  return (
    <div className="home_page1">
      <Desktop username={username} />
      <Navbar />
      <div className="home_page10">
        <div className="exploresite">
          <img src={snippet} />
          <div className="exploredes">
            <h1>Codester</h1>
            <br />
            <h2>
              presents you high quality problems <br /> to help you in your
              programming journey.
              <br /> You can now submit your solutions to to be judged.
              <br />
              Solve more and get up in the leaderboard.
            </h2>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
