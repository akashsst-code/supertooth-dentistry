import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ServicesHero } from "@/components/ServicesHero";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { ServiceFaq } from "@/components/ServiceFaq";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | Same-Day Crowns, Same-Day Appointments | Super Tooth Dentistry",
  description:
    "Same-day crowns with no second visit, real same-day appointment availability, and in-network billing we handle for you — see how Super Tooth Dentistry's services actually work.",
};

/**
 * /services — first of the four stubbed nav pages to get built, per the
 * JTBD-based priority order worked out with Akash: same-day crowns first
 * (highest-leverage proof point for the primary routine/proactive
 * segment), then same-day appointments, then in-network/insurance, then
 * an AEO-ready FAQ block, with Book/Call CTAs at both top and bottom of
 * the page. Full rationale in the PR description.
 *
 * Reuses BookingBlock as-is for the bottom CTA rather than duplicating
 * it — same component already used on the homepage.
 */
export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <ServiceHighlights />
        <ServiceFaq />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
