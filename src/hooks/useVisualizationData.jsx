import { MultiCircumference_URL } from "../util/constants";
import useFetchData from "./useFetchData";

export default function useVisualizationData(
  formData,
  gpsDeviceCenters,
  radius
) {
  const payload = {
    radius,
    gps_device_centers: JSON.parse(gpsDeviceCenters),
  };

  const option = "json";
  const { data, loading, error } = useFetchData(
    MultiCircumference_URL,
    payload,
    formData,
    option
  );

  const circum_points_dict = [];
  let gpsDeviceCount = "";
  let totalPointsOfIntersection = "";
  let intersectionPoints = "";

  if (data) {
    Object.keys(data["circum_points_dict"]).forEach((key) => {
      circum_points_dict.push([
        [key],
        data["circum_points_dict"][key].map((val) => {
          return { x: parseFloat(val[0]).toFixed(4), y: parseFloat(val[1]).toFixed(4) };
        }),
      ]);
    });
    gpsDeviceCount = data["gps_device_count"];
    totalPointsOfIntersection = data["total_points_of_intersection"];
    intersectionPoints = data["points_of_intersection"];
  }

  return {
    data: [
      circum_points_dict,
      gpsDeviceCount,
      totalPointsOfIntersection,
      intersectionPoints,
    ],
    loading,
    error,
  };
}