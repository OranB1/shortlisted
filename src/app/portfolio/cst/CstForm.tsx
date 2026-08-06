"use client";

import { useMemo, useState } from "react";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";
import {
  CST_PORTFOLIO_DOMAINS,
  CST_SCORING_SOURCE_URL,
  CST_STRUCTURAL_NOTE,
} from "@/lib/data/cst-portfolio-categories";

type SelectionKey = `${string}:${string}`; // `${domainId}:${componentId}`

export default function CstForm() {
  const [selected, setSelected] = useState<Record<SelectionKey, string>>({});

  function selectBand(domainId: string, componentId: string, letter: string) {
    setSelected((prev) => ({ ...prev, [`${domainId}:${componentId}`]: letter }));
  }

  const answeredCount = Object.keys(selected).length;
  const totalComponents = useMemo(
    () => CST_PORTFOLIO_DOMAINS.reduce((sum, d) => sum + d.components.length, 0),
    []
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches the official 2025/26 CST portfolio guidance published by{" "}
        <a href={CST_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          NHS England
        </a>
        .
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm text-fog">
        Unlike IMT, CST&apos;s portfolio isn&apos;t pre-scored into a shortlisting number — it&apos;s
        assessed live at interview, where assessors pick <span className="text-mist">two</span> of
        these five domains to examine (not your choice). There&apos;s no official score
        distribution published, so this tool shows where you stand band-by-band rather than a
        total or a likelihood estimate.
      </div>

      {CST_PORTFOLIO_DOMAINS.map((domain) => (
        <fieldset key={domain.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
          <legend className="font-[510] text-paper">{domain.label}</legend>
          {domain.note && <p className="mt-1 text-caption text-ash">{domain.note}</p>}

          {domain.components.map((component) => {
            const key: SelectionKey = `${domain.id}:${component.id}`;
            return (
              <div key={component.id} className="mt-3">
                {component.label && (
                  <p className="mb-1 text-caption font-[510] text-fog">{component.label}</p>
                )}
                <Choicebox
                  value={selected[key] ?? ""}
                  onValueChange={(letter) => selectBand(domain.id, component.id, letter)}
                >
                  {component.bands.map((band) => {
                    const isSelected = selected[key] === band.letter;
                    return (
                      <ChoiceboxItem key={band.letter} value={band.letter}>
                        <ChoiceboxItemHeader>
                          <ChoiceboxItemTitle>
                            <span
                              className={`mr-2 inline-block w-6 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                                isSelected ? "bg-acid-lime/15 text-acid-lime" : "bg-white/5 text-fog shadow-subtle-2"
                              }`}
                            >
                              {band.letter}
                            </span>
                            {band.label}
                          </ChoiceboxItemTitle>
                        </ChoiceboxItemHeader>
                        <ChoiceboxIndicator />
                      </ChoiceboxItem>
                    );
                  })}
                </Choicebox>
              </div>
            );
          })}
        </fieldset>
      ))}

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-caption text-ash">
        {CST_STRUCTURAL_NOTE}
      </div>

      <div className="sticky bottom-4 rounded-cards bg-obsidian p-4 shadow-xl">
        <p className="text-body-sm text-fog">
          Answered {answeredCount} / {totalComponents} scored components
        </p>
        <p className="mt-1 text-caption text-ash">
          Remember — only 2 of your 5 domains will actually be examined at interview.
        </p>
      </div>
    </div>
  );
}
