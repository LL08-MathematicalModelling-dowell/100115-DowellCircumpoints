import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataVisualization from "./Pages/DataVisualization";
import Form from "./Pages/Form";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path={"/visualization"} element={<DataVisualization />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
