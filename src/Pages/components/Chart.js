import React from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ data }) {
  return (
    <ScatterChart width={1000} height={500}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="x" name="X" />
      <YAxis type="number" dataKey="y" name="Y" />
      <Tooltip cursor={{ strokeDasharray: "1 1" }} fill="red" />

      {data.map((circumPoints, index) => (
        <Scatter key={index} data={circumPoints} fill="#3b7e3e" />
      ))}
    </ScatterChart>
  );
}
