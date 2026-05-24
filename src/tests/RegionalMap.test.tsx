import userEvent from "@testing-library/user-event";
import RegionalMap from "../components/RegionalMap";
import { cleanup, render } from "@testing-library/react";

vi.mock("../assets/us.svg?react", () => ({
  default: ({
    onClick,
  }: {
    onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  }) => (
    <svg onClick={onClick}>
      <path id="CA" />
      <path id="TX" />
    </svg>
  ),
}));

describe("RegionalMap", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    const handleClick = vi.fn();
    render(
      <RegionalMap
        regions={[]}
        selectedRegion={null}
        onRegionClick={handleClick}
      />,
    );
  });

  it("calls onRegionClick with the correct PADD region when a state is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <RegionalMap
        regions={[]}
        selectedRegion={null}
        onRegionClick={handleClick}
      />,
    );

    await userEvent.click(document.getElementById("CA")!);

    expect(handleClick).toHaveBeenCalledWith("R50");
  });
});
