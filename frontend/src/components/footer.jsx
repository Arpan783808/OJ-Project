import React from 'react';
import "./compcss/footer.css";
import logooj from "../assets/logooj.png";

const Footer=()=>{

    return(        
        <div className="footer">
            <div className="footdiv">
                <div className="logoname">
                    <img src={logooj} className="logofoot"/>
                    <h1>Codester</h1>
                </div>
                <div className="linksto">
                    <a href="/about.jsx">About</a>
                    <a href="/contact.jsx">Contact</a>   
                </div>       
                 
            </div>
            <h2 className="copyright">Copyright:2024</h2> 
        </div>       
    );
};
export default Footer;