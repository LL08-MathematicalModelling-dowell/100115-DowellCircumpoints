import { useContext } from "react";
import { ConvertCoordinates_URL } from "../util/constants";
import useFetchData from "./useFetchData";
import { FormContext } from "../Pages/Form";

export default function useConvertedCoordinateData() {
  const formData = useContext(FormContext);
  const { shapeType, width, length } = formData;

  const params = new URLSearchParams({
    type: shapeType,
    width,
    length,
    value: 0.5,
  });

  const url = `${ConvertCoordinates_URL}/?${params}`;

  const option = "searchParams";

  const { data, loading, error } = useFetchData(url, params, formData, option);
  return { data, loading, error };
}
