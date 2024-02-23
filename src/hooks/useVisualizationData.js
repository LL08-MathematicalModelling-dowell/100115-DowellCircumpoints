import { MultiCircumference_URL } from "../util/constants";
import useFetchData from "../hooks/useFetchData";

export default function useVisualizationData(formData, gpsDeviceCenters) {
  const payload = {
    radius: 3,
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
  if (data) {
    Object.keys(data["circum_points_dict"]).forEach((key) => {
      circum_points_dict.push([
        [key],
        data["circum_points_dict"][key].map((val) => {
          return { x: val[0], y: val[1] };
        }),
      ]);
    });
  }

  return { data: circum_points_dict, loading, error };
}
