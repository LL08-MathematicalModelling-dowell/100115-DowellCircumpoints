import React from "react";
export default function CoordinateCalculatorHelp() {
  return (
    <>
      <div>
        <div>Type of data</div>
        <ul>
          <li>Cartesian</li>
          <li>GeoCoordinates</li>
        </ul>
      </div>
      <div>
        <div>Type of Shape</div>

        <ul>
          <li>Side Length of Square</li>
          <li>Radius of the Circle</li>
        </ul>
      </div>
      <div>
        <div>Dimensions of the Canvas</div>
        <ul>
          <li>Length</li>
          <li>width</li>
        </ul>
      </div>
    </>
  );
}
