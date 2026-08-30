"use client";

import { useState } from "react";
import { contact, practice } from "@/lib/content";
import { CloseIcon, MapPinIcon } from "./icons";

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
          className="text-left underline decoration-warm-ivory/40 underline-offset-2 hover:decoration-warm-ivory"
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
        </div>
      )}
    </>
  );
}
