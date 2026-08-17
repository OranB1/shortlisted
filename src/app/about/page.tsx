const FOUNDERS = [
  {
    name: "[Founder name]",
    role: "[Role — e.g. Co-founder]",
    bio: "[A couple of sentences about background and why they're building Hitch.]",
  },
  {
    name: "[Co-founder name]",
    role: "[Role — e.g. Co-founder]",
    bio: "[A couple of sentences about background and why they're building Hitch.]",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-heading-sm font-serif font-normal text-paper">About Hitch</h1>
        <p className="mt-6 text-body text-fog">
          UK specialty training is more competitive than ever, and applicants are starting
          portfolio-building earlier every year — against self-assessment matrices that differ by
          specialty and change annually. We built Hitch because that confusion shouldn&apos;t
          be the hard part. It should be easy to know exactly where your portfolio stands, what
          it&apos;s worth, and what to do next.
        </p>
        <p className="mt-4 text-body text-fog">
          Hitch is built by junior doctors and medical students, for junior doctors and
          medical students — starting with verified scoring for the specialties that cover the
          majority of UK applicants, with more on the way.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-[17px] font-[510] text-paper">Who&apos;s behind it</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="rounded-cards bg-carbon p-6 shadow-subtle">
              <div className="h-12 w-12 rounded-pills bg-black/[0.045]" />
              <h3 className="mt-4 text-[17px] font-[510] text-paper">{f.name}</h3>
              <p className="text-caption text-ash">{f.role}</p>
              <p className="mt-3 text-body-sm text-fog">{f.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
