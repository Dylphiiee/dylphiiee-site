import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/data/profile";

// Font di-host sendiri (file variable dari @fontsource-variable) agar tidak bergantung
// pada Google Fonts saat build maupun saat runtime.
const display = localFont({
  src: "./fonts/sora-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "100 800",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono-brand",
  display: "swap",
  weight: "100 800",
});

// Ganti dengan domain asli setelah deploy.
const siteUrl = "https://dylphiiee.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — Developer & Digital Creator`,
  description: profile.subheading,
  openGraph: {
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.subheading,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Data terstruktur untuk SEO (schema.org Person).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Developer & Digital Creator",
    url: siteUrl,
    address: { "@type": "PostalAddress", addressCountry: "ID" },
  };

  return (
    <html lang="id" className={`${display.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#08080A] text-zinc-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
