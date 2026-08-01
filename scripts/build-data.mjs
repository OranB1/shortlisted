// Parses the raw source CSVs in data/source/ into structured JSON under data/generated/.
// Re-run with `node scripts/build-data.mjs` whenever the source CSVs are refreshed.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "data", "source");
const OUT = path.join(__dirname, "..", "data", "generated");
mkdirSync(OUT, { recursive: true });

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else if (c === "\r") {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows[0];
  return rows
    .slice(1)
    .filter((r) => r.length === header.length && r.some((v) => v !== ""))
    .map((r) => Object.fromEntries(header.map((h, idx) => [h, r[idx]])));
}

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// ---- 1. IMT/ACCS-IM 2026 programme list ----
const programmeRows = parseCsv(
  readFileSync(path.join(SRC, "imt_2026_programme_list.csv"), "utf8")
);

const programmes = programmeRows.map((r) => ({
  offerCode: r["Offer Code"],
  region: r["Region"].trim(),
  subRegion: r["Sub-Region"].trim(),
  sector: r["Sector"].trim(),
  description: r["Description"].trim(),
  places: Number(r["Places available"]) || 0,
  durationMonths: Number(r["Duration"]) || null,
  startDate: r["Start Date"],
  specialty: r["Specialty"].trim(),
}));

const regionTotals = {};
for (const p of programmes) {
  if (!regionTotals[p.region]) {
    regionTotals[p.region] = { region: p.region, places: 0, programmeCount: 0, imt: 0, accsIm: 0 };
  }
  const rt = regionTotals[p.region];
  rt.places += p.places;
  rt.programmeCount += 1;
  if (p.specialty === "IMT") rt.imt += p.places;
  if (p.specialty === "ACCS - IM") rt.accsIm += p.places;
}

writeFileSync(
  path.join(OUT, "imt-programmes-2026.json"),
  JSON.stringify({ programmes, regionTotals: Object.values(regionTotals) }, null, 2)
);

// ---- 2. IMT regional competitiveness (national rank of accepted candidates) ----
const compRows = parseCsv(
  readFileSync(path.join(SRC, "imt_regional_competitiveness_raw.csv"), "utf8")
);

// chart_label -> best-guess year, per the compendium's Part 4 notes
const chartLabelToYear = {
  "2023": 2023,
  unknown_year_A: 2025, // probable, not certain — see compendium Part 4
  unknown_year_B: 2024, // probable, not certain — see compendium Part 4
};

const grouped = {};
for (const r of compRows) {
  const year = chartLabelToYear[r.chart_label] ?? r.chart_label;
  const region = r.region.trim();
  const rank = Number(r.national_rank_of_accepting_candidate);
  const key = `${year}__${region}`;
  if (!grouped[key]) grouped[key] = { year, region, ranks: [] };
  grouped[key].ranks.push(rank);
}

const regionalCompetitiveness = Object.values(grouped).map((g) => ({
  year: g.year,
  region: g.region,
  acceptedCount: g.ranks.length,
  medianRank: median(g.ranks),
  meanRank: Number(mean(g.ranks).toFixed(1)),
  bestRank: Math.min(...g.ranks),
  worstRank: Math.max(...g.ranks),
}));

writeFileSync(
  path.join(OUT, "imt-regional-competitiveness.json"),
  JSON.stringify(regionalCompetitiveness, null, 2)
);

console.log(`Wrote ${programmes.length} programme rows across ${Object.keys(regionTotals).length} regions.`);
console.log(`Wrote ${regionalCompetitiveness.length} region/year competitiveness rows from ${compRows.length} raw ranks.`);
