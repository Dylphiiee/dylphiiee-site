import { Bot, Globe, Server, Workflow, type LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = { Globe, Server, Workflow, Bot };

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs text-zinc-500">04 / Layanan</p>
        <h2 id="services-title" className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Apa yang saya kerjakan
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="h-full bg-[#0B0B0E] p-7">
                <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                <h3 className="font-display mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
