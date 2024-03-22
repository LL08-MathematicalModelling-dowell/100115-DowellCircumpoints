import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import DataVisualization from "./Pages/GPSDeviceLocator/components/DataVisualization";
import Form from "./Pages/Coordinate Calculator/Form";
import "./App.css";
import GPSDeviceLocator from "./Pages/GPSDeviceLocator/GPSDeviceLocator";
import Navigation from "./Components/navigation";

function App() {
  return (
    <HashRouter basename="/">
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path={"/gps-device-locator"} element={<GPSDeviceLocator />} />
          <Route path={"/visualization"} element={<DataVisualization />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
