"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type AppointmentFormFieldName = "firstName" | "lastName" | "email" | "phone";
export type AppointmentFormValues = Record<AppointmentFormFieldName | "details", string>;
export type AppointmentFormTouched = Partial<Record<AppointmentFormFieldName, boolean>>;

const EMPTY_VALUES: AppointmentFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  details: "",
};

type ContextValue = {
  values: AppointmentFormValues;
  setValues: (updater: (prev: AppointmentFormValues) => AppointmentFormValues) => void;
  touched: AppointmentFormTouched;
  setTouched: (updater: (prev: AppointmentFormTouched) => AppointmentFormTouched) => void;
  submitAttempted: boolean;
  setSubmitAttempted: (value: boolean) => void;
  reset: () => void;
};

const AppointmentFormStateContext = createContext<ContextValue | null>(null);

/**
 * Root-layout-scoped, in-memory only — deliberately not persisted to
 * localStorage/sessionStorage (this form can carry PHI-adjacent details,
 * see item 24/32 in backlog.ts). Because the provider lives above the
 * router in RootLayout, its state survives a client-side route change
 * away from /contact and back (e.g. a patient pausing to find their
 * insurance card), but resets on a full page reload — the same trade-off
 * item 32 calls for.
 */
export function AppointmentFormStateProvider({ children }: { children: ReactNode }) {
  const [values, setValuesState] = useState<AppointmentFormValues>(EMPTY_VALUES);
  const [touched, setTouchedState] = useState<AppointmentFormTouched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function setValues(updater: (prev: AppointmentFormValues) => AppointmentFormValues) {
    setValuesState(updater);
  }

  function setTouched(updater: (prev: AppointmentFormTouched) => AppointmentFormTouched) {
    setTouchedState(updater);
  }

  function reset() {
    setValuesState(EMPTY_VALUES);
    setTouchedState({});
    setSubmitAttempted(false);
  }

  return (
    <AppointmentFormStateContext.Provider
      value={{ values, setValues, touched, setTouched, submitAttempted, setSubmitAttempted, reset }}
    >
      {children}
    </AppointmentFormStateContext.Provider>
  );
}

export function useAppointmentFormState() {
  const ctx = useContext(AppointmentFormStateContext);
  if (!ctx) {
    throw new Error("useAppointmentFormState must be used within AppointmentFormStateProvider");
  }
  return ctx;
}
