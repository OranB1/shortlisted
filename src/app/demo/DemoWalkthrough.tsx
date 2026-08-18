"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  TASK_TYPE_OPTIONS,
  SKILL_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  AVAILABILITY_OPTIONS,
  type TaskType,
  type Skill,
  type ExperienceLevel,
  type AvailabilityHours,
} from "@/lib/data/marketplace-options";

const STEPS = ["profile", "hospital", "basics", "requirements", "commitment", "preview", "posted"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABEL: Record<Step, string> = {
  profile: "Your details",
  hospital: "Your hospital",
  basics: "What are you posting?",
  requirements: "What do you need?",
  commitment: "Commitment",
  preview: "Preview",
  posted: "Posted",
};

const CROSS_TRUST_TEASER = [
  { trust: "Imperial College Healthcare NHS Trust", title: "Cutting surgical-site infections on colorectal wards", stat: "Completed · reduced infections 18%" },
  { trust: "London North West University Healthcare NHS Trust", title: "Standardising discharge summaries in acute medicine", stat: "Completed · 6 students involved" },
  { trust: "Hillingdon Hospitals NHS Foundation Trust", title: "Improving VTE prophylaxis prescribing on admission", stat: "In progress · 2nd PDSA cycle" },
];

const CARD = "rounded-cards bg-carbon p-6 shadow-subtle sm:p-8";
const INPUT_CLASS =
  "mt-1 w-full rounded-inputs border border-graphite bg-black/[0.025] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none";
const CHIP_BASE = "rounded-pills border px-3 py-[7px] text-[13px] transition-colors";
const CHIP_ON = "border-acid-lime bg-acid-lime/10 text-paper";
const CHIP_OFF = "border-graphite text-mist hover:border-smoke";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function DemoWalkthrough() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const [hospitalTrust, setHospitalTrust] = useState("Chelsea and Westminster Hospital NHS Foundation Trust");
  const [taskType, setTaskType] = useState<TaskType>("qip");
  const [title, setTitle] = useState("Reducing missed VTE risk assessments on the cardiology ward");
  const [description, setDescription] = useState(
    "Second cycle of a QIP re-auditing VTE risk assessment completion within 14 hours of admission, following a poster intervention last cycle. Looking for a student to help with data collection, re-audit, and write-up."
  );
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>(["data_collection"]);
  const [preferredSkills, setPreferredSkills] = useState<Skill[]>(["excel", "statistics"]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("some_experience");
  const [minYearOfStudy, setMinYearOfStudy] = useState("3rd year+");
  const [estimatedCommitment, setEstimatedCommitment] = useState<AvailabilityHours>("2-5h");
  const [duration, setDuration] = useState("8 weeks");

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }
  function restart() {
    setStepIndex(0);
  }

  const taskTypeLabel = TASK_TYPE_OPTIONS.find((t) => t.value === taskType)?.label ?? taskType;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <div className="rounded-pills bg-black/[0.045] px-3 py-[6px] text-label text-fog inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-iris-violet" />
        Demo — nothing you enter here is saved, and no account is needed
      </div>

      <h1 className="mt-4 text-heading-sm font-serif font-normal text-paper">
        Posting an opportunity, as a doctor
      </h1>
      <p className="mt-2 text-body-sm text-fog">
        This is exactly what it looks like for a consultant, registrar, or QI lead to post a real
        opportunity on Hitch — try changing the fields below, it&apos;s the real posting form,
        just without needing to sign in.
      </p>

      {step !== "posted" && (
        <div className="mt-8 flex items-center gap-3">
          <p className="text-caption text-ash">
            Step {stepIndex + 1} of {STEPS.length - 1} · {STEP_LABEL[step]}
          </p>
          <div className="h-1 max-w-32 flex-1 overflow-hidden rounded-pills bg-graphite">
            <div
              className="h-full rounded-pills bg-acid-lime transition-[width]"
              style={{ width: `${((stepIndex + 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className={`${CARD} mt-3`}>
        {step === "profile" && (
          <div>
            <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">Who&apos;s posting</p>
            <p className="mt-1 text-caption text-ash">
              Pulled automatically from your Hitch profile — nothing to fill in here.
            </p>
            <div className="mt-5 flex items-center gap-4 rounded-inputs border border-graphite bg-black/[0.02] p-4">
              <div className="h-12 w-12 shrink-0 rounded-pills bg-iris-violet/15 flex items-center justify-center text-[17px] font-[510] text-iris-violet">
                AO
              </div>
              <div>
                <p className="font-[510] text-paper">Dr. Amara Okafor</p>
                <p className="text-caption text-fog">Consultant, Cardiothoracic Surgery</p>
              </div>
            </div>
          </div>
        )}

        {step === "hospital" && (
          <div>
            <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">Which hospital or trust?</p>
            <p className="mt-1 text-caption text-ash">
              Helps students find opportunities local to them — try editing this to your own trust.
            </p>
            <input
              type="text"
              value={hospitalTrust}
              onChange={(e) => setHospitalTrust(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        )}

        {step === "basics" && (
          <div className="space-y-5">
            <div>
              <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">What type of opportunity?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TASK_TYPE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setTaskType(o.value)}
                    className={`${CHIP_BASE} ${taskType === o.value ? CHIP_ON : CHIP_OFF}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-body-sm text-mist">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="block text-body-sm text-mist">What a student would actually do</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        )}

        {step === "requirements" && (
          <div className="space-y-5">
            <div>
              <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">Required skills</p>
              <p className="mt-1 text-caption text-ash">
                Only what a student truly can&apos;t do the task without.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setRequiredSkills((prev) => toggle(prev, o.value))}
                    className={`${CHIP_BASE} ${requiredSkills.includes(o.value) ? CHIP_ON : CHIP_OFF}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">Preferred skills</p>
              <p className="mt-1 text-caption text-ash">Nice-to-haves — boost ranking, don&apos;t exclude anyone.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setPreferredSkills((prev) => toggle(prev, o.value))}
                    className={`${CHIP_BASE} ${preferredSkills.includes(o.value) ? CHIP_ON : CHIP_OFF}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-body-sm text-mist">Experience level</label>
                <select
                  className={INPUT_CLASS}
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                >
                  {EXPERIENCE_LEVEL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-carbon">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-body-sm text-mist">Minimum year / stage</label>
                <input
                  type="text"
                  value={minYearOfStudy}
                  onChange={(e) => setMinYearOfStudy(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>
        )}

        {step === "commitment" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper sm:col-span-2">
                How much time will this take?
              </p>
            </div>
            <div />
            <div>
              <label className="block text-body-sm text-mist">Hours per week</label>
              <select
                className={INPUT_CLASS}
                value={estimatedCommitment}
                onChange={(e) => setEstimatedCommitment(e.target.value as AvailabilityHours)}
              >
                {AVAILABILITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-carbon">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-body-sm text-mist">Roughly how long overall</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className={INPUT_CLASS} />
            </div>
          </div>
        )}

        {step === "preview" && (
          <div>
            <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">This is what students will see</p>
            <div className="mt-4 rounded-cards border border-graphite bg-black/[0.015] p-5">
              <p className="font-[510] text-paper">{title}</p>
              <p className="mt-1 text-caption text-fog">{hospitalTrust}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded-badges bg-black/[0.045] px-[6px] text-label text-fog">{taskTypeLabel}</span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-body-sm text-mist">{description}</p>
              <div className="mt-4 flex flex-wrap gap-1">
                {requiredSkills.map((s) => (
                  <span key={s} className="rounded-badges bg-iris-violet/15 px-[6px] text-label text-iris-violet">
                    {SKILL_OPTIONS.find((o) => o.value === s)?.label}
                  </span>
                ))}
                {preferredSkills.map((s) => (
                  <span key={s} className="rounded-badges bg-black/[0.045] px-[6px] text-label text-fog">
                    {SKILL_OPTIONS.find((o) => o.value === s)?.label} (preferred)
                  </span>
                ))}
              </div>
              <div className="mt-4 grid gap-2 border-t border-graphite pt-4 text-body-sm sm:grid-cols-2">
                <div><span className="text-fog">Commitment: </span><span className="text-mist">{AVAILABILITY_OPTIONS.find((o) => o.value === estimatedCommitment)?.label} for {duration}</span></div>
                <div><span className="text-fog">Minimum stage: </span><span className="text-mist">{minYearOfStudy}</span></div>
              </div>
            </div>
          </div>
        )}

        {step === "posted" && (
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pulse-green" />
              <p className="text-[20px] font-[510] tracking-[-0.24px] text-paper">Your opportunity is live</p>
            </div>
            <p className="mt-1 text-body-sm text-fog">
              {`Students and foundation doctors near ${hospitalTrust.split(" NHS")[0]} can see and apply to this now. You'll see a ranked shortlist as applications come in.`}
            </p>

            <div className="mt-6 rounded-cards border border-graphite bg-black/[0.015] p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-[510] text-paper">{title}</p>
                <span className="shrink-0 rounded-badges bg-acid-lime/15 px-[6px] text-label font-[510] text-acid-lime">
                  96% match
                </span>
              </div>
              <p className="mt-1 text-caption text-fog">{hospitalTrust}</p>
            </div>

            <div className="mt-8 rounded-cards border border-dashed border-graphite p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-badges bg-signal-teal/15 px-[6px] text-label font-[510] text-signal-teal">
                  Coming soon
                </span>
                <p className="text-[14px] font-[510] text-paper">See what other trusts are running</p>
              </div>
              <p className="mt-1 text-caption text-ash">
                Cross-trust visibility, so you can see what&apos;s worked elsewhere before starting
                from scratch.
              </p>
              <div className="mt-4 space-y-2 opacity-60">
                {CROSS_TRUST_TEASER.map((t) => (
                  <div key={t.title} className="rounded-inputs border border-graphite bg-black/[0.02] p-3">
                    <p className="text-body-sm font-[510] text-mist">{t.title}</p>
                    <p className="text-caption text-ash">
                      {t.trust} · {t.stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={restart} variant="secondary">
                Restart demo
              </Button>
              <Button href="/marketplace/post" variant="primary">
                Post a real opportunity
              </Button>
            </div>
          </div>
        )}

        {step !== "posted" && (
          <div className="mt-8 flex items-center justify-between border-t border-graphite pt-6">
            <button
              onClick={goBack}
              disabled={stepIndex === 0}
              className="rounded-buttons border border-graphite px-4 py-2 text-[13px] text-mist disabled:opacity-0"
            >
              Back
            </button>
            <button
              onClick={goNext}
              className="rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void transition-opacity hover:opacity-90"
            >
              {step === "preview" ? "Post opportunity" : "Next"}
            </button>
          </div>
        )}
      </div>

      {step !== "posted" && (
        <p className="mt-4 text-center text-caption text-ash">
          <Link href="/" className="underline hover:text-fog">
            Skip the demo, go to Hitch
          </Link>
        </p>
      )}
    </main>
  );
}
