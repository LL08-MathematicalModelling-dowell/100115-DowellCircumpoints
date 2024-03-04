import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import DataVisualization from "./Pages/DataVisualization";
import Form from "./Pages/Form";
import "./App.css";
import GPSDeviceLocator from "./Pages/GPSDeviceLocator";

export default function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path={"/gps-device-locator"} element={<GPSDeviceLocator />} />
          <Route path={"/visualization"} element={<DataVisualization />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
