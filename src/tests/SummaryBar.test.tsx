import { render, screen, cleanup } from "@testing-library/react";
import SummaryBar from "../components/SummaryBar";

describe("SummaryBar", () => {
  beforeEach(() => {
    cleanup();
  });

  it("displays the formatted national average", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={0.12}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/3.46/)).toBeInTheDocument();
  });

  it("displays a positive indicator when weekly change is positive", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={0.35}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/\(\^\)/)).toBeInTheDocument();
  });

  it("displays a negative indicator when weekly change is negative", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={-0.2}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/\(v\)/)).toBeInTheDocument();
  });

  it("displays a neutral indicator when weekly change is 0", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={0.0}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/(-)/)).toBeInTheDocument();
  });

  it("displays the name of the region with the highest price", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={0.0}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/West Coast/)).toBeInTheDocument();
  });

  it("displays the name of the region with the lowest price", () => {
    render(
      <SummaryBar
        nationalAvg={3.456}
        weeklyDelta={0.0}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
      />,
    );

    expect(screen.getByText(/Gulf Coast/)).toBeInTheDocument();
  });

  it("renders safely when data is null", () => {
    render(
      <SummaryBar
        nationalAvg={null}
        weeklyDelta={null}
        highestRegion="-"
        lowestRegion="-"
      />,
    );

    expect(screen.getByText(/Highest Region/)).toBeInTheDocument();
  });
});
