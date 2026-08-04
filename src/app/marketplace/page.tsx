import Link from "next/link";
import MarketplaceBrowser from "./MarketplaceBrowser";

export default function MarketplacePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-sm font-[510] text-paper">Opportunities</h1>
          <p className="mt-2 text-body-sm text-fog">QIPs, audits, research, and presentations from doctors near you.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/marketplace/mine"
            className="rounded-buttons border border-graphite px-4 py-2 text-[13px] text-mist hover:border-smoke"
          >
            My postings
          </Link>
          <Link
            href="/marketplace/post"
            className="rounded-buttons bg-acid-lime px-4 py-[10px] text-[14px] font-[510] tracking-[-0.011em] text-void transition-opacity hover:opacity-90"
          >
            Post an opportunity
          </Link>
        </div>
      </div>
      <MarketplaceBrowser />
    </main>
  );
}
