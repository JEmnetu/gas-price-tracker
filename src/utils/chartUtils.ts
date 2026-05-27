import type { TimeRange } from "../types/";
import useIsMobile from "../hooks/useIsMobile";

export const getNationalXAxisInterval = (selected: TimeRange): number => {
  switch (selected) {
    case "1M":
      return 1;
    case "3M":
      return 2;
    case "6M":
      return 3;
    case "1Y":
      return useIsMobile ? 7 : 5;
    case "5Y":
      return useIsMobile ? 48 : 25;
    default:
      return 5;
  }
};

export const getRegionalXAxisInterval = (selected: TimeRange): number => {
  switch (selected) {
    case "1M":
      return 1;
    case "3M":
      return 2;
    case "6M":
      return 3;
    case "1Y":
      return useIsMobile ? 7 : 5;
    case "5Y":
      return 40;
    default:
      return 5;
  }
};
