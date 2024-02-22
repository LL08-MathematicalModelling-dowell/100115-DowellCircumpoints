import { SquareAPI_URL, CircleApi_URL } from "../util/constants";
import useFetchData from "./useFetchData";
export default function useActualCoordinate(formData) {
  const url = formData?.shapeType === "squares" ? SquareAPI_URL : CircleApi_URL;
  const payload = {
    square: {
      length: formData?.length,
      width: formData?.width,
      side_length: formData?.squareSideLength,
    },
    circle: {
      radius: formData?.circleRadius,
      length: formData?.length,
      width: formData?.width,
    },
  };

  const option = "json";

  const { data, loading, error } = useFetchData(
    url,
    payload["square"],
    formData,
    option
  );

  return { data, loading, error };
}
