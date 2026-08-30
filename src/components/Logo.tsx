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
 * `mono` (added 2026-08-29, Nav's floating-over-hero state): the mark
 * is a fixed raster asset (Espresso tooth + Terracotta sparkle baked
 * into the PNG, not recolorable per-pixel via CSS), so there's no way
 * to keep its normal two-color look AND guarantee contrast against
 * whichever photo happens to be behind Nav. `mono` forces it to a flat
 * white silhouette via a CSS filter and swaps the wordmark to
 * warm-ivory — trading the sparkle's terracotta color for legibility
 * while floating. Reverts to the normal colored mark the moment Nav
 * goes solid.
 *
 * A drop-shadow (image) / text-shadow (wordmark) rides along with
 * `mono` rather than a background panel behind the whole lockup — Nav
 * tried a scrim panel here first and Akash flagged it as a stark band
 * sitting on the photo instead of merging into it. Per-glyph shadows
 * let the photo itself stay fully visible right up to the mark's edges.
 */
export function Logo({ mono = false }: { mono?: boolean }) {
  return (
    <Link href="/" className="tap-target flex items-center gap-2.5" aria-label={`${practice.name}, home`}>
      <Image
        src={toothMark}
        alt=""
        width={32}
        height={33}
        className={`h-8 w-auto transition-[filter] duration-300 ${mono ? "brightness-0 invert drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]" : ""}`}
        priority
        aria-hidden="true"
      />
      <span className="flex flex-col leading-tight" aria-hidden="true">
        <span
          className={`font-display text-xl font-normal transition-colors duration-300 ${mono ? "text-warm-ivory text-shadow-photo" : "text-espresso"}`}
        >
          Supertooth
        </span>
        <span
          className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${mono ? "text-warm-ivory/70 text-shadow-photo" : "text-espresso/60"}`}
        >
          Dentistry
        </span>
      </span>
    </Link>
  );
}
