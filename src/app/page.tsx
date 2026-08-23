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
      {/*
       * Nav + Hero share exactly one screen height on mobile (h-[100svh])
       * instead of each guessing a vh/px budget that has to sum correctly
       * — Nav takes its natural height (shrink-0), Hero gets whatever's
       * left (flex-1), so it self-adjusts across phone sizes instead of
       * needing per-device tuning. svh (not vh) so it's pinned to the
       * smallest/worst-case visible area on mobile Safari, where vh is
       * computed against the browser-chrome-collapsed viewport and
       * silently overflows when the address bar is showing.
       * md:h-auto / md:block: desktop just flows normally, unconstrained.
       */}
      <div className="flex flex-col h-[100svh] md:h-auto md:block">
        <Nav />
        <Hero />
      </div>
      <main>
        <TrustBlock />
        <InsuranceOfferBlock />
        <BookingBlock />
      </main>
      <Footer />
    </>
  );
}
