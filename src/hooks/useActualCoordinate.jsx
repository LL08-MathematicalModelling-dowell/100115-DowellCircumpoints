import { SquareAPI_URL, CircleApi_URL } from "../util/constants";
import useFetchData from "./useFetchData";
export default function useActualCoordinate(formData) {
  const url = formData?.shapeType === "squares" ? SquareAPI_URL : CircleApi_URL;
  const payload = {
    ...(formData?.shapeType === "squares"
      ? {
          length: formData?.length,
          width: formData?.width,
          side_length: formData?.squareSideLength,
        }
      : {
          radius: parseInt(formData?.circleRadius),
          length: parseInt(formData?.length),
          width: parseInt(formData?.width),
        }),
  };

  const option = "json";

  const { data, loading, error } = useFetchData(url, payload, formData, option);

  return { data, loading, error };
}