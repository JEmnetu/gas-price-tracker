import type { GasPriceDataPoint, TimeRange } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface NationalTrendChartProps {
  trend: GasPriceDataPoint[];
  selected: TimeRange;
}

const NationalTrendChart = ({ trend, selected }: NationalTrendChartProps) => {
  return (
    <>
      <h2>{selected}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={trend}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="price" stroke="#3B82F6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default NationalTrendChart;
