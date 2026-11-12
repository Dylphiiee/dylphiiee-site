import { profile } from "@/data/profile";
import Reveal from "./Reveal";

export default function About() {
  const { about } = profile;
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="font-mono text-xs text-zinc-500">01 / Tentang</p>
          <h2 id="about-title" className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {about.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">{about.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 md:self-end">
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {about.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt className="text-sm text-zinc-500">{f.label}</dt>
                <dd className="text-sm text-zinc-100">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
