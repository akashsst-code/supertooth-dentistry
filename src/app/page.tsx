import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBlock } from "@/components/TrustBlock";
import { InsuranceOfferBlock } from "@/components/InsuranceOfferBlock";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";

/**
 * Homepage — single-page-led funnel, locked section order per
 * docs/supertooth-ux-flow.md: Hero -> Trust -> Insurance/offer -> Booking
 * -> Footer. Service/location pages (docs/supertooth-webflow-build-spec.md
 * Section 2) still need to be built at /services, /about,
 * /insurance-new-patients, /contact — this first pass is homepage only,
 * per the current task.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBlock />
        <InsuranceOfferBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
