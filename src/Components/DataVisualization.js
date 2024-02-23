import React, { useContext } from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useVisualizationData from "../hooks/useVisualizationData";
import Loading from "./Loading";
import Error from "./Error";
import { FormContext } from "../App";

export default function DataVisualization({ gpsDeviceCenters }) {
  const formData = useContext(FormContext);
  const { data, loading, error } = useVisualizationData(
    formData,
    gpsDeviceCenters
  );

  const circumPointsArray = data.map((val) => val[1]);
  console.log(circumPointsArray);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="data-visualization-container">
      <h3 className="data-visualization-header">Data visualization</h3>
      <div className="data-container">
        <ScatterChart width={1100} height={600}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="X" />
          <YAxis type="number" dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: "1 1" }} fill="#8884d8" />

          {circumPointsArray.map((circumPoints, index) => (
            <Scatter key={index} data={circumPoints} fill="#154078" />
          ))}
        </ScatterChart>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "15rem",
          }}
        >
          <table
            border={1}
            className="table"
            style={{ overflow: "visible", marginBottom: "2rem" }}
          >
            <thead className="thead">
              <tr className="trhead">
                <th style={{ color: "white" }}>Intercepted Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>[2.4, 4]</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>[3, 2]</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>[1, 4]</td>
              </tr>
            </tbody>
          </table>

          <table
            border={1}
            className="table"
            style={{ overflow: "visible", marginBottom: "2rem" }}
          >
            <thead className="thead">
              <tr className="trhead">
                <th style={{ color: "white" }}>GPS Devices Center</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>3</td>
              </tr>
            </tbody>
          </table>

          <table
            border={1}
            className="table"
            style={{ overflow: "visible", marginBottom: "2rem" }}
          >
            <thead className="thead">
              <tr className="trhead">
                <th style={{ color: "white" }}>Total Points of Intersection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
/*Need to Refactoring

 */
