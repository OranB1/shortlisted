// Merges SPECIALTY_RATIOS (17 specialties, the canonical list) with SELECTION_MECHANISMS and
// SCORING_COVERAGE/SECONDARY_SPECIALTIES — the three existing data files use three *different*
// naming conventions for the same specialties (e.g. "Internal Medicine Training CT1" vs
// "IMT / joint IMT-ACCS-IM" vs "Internal Medicine Training"), a side effect of each file having
// been built independently at different times. Rather than rename keys across three files with
// existing call sites, this file owns the one explicit mapping between them, so the mismatch is
// fixed in exactly one place. Also owns the constellation's hand-authored layout (positions,
// clustering, edges) — see the note above CONSTELLATION_EDGES for what the edges do and don't mean.

import {
  SPECIALTY_RATIOS,
  SELECTION_MECHANISMS,
  SCORING_COVERAGE,
  SECONDARY_SPECIALTIES,
  type SpecialtyRatioYear,
  type CoverageTier,
} from "@/lib/data/all-specialty-ratios";

// SPECIALTY_RATIOS.specialty -> SELECTION_MECHANISMS.specialty
const MECHANISM_KEY: Record<string, string> = {
  "Internal Medicine Training CT1": "IMT / joint IMT-ACCS-IM",
  "General Practice ST1": "GP ST1",
  "Core Psychiatry Training CT1": "Core Psychiatry CT1",
  "ACCS Emergency Medicine CT1/ST1": "ACCS-Emergency Medicine ST1",
  "Anaesthetics CT1": "Anaesthetics CT1 (incl. ACCS-Anaesthetics)",
  "Obstetrics & Gynaecology ST1": "Obstetrics & Gynaecology ST1",
  "Core Surgical Training CT1": "Core Surgical Training CT1",
  "Clinical Radiology ST1": "Clinical Radiology ST1",
  "Ophthalmology ST1": "Ophthalmology ST1",
  "Cardiothoracic Surgery ST1": "Cardiothoracic Surgery ST1",
  "Histopathology ST1": "Histopathology ST1",
  "Neurosurgery ST1": "Neurosurgery ST1",
  "Oral & Maxillo Facial Surgery ST1": "Oral & Maxillofacial Surgery (OMFS) ST1",
  "Community Sexual & Reproductive Health ST1": "Community Sexual & Reproductive Health (CSRH) ST1",
  "Public Health Medicine ST1": "Public Health Medicine ST1",
  // Paediatrics and GP & Public Health Dual CCT have no SELECTION_MECHANISMS entry — Paediatrics'
  // structural note lives entirely in its portfolio-categories data file instead, and the Dual
  // CCT pathway has never been separately researched.
};

// SPECIALTY_RATIOS.specialty -> SCORING_COVERAGE / SECONDARY_SPECIALTIES key
const COVERAGE_KEY: Record<string, string> = {
  "Internal Medicine Training CT1": "Internal Medicine Training",
  "Core Surgical Training CT1": "Core Surgical Training",
  "Paediatrics ST1": "Paediatrics",
  "Clinical Radiology ST1": "Clinical Radiology",
  "Ophthalmology ST1": "Ophthalmology",
  "General Practice ST1": "General Practice",
  "Core Psychiatry Training CT1": "Core Psychiatry Training",
  "Anaesthetics CT1": "Anaesthetics / ACCS",
  "Obstetrics & Gynaecology ST1": "Obstetrics & Gynaecology",
  "ACCS Emergency Medicine CT1/ST1": "ACCS Emergency Medicine",
  "Cardiothoracic Surgery ST1": "Cardiothoracic Surgery",
  "Histopathology ST1": "Histopathology",
  "Neurosurgery ST1": "Neurosurgery",
  "Oral & Maxillo Facial Surgery ST1": "Oral & Maxillofacial Surgery",
};

function coverageFor(specialty: string): { tier: CoverageTier; portfolioHref?: string; likelihoodHref?: string } {
  const key = COVERAGE_KEY[specialty];
  if (!key) return { tier: "indicative" };
  const fromPriority = SCORING_COVERAGE[key];
  if (fromPriority) return fromPriority;
  const fromSecondary = SECONDARY_SPECIALTIES.find((s) => s.name === key);
  return fromSecondary?.coverage ?? { tier: "indicative" };
}

export type ConstellationNode = {
  id: string; // slug, also used as the edge-graph key
  ratios: SpecialtyRatioYear;
  mechanism?: string;
  tier: CoverageTier;
  portfolioHref?: string;
  likelihoodHref?: string;
  /** Position as a percentage of the canvas (0-100), hand-placed — see CONSTELLATION_EDGES. */
  x: number;
  y: number;
};

function slug(specialty: string): string {
  return specialty
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Hand-placed rather than force-simulated: 17 fixed nodes is small enough that a manual layout
// gives a cleaner, more legible result than a runtime physics simulation, and it's stable across
// renders/SSR (a seeded or random layout would either fight hydration or reshuffle on every
// visit). Loosely clustered by scoring tier — verified-scoring specialties sit together, as do
// the confirmed-MSRA-only ones and the indicative ones — so proximity on the map reflects a real
// property (how well-covered the specialty is) rather than nothing at all.
const LAYOUT: Record<string, { x: number; y: number }> = {
  "internal-medicine-training-ct1": { x: 50, y: 50 }, // the one verified_scoring_and_likelihood hub
  // verified scoring — upper-left cluster
  "core-surgical-training-ct1": { x: 22, y: 20 },
  "paediatrics-st1": { x: 32, y: 10 },
  "clinical-radiology-st1": { x: 42, y: 18 },
  "ophthalmology-st1": { x: 14, y: 34 },
  "cardiothoracic-surgery-st1": { x: 30, y: 34 },
  "histopathology-st1": { x: 20, y: 47 },
  // confirmed no portfolio (pure MSRA/interview) — right cluster
  "general-practice-st1": { x: 82, y: 22 },
  "core-psychiatry-training-ct1": { x: 92, y: 36 },
  "accs-emergency-medicine-ct1-st1": { x: 70, y: 28 },
  "anaesthetics-ct1": { x: 78, y: 46 },
  "obstetrics-and-gynaecology-st1": { x: 88, y: 56 },
  // indicative-only — lower cluster
  "community-sexual-and-reproductive-health-st1": { x: 34, y: 78 },
  "public-health-medicine-st1": { x: 46, y: 68 },
  "gp-and-public-health-dual-cct-st1": { x: 56, y: 68 },
  "neurosurgery-st1": { x: 50, y: 84 },
  "oral-and-maxillo-facial-surgery-st1": { x: 64, y: 78 },
};

export const CONSTELLATION_NODES: ConstellationNode[] = SPECIALTY_RATIOS.map((ratios) => {
  const id = slug(ratios.specialty);
  const pos = LAYOUT[id] ?? { x: 50, y: 50 };
  const coverage = coverageFor(ratios.specialty);
  return {
    id,
    ratios,
    mechanism: SELECTION_MECHANISMS.find((m) => m.specialty === MECHANISM_KEY[ratios.specialty])?.mechanism,
    tier: coverage.tier,
    portfolioHref: coverage.portfolioHref,
    likelihoodHref: coverage.likelihoodHref,
    x: pos.x,
    y: pos.y,
  };
});

// Edges are informational grouping, not a claim that two specialties are "related" in any
// clinical or career sense — they connect each node to its nearest neighbour(s) within the same
// scoring-coverage tier (plus a few spokes from the IMT hub to each cluster), so the constellation
// shape itself communicates "these are scored the same way" the way real constellations connect
// stars with no physical relationship, just a recognisable shared pattern.
export const CONSTELLATION_EDGES: [string, string][] = [
  // hub spokes
  ["internal-medicine-training-ct1", "core-surgical-training-ct1"],
  ["internal-medicine-training-ct1", "accs-emergency-medicine-ct1-st1"],
  ["internal-medicine-training-ct1", "public-health-medicine-st1"],
  // verified-scoring cluster
  ["core-surgical-training-ct1", "paediatrics-st1"],
  ["paediatrics-st1", "clinical-radiology-st1"],
  ["core-surgical-training-ct1", "ophthalmology-st1"],
  ["core-surgical-training-ct1", "cardiothoracic-surgery-st1"],
  ["cardiothoracic-surgery-st1", "histopathology-st1"],
  ["ophthalmology-st1", "histopathology-st1"],
  // confirmed-no-portfolio cluster
  ["accs-emergency-medicine-ct1-st1", "general-practice-st1"],
  ["general-practice-st1", "core-psychiatry-training-ct1"],
  ["accs-emergency-medicine-ct1-st1", "anaesthetics-ct1"],
  ["anaesthetics-ct1", "obstetrics-and-gynaecology-st1"],
  ["core-psychiatry-training-ct1", "obstetrics-and-gynaecology-st1"],
  // indicative cluster
  ["public-health-medicine-st1", "community-sexual-and-reproductive-health-st1"],
  ["public-health-medicine-st1", "gp-and-public-health-dual-cct-st1"],
  ["gp-and-public-health-dual-cct-st1", "neurosurgery-st1"],
  ["neurosurgery-st1", "oral-and-maxillo-facial-surgery-st1"],
];

export const TIER_LABEL: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "Verified — scoring + likelihood",
  verified_scoring: "Verified — scoring",
  confirmed_no_portfolio: "Confirmed — no portfolio",
  indicative: "AI-indicative",
};
