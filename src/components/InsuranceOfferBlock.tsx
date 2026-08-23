import { Placeholder } from "./Placeholder";
import { insuranceCarriers, offers } from "@/lib/content";

/**
 * Insurance / offer block — docs/supertooth-ux-flow.md Section 3.
 * Closes the rational-motivation gap right after trust is established
 * (locked ordering — see TrustBlock.tsx).
 */
export function InsuranceOfferBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-8">
        Insurance &amp; new-patient offers
      </h2>

      <div className="flex flex-wrap gap-3 mb-10">
        {insuranceCarriers.map((c) => (
          <span
            key={c}
            className="inline-flex items-center rounded-full bg-sand px-4 py-2 text-sm font-medium text-espresso"
          >
            <Placeholder>{c}</Placeholder>
          </span>
        ))}
        <span className="inline-flex items-center rounded-full border border-espresso/20 px-4 py-2 text-sm text-espresso/70">
          Don&apos;t see your plan? Call us — we&apos;ll verify.
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-terracotta/10 border border-terracotta/30 p-6">
          <p className="font-display text-lg font-semibold text-espresso">
            <Placeholder>{offers.newPatient}</Placeholder>
          </p>
        </div>
        <div className="rounded-2xl bg-terracotta/10 border border-terracotta/30 p-6">
          <p className="font-display text-lg font-semibold text-espresso">
            <Placeholder>{offers.invisalign}</Placeholder>
          </p>
        </div>
      </div>
    </section>
  );
}
