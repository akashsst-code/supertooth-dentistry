import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Hero — locked order per docs/supertooth-ux-flow.md Section 1:
 * "accepting new patients" eyebrow, insurance-acceptance signal pulled
 * forward (matters more to the insurance-driven half of the persona than
 * the price offer does), primary CTA book, secondary CTA call.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-flex items-center rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-espresso">
          Accepting new patients
        </span>
        <span className="inline-flex items-center rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-espresso">
          In-network with most insurance plans
        </span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-espresso max-w-3xl leading-[1.1]">
        {practice.headline}
      </h1>

      <p className="mt-6 max-w-xl text-lg text-espresso/80">
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
          className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/20 px-7 py-3.5 text-base font-semibold text-espresso hover:border-espresso/40 transition-colors"
        >
          Call {practice.name}
        </Link>
      </div>
    </section>
  );
}
