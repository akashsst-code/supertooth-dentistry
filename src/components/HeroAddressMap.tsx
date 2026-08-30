"use client";

import { useState } from "react";
import { contact, practice } from "@/lib/content";
import { MapPinIcon } from "./icons";

/**
 * Hero address line, tap-to-expand — Akash's follow-up call after the
 * "opens Google Maps in a new tab" version: keep the visitor on the
 * page and show the same embed used lower down in LocationMapSection
 * (same mapSrc pattern: plain `?q=...&output=embed`, no API key/billing).
 * Split into its own client component for the same reason as
 * InsuranceTeaser — Hero.tsx itself doesn't need "use client" otherwise.
 */
export function HeroAddressMap() {
  const [expanded, setExpanded] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

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
        <div className="mt-1 w-full max-w-sm rounded-xl overflow-hidden border border-warm-ivory/15">
          <iframe
            src={mapSrc}
            title={`Map showing ${practice.name}'s location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-40 w-full border-0 sm:h-48"
          />
        </div>
      )}
    </>
  );
}
