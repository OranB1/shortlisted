"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function ProfileForm() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [cvFilename, setCvFilename] = useState<string | null>(null);
  const [cvPath, setCvPath] = useState<string | null>(null);
  const [cvUploadedAt, setCvUploadedAt] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

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
        .select("full_name, bio, avatar_url, cv_url, cv_filename, cv_uploaded_at")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setBio(profile.bio ?? "");
        setAvatarUrl(profile.avatar_url);
        setCvPath(profile.cv_url);
        setCvFilename(profile.cv_filename);
        setCvUploadedAt(profile.cv_uploaded_at);
      }
      setLoading(false);
    }
    init();
  }, [supabase, router]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setSaving(true);
    setMessage(null);

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setMessage(uploadError.message);
      setSaving(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`; // bust cache on re-upload

    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);
    setAvatarUrl(publicUrl);
    setSaving(false);
    setMessage("Photo updated.");
  }

  async function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.type !== "application/pdf") {
      setMessage("CV must be a PDF.");
      return;
    }
    setSaving(true);
    setMessage(null);

    const path = `${user.id}/cv.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setMessage(uploadError.message);
      setSaving(false);
      return;
    }

    const uploadedAt = new Date().toISOString();
    await supabase
      .from("profiles")
      .update({ cv_url: path, cv_filename: file.name, cv_uploaded_at: uploadedAt })
      .eq("id", user.id);

    setCvPath(path);
    setCvFilename(file.name);
    setCvUploadedAt(uploadedAt);
    setSaving(false);
    setMessage("CV uploaded.");
  }

  async function handleSaveBio() {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    await supabase.from("profiles").update({ bio }).eq("id", user.id);
    setSaving(false);
    setMessage("Bio saved.");
  }

  async function handleSaveName() {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    await supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id);
    setSaving(false);
    setMessage("Name saved.");
  }

  async function handleViewCv() {
    if (!cvPath) return;
    const { data, error } = await supabase.storage.from("cvs").createSignedUrl(cvPath, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    if (error) setMessage(error.message);
  }

  if (loading) {
    return <div className="mt-8 rounded-cards bg-carbon p-6 shadow-subtle text-body-sm text-fog">Loading…</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-cards bg-carbon p-6 shadow-subtle">
        <label className="block text-body-sm text-mist">Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={handleSaveName}
          placeholder="Shown to posters when you apply"
          className="mt-1 w-full rounded-inputs border border-white/[0.08] bg-white/[0.02] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none"
        />
      </div>

      <div className="rounded-cards bg-carbon p-6 shadow-subtle">
        <p className="text-body-sm text-mist">Photo</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-pills bg-white/5">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Profile photo" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-caption text-ash">No photo</div>
            )}
          </div>
          <div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              disabled={saving}
              className="rounded-buttons border border-graphite px-4 py-2 text-[13px] text-mist hover:border-smoke disabled:opacity-50"
            >
              {avatarUrl ? "Change photo" : "Upload photo"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-cards bg-carbon p-6 shadow-subtle">
        <label className="block text-body-sm text-mist">About you</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          onBlur={handleSaveBio}
          rows={4}
          placeholder="A short description posters will see when you apply — your interests, what you're looking for, relevant experience."
          className="mt-1 w-full rounded-inputs border border-white/[0.08] bg-white/[0.02] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none"
        />
      </div>

      <div className="rounded-cards bg-carbon p-6 shadow-subtle">
        <p className="text-body-sm text-mist">CV</p>
        <p className="mt-1 text-caption text-ash">PDF only. Required before you can apply to an opportunity.</p>
        <div className="mt-3 flex items-center gap-3">
          <input ref={cvInputRef} type="file" accept="application/pdf" onChange={handleCvChange} className="hidden" />
          <button
            onClick={() => cvInputRef.current?.click()}
            disabled={saving}
            className="rounded-buttons border border-graphite px-4 py-2 text-[13px] text-mist hover:border-smoke disabled:opacity-50"
          >
            {cvFilename ? "Replace CV" : "Upload CV"}
          </button>
          {cvFilename && (
            <button onClick={handleViewCv} className="text-[13px] text-mist underline hover:text-paper">
              {cvFilename}
            </button>
          )}
        </div>
        {cvUploadedAt && (
          <p className="mt-2 text-caption text-ash">
            Uploaded {new Date(cvUploadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      {message && <p className="text-caption text-fog">{message}</p>}
    </div>
  );
}
