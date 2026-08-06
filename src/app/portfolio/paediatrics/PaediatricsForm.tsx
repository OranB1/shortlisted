"use client";

import { useMemo, useState } from "react";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";
import {
  PAEDIATRICS_PORTFOLIO_DOMAINS,
  PAEDIATRICS_MAX,
  PAEDIATRICS_MAX_WITH_BONUS,
  PAEDIATRICS_RESEARCH_BONUS,
  PAEDIATRICS_SCORING_SOURCE_URL,
  PAEDIATRICS_STRUCTURAL_NOTE,
} from "@/lib/data/paediatrics-portfolio-categories";

export default function PaediatricsForm() {
  const [selected, setSelected] = useState<Record<string, number>>(
    Object.fromEntries(PAEDIATRICS_PORTFOLIO_DOMAINS.map((d) => [d.id, 0]))
  );
  const [researchBonus, setResearchBonus] = useState(false);

  const domainTotal = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected]
  );
  const bonus = researchBonus ? PAEDIATRICS_RESEARCH_BONUS.points : 0;
  const total = domainTotal + bonus;

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches RCPCH&apos;s official 2026-27 ST1 shortlisting glossary,
        published at{" "}
        <a href={PAEDIATRICS_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          rcpch.ac.uk
        </a>
        .
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm text-fog">
        {PAEDIATRICS_STRUCTURAL_NOTE}
      </div>

      {PAEDIATRICS_PORTFOLIO_DOMAINS.map((domain) => (
        <fieldset key={domain.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <legend className="font-[510] text-paper">{domain.label}</legend>
            <span className="text-caption text-ash">max {domain.maxPoints}</span>
          </div>
          {domain.note && <p className="mt-1 text-caption text-ash">{domain.note}</p>}
          <Choicebox
            className="mt-3"
            value={String(selected[domain.id] ?? 0)}
            onValueChange={(v) => setSelected((prev) => ({ ...prev, [domain.id]: Number(v) }))}
          >
            {domain.bands.map((band) => {
              const isSelected = selected[domain.id] === band.points;
              return (
                <ChoiceboxItem key={band.points} value={String(band.points)}>
                  <ChoiceboxItemHeader>
                    <ChoiceboxItemTitle>
                      <span
                        className={`mr-2 inline-block w-6 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                          isSelected ? "bg-acid-lime/15 text-acid-lime" : "bg-white/5 text-fog shadow-subtle-2"
                        }`}
                      >
                        {band.points}
                      </span>
                      {band.label}
                    </ChoiceboxItemTitle>
                  </ChoiceboxItemHeader>
                  <ChoiceboxIndicator />
                </ChoiceboxItem>
              );
            })}
          </Choicebox>
        </fieldset>
      ))}

      <label className="flex cursor-pointer items-start gap-3 rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm">
        <input
          type="checkbox"
          checked={researchBonus}
          onChange={(e) => setResearchBonus(e.target.checked)}
          className="mt-0.5 accent-acid-lime"
        />
        <span className="text-mist">
          <span className="font-[510] text-paper">+{PAEDIATRICS_RESEARCH_BONUS.points} bonus:</span>{" "}
          {PAEDIATRICS_RESEARCH_BONUS.label}
        </span>
      </label>

      <div>
        <ScoreBreakdown
          domains={PAEDIATRICS_PORTFOLIO_DOMAINS}
          selected={selected}
          total={total}
          max={PAEDIATRICS_MAX_WITH_BONUS}
          subtitle={
            <>
              Shortlisting score: {domainTotal} / {PAEDIATRICS_MAX}
              {researchBonus && ` + ${bonus} bonus`}
            </>
          }
        />
      </div>
    </div>
  );
}
