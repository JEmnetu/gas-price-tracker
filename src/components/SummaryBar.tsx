interface SummaryBarPropType {
  nationalAvg: number | null;
  weeklyDelta: number | null;
  highestRegion: string;
  lowestRegion: string;
  highestPrice: number | null;
  lowestPrice: number | null;
  lastUpdated: string;
}

import useIsMobile from "../hooks/useIsMobile";

const SummaryBar = ({
  nationalAvg,
  weeklyDelta,
  highestRegion,
  lowestRegion,
  highestPrice,
  lowestPrice,
  lastUpdated,
}: SummaryBarPropType) => {
  const weekOverWeek = weeklyDelta != null ? Math.sign(weeklyDelta) : null;
  const isMobile = useIsMobile();
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between border-gray-300 border-b p-6 pl-12 pr-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-base font-medium text-gray-900">
            US Gas Price Tracker
          </h1>{" "}
          <p className="text-xs text-gray-600 font-medium">
            Updated{" "}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>
        <p className=" hidden md:block text-xs text-gray-600 whitespace-nowrap">
          Source: US Energy Information Administration{" "}
        </p>
      </div>

      <div className="w-full flex">
        <div className="w-1/3 md:py-4 flex flex-col items-center justify-center md:items-start md:pl-8 border-b border-r border-gray-200">
          <p className="text-xs  text-gray-400 uppercase tracking-wider mb-1">
            National {isMobile ? "Avg" : "Average"}
          </p>
          <p className="text-2xl font-medium text-gray-900">
            ${nationalAvg?.toFixed(2)}
          </p>
          <p
            className={
              weekOverWeek === 1
                ? "text-xs text-red-500 font-medium mt-0.5"
                : weekOverWeek === -1
                  ? "text-xs text-green-500 font-medium mt-0.5"
                  : "text-xs text-black-500 font-medium mt-0.5"
            }
          >
            {weekOverWeek === 1 ? "↑" : weekOverWeek === -1 ? "↓" : "—"} $
            {weeklyDelta != null ? Math.abs(weeklyDelta).toFixed(2) : "—"}{" "}
            {!isMobile && "from last week"}
          </p>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center md:items-start md:pl-8 border-b border-r border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Highest Region
          </p>
          <p className="text-2xl font-medium text-gray-900">
            ${highestPrice?.toFixed(2)}
          </p>
          <p className="text-xs text-500 font-medium mt-0.5">{highestRegion}</p>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center md:items-start md:pl-8 border-b border-r border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Lowest Region
          </p>
          <p className="text-2xl font-medium text-gray-900">
            ${lowestPrice?.toFixed(2)}
          </p>
          <p className="text-xs text-500 font-medium mt-0.5">{lowestRegion}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryBar;
