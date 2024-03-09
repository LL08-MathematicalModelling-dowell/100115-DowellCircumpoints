import React from "react";
import CoordinateCalculatorHelp from "./components/coordinateCalculatorHelp";
import GpsDeviceLocatorHelp from "./components/gpsDeviceLocatorHelp";

const helps = {
  coordinateCalculator: <CoordinateCalculatorHelp />,
  gpsDeviceLocator: <GpsDeviceLocatorHelp />,
};

export default function Help({ isOpen, setIsOpen, helpType }) {
  return (
    <section
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
        transform: isOpen ? "translateX(0)" : "translateX(20rem)",
      }}
    >
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
