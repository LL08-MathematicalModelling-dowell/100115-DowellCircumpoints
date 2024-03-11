import React, { useState } from "react";
import useVisualizationData from "../hooks/useVisualizationData";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import ScatterChart from "./components/ScatterChart";
import DataTable from "./components/DataTable";
import "./styles/styles.css";
import Help from "../Components/help/help";

export default function DataVisualization() {
  const formData = localStorage.getItem("formData");
  const gpsDeviceCenters = localStorage.getItem("gpsDeviceCenters");
  const radius = localStorage.getItem("radius");

  const [showTable, setShowTable] = useState(false);

  const { data, loading, error } = useVisualizationData(
    formData,
    gpsDeviceCenters,
    radius
  );

  const gpsCenters = data[0].map((val) => val[0]);
  const circumPointsArray = data[0].map((val) => val[1]);
  const gpsDeviceCount = data[1];
  const totalPointsOfIntersection = data[2];
  const pointsOfIntersection = data[3];

  const [troe, setTroe] = useState(false);

  const [hoverPosition, setHoverPosition] = useState({ left: 0, top: 0 });

  const [showHelpSection, setShowHelpSection] = useState(false);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const ha = () => {
    setShowTable(!showTable);
  };

  const hover = (event) => {
    const buttonRect = event.target.getBoundingClientRect();

    const { left, top } = buttonRect;

    setTroe(!troe);
    setHoverPosition({ left, top });
    setShowHelpSection(true);
  };

  return (
    <div className="container">
      <h2>Data Visualization</h2>
      <div className="button-holder">
        <input
          className={!showTable ? "active-button" : "button"}
          value={showTable ? "Show Table" : "Hide Table"}
          onClick={ha}
        />
        <input
          className={showTable ? "active-button" : "button"}
          onClick={ha}
          value={showTable ? "Hide Graph" : " Show Graph"}
        />
      </div>
      {!showTable && (
        <div className="coordinate-table-wrapper">
          <div className="coordinate-table-container">
            <div className="coordinate-content">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <h3>Coordinate Tables</h3>
                <h4
                  style={{
                    backgroundColor: "#3b7e3e",
                    borderRadius: "100%",
                    cursor: "pointer",
                    width: "1.2rem",
                    height: "1.2rem",
                    // textAlign: "center",
                    marginLeft: "0.5rem",
                    color: "white",
                    fontWeight: "light",
                  }}
                  onClick={hover}
                >
                  ?
                </h4>
                {troe && (
                  <div
                    style={{
                      position: "absolute",
                      left: hoverPosition.left + 30,
                      top: hoverPosition.top,
                      width: "30rem",
                      height: "35rem",
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      borderRadius: "5px",
                      zIndex: 9999,

                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Help
                      isOpen={showHelpSection}
                      setIsOpen={setShowHelpSection}
                      helpType={"coordinateTable"}
                    />
                  </div>
                )}
              </div>
              <div className="coordinate-container">
                {data[0].map((dataX) => (
                  <div>
                    <DataTable
                      header={`GPS Center: ${dataX[0]}`}
                      data={dataX[1]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {showTable && (
        <div className="chart-container">
          <h3>Chart</h3>
          <div className="data-visualization-container">
            <ScatterChart center={gpsCenters} data={circumPointsArray} />

            <div className="data-table-container">
              <div className="data-table-wrapper">
                <DataTable
                  header={"Points of Intersection"}
                  data={pointsOfIntersection}
                />
              </div>

              <div className="data-table-wrapper">
                <DataTable header={"GPS Devices Count"} data={gpsDeviceCount} />
              </div>

              <div className="data-table-wrapper">
                <DataTable
                  header={"Total Points of Intersection"}
                  data={totalPointsOfIntersection}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
