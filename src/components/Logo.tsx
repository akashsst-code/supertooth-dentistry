import Link from "next/link";
import { practice } from "@/lib/content";

/**
 * Logo lockup — icon mark + two-line wordmark (name, then neighborhood/
 * city in small caps), the same lockup shape as smilemakersfortworth.com's
 * header, built in our own locked tokens (Fraunces + Terracotta/Espresso/
 * Sand) instead of theirs. A simplified tooth glyph, not the mint-green
 * "SUPERTOOTH" stencil wordmark in Downloads (Supertooth_final.ai/.png)
 * — that file predates the locked palette/type system, so per Akash this
 * is a fresh mark built to match rather than a recolor of the old one.
 */
export function Logo() {
  // Mobile header has fixed competing elements (call icon, Book, hamburger —
  // all locked in docs/supertooth-navigation-requirements.md, none removable
  // for space), so the full name doesn't fit at a readable size below `sm`.
  // Show the first two words there; full name from `sm` up.
  const shortName = practice.name.split(" ").slice(0, 2).join(" ");

  return (
    <Link href="/" className="tap-target flex items-center gap-2 sm:gap-3 min-w-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand">
        <ToothMark />
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="font-display text-base sm:text-xl font-semibold text-espresso whitespace-nowrap">
          <span className="sm:hidden">{shortName}</span>
          <span className="hidden sm:inline">{practice.name}</span>
        </span>
        <span className="hidden sm:block text-[11px] font-medium tracking-widest text-espresso/50 uppercase whitespace-nowrap">
          {practice.neighborhood} · {practice.city}
        </span>
      </span>
    </Link>
  );
}

function ToothMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5C16 3.5 18.75 5.6 18.75 9.2C18.75 12.1 17.35 13.2 16.85 16C16.45 18.35 15.85 20.5 14.4 20.5C13.2 20.5 12.9 18.1 12.6 16.1C12.45 15.1 12.25 14.6 12 14.6C11.75 14.6 11.55 15.1 11.4 16.1C11.1 18.1 10.8 20.5 9.6 20.5C8.15 20.5 7.55 18.35 7.15 16C6.65 13.2 5.25 12.1 5.25 9.2C5.25 5.6 8 3.5 12 3.5Z"
        fill="var(--color-terracotta)"
      />
    </svg>
  );
}
