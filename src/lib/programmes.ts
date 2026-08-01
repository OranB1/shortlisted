import programmeData from "../../data/generated/imt-programmes-2026.json";
import competitivenessData from "../../data/generated/imt-regional-competitiveness.json";
import { PROGRAMME_REGIONS, type ProgrammeRegion } from "@/lib/data/region-mapping";

export type Programme = {
  offerCode: string;
  region: string;
  subRegion: string;
  sector: string;
  description: string;
  places: number;
  durationMonths: number | null;
  startDate: string;
  specialty: string;
};

export type RegionTotal = {
  region: string;
  places: number;
  programmeCount: number;
  imt: number;
  accsIm: number;
};

export type RegionalCompetitiveness = {
  year: number;
  region: string;
  acceptedCount: number;
  medianRank: number;
  meanRank: number;
  bestRank: number;
  worstRank: number;
};

export const PROGRAMMES: Programme[] = programmeData.programmes;
export const REGION_TOTALS: RegionTotal[] = programmeData.regionTotals;
export const REGIONAL_COMPETITIVENESS: RegionalCompetitiveness[] = competitivenessData;

export function getRegionTotal(region: ProgrammeRegion): RegionTotal | undefined {
  return REGION_TOTALS.find((r) => r.region === region);
}

export function getRegions(): readonly ProgrammeRegion[] {
  return PROGRAMME_REGIONS;
}

export function getLatestCompetitiveness(region: string): RegionalCompetitiveness | undefined {
  const rows = REGIONAL_COMPETITIVENESS.filter((r) => r.region === region);
  if (!rows.length) return undefined;
  return rows.reduce((a, b) => (a.year > b.year ? a : b));
}
