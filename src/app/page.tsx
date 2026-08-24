import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
import { TrustBlock } from "@/components/TrustBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { NewPatientOffersBlock } from "@/components/NewPatientOffersBlock";
import { FAQSection } from "@/components/FAQSection";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Homepage — single-page-led funnel. Current order: Trust (differentiators
 * -> office-photo carousel, moved above Dr. Archana's bio per Akash's
 * later call -> bio) -> Testimonials (right after the office blurb) ->
 * Services -> Location/map -> New-patient offers (kept last on purpose)
 * -> Booking -> Footer.
 *
 * FAQ (AEO/SEO requirement, docs/supertooth-webflow-build-spec.md Section
 * 7) sits right before Booking — resolves last-minute objections
 * (insurance, cost, cancellation, emergencies) right before the booking
 * ask, without reordering anything else already locked above it.
 *
 * Insurance block removed from the homepage entirely per Akash's explicit
 * call — the component (`InsuranceBlock.tsx`) and its content
 * (`insuranceCarriers` in content.ts) are kept, not deleted, as the
 * natural fit for the dedicated `/insurance-new-patients` page once that
 * gets built (see Section 2 below).
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
        <ServicesSection />
        <LocationMapSection />
        <NewPatientOffersBlock />
        <FAQSection />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
