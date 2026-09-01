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
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="tap-target flex shrink-0 items-center gap-1.5 min-[375px]:gap-2.5"
      aria-label={`${practice.name}, home`}
    >
      <Image
        src={toothMark}
        alt=""
        width={32}
        height={33}
        className="h-6 w-auto min-[375px]:h-8"
        priority
        aria-hidden="true"
      />
      <span className="flex flex-col leading-tight" aria-hidden="true">
        <span className="font-display text-sm min-[375px]:text-xl font-normal text-espresso">Supertooth</span>
        <span className="text-[8px] min-[375px]:text-[10px] font-medium tracking-widest text-espresso/60 uppercase">
          Dentistry
        </span>
      </span>
    </Link>
  );
}
