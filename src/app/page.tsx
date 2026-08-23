import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
import { TrustBlock } from "@/components/TrustBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { InsuranceBlock } from "@/components/InsuranceBlock";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { NewPatientOffersBlock } from "@/components/NewPatientOffersBlock";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Homepage — single-page-led funnel. Section order below the office
 * carousel was reworked per Akash's explicit calls across two rounds of
 * feedback (see PR description): the flow through Trust's office-photo
 * scroll is unchanged, then — Testimonials (right after the office blurb,
 * per the second round) -> Insurance (redesigned, stays in its original
 * earlier position) -> Services -> Location/map -> New-patient offers
 * (kept last on purpose) -> Booking -> Footer.
 *
 * "Meet the team" was removed from the homepage entirely (still in
 * content.ts for a future /about page). Dr. Archana's training/
 * affiliation credentials live inside her bio card in TrustBlock, not a
 * separate section. Service/location pages
 * (docs/supertooth-webflow-build-spec.md Section 2) still need to be
 * built at /services, /about, /insurance-new-patients, /contact.
 *
 * Nav is fixed (pinned for the whole page, see Nav.tsx) and rendered
 * outside ViewportHero. Hero still fills exactly one screen height on
 * mobile below it — handled by ViewportHero, which reserves Nav's
 * height; see that file for why a plain h-[100svh] div wasn't enough
 * (in-app browsers like WhatsApp's often don't support svh).
 */
export default function Home() {
  return (
    <>
      <Nav />
      <ViewportHero>
        <Hero />
      </ViewportHero>
      <main>
        <TrustBlock />
        <TestimonialsSection />
        <InsuranceBlock />
        <ServicesSection />
        <LocationMapSection />
        <NewPatientOffersBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
