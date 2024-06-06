import "./compcss/desktop.css";
import topviewimage from "../assets/topviewimage.png";
import profile from "../assets/profile.png";
const Desktop = ({ className = "" ,username }) => {
  return (
    <div className={`desktop-6 ${className}`}>
      <img className="profile" src={profile} />
      <h1>{username}</h1>
      <div className="image-23-parent">
        <img
          className="image-23-icon"
          loading="lazy"
          alt=""
          src={topviewimage}
        />
        <div className="welcome-to-the-container">
          <span className="welcome-to-the-container1">
            <p className="welcome-to-the">WELCOME TO THE ARENA</p>
          </span>
        </div>
      </div>
    </div>
  );
};


export default Desktop;
