import { useState, useEffect } from "react";

export default function useFetchData(url, payload, formData, option) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!formData) return;
      setLoading(true);

      try {
        if (option === "json") {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
          });

          const jsonData = await response.json();
          setData(jsonData);
        } else {
          const response = await fetch(url);

          const jsonData = await response.json();

          setData(jsonData);
        }
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
