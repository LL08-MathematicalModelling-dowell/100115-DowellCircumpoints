import React from "react";
import CoordinateCalculatorHelp from "./components/coordinateCalculatorHelp";
import GpsDeviceLocatorHelp from "./components/gpsDeviceLocatorHelp";

const helps = {
  coordinateCalculator: <CoordinateCalculatorHelp />,
  gpsDeviceLocator: <GpsDeviceLocatorHelp />,
  coordinateTable: <div>HI</div>,
};

export default function Help({ isOpen, setIsOpen, helpType }) {
  return (
    <section>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{ margin: "0" }}
          className="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          X
        </button>
      </div>
      <div style={{ fontSize: "1.5rem", textAlign: "center", width: "100%" }}>
        Help Section
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          outline: "1px solid wheat",
          margin: "5%",
          height: "100%",
        }}
      >
        {helps[helpType]}
      </div>
    </section>
  );
}
