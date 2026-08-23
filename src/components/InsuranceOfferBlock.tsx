import { CheckIcon } from "./icons";
import { Placeholder } from "./Placeholder";
import { insuranceCarriers, offers } from "@/lib/content";

/**
 * Insurance / offer block — docs/supertooth-ux-flow.md Section 3.
 * Closes the rational-motivation gap right after trust is established
 * (locked ordering — see TrustBlock.tsx).
 *
 * Two gaps neither the hero (screen 1) nor the trust block (screen 2)
 * actually close, both named directly in docs/supertooth-priority-dimensions.md
 * Section 1's insurance-driven-segment row:
 *  - "Do you take my plan" — the hero/carrier grid *show* plans but don't
 *    *answer* the question in the direct form the segment is asking it in.
 *    Framed below as an AEO-structured direct Q&A pair per the locked Build
 *    Constraints in the same doc — also the first FAQ content anywhere on
 *    the homepage.
 *  - "Use-it-or-lose-it timing" — named as part of what this segment cares
 *    about but wasn't represented anywhere in the build. Added as a second
 *    Q&A pair, phrased as general PPO-benefit-year info rather than a
 *    practice-specific figure, so it doesn't trip the "no unverifiable
 *    claims" rule the way a specific date or number would.
 *
 * Offer hierarchy also fixed to match the spec literally: build-spec
 * Section 3 calls the $149 new-patient offer the headline and Invisalign
 * "a secondary line" — previously both rendered as identical-weight cards.
 */
export function InsuranceOfferBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-8">
        Insurance &amp; new-patient offers
      </h2>

      <div className="mb-10">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/60 mb-4">
          We&apos;re in-network with
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {insuranceCarriers.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 rounded-xl bg-warm-ivory border border-sand px-4 py-3.5"
            >
              <CheckIcon className="shrink-0 text-terracotta" />
              <span className="text-sm font-medium text-espresso">
                <Placeholder>{c}</Placeholder>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance FAQ — direct Q&A pairs, AEO-ready per Build Constraints */}
      <div className="mb-10 rounded-2xl bg-sand/40 border border-sand p-6 sm:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/60 mb-5">
          Insurance questions, answered
        </h3>
        <div className="space-y-5">
          <div>
            <p className="font-display text-base font-semibold text-espresso">
              Do you accept my insurance plan?
            </p>
            <p className="mt-1.5 text-sm text-espresso/70">
              We&apos;re in-network with <Placeholder>{insuranceCarriers.join(", ")}</Placeholder> plus{" "}
              <Placeholder>most major PPO plans</Placeholder>. Don&apos;t see yours? Call us and
              we&apos;ll verify your coverage before you book.
            </p>
          </div>
          <div>
            <p className="font-display text-base font-semibold text-espresso">
              When should I use my benefits?
            </p>
            <p className="mt-1.5 text-sm text-espresso/70">
              Most PPO dental plans run on a calendar year, and unused benefits typically
              don&apos;t carry over — if yours resets January 1, booking before year-end means
              you get to use what you&apos;ve already paid for.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
        <div className="rounded-2xl bg-terracotta/10 border border-terracotta/30 p-6 sm:p-8">
          <span className="inline-flex items-center rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-warm-ivory mb-3">
            New patients
          </span>
          <p className="font-display text-xl font-semibold text-espresso">
            <Placeholder>{offers.newPatient}</Placeholder>
          </p>
        </div>
        <div className="rounded-xl border border-sand px-5 py-4 flex items-center">
          <p className="text-sm font-medium text-espresso/80">
            Also: <Placeholder>{offers.invisalign}</Placeholder>
          </p>
        </div>
      </div>
    </section>
  );
}
