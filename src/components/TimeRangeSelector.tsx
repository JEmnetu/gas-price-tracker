import type { TimeRange } from "../types";

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TIME_RANGES: TimeRange[] = ["1M", "3M", "6M", "1Y", "5Y"];

const TimeRangeSelector = ({ selected, onChange }: TimeRangeSelectorProps) => {
  return (
    <div className="flex gap-2 mb-12 md:mb-0">
      {TIME_RANGES.map((range) => {
        return (
          <button
            key={range}
            onClick={() => onChange(range)}
            className={`px-4 py-2 rounded ${range === selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeSelector;
