import { useEffect, useState } from "react";
import useGasData from "./hooks/useGasData";
import "./App.css";
import SummaryBar from "./components/SummaryBar";
import RegionalMap from "./components/RegionalMap";
import type { ActiveTab, PADDRegion, TimeRange } from "./types";
import NationalTrendChart from "./components/NationalTrendChart";
import RegionalTrendChart from "./components/RegionalTrendChart";
import TimeRangeSelector from "./components/TimeRangeSelector";

function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");
  const { data, loading, error } = useGasData(timeRange);
  const [selectedRegion, setSelectedRegion] = useState<PADDRegion | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("national");

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">Failed to load data.</div>
    );

  return (
    <>
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
      />
      <div className="w-full flex justify-start pt-4 ps-8  border-gray-200 border-b">
        <div
          onClick={() => setActiveTab("national")}
          className={`font-medium mr-8 pb-3 cursor-pointer border-b-2 ${
            activeTab === "national"
              ? "border-gray-900 text-gray-900 font-medium"
              : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-900"
          }`}
        >
          National Trend
        </div>
        <div
          onClick={() => setActiveTab("regional")}
          className={`font-medium mr-8 pb-3 cursor-pointer border-b-2 ${
            activeTab === "regional"
              ? "border-gray-900 text-gray-900 font-medium"
              : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-900"
          }`}
        >
          Regional Trend
        </div>
      </div>
      <section className="w-full max-w-7xl mx-auto pl-0 pr-8 pt-12 pb-20">
        <div>
          {activeTab === "national" && (
            <>
              <div className="w-full flex flex-col md:flex-row items-center md:justify-between md:mb-10">
                {" "}
                <h3 className="pl-0 pb-2 md:pl-18 md:pb-0">
                  US average price per gallon
                </h3>{" "}
                <TimeRangeSelector
                  selected={timeRange}
                  onChange={setTimeRange}
                />
              </div>
              <NationalTrendChart
                trend={data?.national.trend ?? []}
                selected={timeRange}
              />
            </>
          )}

          {activeTab === "regional" && (
            <div className="flex flex-col md:flex-row gap-6 items-start w-full mt-12 regional-wrapper">
              <div className="w-full md:w-3/5">
                <RegionalMap
                  regions={data?.regions ?? []}
                  selectedRegion={selectedRegion?.id ?? null}
                  onRegionClick={(regionId) => {
                    const region = data?.regions.find((r) => r.id === regionId);
                    if (region) setSelectedRegion(region);
                  }}
                />
              </div>
              <div className="w-full md:w-2/5">
                {selectedRegion ? (
                  <RegionalTrendChart
                    region={selectedRegion}
                    nationalAvg={data?.national.current ?? null}
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
    </>
  );
}

export default App;
