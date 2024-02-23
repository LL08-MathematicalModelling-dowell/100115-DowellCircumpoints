import React, { useContext, useState } from "react";
import Table from "./Table";
import ConvertedCoordinateTable from "./ConvertedCoordinateTable";
import DataVisualization from "./DataVisualization";
import { FormContext } from "../App";

export default function CoordinateCalculatorView({ CalculatedValues }) {
  const formData = useContext(FormContext);
  const [showTable, setShowTable] = useState(false);
  const [convert, setConvert] = useState(false);
  const [visualize, setVisualize] = useState(false);

  const [gpsDeviceCenters, setGpsDeviceCenters] = useState("");

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

  return (
    <>
      <h3>Input</h3>

      {shapeType === "squares" ? (
        <div>
          Side Length of squares: <b>{squareSideLength}</b>
        </div>
      ) : (
        <div>
          Radius of circles: <b>{circleRadius}</b>
        </div>
      )}
      <div>
        Canvas Length: <b>{length}</b>
      </div>
      <div>
        Canvas Width: <b>{width}</b>
      </div>

      <div>
        Number of {shapeType} that can fit inside the canvas:
        <b>{` ${numberOfCircles || numberOfSquares}`}</b>
      </div>

      <h3>{dataType} Coordinates</h3>

      <button onClick={() => setShowTable(!showTable)}>
        {showTable ? "Hide Table" : "Show Table"}
      </button>
      {showTable && (
        <>
          <Table data={center_coordinates || square_coordinates} />
          <button onClick={convertCoordinate}>Convert</button>
          {convert && <ConvertedCoordinateTable />}
        </>
      )}
      <label>Centers of the GPS Devices</label>
      <input
        id=""
        className=""
        placeholder="e.g., [[0,0], [1,2], [3,4]]"
        onChange={handleChange}
      />
      <button
        onClick={() => {
          setVisualize(true);
        }}
      >
        Submit
      </button>

      {visualize && <DataVisualization gpsDeviceCenters={gpsDeviceCenters} />}
    </>
  );
}
