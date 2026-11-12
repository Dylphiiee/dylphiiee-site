// Placeholder proyek. Ganti dengan proyek nyata.
// `size` mengatur ukuran kartu di bento grid: "large" atau "small".
// Kosongkan `demo` atau `repo` (isi "") jika tidak tersedia; kartu akan menyembunyikan tautannya.
export type Project = {
  name: string;
  description: string;
  category: "Web Applications" | "Automation Systems" | "AI Projects" | "Open Source" | "Experimental Projects";
  stack: string[];
  repo: string;
  demo: string;
  size: "large" | "small";
  year: string;
};

export const projects: Project[] = [
  {
    name: "Nama Proyek Web",
    description: "Deskripsi singkat tentang masalah yang diselesaikan dan peran Anda di dalamnya.",
    category: "Web Applications",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "",
    demo: "",
    size: "large",
    year: "2026",
  },
  {
    name: "Alur Otomatisasi",
    description: "Workflow otomatis untuk memproses data berulang.",
    category: "Automation Systems",
    stack: ["Node.js", "Python"],
    repo: "",
    demo: "",
    size: "small",
    year: "2025",
  },
  {
    name: "Asisten AI",
    description: "Integrasi model AI ke dalam alur kerja harian.",
    category: "AI Projects",
    stack: ["TypeScript", "API"],
    repo: "",
    demo: "",
    size: "small",
    year: "2025",
  },
  {
    name: "Pustaka Terbuka",
    description: "Kontribusi kecil untuk proyek open source.",
    category: "Open Source",
    stack: ["JavaScript"],
    repo: "",
    demo: "",
    size: "small",
    year: "2024",
  },
];
