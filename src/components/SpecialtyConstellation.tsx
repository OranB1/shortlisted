"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
  TIER_LABEL,
  type ConstellationNode,
} from "@/lib/data/specialty-constellation";
import { cn } from "@/lib/utils";

const TIER_DOT: Record<ConstellationNode["tier"], string> = {
  verified_scoring_and_likelihood: "bg-pulse-green",
  verified_scoring: "bg-iris-violet",
  confirmed_no_portfolio: "bg-signal-teal",
  indicative: "bg-ash",
};

function shortName(specialty: string): string {
  return specialty
    .replace(/\s+(CT1|ST1)(\/(CT1|ST1))?$/i, "")
    .replace(/\s+Dual CCT$/i, " Dual CCT");
}

// Node radius encodes competitiveness (2025 ratio) — sqrt-scaled for the same reason the bar
// chart it replaced was: the data spans ~2:1 to ~167:1, linear would make most nodes indistinguishable.
function nodeRadius(ratio2025: number): number {
  return Math.max(7, Math.min(20, 6 + Math.sqrt(ratio2025) * 1.1));
}

export function SpecialtyConstellation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nodesById = useMemo(() => {
    const map = new Map<string, ConstellationNode>();
    for (const n of CONSTELLATION_NODES) map.set(n.id, n);
    return map;
  }, []);

  const neighborsOf = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const n of CONSTELLATION_NODES) map.set(n.id, new Set());
    for (const [a, b] of CONSTELLATION_EDGES) {
      map.get(a)?.add(b);
      map.get(b)?.add(a);
    }
    return map;
  }, []);

  const activeId = hoveredId ?? selectedId;
  const activeNeighbors = activeId ? neighborsOf.get(activeId) : undefined;
  const selected = selectedId ? nodesById.get(selectedId) : undefined;

  // Keeps showing the last-selected specialty's content while the drawer slides shut, instead of
  // the content blanking out the instant `selected` goes undefined (which would otherwise happen
  // well before the close transition finishes). Adjusted during render (React's documented
  // pattern for "remember the last non-null value of a prop") rather than in an effect, which
  // would apply the update a frame late.
  const [displayNode, setDisplayNode] = useState<ConstellationNode | undefined>(undefined);
  if (selected && selected !== displayNode) setDisplayNode(selected);

  useEffect(() => {
    if (!selectedId) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  function isDimmed(id: string): boolean {
    if (!activeId) return false;
    if (id === activeId) return false;
    return !activeNeighbors?.has(id);
  }

  function isEdgeActive(a: string, b: string): boolean {
    if (!activeId) return false;
    return a === activeId || b === activeId;
  }

  return (
    <div className="relative">
      <motion.div
        animate={
          selected
            ? { scale: 1.15, x: `${(50 - selected.x) * 0.5}%`, y: `${(50 - selected.y) * 0.5}%` }
            : { scale: 1, x: "0%", y: "0%" }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-cards border border-graphite bg-carbon shadow-subtle"
      >
        <svg
          viewBox="0 0 100 62.5"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {CONSTELLATION_EDGES.map(([aId, bId]) => {
            const a = nodesById.get(aId);
            const b = nodesById.get(bId);
            if (!a || !b) return null;
            const active = isEdgeActive(aId, bId);
            return (
              <line
                key={`${aId}-${bId}`}
                x1={a.x}
                y1={a.y * 0.625}
                x2={b.x}
                y2={b.y * 0.625}
                strokeWidth={active ? 0.35 : 0.18}
                className={cn(
                  "transition-[stroke,opacity] duration-200",
                  active ? "stroke-acid-lime" : "stroke-smoke"
                )}
                opacity={activeId ? (active ? 1 : 0.25) : 0.7}
              />
            );
          })}
        </svg>

        {CONSTELLATION_NODES.map((node) => {
          const dimmed = isDimmed(node.id);
          const r = nodeRadius(node.ratios.ratio2025);
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(node.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => setSelectedId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={cn(
                "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-opacity duration-200",
                dimmed && "opacity-30"
              )}
              aria-label={`${shortName(node.ratios.specialty)} — ${node.ratios.ratio2025.toFixed(1)} applicants per post in 2025`}
            >
              <span
                style={{ width: r * 2, height: r * 2 }}
                className={cn(
                  "block rounded-full transition-[transform,box-shadow] duration-200 group-hover:scale-110 group-focus-visible:scale-110",
                  TIER_DOT[node.tier],
                  (hoveredId === node.id || selectedId === node.id) && "ring-2 ring-acid-lime ring-offset-2 ring-offset-carbon"
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-label transition-colors",
                  dimmed ? "text-ash" : "text-mist",
                  (hoveredId === node.id || selectedId === node.id) && "text-paper"
                )}
              >
                {shortName(node.ratios.specialty)}
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-label text-ash">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pulse-green" /> Verified + likelihood
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-iris-violet" /> Verified scoring
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-signal-teal" /> Confirmed — no portfolio
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ash" /> AI-indicative
        </span>
        <span className="ml-auto">Node size = 2025 competition ratio</span>
      </div>

      {/* Plain CSS transitions rather than Framer Motion's AnimatePresence for this drawer —
          Framer's percentage-based `x` transform got stuck part-way through the exit animation
          in testing (settled at a fractional translateX instead of 0 or 100%), the same class of
          measurement-timing issue already documented elsewhere in this codebase for percentage
          `width` animations. A plain CSS transform transition has no measurement step to get
          wrong, so it sidesteps the bug entirely. Both elements stay permanently mounted and are
          shown/hidden with classes instead of being mounted/unmounted, which is what let the
          drawer's `display` prop cover the "close" case that no keys/exit-animation tuning fixed. */}
      <div
        onClick={() => setSelectedId(null)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-bone/40 backdrop-blur-[1px] transition-opacity duration-200",
          selected ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-modal={selected ? true : undefined}
        aria-label={selected ? `${shortName(selected.ratios.specialty)} detail` : undefined}
        aria-hidden={selected ? undefined : true}
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-graphite bg-carbon p-6 shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          selected ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        {displayNode && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-pills bg-black/[0.045] px-2.5 py-1 text-label text-fog">
                  <span className={cn("h-1.5 w-1.5 rounded-full", TIER_DOT[displayNode.tier])} />
                  {TIER_LABEL[displayNode.tier]}
                </span>
                <h2 className="mt-3 text-[22px] font-serif font-normal text-paper">
                  {shortName(displayNode.ratios.specialty)}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="shrink-0 rounded-buttons p-1.5 text-ash transition-colors hover:bg-black/[0.045] hover:text-paper"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-cards border border-graphite p-4">
              <p className="text-caption text-ash">Competition ratio, Round 1</p>
              <div className="mt-3 space-y-3">
                {(
                  [
                    ["2024", displayNode.ratios.ratio2024, displayNode.ratios.applications2024, displayNode.ratios.posts2024],
                    ["2025", displayNode.ratios.ratio2025, displayNode.ratios.applications2025, displayNode.ratios.posts2025],
                  ] as const
                ).map(([year, ratio, apps, posts]) => (
                  <div key={year}>
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="text-fog">{year}</span>
                      <span className="font-mono text-paper">{ratio.toFixed(1)} : 1</span>
                    </div>
                    <div className="mt-1 h-[6px] overflow-hidden rounded-pills bg-graphite">
                      <div
                        className={cn("h-full rounded-pills", year === "2025" ? "bg-acid-lime" : "bg-smoke")}
                        style={{
                          width: `${Math.min(100, (Math.sqrt(ratio) / Math.sqrt(Math.max(displayNode.ratios.ratio2024, displayNode.ratios.ratio2025))) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-label text-ash">
                      {apps.toLocaleString()} applicants for {posts.toLocaleString()} posts
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {displayNode.mechanism && (
              <div className="mt-4">
                <p className="text-caption font-[510] uppercase tracking-wide text-ash">How it&apos;s scored</p>
                <p className="mt-2 text-body-sm text-fog">{displayNode.mechanism}</p>
              </div>
            )}

            {!displayNode.mechanism && (
              <p className="mt-4 text-body-sm text-fog">
                Selection mechanism not yet independently verified for this pathway — see{" "}
                <Link href="/sources" className="underline">
                  Sources
                </Link>{" "}
                for what we do and don&apos;t have confirmed.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-2">
              {displayNode.portfolioHref && (
                <Link
                  href={displayNode.portfolioHref}
                  className="inline-flex items-center justify-center gap-2 rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] text-void transition-opacity hover:opacity-90"
                >
                  Score your portfolio <ArrowRight size={16} />
                </Link>
              )}
              {displayNode.likelihoodHref && (
                <Link
                  href={displayNode.likelihoodHref}
                  className="inline-flex items-center justify-center gap-2 rounded-buttons border border-graphite px-4 py-[10px] text-[14px] font-[510] text-mist transition-colors hover:border-smoke hover:text-paper"
                >
                  Check your offer likelihood <ArrowRight size={16} />
                </Link>
              )}
              {!displayNode.portfolioHref && !displayNode.likelihoodHref && (
                <p className="text-caption text-ash">
                  No scoring tool built for this pathway yet — {TIER_LABEL[displayNode.tier].toLowerCase()}.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
