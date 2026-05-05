import {
  EIADataPoint,
  GasPriceDataPoint,
  GasPriceResponse,
  NationalTrendData,
  PADDRegion,
} from "../types";
import { PADD_REGIONS, NATIONAL_ID } from "../constants/paddRegions";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Converts a raw EIA data point to our clean internal shape
const parseDataPoint = (point: EIADataPoint): GasPriceDataPoint => ({
  date: point.period,
  price: parseFloat(point.value),
});

// Filters and sorts data points for a specific area, oldest to newest
const getAreaTrend = (
  data: EIADataPoint[],
  duoarea: string,
): GasPriceDataPoint[] => {
  return data
    .filter((point) => point.duoarea === duoarea)
    .map(parseDataPoint)
    .sort((a, b) => a.date.localeCompare(b.date));
};

const buildNationalData = (data: EIADataPoint[]): NationalTrendData => {
  const trend = getAreaTrend(data, NATIONAL_ID);
  const current = trend[trend.length - 1].price;
  const previousWeek = trend[trend.length - 2].price;

  return {
    current,
    previousWeek,
    weekOverWeekChange: parseFloat((current - previousWeek).toFixed(3)),
    trend,
  };
};

const buildRegionData = (data: EIADataPoint[]): PADDRegion[] => {
  return PADD_REGIONS.map((region) => {
    const trend = getAreaTrend(data, region.id);
    const current = trend[trend.length - 1]?.price ?? 0;

    return {
      ...region,
      current,
      trend,
    };
  });
};

export const fetchGasPrices = async (
  weeks: number = 52,
): Promise<GasPriceResponse> => {
  const response = await fetch(`${API_BASE_URL}/prices?weeks=${weeks}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch gas prices: ${response.status}`);
  }

  const data: EIADataPoint[] = await response.json();

  const lastUpdated = data
    .filter((p) => p.duoarea === NATIONAL_ID)
    .sort((a, b) => b.period.localeCompare(a.period))[0].period;

  return {
    national: buildNationalData(data),
    regions: buildRegionData(data),
    lastUpdated,
  };
};
