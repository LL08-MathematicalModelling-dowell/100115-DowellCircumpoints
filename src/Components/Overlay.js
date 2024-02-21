import React from "react";
import useFetchData from "../hooks/useFetchData";
import CoordinateCalculatorView from "./coordinateCalculatorView";

export default function Overlay({ children, formData }) {
  const { data, loading, error } = useFetchData(formData);

  if (data) {
    return (
      <CoordinateCalculatorView CalculatedValues={data} UserInputs={formData} />
    );
  }

  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>{error.message}</>;
  }
  return <>{children}</>;
}
