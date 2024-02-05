import React, { useEffect, useState } from "react";
import frame from "../images/Frame.svg";
import "bootstrap/dist/css/bootstrap.min.css";


function ViewDetails() {
  const [gradLevel, setGradLevel] = useState("");
  const [gradLevell, setGradLevell] = useState("");
  
  return (
    <div className="details">
      <h4 className="title ">All Courses</h4>
      <div className="detail-course">
        <span className="frame-div">
          <img src={frame} />
        </span>
        <div>
          <strong>Learn Reactjs</strong> <br />
          by Christopher Morgan
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "300px",
          background: "#D9D9D9",
          marginTop: "40px",
          borderRadius: "10px",
        }}
      >
        <div className="course">Course, Teacher details</div>
        <div style={{ textAlign: "center", margin: "20px 0px" }}>
          Request teacher to schedule classes:{" "}
        </div>
        {/* <div className="login__field" >
                <select name="Level" className="login__input2" value={gradLevel} onChange={(e) => setGradLevel(e.target.value)}>
                  <option value="">Select Mode</option>
                  <option value="First">Online</option>
                  <option value="Second">In-Person</option>

                </select>
              </div> */}

        <div className="login__field" style={{ textAlign: "left" }}>
          <select
            name="Level"
            className="login__input2"
            value={gradLevel}
            onChange={(e) => setGradLevel(e.target.value)}
            style={{ float: "left" }}
          >
            <option value="">Select Mode</option>
            <option value="First">Online</option>
            <option value="Second">In-Person</option>
          </select>
        </div>


        <div className="login__field" style={{ textAlign: "right" }}>
          <select
            name="Level"
            className="login__input2"
            value={gradLevell}
            onChange={(e) => setGradLevell(e.target.value)}
            style={{ float: "left" }}
          >
            <option value="">Ambience</option>
            <option value="First">Group</option>
            <option value="Second">Individual</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;

