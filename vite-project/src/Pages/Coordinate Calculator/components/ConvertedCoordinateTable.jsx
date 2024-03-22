import React, { useContext } from "react";
import useConvertedCoordinateData from "../../../hooks/useConvertedCoordinateData";
import Table from "../../../Components/Table";
import Loading from "../../../Components/overlay/Loading";
import Error from "../../../Components/overlay/Error";
import { FormContext } from "../Form";
import "../util/styles.css";

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
          <h3>Geocoordinate Coordinate</h3>
          <Table data={data?.response?.converted_coordinates} />
        </>
      )}
    </>
  );
}
