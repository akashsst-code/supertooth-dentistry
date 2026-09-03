import { EditorialScreen } from "@/components/EditorialScreen";
import { EditorialNav } from "@/components/EditorialNav";
import { EditorialHero } from "@/components/EditorialHero";
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
 * SCREEN 1 IS A VARIATION UNDER REVIEW. The header and hero here are
 * EditorialNav/EditorialHero, built to docs/supertooth-mobile-design-spec.md
 * — a calm, editorial, text-beside-photo opening rather than copy
 * overlaid on a photo. Nav.tsx, Hero.tsx and ViewportHero.tsx are all
 * still in the tree, unchanged, and every other page still renders the
 * original Nav; reverting is a two-line change to this file. Everything
 * below the hero is untouched by the variation.
 *
 * EditorialScreen replaces ViewportHero for this variation: the header
 * is static rather than fixed, so it sits inside the one-screen box with
 * the hero instead of needing its height reserved separately. The whole
 * composition — photo included — lands on screen 1.
 */
export default function Home() {
  return (
    <>
      <EditorialScreen>
        <EditorialNav />
        <EditorialHero />
      </EditorialScreen>
      <main id="main-content" tabIndex={-1}>
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
