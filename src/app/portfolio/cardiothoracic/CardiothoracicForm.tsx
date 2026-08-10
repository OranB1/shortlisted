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
  CARDIOTHORACIC_PORTFOLIO_DOMAINS,
  CARDIOTHORACIC_MAX,
  CARDIOTHORACIC_SCORING_SOURCE_URL,
  CARDIOTHORACIC_STRUCTURAL_NOTE,
} from "@/lib/data/cardiothoracic-portfolio-categories";

export default function CardiothoracicForm() {
  const [selected, setSelected] = useState<Record<string, number>>(
    Object.fromEntries(CARDIOTHORACIC_PORTFOLIO_DOMAINS.map((d) => [d.id, 0]))
  );

  const total = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected]
  );

  const sections = useMemo(() => {
    const seen: string[] = [];
    for (const d of CARDIOTHORACIC_PORTFOLIO_DOMAINS) {
      if (!seen.includes(d.section)) seen.push(d.section);
    }
    return seen;
  }, []);

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches NHS England Wessex&apos;s official 2026 Cardiothoracic
        Surgery ST1 self-assessment criteria, published at{" "}
        <a href={CARDIOTHORACIC_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          wessex.hee.nhs.uk
        </a>
        .
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm text-fog">
        {CARDIOTHORACIC_STRUCTURAL_NOTE}
      </div>

      {sections.map((section) => (
        <div key={section}>
          <h2 className="mb-3 text-caption font-[510] uppercase tracking-wide text-ash">{section}</h2>
          <div className="space-y-4">
            {CARDIOTHORACIC_PORTFOLIO_DOMAINS.filter((d) => d.section === section).map((domain) => (
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
                              className={`mr-2 inline-block w-8 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                                isSelected ? "bg-acid-lime/15 text-acid-lime" : "bg-white/5 text-fog shadow-subtle-2"
                              }`}
                            >
                              +{band.points}
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
          </div>
        </div>
      ))}

      <ScoreBreakdown
        domains={CARDIOTHORACIC_PORTFOLIO_DOMAINS}
        selected={selected}
        total={total}
        max={CARDIOTHORACIC_MAX}
        subtitle={<>Self-assessment score</>}
      />
    </div>
  );
}
