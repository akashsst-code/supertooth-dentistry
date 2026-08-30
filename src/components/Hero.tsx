import Link from "next/link";
import { contact, practice, reviews } from "@/lib/content";
import { HeroAddressMap } from "./HeroAddressMap";
import { HeroCarousel } from "./HeroCarousel";
import { InsuranceTeaser } from "./InsuranceTeaser";
import { CalendarIcon, CheckIcon, GoogleGIcon, StarIcon } from "./icons";

/**
 * Hero — photo-first redesign (per Akash, referencing 2thstudio.com's
 * clean full-bleed pattern), replacing the old split video/text layout.
 * HeroCarousel now fills the entire section edge-to-edge instead of a
 * 60% side panel, so the photo — not a solid espresso panel — carries
 * the section. Text/CTAs are overlaid directly on the photo, bottom-
 * anchored, over a bottom-up scrim (from-espresso/95) for AA contrast
 * against whatever photo is showing.
 *
 * Legibility fix (per Akash's feedback on the first pass): the initial
 * thin all-over gradient left text sitting directly on busy photo
 * detail. Brought back the old panel's actual espresso background
 * color as the scrim, sized to cover most of the lower section (not a
 * flat rectangle) and blended into the photo via the gradient's own
 * fade at the top edge — reads as "the old solid panel, blended into
 * the photo" rather than "text pasted on an image."
 *
 * Bottom edge is a clean, sharp cut straight into TrustBlock (no
 * fade-to-ivory band) per the same feedback — the soft gradient there
 * read as a hazy smear rather than a deliberate transition.
 *
 * Locked requirement (docs/supertooth-webflow-build-spec.md Section 1)
 * still holds — insurance signal + both CTAs stay visible on load, just
 * overlaid on the photo instead of living in a separate side panel.
 *
 * CTA row, trust strip, and address/insurance sub-components are
 * unchanged from the previous layout (still real content, same
 * tap-to-expand behavior) — only the container around them changed.
 */
export function Hero() {
  return (
    <section className="relative flex-1 min-h-0 w-full overflow-hidden md:h-[88vh] md:min-h-[640px] md:flex-none">
      <div className="absolute inset-0">
        <HeroCarousel />
      </div>

      {/* Legibility scrim — solid espresso (the old panel's background color) confined to roughly where the text content actually sits (from the "Accepting new patients" badge down), blending into the clear photo above it. Akash's follow-up: the first pass's via-60%/to-100% stops darkened photo well above the text too. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso from-0% via-espresso/85 via-38% to-transparent to-52%" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 pt-4 sm:px-10 sm:pb-12 text-warm-ivory">
        <span className="inline-flex items-center self-start rounded-full bg-warm-ivory/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-warm-ivory/80 mb-3">
          Accepting new patients
        </span>

        <h1 className="font-display text-3xl sm:text-6xl font-semibold leading-[1.1] drop-shadow-sm max-w-2xl">
          {practice.headline}
        </h1>

        <p className="mt-3 max-w-md text-sm sm:text-base text-warm-ivory/80">
          Trusted, judgment-free care for people who want one dentist for the long run — not
          another appointment squeezed into a workday.
        </p>

        {/*
         * Quick-scan trust strip — specific proof (rating + named carriers)
         * right before the ask. Replaces the old generic "In-network with
         * most insurance plans" pill entirely rather than sitting alongside
         * it — Akash flagged that as the same claim shown twice.
         *
         * Deliberately NOT wrapped in <Placeholder> here (unlike the fuller
         * versions in TrustBlock/InsuranceBlock below) — Akash asked
         * for the dashed-underline treatment removed from this strip
         * specifically since it read as broken rather than "unconfirmed" at
         * a glance. The compliance status hasn't changed: reviews.rating/
         * count and these carrier names still need real confirmation before
         * launch — that's still marked explicitly in content.ts and still
         * visible via <Placeholder> in the detailed sections below.
         *
         * In-network line uses insuranceCarriersHeroTeaser (short names:
         * "Delta, Premera, Aetna"), not the full-name insuranceCarriers
         * list — the full names wrapped to 2 lines on mobile. "+ more"
         * is now tap-to-expand (Akash's explicit call, referencing a
         * competitor site's pattern) — a tap, not a hover popover, so it
         * still works touch-only; see InsuranceTeaser.tsx.
         */}
        <div className="mt-4 flex flex-col gap-1 text-xs sm:text-sm text-warm-ivory/85">
          <span className="inline-flex items-center gap-1.5">
            <GoogleGIcon />
            <span className="flex gap-px text-terracotta">
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
            </span>
            <strong className="text-warm-ivory font-semibold">{reviews.rating}</strong>({reviews.count}{" "}
            reviews)
          </span>
          <span className="inline-flex items-center gap-1.5 flex-wrap">
            <CheckIcon className="shrink-0 text-terracotta" />
            <InsuranceTeaser />
          </span>
          <HeroAddressMap />
        </div>

        <div className="mt-5 flex flex-row flex-wrap gap-1.5 sm:gap-2">
          <Link
            href="/contact"
            className="tap-target grow shrink-0 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-terracotta px-3 py-3.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors sm:px-6"
          >
            <CalendarIcon />
            Book Appointment
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target shrink-0 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border border-warm-ivory/40 px-3 py-3.5 text-sm font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors sm:px-6"
          >
            <PhoneIcon />
            {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.8c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
