"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-cards bg-pulse-green/10 p-4 text-body-sm text-pulse-green shadow-[0_0_0_0.5px_var(--color-pulse-green)_inset]">
        Check <span className="font-[510]">{email}</span> for a sign-in link.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-cards bg-carbon p-6 shadow-subtle">
      <div>
        <label className="block text-body-sm text-mist">University or NHS email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@imperial.ac.uk or you@nhs.net"
          className="mt-1 w-full rounded-inputs border border-white/[0.08] bg-white/[0.02] px-[14px] py-[12px] text-[14px] text-mist focus:border-mist focus:outline-none"
        />
        <p className="mt-1 text-caption text-ash">
          Must end in .ac.uk, nhs.net, or nhs.uk — this is currently for UK medical students and doctors only.
        </p>
      </div>

      {status === "error" && (
        <div className="rounded-inputs bg-coral-red/10 p-3 text-body-sm text-coral-red shadow-[0_0_0_0.5px_var(--color-coral-red)_inset]">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send magic link"}
      </button>
    </form>
  );
}
