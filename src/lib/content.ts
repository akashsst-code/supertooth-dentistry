/**
 * Practice content, centralized. Per docs/supertooth-build-principles.md
 * Section 2 ("Content is separable from presentation"), this is the one
 * place site copy/data lives — components read from here, not hardcoded
 * strings scattered through JSX. When a CMS decision gets made (see the
 * open follow-up in docs/supertooth-platform-pivot.md), this file is what
 * gets replaced by CMS fetches, without touching component code.
 *
 * `real: true` fields are sourced from the locked docs (practice name,
 * "Queen Anne" location, Dr. Archana, service differentiators). Everything
 * else is `real: false` and MUST render through <Placeholder> until Akash
 * supplies the real value — see the content checklist in
 * docs/supertooth-priority-dimensions.md ("Website Build — Content Needed").
 */

export const practice = {
  name: "Super Tooth Dentistry",
  neighborhood: "Queen Anne",
  city: "Seattle",
  headline: "Your long-term dentist in Queen Anne",
};

export const contact = {
  phone: "(206) 555-0148", // placeholder — real number needed
  address: "Street address, Queen Anne, Seattle WA", // placeholder
  parkingNote: "Parking / transit note", // placeholder
};

export const hours = [
  { days: "Mon–Thu", time: "hours" }, // placeholder
  { days: "Fri", time: "hours" }, // placeholder
];

export const differentiators = [
  { title: "Same-day appointments", detail: "Real availability, not a form-and-wait." },
  { title: "Same-day crowns", detail: "In-house technology, no second visit." },
  { title: "In-network with most plans", detail: "We handle the insurance paperwork." },
];

/**
 * Deeper, one-level-down elaboration of the three differentiators above,
 * for the /services page. Per the JTBD analysis behind that page: patients
 * clicking through from the homepage badge are looking for proof, not the
 * same one-line claim repeated — so each entry here expands with concrete,
 * already-real capability detail rather than new/unverified specifics
 * (no invented turnaround times, machine brand names, or guarantees).
 */
export const serviceHighlights = [
  {
    title: "Same-day crowns",
    summary: "In-house technology, no second visit.",
    explainer:
      "A traditional crown usually means a temporary crown, a second appointment weeks later, and a second round of numbing. Our in-house technology designs and fits your permanent crown in one visit instead.",
    points: [
      "Digital scan — no messy impression material",
      "Crown designed and fitted the same day",
      "No temporary crown, no second appointment",
    ],
  },
  {
    title: "Same-day appointments",
    summary: "Real availability, not a form-and-wait.",
    explainer:
      "Chipped a tooth before a big meeting, or dealing with pain that won't wait for next week? We hold same-day slots for exactly that — call and we'll do our best to get you in today, not a form that gets a reply tomorrow.",
    points: [
      "Call first for same-day requests — no waiting on a web form",
      "Slots held for urgent same-day needs",
      "Prefer to plan ahead? Routine care can still be scheduled in advance",
    ],
  },
  {
    title: "In-network with most plans",
    summary: "We handle the insurance paperwork.",
    explainer:
      "We're in-network with most major plans, and we handle the claims paperwork on our end so you're not stuck on hold with your insurer. Don't see your plan below? Call us — we'll verify your coverage before you book.",
    points: [],
  },
];

/**
 * Direct Q&A pairs — AEO-ready structure per the locked Build Constraint
 * in docs/supertooth-priority-dimensions.md ("FAQ blocks written as direct
 * Q&A pairs, not buried in prose"). Answers stay within already-established
 * real claims (see serviceHighlights/differentiators above) or the same
 * deliberately-qualified language already used in BookingBlock.tsx for
 * same-day availability, since promising guaranteed availability would be
 * an unverifiable claim.
 */
export const serviceFaqs = [
  {
    q: "Do you offer same-day crowns?",
    a: "Yes — we use in-house crown technology, so most crowns are designed and fitted in a single visit, without a temporary crown or a second appointment.",
  },
  {
    q: "Can I get a same-day appointment?",
    a: "Call us and we'll do our best to fit you in the same day, especially for pain or a broken or chipped tooth. Same-day slots are often available, though we can't guarantee availability for every request.",
  },
  {
    q: "Are you in-network with my insurance plan?",
    a: "We're in-network with most major plans — see the list below. Don't see your plan? Call us and we'll verify your coverage before you book.",
  },
  {
    q: "What makes Super Tooth different from other dentists in Queen Anne?",
    a: "Same-day crowns without a second appointment, real same-day availability instead of a form-and-wait, and in-network billing we handle for you — all from one long-term dentist, not a rotating cast of providers.",
  },
];

export const reviews = {
  rating: "4.9", // unconfirmed per prior Webflow-build audit — verify before launch
  count: "487", // unconfirmed per prior Webflow-build audit — verify before launch
};

export const offers = {
  newPatient: "$149 new-patient offer (exam + cleaning + x-rays)", // unconfirmed, verify before launch
  invisalign: "$500 off Invisalign", // unconfirmed, verify before launch
};

export const insuranceCarriers = [
  "Carrier 1",
  "Carrier 2",
  "Carrier 3",
  "Carrier 4",
]; // all placeholder — real accepted-plan list needed

export const team = [
  { name: "Dr. Archana", role: "Dentist, Practice Owner", real: true, photo: "/team/archana.webp" },
  { name: "Hygienist name", role: "Hygienist", real: false },
  { name: "Hygienist name", role: "Hygienist", real: false },
  { name: "Staff name", role: "Front Desk", real: false },
];

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insurance & New Patients", href: "/insurance-new-patients" },
  { label: "Contact", href: "/contact" },
];
