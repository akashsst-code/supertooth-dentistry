"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { TEXT_SCALE_OPTIONS, type TextScale } from "@/lib/display-preferences";
import { useDisplayPreferences, useIsHydrated } from "./useDisplayPreferences";
import { useDialogBehavior } from "./useDialogBehavior";

/**
 * The site's accessibility entry point — "Display settings".
 *
 * Shape of this control was chosen against the overlay-widget research
 * summarised in src/lib/display-preferences.ts. Two consequences show
 * up directly in the markup here:
 *
 *  1. NO floating action button. A persistent circular widget pinned to
 *     a viewport corner is the single most-reported overlay failure —
 *     at high zoom it parks itself on top of the content the reader
 *     magnified in order to read. The entry point is a normal link in
 *     the footer of every page instead, so it scrolls away like any
 *     other content, plus a permanently-visible inline copy of the same
 *     panel on /accessibility.
 *  2. NO conformance claim. The panel says what it changes. It does not
 *     say the site is accessible, compliant, or ADA/WCAG-ready — those
 *     are properties of the underlying markup, which is where the rest
 *     of this branch's fixes went.
 *
 * `variant="inline"` renders the controls directly (the /accessibility
 * page); `variant="dialog"` renders the footer trigger and the modal.
 * Both share one <Controls>, so the two surfaces can't drift apart.
 */

function RadioRow<T extends string>({
  legend,
  description,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  description: string;
  name: string;
  value: T;
  options: { value: T; label: string; hint: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="font-display text-base font-semibold text-espresso">{legend}</legend>
      <p className="mt-1 mb-0! text-sm text-espresso/80">{description}</p>
      {/* A real radio group, not a row of toggle buttons: arrow-key
          navigation, the "3 of 3" announcement and the grouped legend
          all come free from the native control, and this panel of all
          places should not be re-implementing a widget the platform
          already ships. The input is visually hidden but never
          display:none — it stays focusable and hit-testable, and the
          label is the 44px target. */}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`tap-target inline-flex cursor-pointer flex-col justify-center rounded-2xl border px-4 py-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta-dark ${
                checked
                  ? "border-terracotta-dark bg-terracotta-dark text-warm-ivory"
                  : "border-espresso/25 bg-warm-ivory text-espresso hover:border-terracotta-dark"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className="text-sm font-semibold">{opt.label}</span>
              <span className={`text-xs ${checked ? "text-warm-ivory/90" : "text-espresso/80"}`}>
                {opt.hint}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Controls({ idPrefix, showStatementLink }: { idPrefix: string; showStatementLink: boolean }) {
  const { prefs, update } = useDisplayPreferences();

  return (
    <div className="flex flex-col gap-7">
      <RadioRow<TextScale>
        legend="Text size"
        description="Scales everything on the site together, so the layout stays in proportion."
        name={`${idPrefix}-text-scale`}
        value={prefs.textScale}
        options={TEXT_SCALE_OPTIONS}
        onChange={(v) => update({ textScale: v })}
      />

      <RadioRow
        legend="Contrast"
        description="Darkens the lighter grey text and strengthens borders across the site."
        name={`${idPrefix}-contrast`}
        value={prefs.contrast}
        options={[
          { value: "default" as const, label: "Standard", hint: "As designed" },
          { value: "high" as const, label: "High", hint: "Stronger text" },
        ]}
        onChange={(v) => update({ contrast: v })}
      />

      <RadioRow
        legend="Motion"
        description="Stops the office and review photo strips from scrolling on their own."
        name={`${idPrefix}-motion`}
        value={prefs.motion}
        options={[
          { value: "full" as const, label: "Standard", hint: "Photos scroll" },
          { value: "reduced" as const, label: "Reduced", hint: "Nothing moves" },
        ]}
        onChange={(v) => update({ motion: v })}
      />

      {/* Honest scope note. Someone who needs more than 130% is better
          served by the browser's own zoom, which goes to 500% and
          applies to every site they visit — saying so is more useful
          than pretending this panel is the ceiling. */}
      <p className="mb-0! rounded-2xl bg-sand/50 p-4 text-sm text-espresso/80">
        Need more than this? Your browser&apos;s own zoom (pinch out on a phone, or
        <span className="whitespace-nowrap"> Ctrl/⌘ +</span> on a computer) works everywhere on this
        site and goes much further. These settings sit on top of it, and we never block zooming.
        Your choices are saved on this device only.
        {/* Suppressed on /accessibility, which renders this panel inline
            — a link to the page you are already reading is noise, and
            for a screen-reader user it is a link that appears to go
            somewhere and doesn't. */}
        {showStatementLink && (
          <>
            {" "}
            <Link
              href="/accessibility"
              className="font-medium text-terracotta-dark underline underline-offset-4"
            >
              Read our accessibility statement
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}

export function DisplaySettings({ variant = "dialog" }: { variant?: "dialog" | "inline" } = {}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  // The trigger is JS-only (it opens a client-side dialog), so it is
  // not rendered until React has hydrated. A dead button in the footer
  // of a server-rendered page is worse than no button: /accessibility
  // carries the same controls as plain, always-present markup, and the
  // footer already links there.
  const hydrated = useIsHydrated();

  useDialogBehavior(open && variant === "dialog", panelRef);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (variant === "inline") {
    return <Controls idPrefix={id} showStatementLink={false} />;
  }

  if (!hydrated) return null;

  // The dialog is portalled to <body> rather than rendered where the
  // trigger sits. Two concrete reasons, both observed: the footer's
  // default variant sets `text-center` and the homepage's `merged`
  // variant sets `font-editorial font-light`, and an in-place dialog
  // inherited both — the panel rendered centre-aligned in a different
  // typeface depending on which page opened it. A portal also keeps the
  // fixed overlay out of any future stacking context the footer might
  // acquire (a transform or filter on an ancestor would otherwise trap
  // it inside the footer's box, the same backdrop-filter trap Nav.tsx
  // and EditorialNav.tsx both document).
  const dialog = open ? (
    <div className="fixed inset-0 z-[70] flex items-end justify-center text-left sm:items-center">
      {/* Scrim is a plain div, not a button: the dialog is already
          dismissible by Escape and by an explicit, labelled Close
          control, and a full-viewport button would be one more stop
          in the tab order that announces nothing useful. */}
      <div
        className="absolute inset-0 bg-espresso/50"
        onClick={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        /* Bottom sheet on a phone (thumb reach), centred card from
           sm up. max-h + overflow-y so the panel itself scrolls at
           130% text on a short viewport rather than pushing its own
           close button off-screen — the failure mode the overlay
           research flags for magnified pages. */
        className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-warm-ivory p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-sans font-normal shadow-xl sm:rounded-3xl sm:pb-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-title`} className="font-display text-xl font-semibold text-espresso">
              Display settings
            </h2>
            <p className="mt-1 mb-0! text-sm text-espresso/80">
              Adjust how this site looks. Saved on this device.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close display settings"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="tap-target -mr-2 -mt-2 inline-flex shrink-0 items-center justify-center rounded-full text-espresso"
          >
            <CloseIcon />
          </button>
        </div>

        <Controls idPrefix={id} showStatementLink />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="tap-target inline-flex items-center gap-1.5 px-2 text-xs text-espresso/80 transition-colors hover:text-terracotta-dark"
      >
        <TextSizeIcon />
        Display settings
      </button>

      {dialog && createPortal(dialog, document.body)}
    </>
  );
}

function TextSizeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 20L8 6l5 14M4.6 16h6.8M14 20l3.5-9 3.5 9M15 17.5h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
