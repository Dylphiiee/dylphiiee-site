// Monogram huruf "D" dengan grid digital tipis di dalamnya.
export default function Monogram({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect x="1" y="1" width="30" height="30" rx="6" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M9 7v18h6.5c4.4 0 7.5-2.9 7.5-9s-3.1-9-7.5-9H9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 16h12" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}
