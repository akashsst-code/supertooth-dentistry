import { CheckIcon } from "./icons";
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
        <p className="mt-3 text-sm text-espresso/70">
          <Placeholder>Plus most major PPO plans</Placeholder> — don&apos;t see yours? Call us and
          we&apos;ll verify.
        </p>
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
