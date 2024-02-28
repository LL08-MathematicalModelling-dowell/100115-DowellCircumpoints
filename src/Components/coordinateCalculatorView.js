import React, { useContext, useState } from "react";
import Table from "./Table";
import ConvertedCoordinateTable from "./ConvertedCoordinateTable";
import { Link } from "react-router-dom";
import { FormContext } from "../Pages/Form";

export default function CoordinateCalculatorView({ CalculatedValues }) {
  const formData = useContext(FormContext);
  const [showTable, setShowTable] = useState(false);
  const [convert, setConvert] = useState(false);

  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");
  const [radius, setRadius] = useState("");

  const { dataType, shapeType, circleRadius, squareSideLength, width, length } =
    formData;

  const {
    center_coordinates,
    coordinates: square_coordinates,
    numberOfCircles,
    square_count: numberOfSquares,
  } = CalculatedValues;

  const convertCoordinate = () => {
    setConvert(true);
  };

  const handleChange = (e) => {
    setGpsDeviceCenters(e.target.value);
  };

  const changeRadius = (e) => {
    setRadius(e.target.value);
  };

  return (
    <>
      <div className="container output-container">
        <h3>Input</h3>

        {shapeType === "squares" ? (
          <div className="shape-info">
            Side Length of squares: <b>{squareSideLength}</b>
          </div>
        ) : (
          <div className="shape-info">
            Radius of circles: <b>{circleRadius}</b>
          </div>
        )}
        <div className="canvas-info">
          Canvas Length: <b>{length}</b>
        </div>
        <div className="canvas-info">
          Canvas Width: <b>{width}</b>
        </div>

        <div className="coordinates">
          Number of {shapeType} that can fit inside the canvas:
          <b>{` ${numberOfCircles || numberOfSquares}`}</b>
        </div>
        <div className="button-holder">
          <button
            className="button showTable"
            onClick={() => setShowTable(!showTable)}
          >
            {showTable ? "Hide Table" : "Show Table"}
          </button>
        </div>
      </div>

      {showTable && (
        <>
          <h3>{dataType} Coordinates</h3>
          <Table data={center_coordinates || square_coordinates} />
          <button className="button" onClick={convertCoordinate}>
            Convert
          </button>
          {convert && <ConvertedCoordinateTable />}
        </>
      )}
      <div className="form-section">
        <div>
          <div>
            <label>Centers of the GPS Devices</label>
            <input
              id=""
              className=""
              style={{ width: "20rem" }}
              placeholder="e.g., [[0,0], [1,2], [3,4]]"
              onChange={handleChange}
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
          <Link to={"/visualization"} target="_blank">
            <button
              className="button"
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
    </>
  );
}
