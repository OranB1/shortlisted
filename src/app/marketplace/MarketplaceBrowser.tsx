"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { toastQueue } from "@/components/Toast";
import { TASK_TYPE_OPTIONS, type TaskType } from "@/lib/data/marketplace-options";
import { getPartneredHospitals, computeMatches, type MatchProfile } from "@/lib/marketplace";
import type { Tables } from "@/lib/supabase/database.types";

type Opportunity = Tables<"opportunities">;

const INPUT_CLASS =
  "rounded-inputs border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] text-mist focus:border-mist focus:outline-none";

export default function MarketplaceBrowser() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MatchProfile & { medSchool: string | null; cvUrl: string | null; role: string | null }>({
    targetSpecialty: null,
    currentSpecialty: null,
    hospitalTrust: null,
    preferredRegion: null,
    yearOfStudy: null,
    grade: null,
    medSchool: null,
    cvUrl: null,
    role: null,
  });
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [taskTypeFilter, setTaskTypeFilter] = useState<TaskType | "">("");
  const [restrictToPartners, setRestrictToPartners] = useState(true);

  const [coverNote, setCoverNote] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        const { data: p } = await supabase
          .from("profiles")
          .select("target_specialty, current_specialty, hospital_trust, preferred_region, year_of_study, grade, med_school, cv_url, role")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (p) {
          setProfile({
            targetSpecialty: p.target_specialty,
            currentSpecialty: p.current_specialty,
            hospitalTrust: p.hospital_trust,
            preferredRegion: p.preferred_region,
            yearOfStudy: p.year_of_study,
            grade: p.grade,
            medSchool: p.med_school,
            cvUrl: p.cv_url,
            role: p.role,
          });
        }

        const { data: myApplications } = await supabase
          .from("opportunity_applications")
          .select("opportunity_id")
          .eq("applicant_id", currentUser.id);
        if (myApplications) setAppliedIds(new Set(myApplications.map((a) => a.opportunity_id)));
      }

      const { data: opps } = await supabase
        .from("opportunities")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });
      if (opps) {
        setOpportunities(opps);
        if (opps.length) setSelectedId(opps[0].id);
      }
      setLoading(false);
    }
    init();
  }, [supabase]);

  const partneredHospitals = useMemo(() => getPartneredHospitals(profile.medSchool), [profile.medSchool]);
  const hasPartnershipData = partneredHospitals.length > 0;

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (taskTypeFilter && o.task_type !== taskTypeFilter) return false;
      if (restrictToPartners && hasPartnershipData && o.hospital_trust) {
        const onList = partneredHospitals.some((h) => o.hospital_trust!.toLowerCase().includes(h.toLowerCase()));
        if (!onList) return false;
      }
      return true;
    });
  }, [opportunities, taskTypeFilter, restrictToPartners, hasPartnershipData, partneredHospitals]);

  const selected = filtered.find((o) => o.id === selectedId) ?? filtered[0] ?? null;
  const matches = selected ? computeMatches(selected, profile) : [];

  async function handleApply() {
    if (!user || !selected) return;
    setApplying(true);
    setApplyError(null);

    const { error } = await supabase.from("opportunity_applications").insert({
      opportunity_id: selected.id,
      applicant_id: user.id,
      cover_note: coverNote || null,
    });

    setApplying(false);
    if (error) {
      setApplyError(error.message);
      return;
    }
    setAppliedIds((prev) => new Set(prev).add(selected.id));
    setCoverNote("");
    toastQueue.add({
      title: "Application sent",
      description: `The poster for "${selected.title}" will be in touch if you're shortlisted.`,
    });
  }

  if (loading) {
    return <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">Loading…</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={INPUT_CLASS}
          value={taskTypeFilter}
          onChange={(e) => setTaskTypeFilter(e.target.value as TaskType | "")}
        >
          <option value="" className="bg-carbon">All types</option>
          {TASK_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-carbon">{o.label}</option>
          ))}
        </select>

        {hasPartnershipData && (
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-mist">
            <input
              type="checkbox"
              checked={restrictToPartners}
              onChange={(e) => setRestrictToPartners(e.target.checked)}
              className="accent-acid-lime"
            />
            Only {profile.medSchool}&apos;s partner hospitals
          </label>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">
          No open opportunities match right now
          {restrictToPartners && hasPartnershipData ? " — try turning off the partner-hospital filter." : "."}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-2">
            {filtered.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={`w-full rounded-cards border p-4 text-left transition-colors ${
                  selected?.id === o.id ? "border-acid-lime bg-acid-lime/5" : "border-graphite bg-carbon hover:border-smoke"
                }`}
              >
                <p className="font-[510] text-paper">{o.title}</p>
                <p className="mt-1 text-caption text-fog">{o.hospital_trust ?? "Location not specified"}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded-badges bg-white/5 px-[6px] text-label text-fog">
                    {TASK_TYPE_OPTIONS.find((t) => t.value === o.task_type)?.label ?? o.task_type}
                  </span>
                  {appliedIds.has(o.id) && (
                    <span className="rounded-badges bg-pulse-green/15 px-[6px] text-label text-pulse-green">Applied</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <div className="h-fit rounded-cards bg-carbon p-6 shadow-subtle">
              <h2 className="text-[20px] font-[510] tracking-[-0.24px] text-paper">{selected.title}</h2>
              <p className="mt-1 text-body-sm text-fog">{selected.hospital_trust ?? "Location not specified"}</p>

              <p className="mt-4 whitespace-pre-wrap text-body-sm text-mist">{selected.description}</p>

              {matches.length > 0 && (
                <div className="mt-6 border-t-[0.5px] border-graphite pt-4">
                  <p className="text-caption font-[510] text-fog">How this lines up with your profile</p>
                  <ul className="mt-2 space-y-1">
                    {matches.map((m) => (
                      <li key={m.label} className="flex items-center gap-2 text-body-sm">
                        <span className={m.matches ? "text-pulse-green" : "text-ash"}>{m.matches ? "✓" : "–"}</span>
                        <span className={m.matches ? "text-mist" : "text-ash"}>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 grid gap-3 border-t-[0.5px] border-graphite pt-4 text-body-sm sm:grid-cols-2">
                {selected.estimated_commitment && (
                  <div><span className="text-fog">Commitment: </span><span className="text-mist">{selected.estimated_commitment}</span></div>
                )}
                {selected.deadline && (
                  <div><span className="text-fog">Apply by: </span><span className="text-mist">{new Date(selected.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                )}
                {selected.min_year_of_study && (
                  <div><span className="text-fog">Minimum stage: </span><span className="text-mist">{selected.min_year_of_study}</span></div>
                )}
                {selected.experience_level && (
                  <div><span className="text-fog">Experience: </span><span className="text-mist">{selected.experience_level.replace(/_/g, " ")}</span></div>
                )}
              </div>

              {selected.required_skills && selected.required_skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {selected.required_skills.map((s) => (
                    <span key={s} className="rounded-badges bg-iris-violet/15 px-[6px] text-label text-iris-violet">{s}</span>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t-[0.5px] border-graphite pt-4">
                {!user ? (
                  <Link href="/login" className="text-[13px] font-[510] text-mist underline hover:text-paper">Sign in to apply</Link>
                ) : appliedIds.has(selected.id) ? (
                  <span className="rounded-badges bg-pulse-green/15 px-[6px] text-label text-pulse-green">You&apos;ve applied</span>
                ) : !profile.cvUrl ? (
                  <div className="text-body-sm text-fog">
                    <Link href="/profile" className="font-[510] text-mist underline hover:text-paper">Add a CV to your profile</Link>{" "}
                    before applying.
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      rows={3}
                      placeholder="Optional note to the poster"
                      className="w-full rounded-inputs border border-white/[0.08] bg-white/[0.02] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none"
                    />
                    {applyError && <p className="mt-2 text-caption text-coral-red">{applyError}</p>}
                    <button
                      onClick={handleApply}
                      disabled={applying}
                      className="mt-3 rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {applying ? "Applying…" : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
