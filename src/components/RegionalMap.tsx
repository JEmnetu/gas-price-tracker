import { useEffect } from "react";
import UsMap from "../assets/us.svg?react";
import type { PADDRegion } from "../types";
import { STATE_PADD_MAP } from "../constants/statePaddMap";
import { PADD_COLORS } from "../constants/paddRegions";

interface RegionalMapProps {
  regions: PADDRegion[];
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

const RegionalMap = ({ selectedRegion, onRegionClick }: RegionalMapProps) => {
  useEffect(() => {
    Object.entries(STATE_PADD_MAP).forEach(([stateId, paddId]) => {
      const el = document.getElementById(stateId);
      if (!el) return;

      const fill = PADD_COLORS[paddId as keyof typeof PADD_COLORS];
      const opacity =
        !selectedRegion || paddId === selectedRegion ? "1" : "0.3";

      el.style.fill = fill;
      el.style.opacity = opacity;
      el.style.cursor = "pointer";
      el.style.transition = "opacity 0.2s";
    });
  }, [selectedRegion]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGPathElement;
    const stateId = target.id;
    const paddId = STATE_PADD_MAP[stateId];
    if (paddId) onRegionClick(paddId);
  };

  return (
    <div className="w-full">
      <UsMap style={{ width: "100%", height: "auto" }} onClick={handleClick} />
    </div>
  );
};

export default RegionalMap;
