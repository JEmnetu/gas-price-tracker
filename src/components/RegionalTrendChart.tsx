import type { PADDRegion } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getXAxisInterval } from "../utils/chartUtils";

interface RegionalTrendChartProps {
  region: PADDRegion | null;
  nationalAvg: number | null;
}

const RegionalTrendChart = ({
  region,
  nationalAvg,
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
            tickFormatter={(value) => {
              const d = new Date(value);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
            interval={getXAxisInterval("1Y")}
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
