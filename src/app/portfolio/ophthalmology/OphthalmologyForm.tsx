"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";
import {
  OPHTHALMOLOGY_PORTFOLIO_DOMAINS,
  OPHTHALMOLOGY_MAX,
  OPHTHALMOLOGY_SCORING_SOURCE_URL,
  OPHTHALMOLOGY_STRUCTURAL_NOTE,
  OPHTHALMOLOGY_MIN_TO_PROGRESS,
  type OphthalmologyGroup,
  type OphthalmologyDomain,
} from "@/lib/data/ophthalmology-portfolio-categories";

function formatPoints(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function groupScore(group: OphthalmologyGroup, itemCounts: Record<string, number>): number {
  if (group.mode === "best") {
    const best = Math.max(0, ...group.items.map((i) => ((itemCounts[i.id] ?? 0) > 0 ? i.points : 0)));
    return best;
  }
  const sum = group.items.reduce((s, i) => s + (itemCounts[i.id] ?? 0) * i.points, 0);
  return group.groupCap !== undefined ? Math.min(sum, group.groupCap) : sum;
}

function domainScore(
  domain: OphthalmologyDomain,
  itemCounts: Record<string, number>,
  bandSelections: Record<string, number>
): number {
  if (domain.kind === "bands") return bandSelections[domain.id] ?? 0;
  const raw = domain.groups.reduce((s, g) => s + groupScore(g, itemCounts), 0);
  return Math.min(raw, domain.maxPoints);
}

export default function OphthalmologyForm() {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [bandSelections, setBandSelections] = useState<Record<string, number>>(
    Object.fromEntries(
      OPHTHALMOLOGY_PORTFOLIO_DOMAINS.filter((d) => d.kind === "bands").map((d) => [d.id, 0])
    )
  );

  function setItemCount(id: string, count: number) {
    setItemCounts((prev) => ({ ...prev, [id]: Math.max(0, count) }));
  }

  function selectBest(group: OphthalmologyGroup, itemId: string) {
    setItemCounts((prev) => {
      const next = { ...prev };
      for (const item of group.items) next[item.id] = item.id === itemId ? 1 : 0;
      return next;
    });
  }

  const selected = useMemo(
    () =>
      Object.fromEntries(
        OPHTHALMOLOGY_PORTFOLIO_DOMAINS.map((d) => [d.id, domainScore(d, itemCounts, bandSelections)])
      ),
    [itemCounts, bandSelections]
  );

  const total = useMemo(() => Object.values(selected).reduce((a, b) => a + b, 0), [selected]);

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches NHS England South West&apos;s official Ophthalmology ST1
        Evidence Folder criteria, published at{" "}
        <a href={OPHTHALMOLOGY_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          southwest.pgmdeducation.nhs.uk
        </a>
        .
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm text-fog">
        {OPHTHALMOLOGY_STRUCTURAL_NOTE}
      </div>

      <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-caption text-ash">
        {OPHTHALMOLOGY_MIN_TO_PROGRESS.note}
      </div>

      {OPHTHALMOLOGY_PORTFOLIO_DOMAINS.map((domain) => (
        <fieldset key={domain.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <legend className="font-[510] text-paper">{domain.label}</legend>
            <span className="font-mono text-caption text-ash">
              {formatPoints(selected[domain.id] ?? 0)} / {domain.maxPoints}
            </span>
          </div>
          {domain.note && <p className="mt-1 text-caption text-ash">{domain.note}</p>}

          {domain.kind === "bands" ? (
            <Choicebox
              className="mt-3"
              value={String(bandSelections[domain.id] ?? 0)}
              onValueChange={(v) => setBandSelections((prev) => ({ ...prev, [domain.id]: Number(v) }))}
            >
              {domain.bands.map((band) => {
                const isSelected = bandSelections[domain.id] === band.points;
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
          ) : (
            <div className="mt-3 space-y-3">
              {domain.groups.map((group) => (
                <div key={group.id}>
                  {group.note && <p className="mb-1 text-caption text-ash">{group.note}</p>}

                  {group.mode === "best" ? (
                    <Choicebox
                      value={group.items.find((i) => (itemCounts[i.id] ?? 0) > 0)?.id ?? ""}
                      onValueChange={(v) => selectBest(group, v)}
                    >
                      {group.items.map((item) => (
                        <ChoiceboxItem key={item.id} value={item.id}>
                          <ChoiceboxItemHeader>
                            <ChoiceboxItemTitle>
                              <span className="mr-2 inline-block w-8 shrink-0 rounded-badges bg-white/5 text-center font-mono text-label text-fog">
                                +{formatPoints(item.points)}
                              </span>
                              {item.label}
                            </ChoiceboxItemTitle>
                          </ChoiceboxItemHeader>
                          <ChoiceboxIndicator />
                        </ChoiceboxItem>
                      ))}
                    </Choicebox>
                  ) : (
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const count = itemCounts[item.id] ?? 0;
                        const repeatable = (item.max ?? 1) > 1;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between gap-3 rounded-inputs border p-2 text-body-sm transition-colors ${
                              count > 0 ? "border-acid-lime/30 bg-acid-lime/[0.04]" : "border-transparent hover:border-graphite"
                            }`}
                          >
                            {repeatable ? (
                              <>
                                <span className="text-mist">
                                  <span
                                    className={`mr-2 inline-block w-8 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                                      count > 0 ? "bg-acid-lime/15 text-acid-lime" : "bg-white/5 text-fog shadow-subtle-2"
                                    }`}
                                  >
                                    +{formatPoints(item.points)}
                                  </span>
                                  {item.label}
                                </span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setItemCount(item.id, count - 1)}
                                    disabled={count === 0}
                                    className="flex size-6 items-center justify-center rounded-badges border border-graphite text-fog transition-colors hover:border-smoke disabled:opacity-30"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-4 text-center font-mono text-body-sm text-paper">{count}</span>
                                  <button
                                    type="button"
                                    onClick={() => setItemCount(item.id, count + 1)}
                                    disabled={count >= (item.max ?? Infinity)}
                                    className="flex size-6 items-center justify-center rounded-badges border border-graphite text-fog transition-colors hover:border-smoke disabled:opacity-30"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </span>
                              </>
                            ) : (
                              <label className="flex w-full cursor-pointer items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={count > 0}
                                  onChange={(e) => setItemCount(item.id, e.target.checked ? 1 : 0)}
                                  className="accent-acid-lime"
                                />
                                <span className="text-mist">
                                  <span
                                    className={`mr-2 inline-block w-8 shrink-0 rounded-badges text-center font-mono text-label transition-colors ${
                                      count > 0 ? "bg-acid-lime/15 text-acid-lime" : "bg-white/5 text-fog shadow-subtle-2"
                                    }`}
                                  >
                                    +{formatPoints(item.points)}
                                  </span>
                                  {item.label}
                                </span>
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </fieldset>
      ))}

      <ScoreBreakdown
        domains={OPHTHALMOLOGY_PORTFOLIO_DOMAINS.map((d) => ({
          id: d.id,
          label: d.label,
          maxPoints: d.maxPoints,
          bands: d.kind === "bands" ? d.bands : [],
        }))}
        selected={selected}
        total={total}
        max={OPHTHALMOLOGY_MAX}
        subtitle={<>Evidence Folder score</>}
      />
    </div>
  );
}
