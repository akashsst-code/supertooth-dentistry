"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { anxietyNote, contact } from "@/lib/content";
import { CalendarIcon } from "./icons";
import { useAppointmentFormState } from "./AppointmentFormStateProvider";
import type { AppointmentFormFieldName as FieldName, AppointmentFormValues as Values } from "./AppointmentFormStateProvider";

type Errors = Partial<Record<FieldName, string>>;

const FIELD_LABELS: Record<FieldName, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone number",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "Enter your first name.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Enter your last name.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = "Enter a valid phone number, like (206) 555-0123.";
  }

  return errors;
}

/**
 * Appointment request form — /contact. There's no booking backend yet
 * (Tab32 integration is still unbuilt, see docs/supertooth-platform-pivot.md
 * and BookingBlock.tsx's own note on this), so submitting here is a
 * client-side stand-in that ends in a confirmation state rather than an
 * unverifiable "your appointment is booked" claim — copy stays in line
 * with BookingBlock's "we'll find a time that works."
 *
 * Validation is deliberately non-blocking and cumulative: a field only
 * shows an error after the visitor leaves it (touched) or after a failed
 * submit attempt, all issues are surfaced at once on submit (not one at a
 * time), and any error clears itself the moment that field becomes valid.
 * The submit button is never disabled — a failed attempt re-shows the
 * summary and refocuses the first bad field instead of trapping anyone.
 * A "prefer to call" fallback stays visible above and below the form for
 * anyone who gets stuck rather than fighting the form.
 */
export function AppointmentForm() {
  const { values, setValues, touched, setTouched, submitAttempted, setSubmitAttempted, reset } =
    useAppointmentFormState();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<Pick<Values, "firstName" | "email" | "phone"> | null>(
    null,
  );

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});
  // Synchronous guard: two clicks/Enters fired in the same tick both read the
  // same stale `submitting` state before React re-renders the disabled button,
  // so the state check alone lets both through. A ref updates immediately,
  // closing that gap regardless of render timing.
  const submittingRef = useRef(false);

  const errors = validate(values);
  const visibleErrors: Errors = {};
  (Object.keys(FIELD_LABELS) as FieldName[]).forEach((name) => {
    if ((touched[name] || submitAttempted) && errors[name]) {
      visibleErrors[name] = errors[name];
    }
  });
  const errorList = (Object.keys(FIELD_LABELS) as FieldName[]).filter((name) => errors[name]);

  function updateValue(name: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(name: FieldName) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function focusField(name: FieldName) {
    fieldRefs.current[name]?.focus();
    fieldRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return; // guards a double-tap/double-Enter while a submit is already in flight
    setSubmitAttempted(true);

    const currentErrors = validate(values);
    if (Object.keys(currentErrors).length > 0) {
      const firstInvalid = (Object.keys(FIELD_LABELS) as FieldName[]).find((name) => currentErrors[name]);
      if (firstInvalid) focusField(firstInvalid);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    // No booking backend exists yet — this stands in for a real submit
    // (see component doc comment above) rather than pretending to hit one.
    window.setTimeout(() => {
      setSubmittedValues({ firstName: values.firstName, email: values.email, phone: values.phone });
      submittingRef.current = false;
      setSubmitting(false);
      setSubmitted(true);
      reset(); // clears the shared in-memory values now that they've been sent
    }, 500);
  }

  if (submitted && submittedValues) {
    return (
      <div className="rounded-2xl border border-sand bg-warm-ivory p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
          <CheckMark />
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso mb-2">Request received</h2>
        <p className="text-espresso/70 max-w-sm mx-auto mb-6">
          Thanks, {submittedValues.firstName}. We&apos;ll reach out to {submittedValues.email} or call{" "}
          {submittedValues.phone} within 1 business day to confirm a time that works. Need us sooner? Call the
          number below.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="tap-target inline-flex items-center justify-center gap-2 rounded-full border border-espresso/15 px-5 py-2.5 text-sm font-semibold text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
          >
            <PhoneIcon />
            Or call {contact.phone}
          </a>
          <Link
            href="/"
            className="tap-target inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:brightness-110 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand bg-warm-ivory p-5 sm:p-8">
      <p className="text-sm text-espresso/70 mb-5">
        Prefer to talk to someone?{" "}
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          className="font-semibold text-terracotta-dark hover:text-espresso underline underline-offset-2"
        >
          Call {contact.phone}
        </a>{" "}
        instead — we&apos;re happy to help either way.
      </p>

      {submitAttempted && errorList.length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 rounded-xl border border-terracotta/30 bg-terracotta/5 p-4"
        >
          <p className="text-sm font-semibold text-espresso mb-2">
            Please fix {errorList.length === 1 ? "this" : `these ${errorList.length}`} before sending:
          </p>
          <ul className="flex flex-col gap-1">
            {errorList.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => focusField(name)}
                  className="text-sm text-terracotta-dark underline underline-offset-2 hover:text-espresso text-left"
                >
                  {errors[name]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            name="firstName"
            label="First name"
            inputMode="text"
            autoComplete="given-name"
            value={values.firstName}
            error={visibleErrors.firstName}
            onChange={(v) => updateValue("firstName", v)}
            onBlur={() => handleBlur("firstName")}
            inputRef={(el) => {
              fieldRefs.current.firstName = el;
            }}
          />
          <Field
            name="lastName"
            label="Last name"
            inputMode="text"
            autoComplete="family-name"
            value={values.lastName}
            error={visibleErrors.lastName}
            onChange={(v) => updateValue("lastName", v)}
            onBlur={() => handleBlur("lastName")}
            inputRef={(el) => {
              fieldRefs.current.lastName = el;
            }}
          />
        </div>

        <Field
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          error={visibleErrors.email}
          onChange={(v) => updateValue("email", v)}
          onBlur={() => handleBlur("email")}
          inputRef={(el) => {
            fieldRefs.current.email = el;
          }}
        />

        <Field
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          error={visibleErrors.phone}
          onChange={(v) => updateValue("phone", v)}
          onBlur={() => handleBlur("phone")}
          inputRef={(el) => {
            fieldRefs.current.phone = el;
          }}
        />

        <div>
          <p className="text-sm text-espresso/70 mb-2">{anxietyNote}</p>
          <label htmlFor="details" className="block text-xs font-semibold uppercase tracking-wide text-espresso/70 mb-1.5">
            Additional details <span className="font-normal normal-case text-espresso/70">(optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            value={values.details}
            onChange={(e) => updateValue("details", e.target.value)}
            placeholder="Preferred days/times, reason for visit, or anything that would help you feel more comfortable..."
            className="w-full rounded-lg border border-sand bg-warm-ivory px-3.5 py-2.5 text-espresso placeholder:text-espresso/35 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(to_right,var(--color-terracotta)_0%,var(--color-terracotta-dark)_10%)] px-6 py-3 text-sm font-semibold text-warm-ivory hover:brightness-110 transition disabled:opacity-70"
        >
          {submitting ? <Spinner /> : <CalendarIcon />}
          {submitting ? "Sending..." : "Send Request"}
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {submitting ? "Sending your request…" : ""}
        </span>

        <p className="text-xs text-espresso/70 -mt-2">
          Still stuck?{" "}
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="font-semibold text-espresso/70 underline underline-offset-2 hover:text-terracotta"
          >
            Call us at {contact.phone}
          </a>{" "}
          and we&apos;ll take it from here.
        </p>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  inputRef,
  type = "text",
  inputMode,
  autoComplete,
}: {
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
  type?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search" | "url" | "none";
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wide text-espresso/70 mb-1.5">
        {label} <span className="text-terracotta-dark">*</span>
      </label>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border bg-warm-ivory px-3.5 py-2.5 text-espresso focus:outline-none focus:ring-2 focus:ring-terracotta/50 ${
          error ? "border-terracotta focus:border-terracotta" : "border-sand focus:border-terracotta"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-xs text-terracotta-dark">
          <WarningIcon />
          {error}
        </p>
      )}
    </div>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.8c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
