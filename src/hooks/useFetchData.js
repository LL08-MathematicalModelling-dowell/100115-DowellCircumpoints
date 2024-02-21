import { useState, useEffect } from "react";
import { SquareAPI_URL, CircleApi_URL } from "../util/constants";

export default function useFetchData(formData) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!formData) return;
      setLoading(true);
      try {
        const payload =
          formData.shapeType === "squares"
            ? {
                length: formData.length,
                width: formData.width,
                side_length: formData.squareSideLength,
              }
            : {
                radius: formData.circleRadius,
                length: formData.length,
                width: formData.width,
              };
        const url =
          formData.shapeType === "squares" ? SquareAPI_URL : CircleApi_URL;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formData]);
  return { data, error, loading };
}
