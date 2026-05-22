import { cleanup, render, screen } from "@testing-library/react";
import NationalTrendChart from "../components/NationalTrendChart";

describe("NationalTrendChart", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    render(
      <NationalTrendChart
        trend={[{ date: "2026-05-04", price: 3.45 }]}
        selected="1Y"
      />,
    );
  });

  it("handles an empty data array without crashing", () => {
    render(<NationalTrendChart trend={[]} selected="1Y" />);
  });
});
