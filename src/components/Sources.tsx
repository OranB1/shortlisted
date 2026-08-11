import { ExternalLink } from "lucide-react";
import type { SourceLink } from "@/lib/data/sources";

export function Sources({ sources, title = "Sources" }: { sources: SourceLink[]; title?: string }) {
  if (sources.length === 0) return null;
  return (
    <div className="rounded-cards border border-graphite bg-black/[0.02] p-4">
      {title && <h3 className="text-label font-[510] uppercase tracking-wide text-ash">{title}</h3>}
      <ul className="mt-3 space-y-2">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-body-sm text-mist underline decoration-graphite underline-offset-2 transition-colors hover:text-paper hover:decoration-smoke"
            >
              <ExternalLink size={13} className="mt-[3px] shrink-0 text-ash" />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
