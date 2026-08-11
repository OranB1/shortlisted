"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { computeImtLikelihood } from "@/lib/likelihood";
import { SELF_ASSESSMENT_DISTRIBUTIONS } from "@/lib/data/imt-score-distributions";
import { PROGRAMME_REGIONS } from "@/lib/data/region-mapping";
import {
  QUALIFICATION_COUNTRY_OPTIONS,
  IMMIGRATION_STATUS_OPTIONS,
  computePriorityGroup,
  type QualificationCountry,
  type ImmigrationStatus,
  type PriorityGroup,
} from "@/lib/data/prioritisation";

const REGION_OPTIONS = [...PROGRAMME_REGIONS, "Scotland"] as const;

const BAND_STYLES: Record<string, string> = {
  high: "bg-pulse-green/15 text-pulse-green",
  moderate: "bg-lavender/15 text-lavender",
  low: "bg-coral-red/15 text-coral-red",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  "most competitive": "bg-coral-red/15 text-coral-red",
  "highly competitive": "bg-lavender/15 text-lavender",
  "moderately competitive": "bg-iris-violet/15 text-iris-violet",
  "less competitive": "bg-pulse-green/15 text-pulse-green",
};

const PRIORITY_STYLES: Record<string, string> = {
  priority: "bg-pulse-green/15 text-pulse-green",
  not_priority: "bg-coral-red/15 text-coral-red",
};

const INPUT_CLASS =
  "mt-1 w-full rounded-inputs border border-graphite bg-black/[0.025] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none";

export default function LikelihoodForm() {
  const searchParams = useSearchParams();
  const latestYear = SELF_ASSESSMENT_DISTRIBUTIONS[0].year;
  const initialYear = Number(searchParams.get("year")) || latestYear;
  const [year, setYear] = useState(initialYear);
  const yearMax = SELF_ASSESSMENT_DISTRIBUTIONS.find((y) => y.year === year)?.maxPossible ?? 35;
  const initialScore = searchParams.get("score");
  const [score, setScore] = useState(
    initialScore !== null ? Math.min(Number(initialScore), yearMax) : Math.round(yearMax / 2)
  );
  const [region, setRegion] = useState<(typeof REGION_OPTIONS)[number]>("London");

  const [qualificationCountry, setQualificationCountry] = useState<QualificationCountry>("uk");
  const [trainedMajorityInBritishIsles, setTrainedMajorityInBritishIsles] = useState<boolean | null>(null);
  const [immigrationStatus, setImmigrationStatus] = useState<ImmigrationStatus>("british_citizen");
  const [completedFoundation, setCompletedFoundation] = useState(true);
  const [priorityOverride, setPriorityOverride] = useState<PriorityGroup | null>(null);

  const actApplies = year >= 2026;
  const computedPriorityGroup = useMemo(
    () =>
      computePriorityGroup({
        qualificationCountry,
        trainedMajorityInBritishIslesOrIreland: trainedMajorityInBritishIsles,
        immigrationStatus,
        completedOrOnFoundationProgramme: completedFoundation,
      }),
    [qualificationCountry, trainedMajorityInBritishIsles, immigrationStatus, completedFoundation]
  );
  const effectivePriorityGroup = priorityOverride ?? computedPriorityGroup;

  const result = useMemo(
    () =>
      computeImtLikelihood({
        selfAssessmentScore: score,
        year,
        preferredRegion: region,
        priorityGroup: actApplies ? effectivePriorityGroup : undefined,
      }),
    [score, year, region, actApplies, effectivePriorityGroup]
  );

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
      <form className="h-fit space-y-5 rounded-cards bg-carbon p-6 shadow-subtle">
        <div>
          <label className="block text-body-sm text-mist">Application year</label>
          <select
            className={INPUT_CLASS}
            value={year}
            onChange={(e) => {
              const y = Number(e.target.value);
              setYear(y);
              const max = SELF_ASSESSMENT_DISTRIBUTIONS.find((row) => row.year === y)?.maxPossible ?? 35;
              setScore((s) => Math.min(s, max));
            }}
          >
            {SELF_ASSESSMENT_DISTRIBUTIONS.map((y) => (
              <option key={y.year} value={y.year} className="bg-carbon">
                {y.year} (max {y.maxPossible})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body-sm text-mist">
            Self-assessment score: <span className="font-mono text-paper">{score} / {yearMax}</span>
          </label>
          <input
            type="range"
            min={0}
            max={yearMax}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="mt-3 w-full accent-acid-lime"
          />
        </div>

        <div>
          <label className="block text-body-sm text-mist">Preferred region</label>
          <select
            className={INPUT_CLASS}
            value={region}
            onChange={(e) => setRegion(e.target.value as (typeof REGION_OPTIONS)[number])}
          >
            {REGION_OPTIONS.map((r) => (
              <option key={r} value={r} className="bg-carbon">
                {r}
              </option>
            ))}
          </select>
        </div>

        {actApplies && (
          <div className="space-y-4 border-t-[0.5px] border-graphite pt-5">
            <p className="text-caption text-ash">
              Prioritisation Act 2026 — affects offer order, not your rank. Not saved anywhere.
            </p>

            <div>
              <label className="block text-body-sm text-mist">Quick toggle</label>
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriorityOverride("priority")}
                  className={`flex-1 rounded-buttons border px-3 py-2 text-[13px] font-[510] transition-colors ${
                    effectivePriorityGroup === "priority"
                      ? "border-pulse-green bg-pulse-green/10 text-pulse-green"
                      : "border-graphite text-mist hover:border-smoke"
                  }`}
                >
                  Priority
                </button>
                <button
                  type="button"
                  onClick={() => setPriorityOverride("not_priority")}
                  className={`flex-1 rounded-buttons border px-3 py-2 text-[13px] font-[510] transition-colors ${
                    effectivePriorityGroup === "not_priority"
                      ? "border-coral-red bg-coral-red/10 text-coral-red"
                      : "border-graphite text-mist hover:border-smoke"
                  }`}
                >
                  Not priority
                </button>
              </div>
              {priorityOverride && priorityOverride !== computedPriorityGroup && (
                <button
                  type="button"
                  onClick={() => setPriorityOverride(null)}
                  className="mt-2 text-caption text-ash underline hover:text-fog"
                >
                  Manually set — clear to use your answers below instead
                </button>
              )}
            </div>

            <p className="text-caption text-ash">
              Not sure which group you&apos;re in? Answer these and the toggle above will update:
            </p>

            <div>
              <label className="block text-body-sm text-mist">Country of primary medical qualification</label>
              <select
                className={INPUT_CLASS}
                value={qualificationCountry}
                onChange={(e) => {
                  const v = e.target.value as QualificationCountry;
                  setQualificationCountry(v);
                  if (v !== "irl_iceland_liechtenstein_norway_switzerland") setTrainedMajorityInBritishIsles(null);
                }}
              >
                {QUALIFICATION_COUNTRY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-carbon">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {qualificationCountry === "irl_iceland_liechtenstein_norway_switzerland" && (
              <div>
                <label className="block text-body-sm text-mist">
                  Did you complete the majority of that training within the British Isles or Ireland?
                </label>
                <select
                  className={INPUT_CLASS}
                  value={trainedMajorityInBritishIsles === null ? "" : trainedMajorityInBritishIsles ? "yes" : "no"}
                  onChange={(e) => setTrainedMajorityInBritishIsles(e.target.value === "yes")}
                >
                  <option value="" disabled className="bg-carbon">Select…</option>
                  <option value="yes" className="bg-carbon">Yes</option>
                  <option value="no" className="bg-carbon">No</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-body-sm text-mist">Immigration / citizenship status</label>
              <select
                className={INPUT_CLASS}
                value={immigrationStatus}
                onChange={(e) => setImmigrationStatus(e.target.value as ImmigrationStatus)}
              >
                {IMMIGRATION_STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-carbon">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-body-sm text-mist">
              <input
                type="checkbox"
                checked={completedFoundation}
                onChange={(e) => setCompletedFoundation(e.target.checked)}
                className="mt-0.5 accent-acid-lime"
              />
              I completed or am currently on the UK Foundation Programme
            </label>
          </div>
        )}
      </form>

      <div className="space-y-6">
        <div className="rounded-cards bg-carbon p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-[510] text-paper">Shortlisting percentile</h3>
            <span className="font-mono text-[24px] text-paper">~{result.selfAssessmentPercentile}th</span>
          </div>
          <p className="mt-1 text-body-sm text-fog">
            Estimated position among {result.yearUsed} applicants, relative to that year&apos;s
            score distribution (out of {result.selfAssessmentMax}).
          </p>
        </div>

        {result.priorityGroup && (
          <div className="rounded-cards bg-carbon p-6 shadow-subtle">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-[510] text-paper">Prioritisation group</h3>
              <span className={`rounded-badges px-[6px] text-label capitalize ${PRIORITY_STYLES[result.priorityGroup]}`}>
                {result.priorityGroup === "priority" ? "Priority" : "Not priority"}
              </span>
            </div>
            <p className="mt-1 text-body-sm text-fog">
              {result.priorityGroup === "priority"
                ? "You'll be considered for offers alongside everyone else in the priority group, in rank order, before anyone in the non-priority group."
                : "You'll only be considered for an offer once every appointable priority-group candidate has been offered or declined."}
            </p>
          </div>
        )}

        <div className="rounded-cards bg-carbon p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-[510] text-paper">Likelihood of an IMT offer somewhere</h3>
            <span className={`rounded-badges px-[6px] text-label capitalize ${BAND_STYLES[result.anyOfferLikelihoodBand]}`}>
              {result.anyOfferLikelihoodBand}
            </span>
          </div>
          <p className="mt-1 text-body-sm text-fog">
            {result.appointablePctForYear}% of interviewed candidates were rated appointable in{" "}
            {result.yearUsed}. Round 1 fill rate has been ~100% nationally since 2021 — the real
            constraint is being ranked highly enough, not whether a post exists somewhere.
          </p>
        </div>

        {result.regional && (
          <div className="rounded-cards bg-carbon p-6 shadow-subtle">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-[510] text-paper">{result.regional.region} difficulty</h3>
              <span className={`rounded-badges px-[6px] text-label capitalize ${DIFFICULTY_STYLES[result.regional.difficultyBand]}`}>
                {result.regional.difficultyBand}
              </span>
            </div>
            <p className="mt-1 text-body-sm text-fog">
              Candidates who accepted a post here in {result.regional.dataYear} had a median
              national rank of{" "}
              <span className="font-mono text-mist">{result.regional.medianAcceptedRank.toLocaleString()}</span> (mean{" "}
              <span className="font-mono text-mist">{result.regional.meanAcceptedRank.toLocaleString()}</span>), across{" "}
              {result.regional.acceptedCount} accepted offers. Lower rank = more competitive region.
            </p>
          </div>
        )}

        <div className="rounded-cards border border-dashed border-graphite bg-black/[0.02] p-4 text-caption text-ash">
          <p className="font-[510] text-fog">Caveats</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {result.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
