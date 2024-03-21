import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpIcon from "../../Components/help/components/helpIcon";
import About from "../../Components/About";
import Papa from "papaparse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Popup from "../../Components/PopUp";

export default function GPSDeviceLocator() {
  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");
  const [radius, setRadius] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const changeGPSDeviceCenters = (e) => {
    setGpsDeviceCenters(e.target.value);
  };

  const changeRadius = (e) => {
    setRadius(e.target.value);
  };

  const handleInputChange = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];

        results.data.forEach((d) => {
          const values = Object.values(d);
          const pair = [parseInt(values[0]), parseInt(values[1])];
          rowsArray.push(pair);
        });

        setGpsDeviceCenters(JSON.stringify(rowsArray));
      },
    });
    setIsFileUploaded(!isFileUploaded);
    setFileName(event.target.files[0].name);
  };

  return (
    <div className="form-section coordinate-table-card">
      {isFileUploaded && <Popup message={"FileSuccesfully uploaded"} />}
      <About about={"GpsDeviceLocator"} />
      <h3
        style={{
          fontSize: "3rem",
        }}
      >
        GPS Device Locator
      </h3>
      <div className="locator-input-holder">
        <div className="centers-label-holder">
          <label>Centers of the GPS Devices</label>
          <HelpIcon helpType={"gpsDeviceLocatorCenter"} />
        </div>
        <div className="center-input-holder">
          <div>
            <input
              id=""
              className="input-container"
              placeholder={
                isFileUploaded ? fileName : "e.g., [[0,0], [1,2], [3,4]]"
              }
              onChange={changeGPSDeviceCenters}
              required
              style={{ minWidth: "29rem" }}
            />
            <input
              id={"fileInput"}
              type="file"
              accept=".csv"
              onChange={handleInputChange}
              style={{ display: "none" }}
            />
          </div>

          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faPaperclip}
            size="xl"
            onClick={() => document.getElementById("fileInput").click()}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="centers-label-holder">
          <label>Radius</label>
          <HelpIcon helpType={"gpsDeviceLocatorRadius"} />
        </div>

        <input
          id=""
          className="input-container"
          placeholder="Enter radius of the circle"
          onChange={changeRadius}
        />
      </div>
      <div className="form-button-holder">
        <Link to={"/visualization"}>
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
  );
}
