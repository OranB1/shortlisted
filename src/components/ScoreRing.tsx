"use client";

import { motion } from "motion/react";

export function ScoreRing({
  value,
  max,
  potentialValue,
  size = 96,
  strokeWidth = 8,
  label,
  className = "",
}: {
  value: number;
  max: number;
  /** Optional preview of a higher score (e.g. "if you complete this opportunity") — renders as a dimmer arc beyond the current value. */
  potentialValue?: number;
  size?: number;
  strokeWidth?: number;
  label?: React.ReactNode;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const potentialPct =
    potentialValue !== undefined && max > 0 ? Math.min(1, Math.max(0, potentialValue / max)) : undefined;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className="stroke-graphite" fill="none" />
        {potentialPct !== undefined && potentialPct > pct && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className="stroke-acid-lime/25"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - potentialPct) }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="stroke-acid-lime"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ?? (
          <>
            <span className="font-mono text-[20px] leading-none text-paper">{value}</span>
            <span className="text-micro text-ash">/ {max}</span>
          </>
        )}
      </div>
    </div>
  );
}
