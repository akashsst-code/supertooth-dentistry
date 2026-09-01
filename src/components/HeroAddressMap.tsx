"use client";

import { useState } from "react";
import { contact, mapDirectionsUrl, practice } from "@/lib/content";
import { CloseIcon, ExternalLinkIcon, MapPinIcon } from "./icons";

/**
 * Hero address line, tap-to-expand — Akash's follow-up call after the
 * "opens Google Maps in a new tab" version: keep the visitor on the
 * page and show a map preview in place. Split into its own client
 * component for the same reason as InsuranceTeaser — Hero.tsx itself
 * doesn't need "use client" otherwise.
 *
 * Uses contact.mapEmbedSrc — Google's own lightweight "Embed a map"
 * output for the practice's actual Business Profile listing (grabbed
 * by Akash directly from Maps → Share → Embed a map), not the earlier
 * informal `/maps?q=...&output=embed` trick. That swap is also why
 * there's no custom zoom control here: this real embed is Google's
 * actual interactive map widget, so pinch-to-zoom and its own native
 * zoom controls already work out of the box — layering on a fake
 * zoom control (the old version rewrote a `z` query param the real
 * embed doesn't have) would just be reinventing what's already there.
 *
 * The close button is still ours to add — collapsing the preview back
 * down isn't something the embed itself has a concept of. The iframe
 * is still sandboxed without allow-popups/allow-top-navigation, a real
 * browser feature (not the overlay-div hack that was here before) —
 * it keeps the visitor contained by making any "open in new tab" link
 * inside the embed (on the place card, etc.) inert, without touching
 * what's actually rendered.
 *
 * Item 59 — the sandbox above means nothing inside the iframe can ever
 * open a native maps app, which item 55's cross-page journey walk
 * flagged as a real gap against scenario 1's "one-tap directions" need.
 * Ruling: add a real "Get Directions" anchor OUTSIDE the iframe (using
 * `mapDirectionsUrl`, content.ts) rather than loosen the sandbox — the
 * embed's on-page-preview behavior stays exactly as locked, this is
 * purely additive. Placed inside the expanded panel rather than the
 * collapsed trust-strip line: that line is already tight (see the tap
 * target note below) and this is a next step only relevant once the
 * visitor has already opened the preview.
 *
 * Tap target: an earlier pass gave this button a real 44px min-height,
 * which stretched the whole three-line hero trust strip apart (Akash:
 * "too far off, make it visually closer"). Reverted to the button's
 * natural small size and widened only the invisible ::after hit area
 * instead — a 375×812 sweep confirms the real tappable region is still
 * ≥44×44px, it's just no longer the visible box. See the same note on
 * InsuranceTeaser.tsx's "+ more" button, right above it in this strip.
 */
export function HeroAddressMap() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <span className="inline-flex items-center gap-1.5">
        <MapPinIcon className="shrink-0 text-terracotta" />
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="relative text-left underline decoration-warm-ivory/40 underline-offset-2 hover:decoration-warm-ivory after:absolute after:-inset-3.5 after:content-['']"
        >
          {contact.address}
        </button>
      </span>
      {expanded && (
        <div className="relative mt-1 w-full overflow-hidden rounded-xl border border-warm-ivory/15">
          <iframe
            src={contact.mapEmbedSrc}
            title={`Map showing ${practice.name}'s location`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin"
            allowFullScreen
            className="h-72 w-full border-0 sm:h-96"
          />

          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close map"
            className="tap-target absolute right-2 top-2 flex items-center justify-center rounded-full bg-warm-ivory text-espresso shadow hover:bg-warm-ivory/90"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target absolute left-2 bottom-2 inline-flex items-center gap-1.5 rounded-full bg-warm-ivory px-3 text-xs font-semibold text-espresso shadow hover:bg-warm-ivory/90"
          >
            Get Directions
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        </div>
      )}
    </>
  );
}
