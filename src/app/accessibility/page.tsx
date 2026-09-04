import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DisplaySettings } from "@/components/DisplaySettings";
import { contact, accessibilityStatement } from "@/lib/content";

export const metadata: Metadata = {
  title: "Accessibility Statement | Super Tooth Dentistry",
  description: "Super Tooth Dentistry's commitment to web accessibility, known limitations, and how to report a barrier.",
};

/**
 * /accessibility — backlog item 12. Structured on the W3C WAI "complete
 * accessibility statement" example that item's own references cite:
 * conformance target, an honest known-limitations section (we haven't
 * run item 14's WCAG audit yet, so this doesn't claim full conformance),
 * and a one-tap feedback route. Unlike /privacy, this content is safe to
 * draft directly per that item's own reference note ("use [the W3C
 * generator] to generate the first draft. Have Akash review before
 * publishing.") — still pending that review, but not the same
 * practice-must-supply-it category as the privacy policy text.
 */
export default function AccessibilityPage() {
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
              <ol className="flex items-center gap-1.5 text-sm text-espresso/70">
                <li>
                  <Link href="/" className="hover:text-terracotta transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-espresso font-medium">
                  Accessibility Statement
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="font-display text-2xl sm:text-4xl font-semibold text-espresso leading-tight mb-2">
            Accessibility Statement
          </h1>
          <p className="text-sm text-espresso/70 mb-8">Last updated {accessibilityStatement.lastUpdated}</p>

          <p className="text-espresso/80 leading-relaxed mb-8">{accessibilityStatement.commitment}</p>

          <div>
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">Conformance target</h2>
            <p className="text-espresso/80 leading-relaxed mb-8">
              We aim to meet <strong>{accessibilityStatement.conformanceTarget}</strong>, the standard published by
              the World Wide Web Consortium (W3C). We have not yet completed a full audit against this standard, so
              we don&apos;t claim full conformance today.
            </p>
          </div>

          {/* Display settings, inline and always visible — the primary
              home for the panel the footer opens as a dialog. Placed
              above "Known limitations" on purpose: someone who lands
              here because the site is hard to read should reach a
              control before they reach a list of things we haven't
              fixed yet. The same <DisplaySettings> component the footer
              renders, so the two can never drift apart. */}
          <div className="rounded-2xl border border-sand bg-sand/30 p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">Display settings</h2>
            <p className="text-espresso/80 mb-6">
              Adjust the text size, contrast and motion on this site. These are our own controls —
              they change the real page, not a layer on top of it — and they never interfere with
              your browser&apos;s or phone&apos;s own accessibility settings.
            </p>
            <DisplaySettings variant="inline" />
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">Known limitations</h2>
            <ul className="flex flex-col gap-2 mb-8">
              {accessibilityStatement.knownLimitations.map((l) => (
                <li key={l} className="flex gap-2 text-espresso/80 leading-relaxed">
                  <span className="text-terracotta-dark shrink-0" aria-hidden="true">
                    •
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-sand bg-warm-ivory p-6">
            <h2 className="font-display text-lg font-semibold text-espresso mb-2">Report a barrier</h2>
            <p className="text-espresso/80 mb-4">
              If you run into an accessibility barrier anywhere on this site, tell us — one tap away.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="tap-target inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
              >
                {contact.phone}
              </a>
              <Link
                href="/privacy"
                className="tap-target inline-flex items-center justify-center text-sm font-medium text-terracotta-dark hover:text-terracotta transition-colors"
              >
                Privacy policy
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
