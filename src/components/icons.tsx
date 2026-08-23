/**
 * Small shared icons used across trust-signal UI (Hero, TrustBlock,
 * InsuranceOfferBlock) — pulled out once these were needed in more than
 * one place, so the SVG paths have a single source of truth.
 */

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.5 12.23c0-.82-.07-1.42-.22-2.04H12v3.7h6.02c-.12 1-.78 2.5-2.24 3.52l-.02.14 3.25 2.5.23.02c2.06-1.9 3.26-4.7 3.26-7.84z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.94 0 5.4-.96 7.2-2.6l-3.43-2.65c-.92.63-2.15 1.07-3.77 1.07-2.88 0-5.32-1.9-6.19-4.53l-.13.01-3.38 2.6-.04.12C4.24 20.5 7.84 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.81 14.29a6.9 6.9 0 010-4.58l-.01-.14-3.42-2.65-.11.05a11 11 0 000 10.06l3.54-2.74z"
      />
      <path
        fill="#EA4335"
        d="M12 5.18c2.05 0 3.43.88 4.22 1.62l3.08-3a10.6 10.6 0 00-7.3-2.8c-4.16 0-7.76 2.5-9.43 6.14l3.54 2.74C6.68 7.08 9.12 5.18 12 5.18z"
      />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Same-day appointments — differentiator icon, TrustBlock. */
export function ClockIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Same-day crowns — differentiator icon, TrustBlock. */
export function CrownIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 9l3 3 5-6 5 6 3-3v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** In-network with most plans — differentiator icon, TrustBlock. */
export function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
