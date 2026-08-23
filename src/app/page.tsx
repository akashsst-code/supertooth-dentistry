import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ViewportHero } from "@/components/ViewportHero";
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
        <InsuranceOfferBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
