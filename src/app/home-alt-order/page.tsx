import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
import { CompactDifferentiators, ArchanaBio, OfficeShowcase } from "@/components/TrustBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import { NewPatientOffersBlock } from "@/components/NewPatientOffersBlock";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Alternative homepage section order, for review only — NOT the live
 * homepage (see src/app/page.tsx for the current locked order).
 *
 * Second round, per Akash: right after the hero —
 * 1. Compressed/compact differentiators strip (not the full-card version)
 * 2. Our office (carousel + blurb)
 * 3. Dr. Archana bio
 * 4. Testimonials ("what patients are saying")
 * 5. Services ("what we treat")
 * 6. Location ("proudly serving")
 *
 * Insurance is intentionally dropped from this page per Akash's explicit
 * call (asked directly whether to keep/move/drop it — he chose drop).
 * It still exists as a component/route elsewhere; just not rendered here.
 *
 * Reuses the same section components/content as the live page — no
 * duplicated markup. CompactDifferentiators/ArchanaBio/OfficeShowcase are
 * exported from TrustBlock.tsx (CompactDifferentiators is a new, tighter
 * variant built specifically for this page; the locked TrustBlock still
 * uses the original full-card Differentiators, unchanged).
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
        <section className="bg-warm-ivory">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
            <CompactDifferentiators />
          </div>
        </section>
        <section className="bg-sand/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
            <div className="mb-16">
              <OfficeShowcase />
            </div>
            <ArchanaBio />
          </div>
        </section>
        <TestimonialsSection />
        <ServicesSection />
        <LocationMapSection />
        <NewPatientOffersBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
