import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InsuranceBlock } from "@/components/InsuranceBlock";
import { Placeholder } from "@/components/Placeholder";
import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { contact, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insurance & New Patients | Super Tooth Dentistry",
  description:
    "What accepted vs. in-network means, how to check your coverage, and what to bring to your first visit at Super Tooth Dentistry in Queen Anne, Seattle.",
};

const whatToBring = faqs.find((f) => f.question === "What should I bring to my first appointment?")!;

/**
 * /insurance-new-patients — backlog item 6, the highest-risk page on the
 * site (pinned "legal": publishing an insurance claim that turns out
 * false is how patients get balance-billed). Minimum useful version per
 * the item's own scope:
 *
 *  1. A plain, GENERIC explainer of accepted-vs-in-network — this is
 *     industry-standard information, not a claim about this practice's
 *     specific network status, so it needs no verification.
 *  2. The real carrier module, reused as-is (`InsuranceBlock`) — every
 *     carrier name already renders through <Placeholder> there per its
 *     own file comment; nothing about that changes here.
 *  3. A no-insurance path — worded generically ("call to talk about your
 *     options") rather than inventing membership/financing terms, since
 *     those are still unconfirmed (backlog item 40).
 *  4. What to bring — reused verbatim from the site's own real FAQ
 *     answer (content.ts `faqs`), not new copy.
 *
 * No price appears anywhere on this page. $149/$500 offer figures stay
 * on NewPatientOffersBlock, which already renders them through
 * <Placeholder> — this page doesn't repeat them.
 */
export default function InsuranceNewPatientsPage() {
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
                  Insurance &amp; New Patients
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark mb-2">
            Insurance &amp; new patients
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-espresso leading-tight mb-6">
            Understanding your coverage
          </h1>

          <div className="rounded-2xl border border-sand bg-sand/30 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">
              &ldquo;Accepted&rdquo; and &ldquo;in-network&rdquo; aren&apos;t the same thing
            </h2>
            <p className="text-espresso/80 leading-relaxed !mb-3">
              Most dental offices will accept your insurance and submit claims on your behalf —
              that&apos;s different from being in-network, where the office has agreed to your
              plan&apos;s negotiated rates. Being in-network usually means a lower cost to you;
              being out-of-network can still mean the practice files your claim, but your plan may
              cover less of the bill.
            </p>
            <p className="text-espresso/80 leading-relaxed !mb-0">
              Plans vary even within the same insurance carrier, so the most reliable way to know
              your exact coverage is to confirm your specific plan with us directly before your
              visit.
            </p>
          </div>
        </div>

        <InsuranceBlock />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
          <div className="rounded-2xl border border-sand bg-warm-ivory p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">No insurance?</h2>
            <p className="text-espresso/80 leading-relaxed !mb-0">
              Call us to talk about your options — we&apos;re happy to walk through what a visit
              looks like and answer questions before you commit to anything.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
          <div className="rounded-2xl border border-sand bg-warm-ivory p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">
              What to bring to your first visit
            </h2>
            <p className="text-espresso/80 leading-relaxed !mb-0">{whatToBring.answer}</p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 sm:pb-20">
          <p className="text-sm text-espresso/60 !mb-3">
            <Placeholder>New-patient offer and financing details</Placeholder> — ask when you call
            or request an appointment.
          </p>
          <p className="text-sm text-espresso/60 !mb-6">
            Wondering what&apos;s actually covered?{" "}
            <Link href="/services" className="font-medium text-terracotta-dark hover:text-terracotta transition-colors">
              See our services
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
