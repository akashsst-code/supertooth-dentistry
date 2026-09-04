import { EditorialScreen } from "@/components/EditorialScreen";
import { EditorialNav } from "@/components/EditorialNav";
import { EditorialHero } from "@/components/EditorialHero";
import { EditorialTrustBlock } from "@/components/EditorialTrustBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { FAQSection } from "@/components/FAQSection";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Homepage — single-page-led funnel. Current order: Trust (differentiators
 * -> Dr. Archana's bio, moved back above the office-photo carousel per
 * Akash's call 2026-09-03 -> office carousel) -> Testimonials (right
 * after the office blurb) -> Services -> Location/map -> New-patient
 * offers (kept last on purpose) -> Booking -> Footer.
 *
 * FAQ (AEO/SEO requirement, docs/supertooth-webflow-build-spec.md Section
 * 7) sits right before Booking — resolves last-minute objections
 * (insurance, cost, cancellation, emergencies) right before the booking
 * ask, without reordering anything else already locked above it.
 *
 * New-patient offers removed from the homepage 2026-09-03 per Akash's
 * call ("remove the new patient offer from home page and move into
 * hamburger as a new item and with it its own detail page"). This
 * reverses the earlier locked "offers stay last, right before the
 * booking ask" placement — both calls are his; the component is kept,
 * not deleted, and `/offers` (in the menu) is the new home. Removing it
 * also broke the ivory/sand alternation between Location and FAQ, so
 * FAQ moved onto the sand ground; and the Footer now renders `merged`,
 * continuing BookingBlock's espresso ground so the page ends on that
 * section rather than a pale strip beneath it.
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
 * EditorialScreen replaces ViewportHero for this variation. EditorialNav
 * is fixed and transparent at the top of the page, so it overlays the
 * hero rather than consuming layout height — the hero's own pt-20 is
 * what clears it, and EditorialScreen's box is the full viewport rather
 * than viewport-minus-nav. The whole composition, photo included, lands
 * on screen 1.
 */
export default function Home() {
  return (
    <>
      <EditorialNav />
      <EditorialScreen>
        <EditorialHero />
      </EditorialScreen>
      <main id="main-content" tabIndex={-1}>
        <EditorialTrustBlock />
        <TestimonialsSection />
        <ServicesSection variant="editorial" />
        <LocationMapSection />
        <FAQSection />
        <BookingBlock />
      </main>
      <Footer variant="merged" />
    </>
  );
}
