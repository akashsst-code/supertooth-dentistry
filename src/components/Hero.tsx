import Link from "next/link";
import { contact, practice } from "@/lib/content";
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
 * CTA row is side-by-side at every width, not just sm: up — a mobile
 * screenshot showed the stacked layout pushing Call below the fold on
 * real devices. Book stays the wide/primary pill (flex-1); Call is a
 * compact secondary pill (icon + short "Call" label, matching the
 * nav's mobile call button) so the pair reliably fits one row.
 *
 * Deliberately NOT expanding to "Call {practice.name}" at a wider
 * viewport breakpoint (an earlier version did this via sm:) — this
 * panel is a 40%-width column on desktop (md:w-2/5), not the full
 * viewport, so a global sm:/md: breakpoint doesn't track the actual
 * space available here and squeezed Book into a mid-word wrap at
 * common desktop widths. flex-wrap on the row is the safety net if
 * some future change ever tightens this further: Call drops to its
 * own line instead of forcing an ugly in-button wrap. No other hero
 * spacing changed. Call CTA uses a real tel: link (it previously
 * routed to /contact instead of dialing).
 */
export function Hero() {
  return (
    <section className="flex flex-col md:flex-row-reverse md:min-h-[560px]">
      <div className="w-full md:w-3/5 h-[42vh] md:h-auto">
        <ClinicVideo />
      </div>

      <div className="w-full md:w-2/5 bg-espresso text-warm-ivory flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center rounded-full bg-warm-ivory/10 px-3 py-1 text-xs font-medium text-warm-ivory/70">
            Accepting new patients
          </span>
          <span className="inline-flex items-center rounded-full bg-warm-ivory/10 px-3 py-1 text-xs font-medium text-warm-ivory/70">
            In-network with most insurance plans
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1]">
          {practice.headline}
        </h1>

        <p className="mt-5 max-w-md text-sm text-warm-ivory/60">
          Trusted, judgment-free dental care in {practice.neighborhood} — built for people who
          want one dentist for the long run, not another appointment to squeeze into a workday.
        </p>

        <div className="mt-8 flex flex-row flex-wrap gap-3">
          <Link
            href="#booking"
            className="tap-target min-w-[140px] flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-terracotta px-6 py-3.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
          >
            Book your visit
          </Link>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-warm-ivory/40 px-5 py-3.5 text-base font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors"
          >
            <PhoneIcon />
            Call
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
