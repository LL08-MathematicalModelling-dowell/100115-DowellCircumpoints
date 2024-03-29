import { useContext } from "react";
import { ConvertCoordinates_URL } from "../util/constants";
import useFetchData from "./useFetchData";
import { FormContext } from "../Pages/Coordinate Calculator/Form";

export default function useConvertedCoordinateData() {
  const formData = useContext(FormContext);
  const { shapeType, width, length, squareSideLength, circleRadius } = formData;

  const params = new URLSearchParams({
    type: shapeType,
    width,
    length,
    value: squareSideLength || circleRadius,
  });

  const url = `${ConvertCoordinates_URL}/?${params}`;

  const option = "searchParams";

  const { data, loading, error } = useFetchData(url, params, formData, option);
  return { data, loading, error };
}
