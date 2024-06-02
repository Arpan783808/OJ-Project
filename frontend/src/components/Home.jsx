import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Desktop from "./desktop.jsx";
import Navbar from "./navbar.jsx";
import "./compcss/home.css";
import Footer from  "./footer.jsx";
const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page1">
        <Desktop />
        <Navbar />
        <div className="home_page10">
          <h4 className="welcometag">
            {" "}
            WELCOME <span className="welcometag">{username}</span>
          </h4>
          <div className="exploresite">
            <p>
              Greetings,  You're now part of an awesome community of
              coders. Let's achieve great things together!
            </p>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
