"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";
import {
  IMT_PORTFOLIO_DOMAINS,
  IMT_SELF_ASSESSMENT_MAX,
  IMT_UNIQUE_APPLICANT_BONUS,
  IMT_MAX_WITH_BONUS,
  IMT_SCORING_SOURCE_URL,
} from "@/lib/data/imt-portfolio-categories";

const SPECIALTY = "imt";
const BONUS_FLAG_KEY = "unique_applicant";

export default function PortfolioForm() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Record<string, number>>(
    Object.fromEntries(IMT_PORTFOLIO_DOMAINS.map((d) => [d.id, 0]))
  );
  const [uniqueApplicant, setUniqueApplicant] = useState(false);

  // Load the signed-in user's saved selections, if any.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      setUser(currentUser);

      if (currentUser) {
        const [{ data: selections }, { data: bonus }] = await Promise.all([
          supabase
            .from("portfolio_selections")
            .select("domain_id, points")
            .eq("specialty", SPECIALTY),
          supabase
            .from("portfolio_bonus_flags")
            .select("flag_value")
            .eq("specialty", SPECIALTY)
            .eq("flag_key", BONUS_FLAG_KEY)
            .maybeSingle(),
        ]);
        if (cancelled) return;

        if (selections?.length) {
          setSelected((prev) => {
            const next = { ...prev };
            for (const row of selections) next[row.domain_id] = row.points;
            return next;
          });
        }
        if (bonus) setUniqueApplicant(bonus.flag_value);
      }
      setLoaded(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const domainTotal = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected]
  );
  const bonus = uniqueApplicant ? IMT_UNIQUE_APPLICANT_BONUS.points : 0;
  const total = domainTotal + bonus;

  async function selectBand(domainId: string, points: number) {
    setSelected((prev) => ({ ...prev, [domainId]: points }));
    if (!user) return;
    setSaving(true);
    await supabase
      .from("portfolio_selections")
      .upsert(
        { user_id: user.id, specialty: SPECIALTY, domain_id: domainId, points },
        { onConflict: "user_id,specialty,domain_id" }
      );
    setSaving(false);
  }

  async function toggleBonus(checked: boolean) {
    setUniqueApplicant(checked);
    if (!user) return;
    setSaving(true);
    await supabase
      .from("portfolio_bonus_flags")
      .upsert(
        { user_id: user.id, specialty: SPECIALTY, flag_key: BONUS_FLAG_KEY, flag_value: checked },
        { onConflict: "user_id,specialty,flag_key" }
      );
    setSaving(false);
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Verified scoring — this matches the official 2026 IMT self-assessment matrix published at{" "}
        <a href={IMT_SCORING_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
          imtrecruitment.org.uk
        </a>
        . For each domain, pick the single highest band you qualify for — points don&apos;t stack
        within a domain (three local posters still score as one local poster).
      </div>

      {loaded && !user && (
        <div className="rounded-cards border border-dashed border-graphite bg-white/[0.02] p-4 text-body-sm text-fog">
          <Link href="/login" className="font-[510] text-paper underline">
            Sign in
          </Link>{" "}
          with a university or NHS email to save your progress across visits. Right now this is unsaved and will reset on reload.
        </div>
      )}

      {IMT_PORTFOLIO_DOMAINS.map((domain) => (
        <fieldset key={domain.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <legend className="font-[510] text-paper">{domain.label}</legend>
            <span className="text-caption text-ash">max {domain.maxPoints}</span>
          </div>
          {domain.note && <p className="mt-1 text-caption text-ash">{domain.note}</p>}
          <Choicebox
            className="mt-3"
            value={String(selected[domain.id] ?? 0)}
            onValueChange={(v) => selectBand(domain.id, Number(v))}
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
          checked={uniqueApplicant}
          onChange={(e) => toggleBonus(e.target.checked)}
          className="mt-0.5 accent-acid-lime"
        />
        <span className="text-mist">
          <span className="font-[510] text-paper">+{IMT_UNIQUE_APPLICANT_BONUS.points} bonus:</span>{" "}
          {IMT_UNIQUE_APPLICANT_BONUS.label}
        </span>
      </label>

      <div className="space-y-2">
        <ScoreBreakdown
          domains={IMT_PORTFOLIO_DOMAINS}
          selected={selected}
          total={total}
          max={IMT_MAX_WITH_BONUS}
          subtitle={
            <>
              Self-assessment: {domainTotal} / {IMT_SELF_ASSESSMENT_MAX}
              {uniqueApplicant && ` + ${bonus} bonus`}
              {user && <span className="ml-2 text-ash">{saving ? "saving…" : "saved"}</span>}
            </>
          }
        />
        <div className="flex justify-end">
          <Button href={`/imt-likelihood?score=${total}&year=2026`} variant="primary">
            See likelihood →
          </Button>
        </div>
      </div>
    </div>
  );
}
