"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { TASK_TYPE_OPTIONS, EXPERIENCE_LEVEL_OPTIONS, type TaskType, type ExperienceLevel } from "@/lib/data/marketplace-options";
import { PRIORITY_SPECIALTIES } from "@/lib/data/all-specialty-ratios";
import { UK_DEANERIES } from "@/lib/data/deaneries";

const SPECIALTY_OPTIONS = [...PRIORITY_SPECIALTIES, "Not specific"];

const INPUT_CLASS =
  "mt-1 w-full rounded-inputs border border-white/[0.08] bg-white/[0.02] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none";

export default function PostForm() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMoreDetail, setShowMoreDetail] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState<TaskType>("qip");

  const [specialty, setSpecialty] = useState("");
  const [hospitalTrust, setHospitalTrust] = useState("");
  const [deaneryRegion, setDeaneryRegion] = useState("");
  const [minYearOfStudy, setMinYearOfStudy] = useState("");
  const [requiredSkillsText, setRequiredSkillsText] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [estimatedCommitment, setEstimatedCommitment] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    async function init() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) {
        router.replace("/login");
        return;
      }
      setUser(currentUser);

      const { data: profile } = await supabase
        .from("profiles")
        .select("hospital_trust, preferred_region")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profile?.hospital_trust) setHospitalTrust(profile.hospital_trust);
      if (profile?.preferred_region) setDeaneryRegion(profile.preferred_region);
      setLoading(false);
    }
    init();
  }, [supabase, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);

    const requiredSkills = requiredSkillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const { data, error: insertError } = await supabase
      .from("opportunities")
      .insert({
        poster_id: user.id,
        title,
        description,
        task_type: taskType,
        specialty: specialty || null,
        hospital_trust: hospitalTrust || null,
        deanery_region: deaneryRegion || null,
        min_year_of_study: minYearOfStudy || null,
        required_skills: requiredSkills.length ? requiredSkills : null,
        experience_level: experienceLevel || null,
        estimated_commitment: estimatedCommitment || null,
        deadline: deadline || null,
      })
      .select("id")
      .single();

    setSaving(false);

    if (insertError || !data) {
      setError(insertError?.message ?? "Something went wrong.");
      return;
    }

    router.push(`/marketplace/mine`);
  }

  if (loading) {
    return <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">Loading…</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="rounded-cards bg-carbon p-6 shadow-subtle space-y-4">
        <div>
          <label className="block text-body-sm text-mist">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Help needed with a falls-prevention audit"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label className="block text-body-sm text-mist">Description</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What the task involves, and what a student would get out of it."
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label className="block text-body-sm text-mist">Type</label>
          <select className={INPUT_CLASS} value={taskType} onChange={(e) => setTaskType(e.target.value as TaskType)}>
            {TASK_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-carbon">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowMoreDetail((v) => !v)}
        className="text-[13px] font-[510] text-mist underline hover:text-paper"
      >
        {showMoreDetail ? "Hide extra detail" : "Add more detail (optional)"}
      </button>

      {showMoreDetail && (
        <div className="rounded-cards bg-carbon p-6 shadow-subtle space-y-4">
          <p className="text-caption text-ash">
            Everything here is optional — specify as much or as little as you want. Students will
            see whichever fields you fill in.
          </p>

          <div>
            <label className="block text-body-sm text-mist">Specialty</label>
            <select className={INPUT_CLASS} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="" className="bg-carbon">
                Not specified
              </option>
              {SPECIALTY_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-carbon">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-body-sm text-mist">Hospital / trust</label>
              <input
                type="text"
                value={hospitalTrust}
                onChange={(e) => setHospitalTrust(e.target.value)}
                placeholder="e.g. St Mary's Hospital"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-body-sm text-mist">Deanery / region</label>
              <select className={INPUT_CLASS} value={deaneryRegion} onChange={(e) => setDeaneryRegion(e.target.value)}>
                <option value="" className="bg-carbon">
                  Not specified
                </option>
                {UK_DEANERIES.map((r) => (
                  <option key={r} value={r} className="bg-carbon">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-body-sm text-mist">Minimum year / stage</label>
            <input
              type="text"
              value={minYearOfStudy}
              onChange={(e) => setMinYearOfStudy(e.target.value)}
              placeholder="e.g. 3rd year, or F1+ — leave blank for no requirement"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-body-sm text-mist">Skills (comma separated)</label>
            <input
              type="text"
              value={requiredSkillsText}
              onChange={(e) => setRequiredSkillsText(e.target.value)}
              placeholder="e.g. coding, statistics — leave blank if none required"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-body-sm text-mist">Experience level</label>
            <select
              className={INPUT_CLASS}
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel | "")}
            >
              <option value="" className="bg-carbon">
                Not specified
              </option>
              {EXPERIENCE_LEVEL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-carbon">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-body-sm text-mist">Estimated commitment</label>
              <input
                type="text"
                value={estimatedCommitment}
                onChange={(e) => setEstimatedCommitment(e.target.value)}
                placeholder="e.g. 5 hrs/week for 8 weeks"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-body-sm text-mist">Deadline to apply</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-inputs bg-coral-red/10 p-3 text-body-sm text-coral-red shadow-[0_0_0_0.5px_var(--color-coral-red)_inset]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Posting…" : "Post opportunity"}
      </button>
    </form>
  );
}
