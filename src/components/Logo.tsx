import Image from "next/image";
import Link from "next/link";
import { practice } from "@/lib/content";
import toothMark from "../../public/logo/tooth-mark-bold.png";

/**
 * Logo — refreshed lockup: tooth silhouette with a terracotta sparkle
 * accent, paired with "Supertooth" in regular-weight display Fraunces and
 * "Dentistry" in tracked caps beneath. Supersedes the plain-silhouette
 * mark this file used to carry.
 *
 * The mark itself is the reference artwork (cropped, background keyed to
 * transparent) rather than a redrawn SVG — the silhouette has a specific
 * cut-away lobe the sparkle sits behind that a hand-traced path kept
 * drifting from.
 *
 * This stylized two-line wordmark is specific to the logo lockup —
 * practice.name ("Super Tooth Dentistry") stays the canonical string
 * used everywhere else (CTAs, meta, etc.), unchanged. aria-label carries
 * the canonical name so screen readers get "Super Tooth Dentistry"
 * rather than the two stacked spans read as one run-on word.
 *
 * Wordmark text is icon-only for the whole mobile range (`hidden
 * md:flex`) and only returns at the md breakpoint, where Nav swaps the
 * mobile control row for the desktop nav. Item 45 added a fourth
 * mobile-header control (emergency); item 53's compact-logo fix only
 * covered <375px, but the four controls at their normal (>=375px) size
 * measure ~251px wide and don't actually fit until ~438px viewport
 * width — so with the wordmark showing, the hamburger button clipped
 * fully off-canvas everywhere from 375px up to ~421px (measured), which
 * covers most phones (iPhone SE/12/13/14, many Android). Hiding the
 * wordmark for the entire mobile range removes that gap outright
 * rather than adding another breakpoint-specific patch on top of the
 * existing one. The tooth mark alone still functions as the home link
 * and brand mark (aria-label carries the full name for screen readers
 * regardless).
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="tap-target flex shrink-0 items-center gap-2.5"
      aria-label={`${practice.name}, home`}
    >
      <Image src={toothMark} alt="" width={32} height={33} className="h-8 w-auto" priority aria-hidden="true" />
      <span className="hidden md:flex flex-col leading-tight" aria-hidden="true">
        <span className="font-display text-xl font-normal text-espresso">Supertooth</span>
        <span className="text-xs font-medium tracking-widest text-espresso/60 uppercase">Dentistry</span>
      </span>
    </Link>
  );
}
