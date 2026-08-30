"use client";

import { useState } from "react";
import { contact, practice } from "@/lib/content";
import { CloseIcon, MapPinIcon, MinusIcon, PlusIcon } from "./icons";

const MIN_ZOOM = 5;
const MAX_ZOOM = 20;
const DEFAULT_ZOOM = 15;

/**
 * Hero address line, tap-to-expand — Akash's follow-up call after the
 * "opens Google Maps in a new tab" version: keep the visitor on the
 * page and show the same embed used lower down in LocationMapSection
 * (same mapSrc pattern: plain `?q=...&output=embed`, no API key/billing).
 * Split into its own client component for the same reason as
 * InsuranceTeaser — Hero.tsx itself doesn't need "use client" otherwise.
 *
 * The embed is a cross-origin google.com iframe, so its own baked-in
 * chrome (the "View larger map" / "Maps" open-in-new-tab links) can't
 * be reached or removed with our JS. Instead the iframe is sandboxed
 * without allow-popups/allow-top-navigation so those links are inert —
 * clicking them can't open a tab or navigate the visitor away — and we
 * layer our own zoom/close controls on top, driving zoom via the
 * embed's `z` query param since we can't call into Google's script.
 *
 * Pinch-to-zoom needs no extra wiring — it's Google's own interactive
 * map running inside the iframe, and nothing here sets `touch-action`
 * to block it.
 *
 * The "Maps" open-in-app chip Google renders in the embed's top-left
 * corner is inside that same cross-origin document, so it can't be
 * deleted — the div at the top-left corner below sits on top of it as
 * an opaque patch (matching the card's rounded corner) so it's covered
 * visually, on top of the sandbox already making a click on it do
 * nothing.
 */
export function HeroAddressMap() {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&z=${zoom}&output=embed`;

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
            src={mapSrc}
            title={`Map showing ${practice.name}'s location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin"
            className="h-72 w-full border-0 sm:h-96"
          />

          <div className="pointer-events-none absolute left-0 top-0 h-11 w-24 rounded-tl-xl bg-warm-ivory" />

          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Close map"
            className="tap-target absolute right-2 top-2 flex items-center justify-center rounded-full bg-warm-ivory text-espresso shadow hover:bg-warm-ivory/90"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 right-2 flex flex-col overflow-hidden rounded-full bg-warm-ivory shadow">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 1, MAX_ZOOM))}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              className="tap-target flex items-center justify-center text-espresso hover:bg-warm-ivory/90 disabled:opacity-30"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <div className="h-px w-full bg-espresso/10" />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 1, MIN_ZOOM))}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              className="tap-target flex items-center justify-center text-espresso hover:bg-warm-ivory/90 disabled:opacity-30"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
