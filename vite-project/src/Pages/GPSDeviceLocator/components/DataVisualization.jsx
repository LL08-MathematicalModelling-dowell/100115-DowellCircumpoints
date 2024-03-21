import React, { useState } from "react";
import useVisualizationData from "../../../hooks/useVisualizationData";
import Loading from "../../../Components/overlay/Loading";
import Error from "../../../Components/overlay/Error";
import ScatterChart from "./ScatterChart";
import DataTable from "./DataTable";
import "../styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function DataVisualization() {
  const formData = localStorage.getItem("formData");
  const gpsDeviceCenters = localStorage.getItem("gpsDeviceCenters");
  const radius = localStorage.getItem("radius");

  const [showTable, setShowTable] = useState(false);
  const [showDataTable, setshowDataTable] = useState("none");

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

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const ha = () => {
    setShowTable(!showTable);
  };

  const handleHumbergerMenu = () => {
    const display = showDataTable === "flex" ? "none" : "flex";
    setshowDataTable(display);
  };

  return (
    <>
      {!showTable && (
        <div className="coordinate-table-card">
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

          <div className="coordinate-table-wrapper">
            <div className="coordinate-table-container">
              <div className="coordinate-content">
                <div className="coordinate-title-holder">
                  <h3>Coordinate Tables</h3>
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
        </div>
      )}

      {showTable && (
        <div className="section">
          <div className="humburger-menu-holder">
            <FontAwesomeIcon
              icon={faBars}
              size="2xl"
              onClick={handleHumbergerMenu}
            />
          </div>
          <div className="detail-holder" style={{ display: showDataTable }}>
            <div className="detail-holder-card">
              <div className="detail-holder-card-wrapper">
                <div className="detail-title-holder">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    size="2xl"
                    onClick={ha}
                  />

                  <h3 style={{ marginBottom: "none" }}>Data Visualization</h3>
                </div>
                <div className="data-table-container">
                  <div className="data-table-wrapper">
                    <DataTable
                      header={"Points of Intersection"}
                      data={pointsOfIntersection}
                    />
                  </div>

                  <div className="data-table-wrapper">
                    <DataTable
                      header={"GPS Devices Count"}
                      data={gpsDeviceCount}
                    />
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
          </div>
          <div style={{ width: "100%" }}>
            <ScatterChart center={gpsCenters} data={circumPointsArray} />
          </div>
        </div>
      )}
    </>
  );
}
