import { Placeholder } from "./Placeholder";
import { offers } from "@/lib/content";

/**
 * New-patient offers — split out of the old InsuranceOfferBlock and
 * moved to the end of the homepage flow, right before the booking CTA,
 * per Akash's explicit call: offers stay last regardless of what else
 * gets added above (testimonials/services/credentials/map) —
 * reinforcement right before the ask, not competing with trust-building
 * earlier in the page.
 */
export function NewPatientOffersBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-8">
        New-patient offers
      </h2>
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
