/**
 * Small shared icons used across trust-signal UI (Hero, TrustBlock,
 * InsuranceBlock) — pulled out once these were needed in more than
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

/** Office-photo carousel pause/play control, TrustBlock. */
export function PauseIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

/** Office-photo carousel pause/play control, TrustBlock. */
export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5z" />
    </svg>
  );
}

/** Location / get-directions link — hero trust strip. */
export function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="2" />
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

/** "Tap to enlarge" affordance badge on office-carousel tiles. */
export function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 3H4v5M15 3h5v5M9 21H4v-5M15 21h5v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Cosmetic dentistry — "What we treat" card badge, ServicesSection. */
export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11 3l1.9 5.6L18.5 10.5l-5.6 1.9L11 18l-1.9-5.6L3.5 10.5l5.6-1.9L11 3z" />
      <path d="M18.5 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
    </svg>
  );
}

/** Restorative care — "What we treat" card badge, ServicesSection. */
export function ToothIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4c-1.8 0-2.7 1-4.3 1C6.2 5 5 4.3 5 6.2c0 2.6.7 5.1 1.4 7.6.4 1.5.8 3.4 1.6 4.7.4.7.9 1.5 1.7 1.5.9 0 1.2-1.1 1.5-2.3.3-1.1.4-2.7.8-2.7s.5 1.6.8 2.7c.3 1.2.6 2.3 1.5 2.3.8 0 1.3-.8 1.7-1.5.8-1.3 1.2-3.2 1.6-4.7.7-2.5 1.4-5 1.4-7.6 0-1.9-1.2-1.2-2.7-1.2-1.6 0-2.5-1-4.3-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Get Directions" external-link mark — item 59, next to both map embeds. */
export function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6M15 3h6v6M10 14L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Office-carousel lightbox close control. */
export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Office-carousel lightbox prev control. */
export function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Office-carousel lightbox next control. */
export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Big decorative quote mark — TestimonialsSection cards. */
export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.5 6C6.5 7.5 5 10 5 13c0 2.2 1.6 3.8 3.6 3.8 1.8 0 3.2-1.4 3.2-3.1 0-1.6-1.1-2.9-2.7-3.1.4-1.4 1.6-2.7 3.1-3.4L9.5 6zm9 0C15.5 7.5 14 10 14 13c0 2.2 1.6 3.8 3.6 3.8 1.8 0 3.2-1.4 3.2-3.1 0-1.6-1.1-2.9-2.7-3.1.4-1.4 1.6-2.7 3.1-3.4L18.5 6z" />
    </svg>
  );
}

/** Professional-affiliation credential badge — TrustBlock (Dr. Archana's bio card). */
export function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** Book/schedule CTA icon — Hero primary button. */
export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Call CTA icon — BookingBlock and differentiator-card CTAs. */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.8c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Location pin — LocationMapSection service-area list. */
export function PinDotIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0c0 5 6.5 11 6.5 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/** New-patient door — Hero "three clear doors" (item 48). */
export function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 8v5M16 10.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Dental-emergency door — Hero "three clear doors" (item 48). A first-aid
 * cross rather than a warning-triangle/exclamation glyph, deliberately —
 * the item's scope explicitly warns against "three cold triage buttons
 * that read like a hospital intake desk," so this reuses CheckIcon's
 * warmer circle-plus-stroke language instead of an alarm symbol.
 */
export function MedicalCrossIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Degree/education credential — CredentialBadges (TrustBlock bio card). */
export function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 4L2 9l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 9v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Clear-aligner credential (Invisalign, AACA) — CredentialBadges. */
export function AlignerIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5c-3.8 0-7 1.8-7 5.5 0 4.8 2.3 11.5 4.2 11.5 1.2 0 1.4-2.8 2.8-2.8s1.6 2.8 2.8 2.8c1.9 0 4.2-6.7 4.2-11.5 0-3.7-3.2-5.5-7-5.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Botox/facial-esthetics credential — CredentialBadges. */
export function SyringeIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 20l3-8 9-9 4 4-9 9-8 3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M12 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

/** Implant-dentistry training credential — CredentialBadges. */
export function ImplantIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 3h8l-1.2 4.5H9.2L8 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.2 7.5v3.5M14.8 7.5v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.8 11h6.4l-1.1 9-2.1 2-2.1-2-1.1-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.3 14h5.4M9.6 17h4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
