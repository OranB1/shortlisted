import { SELF_ASSESSMENT_DISTRIBUTIONS, TOTAL_SCORE_DISTRIBUTIONS } from "@/lib/data/imt-score-distributions";
import { REGIONAL_COMPETITIVENESS, type RegionalCompetitiveness } from "@/lib/programmes";
import { COMPETITIVENESS_TO_PROGRAMME_REGION, type RegionName } from "@/lib/data/region-mapping";
import { PRIORITISATION_CAVEAT, type PriorityGroup } from "@/lib/data/prioritisation";

// Rough normal-ish approximation of a percentile from mean/median/max, since we only have
// summary stats (not the full distribution) from the official IMT charts. Good enough for an
// indicative estimate — this is explicitly the "likelihood", not a guarantee.
function estimatePercentile(score: number, mean: number, median: number, max: number): number {
  if (score <= 0) return 1;
  if (score >= max) return 99;
  // Blend a linear position within [0, max] with position relative to mean/median, then clamp.
  const linear = (score / max) * 100;
  const aroundMedian = 50 + ((score - median) / (max - median || 1)) * 50;
  const blended = (linear + aroundMedian) / 2;
  return Math.min(99, Math.max(1, Math.round(blended)));
}

export type LikelihoodInput = {
  selfAssessmentScore: number;
  year: number;
  preferredRegion: RegionName;
  priorityGroup?: PriorityGroup;
};

export type LikelihoodResult = {
  yearUsed: number;
  selfAssessmentPercentile: number;
  selfAssessmentMax: number;
  appointablePctForYear: number;
  anyOfferLikelihoodBand: "high" | "moderate" | "low";
  priorityGroup: PriorityGroup | null;
  regional: {
    region: RegionName;
    dataYear: number;
    medianAcceptedRank: number;
    meanAcceptedRank: number;
    acceptedCount: number;
    difficultyBand: "most competitive" | "highly competitive" | "moderately competitive" | "less competitive";
  } | null;
  caveats: string[];
};

function bandForOfferLikelihood(
  percentile: number,
  appointablePct: number,
  priorityGroup: PriorityGroup | null
): "high" | "moderate" | "low" {
  // Anchor on the official "appointable" share for the year, then adjust by shortlisting percentile.
  let band: "high" | "moderate" | "low";
  if (percentile >= 60) band = "high";
  else if (percentile >= 30) band = appointablePct >= 88 ? "moderate" : "low";
  else band = "low";

  // Prioritisation Act 2026: the non-priority group is only considered once every appointable
  // priority-group candidate has been offered/declined, regardless of score — so a high band
  // would overstate their real-world chances. Cap at "moderate" rather than invent a precise
  // downward adjustment we can't quantify from published data.
  if (priorityGroup === "not_priority" && band === "high") {
    band = "moderate";
  }

  return band;
}

function bandFromMedianRank(medianRank: number): "most competitive" | "highly competitive" | "moderately competitive" | "less competitive" {
  if (medianRank <= 500) return "most competitive";
  if (medianRank <= 900) return "highly competitive";
  if (medianRank <= 1300) return "moderately competitive";
  return "less competitive";
}

export function computeImtLikelihood({
  selfAssessmentScore,
  year,
  preferredRegion,
  priorityGroup,
}: LikelihoodInput): LikelihoodResult {
  const saYear = SELF_ASSESSMENT_DISTRIBUTIONS.find((y) => y.year === year) ?? SELF_ASSESSMENT_DISTRIBUTIONS[0];
  const totalYear = TOTAL_SCORE_DISTRIBUTIONS.find((y) => y.year === year) ?? TOTAL_SCORE_DISTRIBUTIONS[0];

  const percentile = estimatePercentile(selfAssessmentScore, saYear.mean, saYear.median, saYear.maxPossible);

  // The Prioritisation Act only applies to 2026 recruitment rounds onward.
  const actApplies = saYear.year >= 2026;
  const effectivePriorityGroup = actApplies ? (priorityGroup ?? null) : null;

  const caveats: string[] = [
    `Self-assessment max changes almost every year (${saYear.maxPossible} in ${saYear.year}) — this score is normalised against ${saYear.year}'s scale only.`,
    "Final ranking for an offer is by total score (self-assessment + interview), not self-assessment alone — shortlisting only gets you to interview.",
    "This is an indicative estimate from official aggregate statistics, not a guarantee of outcome.",
  ];

  if (actApplies && effectivePriorityGroup === "not_priority") {
    caveats.unshift(PRIORITISATION_CAVEAT);
  } else if (actApplies && !effectivePriorityGroup) {
    caveats.unshift(
      "This is a 2026+ recruitment round — the Medical Training (Prioritisation) Act 2026 affects offer order. Answer the priority-status questions below for an accurate picture."
    );
  }

  const candidateRows: RegionalCompetitiveness[] = REGIONAL_COMPETITIVENESS.filter(
    (r) => COMPETITIVENESS_TO_PROGRAMME_REGION[r.region] === preferredRegion
  );

  let regional: LikelihoodResult["regional"] = null;
  if (candidateRows.length) {
    // Combine sub-regions (e.g. North West Mersey + North West North West) for the latest year available,
    // weighting the median/mean by accepted-candidate count.
    const latestYear = Math.max(...candidateRows.map((r) => r.year));
    const rows = candidateRows.filter((r) => r.year === latestYear);
    const totalAccepted = rows.reduce((sum, r) => sum + r.acceptedCount, 0);
    const weightedMedian = rows.reduce((sum, r) => sum + r.medianRank * r.acceptedCount, 0) / totalAccepted;
    const weightedMean = rows.reduce((sum, r) => sum + r.meanRank * r.acceptedCount, 0) / totalAccepted;

    regional = {
      region: preferredRegion,
      dataYear: latestYear,
      medianAcceptedRank: Math.round(weightedMedian),
      meanAcceptedRank: Math.round(weightedMean * 10) / 10,
      acceptedCount: totalAccepted,
      difficultyBand: bandFromMedianRank(weightedMedian),
    };
    if (latestYear !== year) {
      caveats.push(
        `Regional competitiveness data shown is from ${latestYear} (most recent available) — the compendium flags ${latestYear === 2025 || latestYear === 2024 ? "this year's chart label as probable but not certain (unlabelled in source)" : "this as the confirmed year"}.`
      );
    }
  }

  return {
    yearUsed: saYear.year,
    selfAssessmentPercentile: percentile,
    selfAssessmentMax: saYear.maxPossible,
    appointablePctForYear: totalYear.appointablePct,
    anyOfferLikelihoodBand: bandForOfferLikelihood(percentile, totalYear.appointablePct, effectivePriorityGroup),
    priorityGroup: effectivePriorityGroup,
    regional,
    caveats,
  };
}
