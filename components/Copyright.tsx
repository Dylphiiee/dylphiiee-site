"use client";

import { useSyncExternalStore } from "react";

// Tahun dihitung di browser agar build statis tidak membeku di tahun build.
export default function Copyright({ name }: { name: string }) {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );
  return (
    <p className="mx-auto max-w-6xl px-5 pb-10 text-xs text-zinc-600">
      © {year ?? ""} {name}. Hak cipta dilindungi.
    </p>
  );
}
