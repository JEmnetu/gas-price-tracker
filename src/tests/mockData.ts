export const mockTrend = [
  { date: "2026-01-05", price: 3.12 },
  { date: "2026-01-12", price: 3.18 },
  { date: "2026-01-19", price: 3.25 },
  { date: "2026-01-26", price: 3.31 },
  { date: "2026-02-02", price: 3.28 },
  { date: "2026-02-09", price: 3.22 },
  { date: "2026-02-16", price: 3.15 },
  { date: "2026-02-23", price: 3.09 },
  { date: "2026-03-02", price: 3.14 },
  { date: "2026-03-09", price: 3.63 },
  { date: "2026-03-16", price: 3.85 },
  { date: "2026-03-23", price: 4.09 },
  { date: "2026-03-30", price: 4.12 },
  { date: "2026-04-06", price: 4.25 },
  { date: "2026-04-13", price: 4.25 },
  { date: "2026-04-20", price: 4.17 },
  { date: "2026-04-27", price: 4.25 },
  { date: "2026-05-04", price: 4.58 },
];

export const mockRegions = [
  { id: "R10", name: "East Coast", current: 4.36, trend: mockTrend },
  { id: "R20", name: "Midwest", current: 4.48, trend: mockTrend },
  { id: "R30", name: "Gulf Coast", current: 3.99, trend: mockTrend },
  { id: "R40", name: "Rocky Mountain", current: 4.49, trend: mockTrend },
  { id: "R50", name: "West Coast", current: 5.71, trend: mockTrend },
];

export const mockNationalData = {
  current: 4.58,
  previousWeek: 4.25,
  weekOverWeekChange: 0.33,
  trend: mockTrend,
  highest: 5,
  lowest: 4.15,
};
