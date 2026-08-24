import Image from "next/image";
import { Placeholder } from "./Placeholder";
import { offers } from "@/lib/content";

/**
 * New-patient offers — split out of the old InsuranceOfferBlock and
 * moved to the end of the homepage flow, right before the booking CTA,
 * per Akash's explicit call: offers stay last regardless of what else
 * gets added above (testimonials/services/credentials/map) —
 * reinforcement right before the ask, not competing with trust-building
 * earlier in the page.
 *
 * Cards rebuilt per Akash's "half page picture and 1 line text offer"
 * call: photo fills half the card (full-bleed on mobile, side-by-side
 * ~50/50 from sm: up — same split pattern as Dr. Archana's bio card in
 * TrustBlock), offer text trimmed to a single line, no links. Images are
 * a temporary internet stand-in — see content.ts `offers` comment.
 */
export function NewPatientOffersBlock() {
  const cards = [offers.newPatient, offers.invisalign];

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso mb-8">
        New-patient offers
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((offer) => (
          <div
            key={offer.text}
            className="rounded-2xl overflow-hidden border border-terracotta/30 bg-terracotta/10 flex flex-col sm:flex-row sm:items-stretch"
          >
            <div className="relative aspect-[4/3] sm:aspect-auto sm:w-1/2 sm:shrink-0">
              <Image
                src={offer.image.src}
                alt={offer.image.alt}
                fill
                sizes="(min-width: 640px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center p-6 sm:w-1/2">
              <p className="font-display text-lg font-semibold text-espresso">
                <Placeholder>{offer.text}</Placeholder>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
