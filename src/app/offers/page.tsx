import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { contact, offers } from "@/lib/content";

export const metadata: Metadata = {
  title: "New-Patient Offers | Super Tooth Dentistry",
  description:
    "Current new-patient offers at Super Tooth Dentistry in Queen Anne, Seattle — a $149 exam, cleaning and x-rays, and $500 off Invisalign clear aligners.",
};

const cards = [offers.newPatient, offers.invisalign];

/**
 * /offers — new home for the two new-patient offers, moved off the
 * homepage 2026-09-03 at Akash's request ("remove the new patient offer
 * from home page and move into hamburger as a new item and with it its
 * own detail page").
 *
 * Worth recording that this reverses an earlier locked decision rather
 * than filling a gap: `NewPatientOffersBlock.tsx`'s own comment records
 * the offers being placed last on the homepage, immediately before the
 * booking CTA, as Akash's "explicit call" — reinforcement right before
 * the ask. This supersedes that; both calls are his. The homepage now
 * runs trust -> testimonials -> services -> location -> FAQ -> booking
 * with no offer interruption, and the offers are one tap away in the
 * menu instead.
 *
 * Content is unchanged and still read from `content.ts` `offers` — the
 * same two confirmed-real figures ($149, $500 off Invisalign, verified
 * with Akash 2026-09-02, backlog item 6). Nothing new is claimed here:
 * no expiry date, no eligibility terms, no "limited time" framing, none
 * of which has been confirmed. The carousel is gone with the homepage
 * block; on a dedicated page there is room to show both offers at once,
 * so they are a plain two-up grid and the component's swipe/dots
 * machinery isn't needed.
 *
 * `/insurance-new-patients` deliberately carries no dollar figures (see
 * that page's own comment) — these two prices live here and only here,
 * so that separation still holds.
 */
export default function OffersPage() {
  const tel = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
        <div className="border-b border-sand bg-warm-ivory">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center gap-3">
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
                  New-Patient Offers
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
          {/* Not "New patients" — the first offer card's own label is
              already that, and the two stacked read as a stutter. */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            Getting started
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-semibold text-espresso leading-tight mb-3">
            Current offers
          </h1>
          <p className="text-espresso/70 mb-8 max-w-2xl">
            Two ways to start with us. Mention the offer when you book and we&apos;ll apply it.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 mb-10">
            {cards.map((offer) => (
              <div
                key={offer.text}
                className="flex flex-col rounded-3xl bg-sand p-6 sm:p-8"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-terracotta-dark">
                  {offer.label}
                </p>
                <p className="mb-6 font-display text-xl sm:text-2xl font-semibold leading-snug text-espresso">
                  {offer.text}
                </p>
                <div className="relative mx-auto mt-auto h-36 w-36 overflow-hidden rounded-full border-4 border-warm-ivory shadow-md sm:h-40 sm:w-40">
                  <Image
                    src={offer.image.src}
                    alt={offer.image.alt}
                    fill
                    sizes="10rem"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="tap-target w-full inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-4 text-base font-semibold text-warm-ivory hover:brightness-110 transition mb-2"
          >
            <CalendarIcon />
            Book Appointment
          </Link>
          <a
            href={tel}
            className="tap-target w-full inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-semibold text-espresso hover:border-terracotta-dark hover:text-terracotta-dark transition-colors mb-8"
          >
            <PhoneIcon />
            Call {contact.phone}
          </a>

          <p className="text-sm text-espresso/70">
            Wondering what your insurance covers?{" "}
            <Link
              href="/insurance-new-patients"
              className="text-terracotta-dark underline underline-offset-4 hover:text-terracotta"
            >
              Insurance &amp; new patients
            </Link>{" "}
            walks through accepted vs. in-network and what to bring to your first visit.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M5 12l7 7M5 12l7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
