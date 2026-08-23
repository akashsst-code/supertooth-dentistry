import type { Metadata } from "next";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-warm-ivory text-espresso">{children}</body>
    </html>
  );
}
