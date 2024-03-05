import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function GPSDeviceLocator() {
  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");
  const [radius, setRadius] = useState("");

  const changeGPSDeviceCenters = (e) => {
    setGpsDeviceCenters(e.target.value);
  };

  const changeRadius = (e) => {
    setRadius(e.target.value);
  };
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
    </div>
  );
}