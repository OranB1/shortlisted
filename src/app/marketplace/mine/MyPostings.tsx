"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { TASK_TYPE_OPTIONS } from "@/lib/data/marketplace-options";
import type { Tables } from "@/lib/supabase/database.types";

type Opportunity = Tables<"opportunities">;
type Application = Tables<"opportunity_applications"> & {
  applicantProfile?: {
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    cv_filename: string | null;
    med_school: string | null;
    target_specialty: string | null;
  };
};

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-black/[0.045] text-fog",
  shortlisted: "bg-iris-violet/15 text-iris-violet",
  accepted: "bg-pulse-green/15 text-pulse-green",
  rejected: "bg-coral-red/15 text-coral-red",
  withdrawn: "bg-black/[0.045] text-ash",
};

export default function MyPostings() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [postings, setPostings] = useState<Opportunity[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);

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

      const { data: opps } = await supabase
        .from("opportunities")
        .select("*")
        .eq("poster_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (opps) {
        setPostings(opps);
        if (opps.length) setSelectedId(opps[0].id);
      }
      setLoading(false);
    }
    init();
  }, [supabase, router]);

  useEffect(() => {
    async function loadApplications() {
      if (!selectedId) {
        setApplications([]);
        return;
      }
      setLoadingApplications(true);

      const { data: apps } = await supabase
        .from("opportunity_applications")
        .select("*")
        .eq("opportunity_id", selectedId)
        .order("created_at", { ascending: true });

      if (!apps || apps.length === 0) {
        setApplications([]);
        setLoadingApplications(false);
        return;
      }

      const applicantIds = apps.map((a) => a.applicant_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, bio, avatar_url, cv_url, cv_filename, med_school, target_specialty")
        .in("id", applicantIds);

      const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
      setApplications(apps.map((a) => ({ ...a, applicantProfile: profileById.get(a.applicant_id) })));
      setLoadingApplications(false);
    }
    loadApplications();
  }, [selectedId, supabase]);

  async function updateStatus(applicationId: string, status: string) {
    setApplications((prev) => prev.map((a) => (a.id === applicationId ? { ...a, status } : a)));
    await supabase.from("opportunity_applications").update({ status }).eq("id", applicationId);
  }

  async function viewCv(cvPath: string) {
    const { data } = await supabase.storage.from("cvs").createSignedUrl(cvPath, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  const selected = postings.find((p) => p.id === selectedId) ?? null;

  if (loading) {
    return <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">Loading…</div>;
  }

  if (postings.length === 0) {
    return (
      <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">
        You haven&apos;t posted anything yet.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="space-y-2">
        {postings.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`w-full rounded-cards border p-4 text-left transition-colors ${
              selectedId === p.id ? "border-acid-lime bg-acid-lime/5" : "border-graphite bg-carbon hover:border-smoke"
            }`}
          >
            <p className="font-[510] text-paper">{p.title}</p>
            <p className="mt-1 text-caption text-fog">
              {TASK_TYPE_OPTIONS.find((t) => t.value === p.task_type)?.label ?? p.task_type} · {p.status}
            </p>
          </button>
        ))}
      </div>

      <div>
        {selected && (
          <div className="rounded-cards bg-carbon p-6 shadow-subtle">
            <h2 className="text-[17px] font-[510] text-paper">{selected.title}</h2>
            <p className="mt-1 text-body-sm text-fog">
              {applications.length} application{applications.length === 1 ? "" : "s"}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {loadingApplications ? (
            <div className="rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">Loading applicants…</div>
          ) : applications.length === 0 ? (
            <div className="rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">No applications yet.</div>
          ) : (
            applications.map((a) => (
              <div key={a.id} className="rounded-cards bg-carbon p-4 shadow-subtle">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-pills bg-black/[0.045]">
                      {a.applicantProfile?.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.applicantProfile.avatar_url} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-[510] text-paper">{a.applicantProfile?.full_name || "Unnamed applicant"}</p>
                      <p className="text-caption text-fog">
                        {[a.applicantProfile?.med_school, a.applicantProfile?.target_specialty].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-badges px-[6px] text-label capitalize ${STATUS_STYLES[a.status] ?? ""}`}>
                    {a.status}
                  </span>
                </div>

                {a.applicantProfile?.bio && <p className="mt-3 text-body-sm text-mist">{a.applicantProfile.bio}</p>}
                {a.cover_note && (
                  <p className="mt-2 rounded-inputs bg-black/[0.02] p-3 text-body-sm text-mist">{a.cover_note}</p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {a.applicantProfile?.cv_url && (
                    <button
                      onClick={() => viewCv(a.applicantProfile!.cv_url!)}
                      className="rounded-buttons border border-graphite px-3 py-1.5 text-[13px] text-mist hover:border-smoke"
                    >
                      View CV
                    </button>
                  )}
                  {a.status !== "shortlisted" && a.status !== "accepted" && (
                    <button
                      onClick={() => updateStatus(a.id, "shortlisted")}
                      className="rounded-buttons border border-graphite px-3 py-1.5 text-[13px] text-mist hover:border-smoke"
                    >
                      Shortlist
                    </button>
                  )}
                  {a.status !== "accepted" && (
                    <button
                      onClick={() => updateStatus(a.id, "accepted")}
                      className="rounded-buttons bg-acid-lime px-3 py-1.5 text-[13px] font-[510] text-void hover:opacity-90"
                    >
                      Accept
                    </button>
                  )}
                  {a.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(a.id, "rejected")}
                      className="rounded-buttons border border-coral-red/30 px-3 py-1.5 text-[13px] text-coral-red hover:border-coral-red/60"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
