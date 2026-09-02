import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { contact, privacyPolicy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Super Tooth Dentistry",
  description: "How Super Tooth Dentistry collects, uses, and protects the information you share with us.",
};

/**
 * /privacy — backlog item 12. This item's own scope requires the text be
 * "practice-supplied or counsel-reviewed" and names writing legal text
 * ourselves as explicitly out of scope. What ships here is a draft —
 * structured on how comparable practice sites and the HHS model notices
 * lay this content out — so the route and layout exist now; it is not
 * yet the practice-approved text item 12's acceptance criteria requires.
 * The banner below makes that status visible rather than passing draft
 * text off as final, same convention as <Placeholder> elsewhere in this
 * codebase for not-yet-confirmed content.
 */
export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="pt-16">
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
                  Privacy Policy
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
          {privacyPolicy.draft && (
            <div className="rounded-2xl border-2 border-dashed border-terracotta/60 bg-sand/40 p-4 mb-8 text-sm text-espresso/80">
              <strong className="text-espresso">Draft — pending review.</strong> This page is a draft, not yet
              reviewed or approved by the practice or its counsel. Do not treat it as the practice&apos;s final
              privacy commitments.
            </div>
          )}

          <h1 className="font-display text-2xl sm:text-4xl font-semibold text-espresso leading-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-espresso/50 mb-8">Last updated {privacyPolicy.lastUpdated}</p>

          <div className="flex flex-col gap-8">
            {privacyPolicy.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-lg font-semibold text-espresso mb-2">{s.heading}</h2>
                <p className="text-espresso/80 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-sand bg-warm-ivory p-6">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">Questions about your privacy?</h2>
            <p className="text-espresso/80 mb-4">Contact us and we&apos;ll help.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="tap-target inline-flex items-center justify-center rounded-full border border-espresso/20 px-5 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta-dark hover:text-terracotta-dark transition-colors"
              >
                {contact.phone}
              </a>
              <Link
                href="/accessibility"
                className="tap-target inline-flex items-center justify-center text-sm font-medium text-terracotta-dark hover:text-terracotta transition-colors"
              >
                Accessibility statement
              </Link>
            </div>
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
