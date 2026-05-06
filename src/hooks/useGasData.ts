import { useState, useEffect } from "react";
import type { GasPriceResponse, TimeRange } from "../types";
import { fetchGasPrices } from "../api/gasApi";

const WEEKS_MAP: Record<TimeRange, number> = {
  "1M": 4,
  "3M": 13,
  "6M": 26,
  "1Y": 52,
  "5Y": 260,
};

const useGasData = (timeRange: TimeRange) => {
  const [data, setData] = useState<GasPriceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const weeks = WEEKS_MAP[timeRange];

      try {
        const response = await fetchGasPrices(weeks);
        setData(response);
        setLoading(false);
        setError(null);
      } catch (err) {
        setData(null);
        setLoading(false);
        setError(err as Error);
      }
    };

    fetchData();
  }, [timeRange]);
  return { data, loading, error };
};

export default useGasData;
