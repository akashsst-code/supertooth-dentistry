import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CredentialBadges } from "@/components/CredentialBadges";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { archana, contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Dr. Archana Dubey | Super Tooth Dentistry",
  description:
    "Meet Dr. Archana Dubey, DDS, MDS — practicing dentistry since 2012, DDS from the University of Colorado, at Super Tooth Dentistry in Queen Anne, Seattle.",
};

/**
 * /about — backlog item 10. Minimum useful version per that item's own
 * scope: Dr. Dubey's already-real bio (content.ts `archana`, sourced
 * from the practice's existing site per that export's file comment),
 * plus her credential badges and philosophy. Nothing here is new copy —
 * every sentence already existed in content.ts before this page did.
 *
 * Team beyond Dr. Dubey is deliberately NOT shown. `team` in content.ts
 * has three placeholder entries ("Hygienist name", "Staff name") that
 * are literally unconfirmed — item 10's acceptance criteria requires
 * "no unconfirmed team names appear," and the item's own minimum scope
 * is "1 profile/dentist + philosophy," so the honest minimum is to wait
 * for real names rather than render placeholder ones.
 *
 * Credential/training-and-affiliation badges (content.ts
 * `credentialBadges`) are the same real data and the same
 * <CredentialBadges> component TrustBlock uses on the homepage, so both
 * surfaces stay in sync.
 */
export default function AboutPage() {
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
              <ol className="flex items-center gap-1.5 text-sm text-espresso/50">
                <li>
                  <Link href="/" className="hover:text-terracotta transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-espresso font-medium">
                  About
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark mb-2">
            Meet your dentist
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-espresso leading-tight mb-8">
            About Super Tooth Dentistry
          </h1>

          <div className="rounded-3xl bg-warm-ivory border border-sand overflow-hidden sm:flex sm:items-stretch">
            <div className="relative aspect-[4/5] sm:aspect-auto sm:w-2/5 sm:shrink-0">
              <Image
                src={archana.photo}
                alt="Dr. Archana Dubey, DDS, MDS, at an American Dental Association event"
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wide uppercase text-terracotta-dark">
                {archana.name}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-espresso leading-tight">
                {archana.tagline}
              </h2>

              <p className="mt-4 text-sm italic text-espresso/80">&ldquo;{archana.quote}&rdquo;</p>
              <p className="mt-4 text-espresso/80 leading-relaxed">{archana.bio}</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-sand bg-sand/30 p-6 sm:p-8">
            <CredentialBadges />
          </div>

          <p className="mt-10 text-sm text-espresso/60">
            Thinking of becoming a patient?{" "}
            <Link
              href="/insurance-new-patients"
              className="font-medium text-terracotta-dark hover:text-terracotta transition-colors"
            >
              See insurance &amp; new-patient info
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
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
