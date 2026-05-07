import type { PADDRegion } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RegionalTrendChartProps {
  region: PADDRegion | null;
}

const RegionalTrendChart = ({ region }: RegionalTrendChartProps) => {
  return (
    <>
      <h2>{region?.name}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={region?.trend}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="price" stroke="#3B82F6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RegionalTrendChart;
