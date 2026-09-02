import { anxietyContent } from "@/lib/content";
import { HeartHandIcon } from "./icons";

/**
 * Backlog item 16 — dental anxiety and comfort content. Placed right
 * after NewPatientOffersBlock and before FAQSection, matching this
 * section's locked position in the original homepage blueprint (docs/
 * research/downtown-seattle-family-dental-website-blueprint-v2.md
 * Section 19, "8. Dental-anxiety reassurance" — directly after the
 * new-patient teaser, before location/reviews/final CTA) adapted onto
 * the site's actual shipped order.
 *
 * Kept to one warm-ivory strip, not a dark differentiator card or a
 * dedicated /anxiety page (that's the item's own stated v2, once there's
 * enough content to justify a route) — the acceptance test measures
 * whether the whole reassurance reads on a single 375px screen, since
 * this audience researches privately, at night, on a phone; splitting it
 * across a scroll boundary undercuts the reassurance itself.
 *
 * The disclosure link points at /contact#details, the existing optional
 * "Additional details" field AppointmentForm.tsx already ships (item 9)
 * — reusing it rather than adding a second, competing field, per the
 * one-source-of-truth intent already applied elsewhere in this codebase.
 */
export function AnxietyBlock() {
  return (
    <section className="bg-warm-ivory">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta-dark"
            aria-hidden="true"
          >
            <HeartHandIcon />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-dark mb-2">
              {anxietyContent.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso leading-tight mb-4">
              {anxietyContent.heading}
            </h2>
            <p className="text-espresso/70 mb-8">{anxietyContent.intro}</p>
          </div>
        </div>

        <ol className="grid gap-4 sm:grid-cols-3 mb-8">
          {anxietyContent.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-sand/40 p-5">
              <span className="font-display text-sm font-semibold text-terracotta-dark">{i + 1}</span>
              <p className="mt-1 font-display text-base font-semibold text-espresso leading-snug">{step.title}</p>
              <p className="mt-1 text-sm text-espresso/65 leading-snug">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-sand p-5 sm:p-6">
          <p className="text-espresso/70 mb-4">{anxietyContent.comfortNote}</p>
          <a
            href={anxietyContent.disclosureHref}
            className="tap-target inline-flex items-center font-semibold text-terracotta-dark hover:text-terracotta underline underline-offset-4 decoration-2"
          >
            {anxietyContent.disclosureCta}
          </a>
        </div>
      </div>
    </section>
  );
}
