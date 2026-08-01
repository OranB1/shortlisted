"use client";

import { useEffect, useState } from "react";
import { isDemoMode, setDemoMode } from "@/lib/demoMode";

export default function DemoModeButton() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isDemoMode());
  }, []);

  function toggle() {
    const next = !active;
    setDemoMode(next);
    setActive(next);
    window.location.reload();
  }

  return (
    <button
      onClick={toggle}
      className={`fixed right-4 top-1/2 z-50 -translate-y-1/2 rounded-buttons border px-3 py-2 text-[12px] font-[510] shadow-xl transition-colors ${
        active
          ? "border-acid-lime bg-acid-lime/10 text-acid-lime"
          : "border-graphite bg-carbon text-fog hover:border-smoke hover:text-mist"
      }`}
    >
      {active ? "Exit demo mode" : "Skip sign-in (demo)"}
    </button>
  );
}
