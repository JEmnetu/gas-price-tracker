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

  it("correctly displays the time range label", () => {
    render(
      <NationalTrendChart
        trend={[{ date: "2026-05-04", price: 3.45 }]}
        selected="1Y"
      />,
    );

    const timeRangeLabel = screen.getByText("1Y");
    expect(timeRangeLabel).toBeInTheDocument();
  });

  it("handles an empty data array without crashing", () => {
    render(<NationalTrendChart trend={[]} selected="1Y" />);
  });
});
