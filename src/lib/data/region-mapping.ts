// The 2026 programme list and the regional-competitiveness chart data use slightly different
// region groupings (e.g. programme list has one "North West", competitiveness data splits
// "North West - Mersey" / "North West - North West"). This maps competitiveness sub-regions
// onto the programme list's canonical region names so the two datasets can be joined.

export const PROGRAMME_REGIONS = [
  "East Midlands",
  "East of England",
  "Kent, Surrey and Sussex",
  "London",
  "North East",
  "North West",
  "Northern Ireland",
  "South West",
  "Thames Valley",
  "Wales",
  "Wessex",
  "West Midlands",
  "Yorkshire and the Humber",
] as const;

export type ProgrammeRegion = (typeof PROGRAMME_REGIONS)[number];

// Scotland runs recruitment separately and has no rows in the 2026 England/Wales/NI programme list,
// but does appear in the regional-competitiveness rank data, so it needs its own bucket.
export type RegionName = ProgrammeRegion | "Scotland";

// competitiveness-data region name -> canonical region
export const COMPETITIVENESS_TO_PROGRAMME_REGION: Record<string, RegionName> = {
  "East Midlands": "East Midlands",
  "East of England": "East of England",
  "Kent Surrey and Sussex": "Kent, Surrey and Sussex",
  "London": "London",
  "North East": "North East",
  "North West - Mersey": "North West",
  "North West - North West": "North West",
  "Northern Ireland": "Northern Ireland",
  "South West - Peninsula": "South West",
  "South West - Severn": "South West",
  "Thames Valley": "Thames Valley",
  "Wales": "Wales",
  "Wessex": "Wessex",
  "West Midlands": "West Midlands",
  "Yorkshire and the Humber": "Yorkshire and the Humber",
  "Scotland": "Scotland",
};
