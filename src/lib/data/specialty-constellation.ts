// Merges SPECIALTY_RATIOS (17 specialties, the canonical list) with SELECTION_MECHANISMS and
// SCORING_COVERAGE/SECONDARY_SPECIALTIES — the three existing data files use three *different*
// naming conventions for the same specialties (e.g. "Internal Medicine Training CT1" vs
// "IMT / joint IMT-ACCS-IM" vs "Internal Medicine Training"), a side effect of each file having
// been built independently at different times. Rather than rename keys across three files with
// existing call sites, this file owns the one explicit mapping between them, so the mismatch is
// fixed in exactly one place. Also owns the constellation's hand-authored layout (positions,
// clustering, edges) — see the note above SPECIALTY_FAMILY for what the clustering is based on.

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

// Which clinical family each specialty belongs to — this drives the constellation's clustering
// and edges now, replacing an earlier version grouped by *our own data coverage* (which specialty
// pages happened to be built), swapped out because proximity/connection on the map should reflect
// something true about the specialties themselves, not the state of this app's backlog. Grouped
// the way UK medical training broadly divides: physician ("medicine") specialties, surgical
// specialties, the two pure-diagnostic specialties, the two acute/resuscitation specialties, and
// community/reproductive health. Paediatrics sits under medicine (it's a physician specialty
// defined by patient age, not organ system); O&G and Ophthalmology sit under surgery (both are
// operative specialties recruited via a surgical-style portfolio+interview, whatever RCOG/RCOphth
// membership technicalities say).
export type SpecialtyFamily = "medicine" | "surgery" | "diagnostics" | "acute" | "community";

export const FAMILY_LABEL: Record<SpecialtyFamily, string> = {
  medicine: "Medicine",
  surgery: "Surgery",
  diagnostics: "Diagnostics",
  acute: "Acute & resuscitation",
  community: "Community & reproductive health",
};

const FAMILY: Record<string, SpecialtyFamily> = {
  "Internal Medicine Training CT1": "medicine",
  "Core Psychiatry Training CT1": "medicine",
  "Public Health Medicine ST1": "medicine",
  "General Practice ST1": "medicine",
  "Paediatrics ST1": "medicine",
  "Core Surgical Training CT1": "surgery",
  "Cardiothoracic Surgery ST1": "surgery",
  "Neurosurgery ST1": "surgery",
  "Oral & Maxillo Facial Surgery ST1": "surgery",
  "Obstetrics & Gynaecology ST1": "surgery",
  "Ophthalmology ST1": "surgery",
  "Clinical Radiology ST1": "diagnostics",
  "Histopathology ST1": "diagnostics",
  "ACCS Emergency Medicine CT1/ST1": "acute",
  "Anaesthetics CT1": "acute",
  "Community Sexual & Reproductive Health ST1": "community",
  "GP & Public Health Dual CCT ST1": "community",
};

export type ConstellationNode = {
  id: string; // slug, also used as the edge-graph key
  ratios: SpecialtyRatioYear;
  mechanism?: string;
  tier: CoverageTier;
  family: SpecialtyFamily;
  portfolioHref?: string;
  likelihoodHref?: string;
  /** Short label for the cramped canvas (the drawer still shows the full name) — matches
      abbreviations already used elsewhere in this app (IMT, CST, O&G). */
  mapLabel: string;
  /** Position as a percentage of the canvas (0-100), hand-placed — see LAYOUT below. */
  x: number;
  y: number;
};

const MAP_LABEL: Record<string, string> = {
  "Internal Medicine Training CT1": "IMT",
  "Core Psychiatry Training CT1": "Psychiatry",
  "Public Health Medicine ST1": "Public Health",
  "General Practice ST1": "GP",
  "Paediatrics ST1": "Paediatrics",
  "Core Surgical Training CT1": "CST",
  "Cardiothoracic Surgery ST1": "Cardiothoracic",
  "Neurosurgery ST1": "Neurosurgery",
  "Oral & Maxillo Facial Surgery ST1": "OMFS",
  "Obstetrics & Gynaecology ST1": "O&G",
  "Ophthalmology ST1": "Ophthalmology",
  "Clinical Radiology ST1": "Radiology",
  "Histopathology ST1": "Histopathology",
  "ACCS Emergency Medicine CT1/ST1": "ACCS EM",
  "Anaesthetics CT1": "Anaesthetics",
  "Community Sexual & Reproductive Health ST1": "CSRH",
  "GP & Public Health Dual CCT ST1": "GP+PH Dual",
};

function slug(specialty: string): string {
  return specialty
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const HUB_ID = "specialties-hub";
export const HUB_POSITION = { x: 50, y: 50 };

// Hand-placed rather than force-simulated (17 fixed nodes is small enough that a manual layout
// reads cleaner and stays stable across renders than a runtime physics simulation would). Five
// families radiate out from the central hub like petals — medicine straight up, then surgery,
// diagnostics, acute, and community spaced roughly 72° apart going clockwise — with each family's
// own specialties fanned out within its wedge. Every pair is kept at least ~13 units apart (this
// is a 0-100 grid) specifically so labels don't collide — a tighter first attempt had two labels
// overlapping into unreadable text, so this is deliberately generous rather than visually tight.
const LAYOUT: Record<string, { x: number; y: number }> = {
  // medicine — top
  "internal-medicine-training-ct1": { x: 50, y: 8 },
  "core-psychiatry-training-ct1": { x: 74, y: 14 },
  "public-health-medicine-st1": { x: 26, y: 14 },
  "general-practice-st1": { x: 36, y: 26 },
  "paediatrics-st1": { x: 64, y: 26 },
  // surgery — right
  "core-surgical-training-ct1": { x: 86, y: 22 },
  "cardiothoracic-surgery-st1": { x: 92, y: 38 },
  "neurosurgery-st1": { x: 88, y: 54 },
  "oral-and-maxillo-facial-surgery-st1": { x: 78, y: 68 },
  "obstetrics-and-gynaecology-st1": { x: 62, y: 76 },
  "ophthalmology-st1": { x: 72, y: 42 },
  // diagnostics — bottom right
  "clinical-radiology-st1": { x: 68, y: 88 },
  "histopathology-st1": { x: 44, y: 92 },
  // acute — bottom left
  "accs-emergency-medicine-ct1-st1": { x: 24, y: 86 },
  "anaesthetics-ct1": { x: 10, y: 74 },
  // community — left
  "community-sexual-and-reproductive-health-st1": { x: 8, y: 52 },
  "gp-and-public-health-dual-cct-st1": { x: 14, y: 30 },
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
    family: FAMILY[ratios.specialty] ?? "medicine",
    mapLabel: MAP_LABEL[ratios.specialty] ?? ratios.specialty,
    portfolioHref: coverage.portfolioHref,
    likelihoodHref: coverage.likelihoodHref,
    x: pos.x,
    y: pos.y,
  };
});

// Every specialty connects back to the central "Specialties" hub (your idea), plus a chain
// linking it to its nearest same-family neighbour — so the map reads as five branches radiating
// out, each branch a real clinical grouping, rather than a flat ring or an arbitrary web.
export const CONSTELLATION_EDGES: [string, string][] = [
  // hub -> nearest node of each family
  [HUB_ID, "internal-medicine-training-ct1"],
  [HUB_ID, "core-surgical-training-ct1"],
  [HUB_ID, "clinical-radiology-st1"],
  [HUB_ID, "accs-emergency-medicine-ct1-st1"],
  [HUB_ID, "gp-and-public-health-dual-cct-st1"],
  // medicine chain
  ["internal-medicine-training-ct1", "core-psychiatry-training-ct1"],
  ["internal-medicine-training-ct1", "public-health-medicine-st1"],
  ["internal-medicine-training-ct1", "general-practice-st1"],
  ["internal-medicine-training-ct1", "paediatrics-st1"],
  // surgery chain
  ["core-surgical-training-ct1", "ophthalmology-st1"],
  ["core-surgical-training-ct1", "cardiothoracic-surgery-st1"],
  ["cardiothoracic-surgery-st1", "neurosurgery-st1"],
  ["neurosurgery-st1", "oral-and-maxillo-facial-surgery-st1"],
  ["oral-and-maxillo-facial-surgery-st1", "obstetrics-and-gynaecology-st1"],
  // diagnostics chain
  ["clinical-radiology-st1", "histopathology-st1"],
  // acute chain
  ["accs-emergency-medicine-ct1-st1", "anaesthetics-ct1"],
  // community chain
  ["gp-and-public-health-dual-cct-st1", "community-sexual-and-reproductive-health-st1"],
];

export const TIER_LABEL: Record<CoverageTier, string> = {
  verified_scoring_and_likelihood: "Verified — scoring + likelihood",
  verified_scoring: "Verified — scoring",
  confirmed_no_portfolio: "Confirmed — no portfolio",
  indicative: "AI-indicative",
};
