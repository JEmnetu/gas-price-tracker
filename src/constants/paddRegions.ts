import type { PADDRegion } from "../types";

export const PADD_REGIONS: Omit<PADDRegion, "current" | "trend">[] = [
  {
    id: "R10",
    name: "East Coast",
  },
  {
    id: "R20",
    name: "Midwest",
  },
  {
    id: "R30",
    name: "Gulf Coast",
  },
  {
    id: "R40",
    name: "Rocky Mountain",
  },
  {
    id: "R50",
    name: "West Coast",
  },
];

export const PADD_COLORS = {
  R10: "#3B82F6",
  R20: "#10B981",
  R30: "#F59E0B",
  R40: "#8B5CF6",
  R50: "#EF4444",
} as const;

export const PADD_ID_MAP: Record<string, string> = {
  R10: "East Coast",
  R20: "Midwest",
  R30: "Gulf Coast",
  R40: "Rocky Mountain",
  R50: "West Coast",
};

export const NATIONAL_ID = "NUS";
