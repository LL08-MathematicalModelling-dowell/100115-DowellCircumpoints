import React, { useContext } from "react";
import CoordinateCalculatorView from "./coordinateCalculatorView";
import useActualCoordinate from "../hooks/useActualCoordinate";
import Loading from "./Loading";
import Error from "./Error";
import "../App.css";
import { FormContext } from "../Pages/Form";

export default function Overlay({ children }) {
  const formData = useContext(FormContext);
  const { data, loading, error } = useActualCoordinate(formData);

  if (data) {
    return <CoordinateCalculatorView CalculatedValues={data} />;
  }

  if (loading) {
    return <Loading isLoading={loading} />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <>{children}</>;
}