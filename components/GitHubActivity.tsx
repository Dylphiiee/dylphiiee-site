"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GitFork, Star, BookOpen, Users } from "lucide-react";
import { githubUsername } from "@/data/profile";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};
type User = { public_repos: number; followers: number; html_url: string };
type Day = { date: string; count: number; level: number };

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; user: User; repos: Repo[]; days: Day[] | null };

const LEVEL_OPACITY = ["bg-white/5", "bg-[var(--accent)]/30", "bg-[var(--accent)]/50", "bg-[var(--accent)]/75", "bg-[var(--accent)]"];

export default function GitHubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    const base = `https://api.github.com/users/${githubUsername}`;
    const opts = { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } };

    Promise.all([
      fetch(base, opts).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`${base}/repos?sort=updated&per_page=100`, opts).then((r) => (r.ok ? r.json() : Promise.reject())),
      // Grafik kontribusi dari layanan pihak ketiga. Jika gagal, bagian ini disembunyikan.
      fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([user, repos, contrib]) =>
        setState({
          status: "ready",
          user,
          repos: repos as Repo[],
          days: contrib?.contributions ?? null,
        }),
      )
      .catch((err) => {
        if (err?.name !== "AbortError") setState({ status: "error" });
      });

    return () => ctrl.abort();
  }, []);

  const profileUrl = `https://github.com/${githubUsername}`;

  return (
    <section id="github" aria-labelledby="github-title" className="mx-auto max-w-6xl px-5 py-24">
      <p className="font-mono text-xs text-zinc-500">05 / Aktivitas developer</p>
      <h2 id="github-title" className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        GitHub
      </h2>

      {state.status === "loading" && (
        <p className="mt-8 text-sm text-zinc-500" role="status">Memuat data GitHub…</p>
      )}

      {state.status === "error" && (
        <div className="mt-8 rounded-xl border border-white/10 p-6">
          <p className="text-sm text-zinc-300">Data GitHub belum bisa dimuat saat ini.</p>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
            Lihat profil GitHub
            <span className="sr-only"> (membuka tab baru)</span>
          </a>
        </div>
      )}

      {state.status === "ready" && <Ready {...state} profileUrl={profileUrl} />}
    </section>
  );
}

function Ready({ user, repos, days, profileUrl }: { user: User; repos: Repo[]; days: Day[] | null; profileUrl: string }) {
  const own = repos.filter((r) => !r.fork);
  const stars = own.reduce((n, r) => n + r.stargazers_count, 0);
  const top = [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);

  // Bahasa dihitung dari repositori publik (bukan dari API bahasa, agar tidak banyak request).
  const langCount: Record<string, number> = {};
  own.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
  });
  const langs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const langTotal = langs.reduce((n, [, c]) => n + c, 0) || 1;

  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-white/10 p-6 md:col-span-3">
        <div className="grid grid-cols-3 gap-4 text-center">
          <Stat icon={<BookOpen className="h-4 w-4" />} label="Repositori" value={user.public_repos} />
          <Stat icon={<Star className="h-4 w-4" />} label="Bintang" value={stars} />
          <Stat icon={<Users className="h-4 w-4" />} label="Pengikut" value={user.followers} />
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block text-center text-sm text-zinc-300 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
          Buka profil GitHub
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
      </div>

      {days && (
        <div className="rounded-xl border border-white/10 p-6 md:col-span-3">
          <h3 className="text-sm font-medium text-zinc-400">Kontribusi setahun terakhir</h3>
          <div className="mt-4 overflow-x-auto">
            <div role="img" aria-label={`${days.reduce((n, d) => n + d.count, 0)} kontribusi setahun terakhir`} className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {days.map((d) => (
                <span key={d.date} title={`${d.date}: ${d.count} kontribusi`} className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_OPACITY[d.level] ?? LEVEL_OPACITY[0]}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-zinc-400">Repositori terpopuler</h3>
        {top.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">Belum ada repositori publik.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/10">
            {top.map((r) => (
              <li key={r.name} className="py-3">
                <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-100 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
                  {r.name}
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
                {r.description && <p className="mt-1 text-sm text-zinc-400">{r.description}</p>}
                <p className="mt-1 flex gap-4 font-mono text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" aria-hidden="true" />{r.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" aria-hidden="true" />{r.forks_count}</span>
                  {r.language && <span>{r.language}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-white/10 p-6">
        <h3 className="text-sm font-medium text-zinc-400">Bahasa utama</h3>
        {langs.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">Belum ada data bahasa.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {langs.map(([name, count]) => (
              <li key={name}>
                <div className="flex justify-between text-sm text-zinc-200">
                  <span>{name}</span>
                  <span className="font-mono text-xs text-zinc-500">{Math.round((count / langTotal) * 100)}%</span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-white/5" aria-hidden="true">
                  <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: `${(count / langTotal) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <div>
      <div className="mx-auto flex items-center justify-center gap-2 text-zinc-500">{icon}<span className="text-xs">{label}</span></div>
      <p className="font-display mt-2 text-2xl font-semibold text-white">{value.toLocaleString("id-ID")}</p>
    </div>
  );
}
