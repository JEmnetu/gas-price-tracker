import { render, screen, cleanup } from "@testing-library/react";
import RegionalTrendChart from "../components/RegionalTrendChart";

describe("RegionalTrendChart", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders successfully", () => {
    render(<RegionalTrendChart region={null} />);
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
      />,
    );

    const regionLabel = screen.getByText("East Coast");
    expect(regionLabel).toBeInTheDocument();
  });
});
