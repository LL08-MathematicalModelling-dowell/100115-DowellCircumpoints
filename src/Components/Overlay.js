import React from "react";
import CoordinateCalculatorView from "./coordinateCalculatorView";
import useActualCoordinate from "../hooks/useActualCoordinate";
import Loading from "./Loading";
import Error from "./Error";
import "../App.css";

export default function Overlay({ children, formData }) {
  const { data, loading, error } = useActualCoordinate(formData);

  if (data) {
    return (
      <CoordinateCalculatorView CalculatedValues={data} UserInputs={formData} />
    );
  }

  if (loading) {
    return <Loading isLoading={loading} />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <>{children}</>;
}
