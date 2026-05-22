import { render, screen, cleanup } from "@testing-library/react";
import SummaryBar from "../components/SummaryBar";

describe("SummaryBar", () => {
  beforeEach(() => {
    cleanup();
  });

  it("displays the formatted national average", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={0.01}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/4.62/)).toBeInTheDocument();
  });

  it("displays a positive indicator when weekly change is positive", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={0.12}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });

  it("displays a negative indicator when weekly change is negative", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={-0.35}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/↓/)).toBeInTheDocument();
  });

  it("displays a neutral indicator when weekly change is 0", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={0}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/(—)/)).toBeInTheDocument();
  });

  it("displays the name of the region with the highest price", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={0.01}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/West Coast/)).toBeInTheDocument();
  });

  it("displays the name of the region with the lowest price", () => {
    render(
      <SummaryBar
        nationalAvg={4.62}
        weeklyDelta={0.01}
        highestRegion="West Coast"
        lowestRegion="Gulf Coast"
        highestPrice={5.74}
        lowestPrice={4.05}
        lastUpdated="2026-05-18"
      />,
    );

    expect(screen.getByText(/Gulf Coast/)).toBeInTheDocument();
  });

  it("renders safely when data is null", () => {
    render(
      <SummaryBar
        nationalAvg={null}
        weeklyDelta={null}
        highestRegion=""
        lowestRegion=""
        highestPrice={null}
        lowestPrice={null}
        lastUpdated=""
      />,
    );

    expect(screen.getByText(/Highest Region/)).toBeInTheDocument();
  });
});
