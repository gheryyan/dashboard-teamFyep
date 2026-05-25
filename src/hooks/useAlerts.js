import { useState, useEffect, useCallback } from "react";
import { getAlerts } from "../services/api";
 
const useAlerts = (params = {}) => {
  const [alerts, setAlerts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [meta, setMeta]       = useState(null);
 
  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAlerts(params);
 
      console.log("[useAlerts] raw response:", res.data);
 
     
      let result = res.data;
      let paginationMeta = null;
 
      if (result && typeof result === "object" && !Array.isArray(result)) {
        if (result.total !== undefined) {
          paginationMeta = {
            total:    result.total,
            perPage:  result.per_page,
            lastPage: result.last_page,
          };
        }
        result = result.data ?? result;
      }
      // Satu level lagi kalau masih object
      if (result && typeof result === "object" && !Array.isArray(result)) {
        result = result.data ?? result;
      }
 
      setAlerts(Array.isArray(result) ? result : []);
      if (paginationMeta) setMeta(paginationMeta);
 
    } catch (err) {
      console.error("[useAlerts] error:", err);
      setError(err.response?.data?.message || "Gagal memuat data alerts.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);
 
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);
 
  return { alerts, loading, error, meta, refetch: fetchAlerts };
};
 
export default useAlerts;