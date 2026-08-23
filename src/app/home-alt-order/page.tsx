import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
import { Differentiators, ArchanaBio, OfficeShowcase } from "@/components/TrustBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { InsuranceBlock } from "@/components/InsuranceBlock";
import { LocationMapSection } from "@/components/LocationMapSection";
import { NewPatientOffersBlock } from "@/components/NewPatientOffersBlock";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Alternative homepage section order, for review only — NOT the live
 * homepage (see src/app/page.tsx for the current locked order). Requested
 * by Akash: after the hero, run Office -> Dr. Archana bio -> Testimonials
 * -> Services ("what we treat") -> Insurance -> Location ("proudly
 * serving"), swapping the live order's Archana-before-office and moving
 * Services ahead of Insurance.
 *
 * Reuses the exact same section components/content as the live page (no
 * duplicated markup) — Differentiators/ArchanaBio/OfficeShowcase are the
 * sub-components TrustBlock itself is built from (see TrustBlock.tsx).
 * Differentiators row and the New-patient-offers/Booking/Footer tail are
 * left in their current spot since Akash's list didn't call those out.
 *
 * If this order is approved, fold it into page.tsx and delete this route.
 */
export default function HomeAltOrderPage() {
  return (
    <>
      <Nav />
      <ViewportHero>
        <Hero />
      </ViewportHero>
      <main>
        <section className="bg-sand/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
            <div className="mb-8 sm:mb-16">
              <Differentiators />
            </div>
            <div className="mb-16">
              <OfficeShowcase />
            </div>
            <ArchanaBio />
          </div>
        </section>
        <TestimonialsSection />
        <ServicesSection />
        <InsuranceBlock />
        <LocationMapSection />
        <NewPatientOffersBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
