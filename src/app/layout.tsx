import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Super Tooth Dentistry | Dentist in Queen Anne, Seattle",
  description:
    "Your long-term dentist in Queen Anne, Seattle. Same-day appointments, in-network with most insurance plans, and a team that treats you like a person, not a patient number.",
};

// viewportFit: "cover" — required for the `env(safe-area-inset-bottom)`
// used in Hero.tsx's CTA row to have any effect. Without it, the page
// doesn't opt into drawing under the device's rounded corners/home
// indicator/browser chrome overlay, so that env() value is always 0px —
// this was the actual missing piece behind the "Book Appointment"
// button getting hidden under an in-app browser's own bottom toolbar on
// a real phone, since that toolbar overlays the page rather than
// resizing it out of the way.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-warm-ivory text-espresso">{children}</body>
    </html>
  );
}
