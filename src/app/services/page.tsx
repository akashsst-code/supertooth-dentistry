import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServicesSection } from "@/components/ServicesSection";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | Super Tooth Dentistry",
  description:
    "Checkups and cleanings, repairs for a damaged or missing tooth, cosmetic dentistry, and Invisalign clear aligners at Super Tooth Dentistry in Queen Anne, Seattle.",
};

/**
 * /services — backlog item 11. Minimum useful version per that item's
 * scope: the four already-real homepage services, reused via the exact
 * same component (`ServicesSection`) rather than duplicating its card
 * markup and real/Placeholder handling on this page. No new service
 * claims, no pricing — that's item 6/20's job, not this one's.
 */
export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <div className="border-b border-sand bg-warm-ivory">
          <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 py-3 flex items-center gap-3">
            <Link
              href="/"
              className="tap-target inline-flex items-center gap-1.5 text-sm font-medium text-espresso/70 hover:text-terracotta transition-colors -ml-2 px-2"
            >
              <BackArrowIcon />
              Back
            </Link>
            <span className="text-espresso/20" aria-hidden="true">
              /
            </span>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-espresso/70">
                <li>
                  <Link href="/" className="hover:text-terracotta transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-espresso font-medium">
                  Services
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 pt-10 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark mb-2">Services</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-espresso leading-tight">
            Care for every stage
          </h1>
        </div>

        {/* ServicesSection renders its own h2 ("What we treat") below this
            h1 — correct heading order (h1 -> h2), not a duplicate title. */}
        <ServicesSection />

        <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 pb-16 sm:pb-20 -mt-4">
          <p className="text-sm text-espresso/70 !mb-6">
            Curious who&apos;s behind the chair?{" "}
            <Link href="/about" className="font-medium text-terracotta-dark hover:text-terracotta transition-colors">
              Meet Dr. Archana Dubey
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-3 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
            >
              <CalendarIcon />
              Book Appointment
            </Link>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="tap-target inline-flex items-center justify-center gap-1.5 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso hover:border-terracotta-dark hover:text-terracotta-dark transition-colors"
            >
              <PhoneIcon />
              {contact.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
