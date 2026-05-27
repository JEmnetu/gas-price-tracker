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

  const varianceSign = variance != null ? Math.sign(variance) : null;
  return (
    <>
      <h3 className="text-base text-center font-medium text-gray-900 ps-14">
        {region?.name}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={region?.trend}>
          <XAxis
            dataKey="date"
            interval={getRegionalXAxisInterval(timeRange)}
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
      <div className="w-full flex justify-evenly ml-6 mt-8">
        <p>Current Price: ${region?.current}</p>
        <p>
          Variance vs National Price:
          <span
            className={
              varianceSign === 1
                ? "text-base text-red-500 font-medium mt-0.5"
                : varianceSign === -1
                  ? "text-base text-green-500 font-medium mt-0.5"
                  : "text-base font-medium mt-0.5"
            }
          >
            ${varianceSign === 1 && "+"}
            {variance?.toFixed(2)}
          </span>
        </p>
      </div>
    </>
  );
};

export default RegionalTrendChart;
