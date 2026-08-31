import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { AppointmentForm } from "@/components/AppointmentForm";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request an Appointment | Super Tooth Dentistry",
  description: "Request an appointment at Super Tooth Dentistry in Queen Anne, Seattle — or call us directly.",
};

/**
 * /contact — every "Book Appointment" / "Schedule" CTA on the homepage
 * (Nav, Hero, BookingBlock, Footer, NewPatientOffersBlock) points here.
 * This used to be a dead link (no page existed at this route at all,
 * 404) — this is that page.
 *
 * Kept deliberately light: Nav (for the site's normal wayfinding) + a
 * breadcrumb/back row (explicit "you are here" + a real link home, on
 * top of the browser's own back/forward already working since this is a
 * real route, not a modal or client-side reveal) + the form itself,
 * sized to read as one screen on a typical viewport rather than a long
 * scroll. No Footer here on purpose — this page has exactly one job,
 * and repeating the homepage's full footer nav would just add scroll
 * past the point where someone's ready to act.
 */
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen flex flex-col">
        <div className="border-b border-sand bg-warm-ivory">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 py-3 flex items-center gap-3">
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
              <ol className="flex items-center gap-1.5 text-sm text-espresso/50">
                <li>
                  <Link href="/" className="hover:text-terracotta transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-espresso font-medium">
                  Request an Appointment
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-2xl w-full px-4 sm:px-6 py-8 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark mb-2">
              Appointments
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-espresso leading-tight mb-2">
              Request an Appointment
            </h1>
            <p className="text-espresso/70 mb-6">
              Tell us a bit about you and we&apos;ll follow up to find a time that works — no account needed.
            </p>

            <AppointmentForm />

            <p className="mt-6 text-center text-xs text-espresso/45">{contact.address}</p>
          </div>
        </div>
      </main>
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
