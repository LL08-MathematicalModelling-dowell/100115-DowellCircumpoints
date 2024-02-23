import React, { useContext } from "react";
import useConvertedCoordinateData from "../hooks/useConvertedCoordinateData";
import Table from "./Table";
import Loading from "./Loading";
import Error from "./Error";
import { FormContext } from "../App";

export default function ConvertedCoordinateTable() {
  const formData = useContext(FormContext);
  const { data, loading, error } = useConvertedCoordinateData(formData);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      {data && (
        <>
          <h3>{data.message}</h3>
          <Table data={data?.response?.converted_coordinates} />
        </>
      )}
    </>
  );
}
