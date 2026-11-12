import { stack } from "@/data/stack";
import Reveal from "./Reveal";

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs text-zinc-500">02 / Teknologi</p>
        <h2 id="stack-title" className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Tools yang saya gunakan
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {stack.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.05}>
            <h3 className="text-sm font-medium text-zinc-400">{group.category}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.items.map((item) => (
                <li
                  key={`${group.category}-${item.name}`}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3 text-sm text-zinc-200 transition-colors duration-200 hover:border-white/25"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 min-w-7 items-center justify-center rounded-md bg-white/5 px-1 font-mono text-[11px] text-zinc-300"
                  >
                    {item.mark}
                  </span>
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
