import type { GasPriceDataPoint, TimeRange } from "../types";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { getNationalXAxisInterval } from "../utils/chartUtils";

interface NationalTrendChartProps {
  trend: GasPriceDataPoint[];
  selected: TimeRange;
}

const NationalTrendChart = ({ trend, selected }: NationalTrendChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={trend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            interval={getNationalXAxisInterval(selected)}
            angle={selected === "5Y" ? -45 : 0}
            textAnchor={selected === "5Y" ? "end" : "middle"}
            height={selected === "5Y" ? 50 : 30}
            tickFormatter={(value) => {
              const d = new Date(value);
              if (selected === "5Y") {
                return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`;
              }
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            domain={["auto", "auto"]}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#1d4ed8"
            strokeWidth={1.5}
            fill="#1d4ed8"
            fillOpacity={0.15}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default NationalTrendChart;
