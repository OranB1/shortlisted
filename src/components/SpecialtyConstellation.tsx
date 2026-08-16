"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
  TIER_LABEL,
  FAMILY_LABEL,
  HUB_ID,
  HUB_POSITION,
  type ConstellationNode,
} from "@/lib/data/specialty-constellation";
import { cn } from "@/lib/utils";

// Bright, glow-friendly hexes for the dark canvas — the site's own tier colors (pulse-green,
// iris-violet, etc.) are tuned for text-on-white contrast and read as muddy/dim against a near-
// black background, so this canvas gets its own brighter palette. TIER_LABEL/the light-theme
// drawer keep using the site's normal tokens — only the canvas nodes use these.
const TIER_GLOW: Record<ConstellationNode["tier"], string> = {
  verified_scoring_and_likelihood: "#4ade80",
  verified_scoring: "#a78bfa",
  confirmed_no_portfolio: "#38bdf8",
  indicative: "#8f97ab",
};
const HUB_COLOR = "#fbbf24";

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

type LabelSide = "top" | "bottom" | "left" | "right";

// Points each label away from the hub (left half of the map labels left, right half labels
// right, near-vertical nodes label up/down) instead of always placing it below the node — with
// 17 nodes on one canvas, "always below" is what caused labels to collide in the first version of
// this map. Nodes close to a canvas edge get forced to top/bottom instead, since a label extending
// further toward that edge would otherwise clip off-canvas.
function labelSide(x: number, y: number): LabelSide {
  const dx = x - 50;
  const dy = y - 50;
  let side: LabelSide = Math.abs(dx) < 8 ? (dy < 0 ? "top" : "bottom") : dx < 0 ? "left" : "right";
  if (side === "left" && x < 18) side = y < 50 ? "top" : "bottom";
  if (side === "right" && x > 82) side = y < 50 ? "top" : "bottom";
  return side;
}

const LABEL_POSITION_CLASS: Record<LabelSide, string> = {
  top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-1.5 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2 text-right",
  right: "left-full top-1/2 ml-2 -translate-y-1/2 text-left",
};

// Quadratic-bezier path between two points on the 0-100 x 0-100 grid, bowed a fixed fraction of
// the edge's own length perpendicular to its direction — reads as constellation lines rather than
// a rigid wireframe. The perpendicular is always rotated the same way (not derived per-edge with
// a random sign), so the whole map curves with one consistent, deliberate-looking handedness
// rather than a chaotic mix of directions.
function curvedPath(x1: number, y1: number, x2: number, y2: number, bend = 0.12): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const mx = (x1 + x2) / 2 + (-dy / len) * len * bend;
  const my = (y1 + y2) / 2 + (dx / len) * len * bend;
  return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
}

// Deterministic pseudo-random background stars — fixed seed so the layout is identical on every
// render/SSR pass (Math.random() at render time would mismatch between server and client, or
// reshuffle on every interaction since this isn't memoized against re-renders).
function makeStars(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 0.5 + rand() * 1.2,
    delay: rand() * 4,
    duration: 2.5 + rand() * 3,
    maxOpacity: 0.35 + rand() * 0.5,
  }));
}
const BACKGROUND_STARS = makeStars(80, 42);

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
    map.set(HUB_ID, new Set());
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
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, #1a1f3d 0%, #10122a 45%, #06070f 100%)",
        }}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-cards border border-graphite shadow-subtle"
      >
        {/* background starfield — purely decorative, twinkling */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {BACKGROUND_STARS.map((s, i) => (
            <span
              key={i}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                ["--twinkle-max" as string]: s.maxOpacity,
                ["--twinkle-min" as string]: s.maxOpacity * 0.15,
              }}
              className="absolute rounded-full bg-white"
            />
          ))}
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {CONSTELLATION_EDGES.map(([aId, bId]) => {
            const a = aId === HUB_ID ? HUB_POSITION : nodesById.get(aId);
            const b = bId === HUB_ID ? HUB_POSITION : nodesById.get(bId);
            if (!a || !b) return null;
            const active = isEdgeActive(aId, bId);
            return (
              <path
                key={`${aId}-${bId}`}
                d={curvedPath(a.x, a.y, b.x, b.y)}
                fill="none"
                strokeWidth={active ? 0.45 : 0.15}
                className="transition-[stroke-width,opacity] duration-200"
                stroke={active ? "#e4f222" : "#4b5170"}
                opacity={activeId ? (active ? 1 : 0.18) : 0.5}
              />
            );
          })}
        </svg>

        {/* central hub — decorative anchor, not a specialty, so not a button */}
        <div
          style={{ left: `${HUB_POSITION.x}%`, top: `${HUB_POSITION.y}%` }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <span
            style={{ width: 64, height: 64, backgroundColor: HUB_COLOR, animation: "node-pulse 3.5s ease-in-out infinite" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
          />
          <span
            style={{ width: 22, height: 22, backgroundColor: HUB_COLOR, boxShadow: `0 0 16px 4px ${HUB_COLOR}99` }}
            className="relative block rounded-full ring-2 ring-white/40"
          />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-caption font-[510] text-white/90">
            Specialties
          </span>
        </div>

        {CONSTELLATION_NODES.map((node) => {
          const dimmed = isDimmed(node.id);
          const r = nodeRadius(node.ratios.ratio2025);
          const glow = TIER_GLOW[node.tier];
          const active = hoveredId === node.id || selectedId === node.id;
          const side = labelSide(node.x, node.y);
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
                dimmed && "opacity-25"
              )}
              aria-label={`${shortName(node.ratios.specialty)} (${FAMILY_LABEL[node.family]}) — ${node.ratios.ratio2025.toFixed(1)} applicants per post in 2025`}
              title={shortName(node.ratios.specialty)}
            >
              <span
                style={{
                  width: r * 2.6,
                  height: r * 2.6,
                  backgroundColor: glow,
                  animation: `node-pulse ${3 + (r % 3)}s ease-in-out infinite`,
                  animationDelay: `${(r * 137) % 4}s`,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[6px]"
              />
              <span
                style={{
                  width: r * 2,
                  height: r * 2,
                  backgroundColor: glow,
                  boxShadow: active ? `0 0 14px 3px ${glow}b3` : `0 0 6px 1px ${glow}66`,
                }}
                className="relative block rounded-full ring-1 ring-white/30 transition-[transform,box-shadow] duration-200 group-hover:scale-110 group-focus-visible:scale-110"
              />
              <span
                className={cn(
                  "pointer-events-none absolute whitespace-nowrap text-label transition-colors",
                  LABEL_POSITION_CLASS[side],
                  dimmed ? "text-white/35" : "text-white/75",
                  active && "text-white"
                )}
              >
                {node.mapLabel}
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
        <span className="ml-auto">Node size = 2025 ratio · branches = clinical grouping</span>
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
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: TIER_GLOW[displayNode.tier] }}
                  />
                  {TIER_LABEL[displayNode.tier]} &middot; {FAMILY_LABEL[displayNode.family]}
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
