import { useState } from "react";
import useGasData from "./hooks/useGasData";
import "./App.css";
import SummaryBar from "./components/SummaryBar";
import RegionalMap from "./components/RegionalMap";
import type { ActiveTab, TimeRange } from "./types";
import NationalTrendChart from "./components/NationalTrendChart";
import RegionalTrendChart from "./components/RegionalTrendChart";
import TimeRangeSelector from "./components/TimeRangeSelector";

function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");
  const { data, loading, error } = useGasData(timeRange);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const selectedRegion = selectedRegionId
    ? (data?.regions.find((r) => r.id === selectedRegionId) ?? null)
    : null;
  const [activeTab, setActiveTab] = useState<ActiveTab>("national");

  // if (loading && !data)
  //   return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">Failed to load data.</div>
    );

  return (
    <div className="w-full overflow-x-hidden">
      <SummaryBar
        nationalAvg={data?.national.current ?? null}
        weeklyDelta={data?.national.weekOverWeekChange ?? null}
        highestPrice={
          data?.regions.reduce((a, b) => (a.current > b.current ? a : b))
            .current ?? null
        }
        lowestPrice={
          data?.regions.reduce((a, b) => (a.current < b.current ? a : b))
            .current ?? null
        }
        highestRegion={
          data?.regions.reduce((a, b) => (a.current > b.current ? a : b))
            .name ?? "-"
        }
        lowestRegion={
          data?.regions.reduce((a, b) => (a.current < b.current ? a : b))
            .name ?? "-"
        }
        lastUpdated={data?.lastUpdated ?? ""}
      />
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between  px-8 py-1 md:py-2 border-gray-200 border-b">
        <div className="flex pt-2 pb-2">
          <div
            onClick={() => setActiveTab("national")}
            className={`font-medium mr-4 md:mr-8 text-center cursor-pointer border-b-2 ${
              activeTab === "national"
                ? "border-gray-900 text-gray-900 font-medium"
                : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-900"
            }`}
          >
            National Trend
          </div>
          <div
            onClick={() => setActiveTab("regional")}
            className={`font-medium md:mr-8 text-center cursor-pointer border-b-2 ${
              activeTab === "regional"
                ? "border-gray-900 text-gray-900 font-medium"
                : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-900"
            }`}
          >
            Regional Trend
          </div>
        </div>

        <div className="pb-2 md:pb-0">
          {" "}
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>
      </div>
      <section className="w-full max-w-7xl mx-auto pl-0 pr-8 pt-0 pb-6 overflow-x-hidden">
        <div>
          {activeTab === "national" && (
            <div className="pt-4">
              {loading && (
                // <div className="w-full relative min-h-64 flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 animate-spin text-gray-300 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
                // </div>
              )}
              <div className="w-full flex flex-col md:flex-row items-center md:justify-between md:mb-10">
                {" "}
                <h3 className="pl-0 pb-2 md:pl-18 md:pb-0">
                  US average price per gallon
                </h3>{" "}
              </div>
              <NationalTrendChart
                trend={data?.national.trend ?? []}
                selected={timeRange}
              />
            </div>
          )}

          {activeTab === "regional" && (
            <div className="flex flex-col md:flex-row gap-6 items-start w-full mt-12 regional-wrapper">
              <div className="w-full md:w-3/5">
                <RegionalMap
                  regions={data?.regions ?? []}
                  selectedRegion={selectedRegion?.id ?? null}
                  onRegionClick={(regionId) => setSelectedRegionId(regionId)}
                />
              </div>
              <div className="w-full md:w-2/5 relative min-h-64">
                {loading && data && (
                  <div className="w-full flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 animate-spin text-gray-300 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {selectedRegion ? (
                  <RegionalTrendChart
                    region={selectedRegion}
                    nationalAvg={data?.national.current ?? null}
                    timeRange={timeRange}
                  />
                ) : (
                  <p className="text-gray-400 text-center mt-40">
                    Click a region on the map to view its price trend
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
