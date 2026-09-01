import { CheckIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { insuranceCarriers } from "@/lib/content";

/**
 * Insurance block — the carriers-only half of the old
 * InsuranceOfferBlock, split so new-patient offers can move to the end
 * of the homepage flow (see NewPatientOffersBlock.tsx / page.tsx). Kept
 * in its own earlier slot in the flow — "leave insurance, it's covered
 * earlier" (Akash) — now sitting right after TestimonialsSection once
 * testimonials moved up to directly follow the office blurb.
 *
 * Redesigned from plain check+text pills into a typographic "wordmark
 * badge" per carrier: real trademarked carrier logo files aren't
 * available/licensed for use here, so this is a deliberate design
 * choice (styled display-font lettering + accent, not a scraped image)
 * standing in for real logos until Akash can supply licensed assets.
 */
export function InsuranceBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-2">
        In-network with the plans you already have
      </h2>
      <p className="text-espresso/70 mb-10 max-w-2xl">
        We handle the insurance paperwork so you don&apos;t have to.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {insuranceCarriers.map((c) => (
          <div
            key={c}
            className="group relative overflow-hidden rounded-2xl bg-warm-ivory border border-sand px-5 py-5 flex flex-col justify-between gap-4 min-h-[104px]"
          >
            <span
              className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-terracotta/10 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-terracotta-dark">
              <CheckIcon className="shrink-0" /> In-network
            </span>
            <span className="relative font-display text-lg font-semibold italic text-espresso leading-tight">
              <Placeholder>{c}</Placeholder>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-espresso/70">
        <Placeholder>Plus most major PPO plans</Placeholder> — don&apos;t see yours? Call us and
        we&apos;ll verify.
      </p>
    </section>
  );
}
