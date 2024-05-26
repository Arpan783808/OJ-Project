import "./compcss/desktop.css";
import topviewimage from "../assets/topviewimage.png";
const Desktop = ({ className = "" }) => {
  return (
    <div className={`desktop-6 ${className}`}>
      <div className="desktop-6-child" />
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
