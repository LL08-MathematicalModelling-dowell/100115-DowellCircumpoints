import { ConvertCoordinates_URL } from "../util/constants";
import useFetchData from "./useFetchData";

export default function useConvertedCoordinateData({ formData }) {
  const params = new URLSearchParams({
    type: formData?.shapeType,
    width: formData?.width,
    length: formData?.length,
    value: formData?.squareSideLength,
  });

  const url = `${ConvertCoordinates_URL}/?${params}`;

  const option = "searchParams";

  const { data, loading, error } = useFetchData(url, params, formData, option);
  return { data, loading, error };
}
