import React from "react";
const Handletestcase = (passed) => {
  for (var i = 0; i < passed; i++) {
    <div style={
        {
            height:"30px",
            width:"100px",
            color:"white",
            backgroundColor:"green",
            textAlign:"center"
        }
    }>
      <h2>Test Case {i + 1} passed</h2>
    </div>;
  }
};
export default Handletestcase;