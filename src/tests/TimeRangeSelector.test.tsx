import userEvent from "@testing-library/user-event";
import TimeRangeSelector from "../components/TimeRangeSelector";
import { cleanup, render, screen } from "@testing-library/react";

describe("TimeRangeSelector", () => {
  beforeEach(() => {
    cleanup();
  });

  it("calls onChange with the correct value when a button is clicked", async () => {
    const handleChange = vi.fn();

    render(<TimeRangeSelector selected="1Y" onChange={handleChange} />);

    await userEvent.click(screen.getByText("3M"));

    expect(handleChange).toHaveBeenCalledWith("3M");
  });

  it("renders all 5 time range buttons", async () => {
    const handleChange = vi.fn();
    render(<TimeRangeSelector selected="1Y" onChange={handleChange} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("checks if selected button has the active style class", () => {
    const handleChange = vi.fn();
    render(<TimeRangeSelector selected="1Y" onChange={handleChange} />);
    const selectedButton = screen.getByText("1Y");
    expect(selectedButton).toHaveClass("bg-blue-500");
  });
});
