import Link from "next/link";
import { practice, reviews } from "@/lib/content";
import { HeroAddressMap } from "./HeroAddressMap";
import { HeroCarousel } from "./HeroCarousel";
import { InsuranceTeaser } from "./InsuranceTeaser";
import { CalendarIcon, CheckIcon, GoogleGIcon, MedicalCrossIcon, StarIcon, UserPlusIcon } from "./icons";

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
 * Trust strip and address/insurance sub-components are unchanged from
 * the previous layout (still real content, same tap-to-expand behavior)
 * — only the container around them changed.
 *
 * CTA row replaced with backlog item 48's "three clear doors" (Book ·
 * New patient · Dental emergency) — the old two-up Book+Call row only
 * served the routine-booking intent, leaving the new-patient and
 * in-pain-right-now visitors to work it out from the nav. Stacked as
 * full-width rows (not a horizontal button group) per the item's own
 * mobile-first test: cramming three labels into one 375px-wide row
 * fails it. The direct tel: CTA that lived here is dropped — the phone
 * number stays one tap away via Nav's mobile call icon and further down
 * the page in BookingBlock/Footer, and per the item's own gotcha, a
 * fourth door "destroys the pattern."
 *
 * The emergency door currently points at /contact rather than a
 * dedicated non-diagnostic emergency page — item 7 (`/emergency`) is
 * still blocked on Akash confirming the after-hours reality, and this
 * item's own acceptance criteria forbid a door with no real destination.
 * Interim call per Akash 2026-08-31; revisit once item 7 ships.
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

        {/*
         * Three clear doors (item 48) — full-width stacked rows, each a
         * real static Link (no branching/self-assessment logic), each
         * ≥44px tall via tap-target with ≥8px (gap-2) separation. Order
         * matches the item's own patient-words phrasing: Book · New
         * patient · Dental emergency.
         */}
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-4 py-3.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            <CalendarIcon />
            Book Appointment
          </Link>
          <Link
            href="/insurance-new-patients"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-warm-ivory/40 px-4 py-3.5 text-sm font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors"
          >
            <UserPlusIcon />
            New Patient
          </Link>
          <Link
            href="/contact"
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-alert px-4 py-3.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            <MedicalCrossIcon />
            Dental Emergency
          </Link>
        </div>
      </div>
    </section>
  );
}
