import type { PADDRegion, TimeRange } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getRegionalXAxisInterval } from "../utils/chartUtils";

import useIsMobile from "../hooks/useIsMobile";

interface RegionalTrendChartProps {
  region: PADDRegion | null;
  nationalAvg: number | null;
  timeRange: TimeRange;
}

const RegionalTrendChart = ({
  region,
  nationalAvg,
  timeRange,
}: RegionalTrendChartProps) => {
  const variance: number | null =
    region != null && nationalAvg != null ? region.current - nationalAvg : null;

  const isMobile = useIsMobile();
  const varianceSign = variance != null ? Math.sign(variance) : null;
  return (
    <div className="w-full">
      <h3 className="text-base text-center font-medium text-gray-900">
        {region?.name}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={region?.trend}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            interval={getRegionalXAxisInterval(timeRange, isMobile)}
            angle={timeRange === "5Y" ? -45 : 0}
            textAnchor={timeRange === "5Y" ? "end" : "middle"}
            height={timeRange === "5Y" ? 50 : 30}
            tickFormatter={(value) => {
              const d = new Date(value);
              if (timeRange === "5Y") {
                return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`;
              }
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />

          <YAxis
            tickFormatter={(value) => `$${value}`}
            domain={["auto", "auto"]}
          />
          <Tooltip />

          <Line type="monotone" dataKey="price" stroke="#3B82F6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-around mt-4 pl-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Current Price
          </p>
          <p className="text-xl font-medium text-gray-900">
            ${(region?.current ?? 0).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            vs National
          </p>
          <p
            className={`text-xl font-medium ${varianceSign === 1 ? "text-red-500" : varianceSign === -1 ? "text-green-500" : ""}`}
          >
            {varianceSign === 1 ? "+" : ""}
            {variance?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionalTrendChart;
