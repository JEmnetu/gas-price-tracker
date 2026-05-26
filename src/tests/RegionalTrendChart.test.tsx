import { render, screen, cleanup } from "@testing-library/react";
import RegionalTrendChart from "../components/RegionalTrendChart";

describe("RegionalTrendChart", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders successfully", () => {
    render(
      <RegionalTrendChart region={null} nationalAvg={null} timeRange={"1Y"} />,
    );
  });

  it("correctly displays region name when a region is passed", () => {
    render(
      <RegionalTrendChart
        region={{
          id: "R10",
          name: "East Coast",
          current: 3.45,
          trend: [{ date: "2026-05-04", price: 3.45 }],
        }}
        nationalAvg={4.62}
        timeRange={"1Y"}
      />,
    );

    const regionLabel = screen.getByText("East Coast");
    expect(regionLabel).toBeInTheDocument();
  });
});
