// single data point from EIA API
export interface EIADataPoint {
  period: string;
  duoarea: string;
  "area-name": string;
  value: string;
  units: string;
}

export interface GasPriceDataPoint {
  data: string;
  price: number;
}

export interface NationalTrendData {
  current: number;
  previousWeek: number;
  weekOverWeekChange: number;
  trend: GasPriceDataPoint[];
}

// single PADD region
export interface PADDRegion {
  id: string;
  name: string;
  current: number;
  trend: GasPriceDataPoint[];
}

// full shaped response returned by Lambda
export interface GasPriceResponse {
  national: NationalTrendData;
  regions: PADDRegion[];
  lastUpdated: string;
}

export type TimeRange = "1M" | "3M" | "6M" | "1Y" | "5Y";
