import Link from "next/link";
import { contact, practice, reviews } from "@/lib/content";
import { Placeholder } from "./Placeholder";
import { ClinicVideo } from "./ClinicVideo";

/**
 * Hero — split video/text layout, adapted from smilemakersfortworth.com's
 * pattern (real office video as the lead trust signal, video-first on
 * mobile / text-first on desktop) rather than the previous single-column
 * text hero. Section order still follows docs/supertooth-ux-flow.md
 * Section 1: "accepting new patients" + insurance signal, then headline,
 * then primary CTA book / secondary CTA call — but the eyebrow badges and
 * body copy are visually de-emphasized (lighter weight/opacity) so the
 * video and the two CTAs carry the visual weight instead of competing
 * with them.
 *
 * Google rating badge added to the eyebrow row: same "pull a quick trust
 * tag into the hero" precedent already used for the insurance-acceptance
 * signal (docs/supertooth-ux-flow.md Section 1 rationale) — the full
 * review block with review count detail stays in TrustBlock, this is
 * just the lightweight above-the-fold echo of it. Rating/count are still
 * unconfirmed real data, so rendered through <Placeholder tone="dark">
 * per the "no unverifiable claims" rule either way.
 *
 * CTA row is column-stacked on mobile (call button directly under book,
 * not wrap-dependent) and mobile spacing is intentionally tight — both
 * CTAs must clear the fold on a small reference phone (iPhone SE,
 * 375x667), not just whatever device is in hand. See the "CTA visibility
 * on a small mobile viewport" rule in docs/supertooth-build-principles.md
 * Section 4.
 */
export function Hero() {
  return (
    <section className="flex flex-col md:flex-row-reverse md:min-h-[560px]">
      <div className="w-full md:w-3/5 h-[18vh] min-h-[120px] md:h-auto md:min-h-0">
        <ClinicVideo />
      </div>

      <div className="w-full md:w-2/5 bg-espresso text-warm-ivory flex flex-col justify-center px-6 py-5 sm:px-10 sm:py-16">
        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-5">
          <span className="inline-flex items-center rounded-full bg-warm-ivory/10 px-2.5 py-1 text-xs font-medium text-warm-ivory/70">
            Accepting new patients
          </span>
          <span className="inline-flex items-center rounded-full bg-warm-ivory/10 px-2.5 py-1 text-xs font-medium text-warm-ivory/70">
            In-network with most plans
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-warm-ivory/10 px-2.5 py-1 text-xs font-medium text-warm-ivory/70">
            <StarIcon />
            <Placeholder tone="dark">
              {reviews.rating} ({reviews.count}) on Google
            </Placeholder>
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.1]">
          {practice.headline}
        </h1>

        <p className="mt-2 max-w-md text-sm text-warm-ivory/60 sm:mt-5">
          Trusted, judgment-free dental care in {practice.neighborhood} — built for people who
          want one dentist for the long run, not another appointment to squeeze into a workday.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-4">
          <Link
            href="#booking"
            className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-2.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors sm:py-3.5"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-warm-ivory/40 px-7 py-2.5 text-base font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors sm:py-3.5"
          >
            <PhoneIcon /> Call {practice.name}
          </a>
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-terracotta" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
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
