import React, { useContext, useState } from "react";
import Table from "../../../Components/Table";
import ConvertedCoordinateTable from "./ConvertedCoordinateTable";
import { FormContext } from "../Form";
import "../util/styles.css";

export default function CoordinateCalculatorView({ CalculatedValues }) {
  const formData = useContext(FormContext);
  const [showTable, setShowTable] = useState(false);
  const [convert, setConvert] = useState(false);

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
  console.log(formData);

  return (
    <>
      <h3>Input</h3>
      <div className="calculator-input-info-container">
        <div className="shape-info-wrapper">
          <div className="info-container">
            <div>Canvas Width</div>
            <div className="value-container">{width}</div>
          </div>

          <div className="info-container">
            <div>Canvas Length</div>
            <div className="value-container">{length}</div>
          </div>
        </div>

        <div className="shape-info-wrapper">
          {shapeType === "squares" ? (
            <div className="info-container">
              <div>Side Length of squares</div>
              <div className="value-container">{squareSideLength}</div>
            </div>
          ) : (
            <div className="info-container">
              <div>Radius of circles</div>
              <div className="value-container">{circleRadius}</div>
            </div>
          )}
          <div className="info-container">
            <div>Number of {shapeType} that can fit inside the canvas:</div>
            <div className="value-container">
              {` ${numberOfCircles || numberOfSquares}`}
            </div>
          </div>
        </div>
      </div>
      <div className="form-button-holder">
        <button
          className="button showTable"
          onClick={() => setShowTable(!showTable)}
        >
          {showTable ? "Hide Table" : "Show Table"}
        </button>
      </div>

      {showTable && (
        <div className="table-holder">
          {dataType === "Cartesian Coordinate" ? (
            <>
              <h3>Cartesian Coordinates</h3>
              <Table data={center_coordinates || square_coordinates} />

              <div className="form-button-holder">
                <button className="button" onClick={convertCoordinate}>
                  Get GeoCoordinates
                </button>
              </div>
              {convert && <ConvertedCoordinateTable />}
            </>
          ) : (
            <ConvertedCoordinateTable />
          )}
        </div>
      )}

      {/* <Link to={"/gps-device-locator"}>
          <button className="button">Go to Next Page</button>
        </Link> */}
      {/* </div> */}
    </>
  );
}
