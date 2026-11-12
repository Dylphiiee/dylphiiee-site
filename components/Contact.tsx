import { Mail, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/profile";
import Reveal from "./Reveal";

export default function Contact() {
  const email = socials.find((s) => s.name === "Email");
  const others = socials.filter((s) => s.name !== "Email" && s.href);

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs text-zinc-500">06 / Kontak</p>
        <h2 id="contact-title" className="font-display mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {profile.contactHeading}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">{profile.contactBody}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
        {email && (
          <a
            href={email.href}
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {email.handle}
          </a>
        )}
      </Reveal>

      <Reveal delay={0.15}>
        <ul className="mt-12 grid gap-2 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-white/10 px-4 py-4 transition-colors duration-200 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 font-mono text-xs text-zinc-300">
                  {s.badge}
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-zinc-400">{s.name}</span>
                  <span className="block text-sm text-zinc-100">{s.handle}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" aria-hidden="true" />
                <span className="sr-only">(membuka tab baru)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
