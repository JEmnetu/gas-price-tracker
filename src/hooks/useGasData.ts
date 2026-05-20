import { useState, useEffect } from "react";
import type { GasPriceResponse, TimeRange } from "../types";
import { fetchGasPrices } from "../api/gasApi";
import { mockNationalData, mockRegions } from "../tests/mockData";

// const WEEKS_MAP: Record<TimeRange, number> = {
//   "1M": 4,
//   "3M": 13,
//   "6M": 26,
//   "1Y": 52,
//   "5Y": 260,
// };

const useGasData = (timeRange: TimeRange) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     const weeks = WEEKS_MAP[timeRange];

  //     try {
  //       const response = await fetchGasPrices(weeks);
  //       setData(response);
  //       setLoading(false);
  //       setError(null);
  //     } catch (err) {
  //       setData(null);
  //       setLoading(false);
  //       setError(err as Error);
  //     }
  //   };

  //   fetchData();
  // }, [timeRange]);
  const [data, setData] = useState<GasPriceResponse | null>({
    national: mockNationalData,
    regions: mockRegions,
    lastUpdated: "2026-05-04",
  });

  return { data, loading, error };
};

export default useGasData;
