import type { TimeRange } from "../types/";

export const getNationalXAxisInterval = (
  selected: TimeRange,
  isMobile: boolean,
): number => {
  switch (selected) {
    case "1M":
      return 1;
    case "3M":
      return 2;
    case "6M":
      return 3;
    case "1Y":
      return isMobile ? 7 : 5;
    case "5Y":
      return isMobile ? 49 : 24;
    default:
      return 5;
  }
};

export const getRegionalXAxisInterval = (
  selected: TimeRange,
  isMobile: boolean,
): number => {
  switch (selected) {
    case "1M":
      return 1;
    case "3M":
      return 2;
    case "6M":
      return 3;
    case "1Y":
      return isMobile ? 7 : 5;
    case "5Y":
      return 40;
    default:
      return 5;
  }
};
