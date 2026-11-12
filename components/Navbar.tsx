"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Monogram from "./Monogram";

const links = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Indikator navigasi aktif berdasarkan section yang sedang terlihat.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#08080A]/80 backdrop-blur-md">
      <nav aria-label="Utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 text-zinc-100" aria-label="Dylphiiee, kembali ke atas">
          <Monogram className="h-7 w-7" />
          <span className="font-display text-sm font-semibold tracking-tight">Dylphiiee</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  active === l.id ? "text-white" : "text-zinc-400"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[var(--accent)]" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-zinc-200 md:hidden focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <ul id="menu-mobile" className="border-t border-white/5 bg-[#08080A] px-5 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base text-zinc-200 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
