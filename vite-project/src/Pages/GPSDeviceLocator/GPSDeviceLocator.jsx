import React, { useState } from "react";
import { Link } from "react-router-dom";
import HelpIcon from "../../Components/help/components/helpIcon";
import { About } from "../../Components/help/help";
import Papa from "papaparse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function GPSDeviceLocator() {
  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");
  const [radius, setRadius] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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
        console.log(JSON.stringify(rowsArray));
      },
    });
    setIsFileUploaded(!isFileUploaded);
  };

  return (
    <div
      className="form-section"
      style={{
        maxWidth: "auto",
        minWidth: "40%",
        minHeight: "90%",
        backgroundColor: "white",
        borderRadius: "3%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        // outline: "1px solid black",
        // paddingTop: "60px",
      }}
    >
      <About />
      <h3
        style={{
          fontSize: "3rem",
        }}
      >
        GPS Device Locator
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent:"center",
            // marginBottom: "1rem",
          }}
        >
          <label style={{ marginRight: "1rem" }}>
            Centers of the GPS Devices
          </label>
          <HelpIcon helpType={"gpsDeviceLocator"} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginRight: "1rem" }}>
            <input
              id=""
              className="input-container"
              placeholder={
                isFileUploaded ? "File Uploaded" : "e.g., [[0,0], [1,2], [3,4]]"
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <label style={{ marginRight: "1rem" }}>Radius</label>
          <HelpIcon helpType={""} />
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
      {/* </div> */}
    </div>
  );
}
