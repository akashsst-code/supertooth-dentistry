import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Logo — converged design, approved by Akash from a concept board of six
 * directions (calligraphic line art, script monogram, gem-cut facets, a
 * cape-and-arms mascot, an academy seal, and this one): a clean tooth
 * silhouette with no badge, frame, or face, paired with "Supertooth" in
 * heavy italic Fraunces and "Dentistry" in plain tracked caps beneath.
 *
 * This stylized two-line wordmark is specific to the logo lockup —
 * practice.name ("Super Tooth Dentistry") stays the canonical string
 * used everywhere else (CTAs, meta, etc.), unchanged. aria-label carries
 * the canonical name so screen readers get "Super Tooth Dentistry"
 * rather than the two stacked spans read as one run-on word.
 */
export function Logo() {
  return (
    <Link href="/" className="tap-target flex items-center gap-2.5" aria-label={`${practice.name}, home`}>
      <ToothMark />
      <span className="flex flex-col leading-tight" aria-hidden="true">
        <span className="font-display text-xl font-extrabold italic text-espresso">Supertooth</span>
        <span className="text-[10px] font-medium tracking-widest text-espresso/60 uppercase">
          Dentistry
        </span>
      </span>
    </Link>
  );
}

function ToothMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5C16 3.5 18.75 5.6 18.75 9.2C18.75 12.1 17.35 13.2 16.85 16C16.45 18.35 15.85 20.5 14.4 20.5C13.2 20.5 12.9 18.1 12.6 16.1C12.45 15.1 12.25 14.6 12 14.6C11.75 14.6 11.55 15.1 11.4 16.1C11.1 18.1 10.8 20.5 9.6 20.5C8.15 20.5 7.55 18.35 7.15 16C6.65 13.2 5.25 12.1 5.25 9.2C5.25 5.6 8 3.5 12 3.5Z"
        fill="var(--color-terracotta)"
      />
    </svg>
  );
}
