// src/hooks/useEndpoints.js
import { useState, useEffect, useCallback } from "react";
import { getEndpoints } from "../services/api";

const useEndpoints = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchEndpoints = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEndpoints();

      console.log("[useEndpoints] raw response:", res.data);


      let result = res.data;
      if (result && typeof result === "object" && !Array.isArray(result)) {
        result = result.data ?? result;
      }
      if (result && typeof result === "object" && !Array.isArray(result)) {
        result = result.data ?? result;
      }

      setEndpoints(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("[useEndpoints] error:", err);
      setError(err.response?.data?.message || "Gagal memuat data endpoints.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  return { endpoints, loading, error, refetch: fetchEndpoints };
};

export default useEndpoints;