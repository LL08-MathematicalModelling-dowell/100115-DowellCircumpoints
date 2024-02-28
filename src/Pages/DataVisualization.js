import React, { useState } from "react";
import useVisualizationData from "../hooks/useVisualizationData";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Chart from "./components/Chart";
import DataTable from "./components/DataTable";
import "./styles/styles.css";

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

  const circumPointsArray = data[0].map((val) => val[1]);
  const gpsDeviceCount = data[1];
  const totalPointsOfIntersection = data[2];
  const pointsOfIntersection = data[3];

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const ha = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="container">
      <h2>Data Visualization</h2>
      <div className="button-holder">
        <button
          className={!showTable ? "active-button" : "button"}
          onClick={ha}
        >
          {showTable ? "Show Table" : "Hide Table"}
        </button>
        <button className={showTable ? "active-button" : "button"} onClick={ha}>
          {showTable ? "Hide Graph" : " Show Graph"}
        </button>
      </div>
      {!showTable && (
        <div className="coordinate-table-wrapper">
          <div className="coordinate-table-container">
            <div className="coordinate-content">
              <h3>Coordinate Tables</h3>
              <div className="coordinate-container">
                {data[0].map((dataX) => (
                  <DataTable
                    header={`GPS Center: ${dataX[0]}`}
                    data={dataX[1]}
                  />
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
            <Chart data={circumPointsArray} />

            <div className="data-table-container">
              <DataTable
                header={"Points of Intersection"}
                data={pointsOfIntersection}
              />
              <DataTable header={"GPS Devices Count"} data={gpsDeviceCount} />
              <DataTable
                header={"Total Points of Intersection"}
                data={totalPointsOfIntersection}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}