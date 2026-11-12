import Monogram from "./Monogram";
import Copyright from "./Copyright";
import { profile, socials } from "@/data/profile";

export default function Footer() {
  const links = socials.filter((s) => s.href && s.name !== "Email");
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Monogram className="h-6 w-6 text-zinc-200" />
          <div>
            <p className="font-display text-sm font-semibold text-white">{profile.name}</p>
            <p className="text-xs text-zinc-500">{profile.footerNote}</p>
          </div>
        </div>
        <nav aria-label="Sosial media">
          <ul className="flex flex-wrap gap-4 text-sm text-zinc-400">
            {links.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
                  {s.name}
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Copyright name={profile.name} />
    </footer>
  );
}
