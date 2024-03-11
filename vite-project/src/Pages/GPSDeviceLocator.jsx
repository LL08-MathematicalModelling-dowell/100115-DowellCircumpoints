import React, { useState } from "react";
import { Link } from "react-router-dom";
import Help from "../Components/help/help";

export default function GPSDeviceLocator() {
  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");
  const [radius, setRadius] = useState("");

  const changeGPSDeviceCenters = (e) => {
    setGpsDeviceCenters(e.target.value);
  };

  const changeRadius = (e) => {
    setRadius(e.target.value);
  };

  const [showHelpSection, setShowHelpSection] = useState(false);

  return (
    <div className="form-section">
      <h3>GPS Device Locator</h3>
      <div>
        <div>
          <label>Centers of the GPS Devices</label>
          <input
            id=""
            className=""
            style={{ width: "20rem" }}
            placeholder="e.g., [[0,0], [1,2], [3,4]]"
            onChange={changeGPSDeviceCenters}
            required
          />
        </div>
        <div>
          <label>Radius</label>
          <input
            id=""
            className=""
            style={{ width: "20rem" }}
            placeholder="Enter radius of the circle"
            onChange={changeRadius}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Link to={"/visualization"} target="_blank">
            <button
              className="button"
              type="submit"
              onClick={() => {
                localStorage.setItem("gpsDeviceCenters", gpsDeviceCenters);
                localStorage.setItem("radius", radius);
              }}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
      <button
        style={{ position: "fixed", top: "3%", right: "2%" }}
        onClick={() => {
          setShowHelpSection(!showHelpSection);
        }}
      >
        Help
      </button>
      {showHelpSection && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: "0",
            right: "0",
            width: "20rem",
            height: "100vh",
            background: "#f9f9f9",
            transition: "transform 0.5s ease-in-out",
            boxShadow: "0 5px 4px rgba(0, 0, 0, 0.3)",
            transform: showHelpSection ? "translateX(0)" : "translateX(20rem)",
          }}
        >
          <Help
            isOpen={showHelpSection}
            setIsOpen={setShowHelpSection}
            helpType={"gpsDeviceLocator"}
          />
        </div>
      )}
    </div>
  );
}
