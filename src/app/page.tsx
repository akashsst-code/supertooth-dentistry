import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
import { TrustBlock } from "@/components/TrustBlock";
import { InsuranceBlock } from "@/components/InsuranceBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { NewPatientOffersBlock } from "@/components/NewPatientOffersBlock";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Homepage — single-page-led funnel. Section order below the office
 * carousel was reworked per Akash's explicit call (see PR description):
 * the flow through Trust's office-photo scroll is unchanged, then —
 * Insurance (redesigned, stays in its original earlier position) ->
 * Testimonials -> Services -> Credentials -> Location/map ->
 * New-patient offers (kept last on purpose) -> Booking -> Footer.
 * "Meet the team" was removed from the homepage entirely (still in
 * content.ts for a future /about page). Service/location pages
 * (docs/supertooth-webflow-build-spec.md Section 2) still need to be
 * built at /services, /about, /insurance-new-patients, /contact.
 *
 * Nav + Hero sharing exactly one screen height on mobile is handled by
 * ViewportHero — see that file for why a plain h-[100svh] div wasn't
 * enough (in-app browsers like WhatsApp's often don't support svh).
 */
export default function Home() {
  return (
    <>
      <ViewportHero>
        <Nav />
        <Hero />
      </ViewportHero>
      <main>
        <TrustBlock />
        <InsuranceBlock />
        <TestimonialsSection />
        <ServicesSection />
        <CredentialsSection />
        <LocationMapSection />
        <NewPatientOffersBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
