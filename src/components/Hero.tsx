import Link from "next/link";
import { practice } from "@/lib/content";
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

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#booking"
            className="tap-target inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-warm-ivory hover:bg-terracotta-dark transition-colors"
          >
            Book your visit
          </Link>
          <Link
            href="/contact"
            className="tap-target inline-flex items-center justify-center rounded-full border border-warm-ivory/40 px-7 py-3.5 text-base font-semibold text-warm-ivory hover:border-warm-ivory/70 transition-colors"
          >
            Call {practice.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
