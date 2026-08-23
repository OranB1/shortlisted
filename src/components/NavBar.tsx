import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/Button";

const LINKS = [
  { href: "/marketplace", label: "Opportunities" },
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
        <Link href="/" className="flex items-center gap-2 font-serif text-[19px] text-paper">
          <Image
            src="/brand/logomark-progress-ring-transparent.png"
            alt=""
            width={26}
            height={26}
            className="shrink-0"
            priority
          />
          Hitch
        </Link>
        <div className="flex flex-1 gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-buttons px-3 py-2 text-[14px] font-[450] text-mist transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/marketplace/post"
          className="hidden rounded-buttons border border-graphite px-3 py-[7px] text-[13px] font-[510] text-mist transition-colors hover:border-smoke sm:block"
        >
          Post an opportunity
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-[14px]">
            <Link href="/marketplace/applications" className="text-mist transition-colors hover:text-paper">
              My applications
            </Link>
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
