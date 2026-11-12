"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

// Efek mengetik untuk daftar peran. Saat reduced motion, hanya tampil satu peran tanpa animasi.
function useTyping(words: string[], disabled: boolean) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const word = words[index % words.length];
    const delay = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, disabled]);

  return disabled ? words[0] : text;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const role = useTyping(profile.roles, !!reduce);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Grid digital tipis sebagai latar. Tidak bergerak. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-20 md:grid-cols-[1.25fr_1fr] md:items-center md:pt-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.badge}
          </p>

          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {profile.heading}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {profile.subheading}
          </p>

          <p className="mt-4 font-mono text-sm text-zinc-300" aria-live="polite">
            <span className="text-[var(--accent)]">&gt; </span>
            {role}
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-zinc-300 motion-safe:animate-pulse" aria-hidden="true" />
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Explore My Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-200 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Bentuk 3D abstrak sederhana dengan CSS. Tidak berputar jika reduced motion. */}
        <div aria-hidden="true" className="relative mx-auto hidden h-72 w-72 md:block [perspective:900px]">
          <div className="absolute inset-0 motion-safe:animate-[spin_24s_linear_infinite] [transform-style:preserve-3d] [transform:rotateX(-18deg)_rotateY(20deg)]">
            <div className="absolute inset-8 border border-[var(--accent)]/60 [transform:translateZ(60px)]" />
            <div className="absolute inset-16 border border-white/25 [transform:translateZ(-20px)]" />
            <div className="absolute inset-0 border border-white/10 [transform:translateZ(0)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
