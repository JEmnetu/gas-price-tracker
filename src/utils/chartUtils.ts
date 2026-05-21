import type { TimeRange } from "../types/";

export const getXAxisInterval = (selected: TimeRange): number => {
  switch (selected) {
    case "1M":
      return 1;
    case "3M":
      return 2;
    case "6M":
      return 3;
    case "1Y":
      return 5;
    case "5Y":
      return 25;
    default:
      return 5;
  }
};
