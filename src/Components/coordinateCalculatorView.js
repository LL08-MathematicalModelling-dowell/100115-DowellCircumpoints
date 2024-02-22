import React, { useState } from "react";
import Table from "./Table";

export default function CoordinateCalculatorView({
  CalculatedValues,
  UserInputs,
}) {
  const [showTable, setShowTable] = useState(false);

  const { dataType, shapeType, circleRadius, squareSideLength, width, length } =
    UserInputs;

  const coordinates =
    shapeType === "squares"
      ? CalculatedValues?.center_coordinates
      : CalculatedValues?.coordinates;

  const numberOfCircles = CalculatedValues?.numberofCircles;
  const numberOfSquares = CalculatedValues?.square_count;

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

      <h3>{`${dataType} Coordinates`}</h3>

      <button onClick={() => setShowTable(!showTable)}>
        {showTable === true ? "Hide Table" : "Show Table"}
      </button>
      {showTable && <Table data={coordinates} />}
    </>
  );
}