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
  HISTOPATHOLOGY_PORTFOLIO_DOMAINS,
  HISTOPATHOLOGY_MAX,
  HISTOPATHOLOGY_SCORING_SOURCE_URL,
  HISTOPATHOLOGY_STRUCTURAL_NOTE,
} from "@/lib/data/histopathology-portfolio-categories";

// Several domains have multiple bands worth the same points (e.g. two different achievements
// both scoring 8) — band selection is tracked by index rather than points so each option gets a
// distinct radio value and doesn't visually collide with same-scoring siblings.
function zeroBandIndex(domain: { bands: { points: number }[] }): number {
  const i = domain.bands.findIndex((b) => b.points === 0);
  return i === -1 ? domain.bands.length - 1 : i;
}

export default function HistopathologyForm() {
  const [selectedIndex, setSelectedIndex] = useState<Record<string, number>>(
    Object.fromEntries(
      HISTOPATHOLOGY_PORTFOLIO_DOMAINS.map((d) => [d.id, zeroBandIndex(d)])
    )
  );

  const selected = useMemo(
    () =>
      Object.fromEntries(
        HISTOPATHOLOGY_PORTFOLIO_DOMAINS.map((d) => [
          d.id,
          d.bands[selectedIndex[d.id] ?? zeroBandIndex(d)]?.points ?? 0,
        ])
      ),
    [selectedIndex]
  );

  const total = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected]
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches NHS England&apos;s official 2026 Histopathology ST1
        self-assessment scoring guidance, published at{" "}
        <a href={HISTOPATHOLOGY_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          medical.hee.nhs.uk
        </a>
        .
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-black/[0.02] p-4 text-body-sm text-fog">
        {HISTOPATHOLOGY_STRUCTURAL_NOTE}
      </div>

      <div className="space-y-4">
        {HISTOPATHOLOGY_PORTFOLIO_DOMAINS.map((domain) => (
          <fieldset key={domain.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
            <div className="flex items-center justify-between">
              <legend className="font-[510] text-paper">{domain.label}</legend>
              <span className="text-caption text-ash">max {domain.maxPoints}</span>
            </div>
            {domain.note && <p className="mt-1 text-caption text-ash">{domain.note}</p>}
            <Choicebox
              className="mt-3"
              value={String(selectedIndex[domain.id] ?? zeroBandIndex(domain))}
              onValueChange={(v) =>
                setSelectedIndex((prev) => ({ ...prev, [domain.id]: Number(v) }))
              }
            >
              {domain.bands.map((band, i) => {
                const isSelected = (selectedIndex[domain.id] ?? zeroBandIndex(domain)) === i;
                return (
                  <ChoiceboxItem key={i} value={String(i)}>
                    <ChoiceboxItemHeader>
                      <ChoiceboxItemTitle>
                        <span
                          className={`mr-2 inline-block w-8 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                            isSelected ? "bg-acid-lime/15 text-acid-lime" : "bg-black/[0.045] text-fog shadow-subtle-2"
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

      <ScoreBreakdown
        domains={HISTOPATHOLOGY_PORTFOLIO_DOMAINS}
        selected={selected}
        total={total}
        max={HISTOPATHOLOGY_MAX}
        subtitle={<>Self-assessment score</>}
      />
    </div>
  );
}
