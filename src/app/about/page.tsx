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
          Most QIPs and audits don&apos;t fail from a lack of ideas or appetite — they stall
          because the consultant with a backlog and the student who wants hands-on experience
          never find each other. Opportunities move through word of mouth, so who you happen to
          know ends up mattering more than how keen you are. We built Hitch to fix that: a
          structured place for hospitals and consultants to post real QIP, audit, research, and
          teaching opportunities, and for students and foundation doctors to find and apply to
          them directly.
        </p>
        <p className="mt-4 text-body text-fog">
          Hitch is built by junior doctors and medical students, for junior doctors and
          medical students — starting with structured matching on skills, experience, and
          availability, so posters see a ranked, explainable shortlist instead of a pile of
          unstructured emails, and applicants get matched on merit rather than proximity to a
          consultant.
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
