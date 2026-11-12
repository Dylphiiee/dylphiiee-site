import { ArrowUpRight, Code2 } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs text-zinc-500">03 / Proyek</p>
        <h2 id="projects-title" className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Proyek pilihan
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.05}
            className={p.size === "large" ? "md:col-span-2" : "md:col-span-1"}
          >
            <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/25">
              {/* Thumbnail placeholder: ganti dengan gambar proyek (next/image) bila tersedia. */}
              <div
                aria-hidden="true"
                className="mb-6 flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/40 font-mono text-xs text-zinc-600"
              >
                {p.category}
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                <span className="font-mono text-xs text-zinc-500">{p.year}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Teknologi">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-300">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-4 pt-6 text-sm">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Code2 className="h-4 w-4" aria-hidden="true" />
                    Repositori
                    <span className="sr-only"> (membuka tab baru)</span>
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Demo langsung
                    <span className="sr-only"> (membuka tab baru)</span>
                  </a>
                )}
              </div>
              <p className="sr-only">Kategori: {p.category}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
