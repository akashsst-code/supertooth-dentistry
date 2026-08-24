import Link from "next/link";
import { contact, insuranceCarriersHeroTeaser, practice, reviews } from "@/lib/content";
import { HeroCarousel } from "./HeroCarousel";
import { CalendarIcon, CheckIcon, GoogleGIcon, MapPinIcon, StarIcon } from "./icons";

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
 * CTA row is side-by-side at every width, not just sm: up — a mobile
 * screenshot showed the stacked layout pushing Call below the fold on
 * real devices. Book is `grow shrink-0` (not `flex-1`, and not this
 * component's old `min-w-[140px]`) so it fills any leftover row width
 * but never shrinks below its own content — `flex-1` is `flex: 1 1 0%`,
 * which starts an item's hypothetical size at 0 and grows it from
 * there, so once "Book your visit" was renamed to the wider "Book
 * Appointment" the button grew to less than its text needed and the
 * label overflowed the pill into the phone button next to it. `grow`
 * alone leaves flex-basis at its default `auto` (content-sized), so
 * combined with `shrink-0` the button can only ever grow from its
 * natural size, never shrink below it. (A `min-w-[…]` utility would
 * have worked too, but it and `.tap-target`'s own `min-width: 44px`
 * have equal CSS specificity — whichever rule lands later in the
 * generated stylesheet wins regardless of source order, and here that
 * silently capped the floor at 44px.) The phone button shows the
 * actual number (not the word "Call") per Akash's call to be explicit
 * about what tapping it does, matching the booking section and
 * footer's phone buttons. flex-wrap on the row is still the safety
 * net if content ever outgrows the available width at some size no
 * one's tested: the phone button drops to its own line instead of
 * forcing an ugly in-button wrap. Uses a real tel: link (it previously
 * routed to /contact instead of dialing).
 *
 * Padding/gap/text size on both CTAs were trimmed (px-6→px-3.5,
 * gap-2→gap-1.5, text-base→text-sm, row gap-3→gap-2) specifically so
 * "Book Appointment" + the full phone number both fit on one line at
 * 375px — Akash's call after seeing the flex-wrap safety net actually
 * trigger and push them onto two lines. Verified in a real 375px
 * layout (not just computed/isolated widths) that this leaves a
 * little slack, not an exact-pixel fit.
 *
 * Body copy trimmed from 4 lines to 3 on mobile — dropped "dental" and
 * "in {neighborhood}" (already stated in the nav subtitle and the
 * headline right above, a third mention here was pure repetition) to
 * make room without losing meaning.
 *
 * Address line shows contact.address as plain text, not a link —
 * Akash confirmed the real address and asked for it shown bare
 * (state omitted; neighborhood/city are already established via nav
 * + headline, so the street address alone is the bare minimum that
 * adds new information here), not as a tappable/underlined map link.
 */
export function Hero() {
  return (
    <section className="flex-1 min-h-0 flex flex-col md:flex-row-reverse md:min-h-[560px]">
      <div className="w-full flex-1 min-h-[160px] md:w-3/5 md:flex-none md:h-auto overflow-hidden">
        <HeroCarousel />
      </div>

      <div className="w-full shrink-0 md:w-2/5 bg-espresso text-warm-ivory flex flex-col justify-center px-6 py-4 sm:px-10 sm:py-16">
        <span className="inline-flex items-center self-start rounded-full bg-warm-ivory/10 px-3 py-1 text-xs font-medium text-warm-ivory/70 mb-2">
          Accepting new patients
        </span>

        <h1 className="font-display text-2xl sm:text-5xl font-semibold leading-[1.15]">
          {practice.headline}
        </h1>

        <p className="mt-2 max-w-md text-sm text-warm-ivory/60">
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
         * list — the full names wrapped to 2 lines on mobile. Considered
         * a tap-to-expand "+more" instead, but skipped it: hover doesn't
         * exist on mobile (touch-only, and this is a mobile-first site),
         * and the full carrier list already has a proper home one scroll
         * down in InsuranceBlock — an interactive popover here would
         * just duplicate that for one line of hero real estate.
         */}
        <div className="mt-3 flex flex-col gap-1 text-xs text-warm-ivory/70">
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
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="shrink-0 text-terracotta" />
            In-network: {insuranceCarriersHeroTeaser.join(", ")} + more
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="shrink-0 text-terracotta" />
            {contact.address}
          </span>
        </div>

        <div className="mt-4 flex flex-row flex-wrap gap-1.5">
          <Link
            href="#booking"
            className="tap-target grow shrink-0 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-terracotta px-3 py-3.5 text-sm font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
          >
            <CalendarIcon />
            Book Appointment
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target shrink-0 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border border-warm-ivory/40 px-3 py-3.5 text-sm font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors"
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
