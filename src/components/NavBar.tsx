import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/Button";

const LINKS = [
  { href: "/specialties", label: "All Specialties" },
  { href: "/imt-likelihood", label: "Likelihood" },
  { href: "/portfolio/imt", label: "Portfolio" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b-[0.5px] border-graphite bg-void">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-6 px-6 py-4">
        <Link href="/" className="text-[16px] font-[510] tracking-[-0.011em] text-paper">
          Shortlisted
        </Link>
        <div className="flex flex-1 gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-buttons px-3 py-2 text-[13px] font-normal text-mist transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="flex items-center gap-4 text-[13px]">
            <Link href="/profile" className="text-mist transition-colors hover:text-paper">
              Profile
            </Link>
            <form action={signOut} className="flex items-center gap-3">
              <span className="text-fog">{user.email}</span>
              <button type="submit" className="text-mist transition-colors hover:text-paper">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Button href="/login" variant="pill" size="sm">
            Sign in
          </Button>
        )}
      </nav>
    </header>
  );
}
