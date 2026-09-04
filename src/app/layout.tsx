import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Inter, Manrope } from "next/font/google";
import { SkipLink } from "@/components/SkipLink";
import { AppointmentFormStateProvider } from "@/components/AppointmentFormStateProvider";
import { PREFERENCES_BOOTSTRAP_SCRIPT } from "@/lib/display-preferences";
import { contact, hours, practice, reviews, siteUrl } from "@/lib/content";
import "./globals.css";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Expands a "Tuesday – Friday" range into ["Tuesday", "Wednesday", "Thursday", "Friday"].
function expandDayRange(range: string): string[] {
  const [start, end] = range.split("–").map((d) => d.trim());
  const startIdx = WEEKDAYS.indexOf(start);
  const endIdx = WEEKDAYS.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [];
  const days: string[] = [];
  for (let i = startIdx; i !== endIdx; i = (i + 1) % 7) days.push(WEEKDAYS[i]);
  days.push(WEEKDAYS[endIdx]);
  return days;
}

// Converts "7:00 AM" -> "07:00", "4:30 PM" -> "16:30" for schema.org's
// 24-hour opens/closes format.
function to24Hour(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;
  let [, hourStr, minute, meridiem] = match;
  let hour = parseInt(hourStr, 10) % 12;
  if (meridiem.toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

// Item 4 — LocalBusiness/Dentist JSON-LD driven directly by content.ts
// (practice/contact/hours/reviews) so it can never drift from what's
// displayed on the page. aggregateRating uses the same real Google
// Business Profile figures item 13 verified — no invented values.
function parseAddress(address: string) {
  const [street, suite, locality, regionAndZip] = address.split(",").map((part) => part.trim());
  const [region, postalCode] = regionAndZip.split(/\s+/);
  return {
    streetAddress: `${street}, ${suite}`,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
  };
}

function buildLocalBusinessJsonLd() {
  const address = parseAddress(contact.address);
  const openingHoursSpecification = hours
    .filter((h) => h.time !== "Closed")
    .flatMap((h) => {
      const [opens, closes] = h.time.split("–").map((t) => to24Hour(t.trim()));
      return expandDayRange(h.days).map((dayOfWeek) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens,
        closes,
      }));
    });

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${siteUrl}/#practice`,
    name: practice.name,
    url: siteUrl,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.count,
    },
  };
}

// Design system typography — locked in docs/supertooth-ux-flow.md:
// Fraunces (display/headlines) + Inter (body, healthcare-accessibility
// standard, minimum 16px / line-height >= 1.5x, set in globals.css).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Editorial mobile-hero variation only (docs/supertooth-mobile-design-spec.md,
// homepage screen 1). Deliberately additive: Fraunces/Inter above stay the
// locked site-wide type tokens and every other page still renders in them.
// Weights are limited to what the spec actually calls for — 300/400/500 for
// Manrope (it explicitly rules out 600–800 as too dense) and a single
// Cormorant 400 italic used for exactly one accent word.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const TITLE = "Super Tooth Dentistry | Dentist in Queen Anne, Seattle";
const DESCRIPTION =
  "Your long-term dentist in Queen Anne, Seattle. In-network with most insurance plans, same-day crowns milled in-house, and a team that treats you like a person, not a patient number.";

// Mobile-first metadata pass. Three gaps measured on the running site:
// no theme-color (so Safari/Chrome's browser chrome sat at its default
// grey above a Warm Ivory page), no Open Graph tags at all (a dental
// practice link is overwhelmingly shared by text message, and every one
// of those previews was rendering bare), and no apple-touch-icon (an
// "Add to Home Screen" got a screenshot instead of a mark). None of
// these change a pixel of the page itself; all three are what the
// phone's own UI reads.
export const viewport: Viewport = {
  // Warm Ivory, matching the page's own ground so the status-bar area
  // reads as part of the site rather than a strip above it. Referenced
  // through the token rather than re-typing the hex.
  themeColor: "#faf8f4",
  // Explicitly permissive. The default already allows zoom; stating it
  // makes the intent non-negotiable for anyone editing this later —
  // suppressing pinch-zoom is a WCAG 1.4.4 failure and this site's
  // display-settings panel is additive to browser zoom, not a
  // replacement for it.
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: practice.name,
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  // Backlog item 62: the meta description used to lead on "same-day
  // appointments" — the claim Akash called inaccurate in the 2026-09-03
  // review, and the one place it would have kept appearing in search
  // results after the page itself stopped making it. In-network leads
  // here for the same reason it leads the homepage's own trust block.
  description: DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd();

  return (
    <html
      lang="en"
      /* The display-preferences bootstrap below writes data-contrast,
         data-motion and --user-text-scale onto this element before
         React hydrates — that is the entire point of running it early,
         and it means the client <html> legitimately differs from the
         server's. Without this, React logs a hydration mismatch on
         every page load for a difference we deliberately created. Scoped
         to this element only; it does not suppress warnings for any
         child. */
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-ivory text-espresso">
        {/* Applies saved display preferences (text size / contrast /
            motion) before first paint. Without it, a reader who has
            chosen larger text sees one frame at the default size and a
            visible jump on every navigation. Render-blocking by design
            and wrapped in try/catch — see display-preferences.ts. */}
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_BOOTSTRAP_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SkipLink />
        <AppointmentFormStateProvider>{children}</AppointmentFormStateProvider>
      </body>
    </html>
  );
}
