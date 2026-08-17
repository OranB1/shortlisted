import { Sources } from "@/components/Sources";
import { SPECIALTY_SOURCES } from "@/lib/data/sources";
import { TIMELINES_SOURCE_NOTE } from "@/lib/data/specialty-timelines";

export default function SourcesPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-heading-sm font-serif font-normal text-paper">Sources</h1>
      <p className="mt-2 text-body-sm text-fog">
        Every scoring matrix, competition ratio, and deadline in Hitch is drawn from an
        official NHS England, deanery, or Royal College page — never invented or guessed. This
        page lists every primary source in one place. Where we couldn&apos;t independently verify a
        number, the relevant page says so explicitly rather than showing a fabricated figure.
      </p>

      <div className="mt-8 space-y-4">
        {SPECIALTY_SOURCES.map((s) => (
          <div key={s.specialty}>
            <p className="mb-2 font-[510] text-paper">{s.specialty}</p>
            <Sources sources={s.sources} title="" />
          </div>
        ))}
      </div>

      <p className="mt-8 text-caption text-ash">{TIMELINES_SOURCE_NOTE}</p>
    </main>
  );
}
