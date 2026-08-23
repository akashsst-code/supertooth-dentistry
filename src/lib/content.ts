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
  address: "133 Queen Anne Ave N, Seattle", // real — confirmed by Akash; state omitted, not needed for local patients
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

export const reviews = {
  rating: "4.9", // unconfirmed per prior Webflow-build audit — verify before launch
  count: "487", // unconfirmed per prior Webflow-build audit — verify before launch
};

export const offers = {
  newPatient: "$149 new-patient offer (exam + cleaning + x-rays)", // unconfirmed, verify before launch
  invisalign: "$500 off Invisalign", // unconfirmed, verify before launch
};

export const insuranceCarriers = [
  "Delta Dental",
  "Premera Blue Cross",
  "Aetna",
  "Cigna",
  "Guardian",
  "Humana",
]; // named per Akash in chat as examples of majors to feature — still
// unconfirmed against the practice's actual current network status, so
// these render through <Placeholder> until confirmed, same as offers/
// reviews above. Real accepted-plan list still needed before launch.

// Real office photography — supplied by Akash 2026-08-23, replaces the
// placeholder tiles that previously stood in for this section (Section 8
// content blocker in docs/supertooth-webflow-build-spec.md). `real: true`
// per the same convention as team[0]/archana.webp above.
export const officePhotos = [
  { src: "/office/office-1.webp", alt: "Front desk and reception area" },
  { src: "/office/office-2.webp", alt: "Treatment room with dental chair and equipment" },
  { src: "/office/office-3.webp", alt: "Hallway inside the practice" },
  { src: "/office/office-4.jpg", alt: "Framed art near a treatment room entrance" },
  { src: "/office/office-5.jpg", alt: "Waiting area seating" },
];

/**
 * Short-name teaser for the hero's one-line trust strip specifically —
 * "Delta Dental, Premera Blue Cross, Aetna" doesn't fit one line on a
 * phone alongside the "In-network:" label and "+ more", so this trims
 * to the colloquial short names Akash used in chat. Full/proper names
 * still live in insuranceCarriers above for every other section
 * (InsuranceBlock, the /services carrier chips) — this is a
 * presentation-only abbreviation for one tight space, not a separate
 * source of truth.
 */
export const insuranceCarriersHeroTeaser = ["Delta", "Premera", "Aetna"];

export const team = [
  { name: "Dr. Archana", role: "Dentist, Practice Owner", real: true, photo: "/team/archana.webp" },
  { name: "Hygienist name", role: "Hygienist", real: false },
  { name: "Hygienist name", role: "Hygienist", real: false },
  { name: "Staff name", role: "Front Desk", real: false },
]; // no longer rendered on the homepage (moved off per Akash's call, see
// TrustBlock.tsx) — kept here for the future dedicated /about page in
// docs/supertooth-webflow-build-spec.md Section 2.

// Brief "about our office" copy for the homepage, directly under the
// office-photo carousel — Akash's explicit placement call. Tone copy
// (like the hero/Archana-bio copy), not a factual claim needing
// Placeholder treatment; only references already-real differentiators
// (same-day crowns) rather than unconfirmed physical specifics.
export const officeBlurb =
  "Step inside and it feels less like a dental office and more like a quiet reset — comfortable treatment rooms, same-day crown technology on-site, and a team that walks you through every step before it happens.";

// "What patients are saying" — real Google rating/count already exist
// above (reviews). These quote slots are structural placeholders only:
// real patient testimonials cannot be invented (HIPAA / no-unverifiable-
// claims, docs/supertooth-webflow-build-spec.md Section 7) — render each
// through <Placeholder> until Akash supplies real reviews in first-name +
// last-initial format.
export const testimonials = [
  { quote: "Patient quote pending — pull a top review from the Google Business Profile", name: "First L." },
  { quote: "Patient quote pending — pull a top review from the Google Business Profile", name: "First L." },
  { quote: "Patient quote pending — pull a top review from the Google Business Profile", name: "First L." },
];

// Dr. Archana's professional affiliations/certifications — distinct from
// the archana.badges credential chips above (those are already-confirmed
// bio facts). Rendered inside her bio card in TrustBlock ("training &
// affiliations along with her bio space" — Akash), not a standalone
// section. Real org names not yet confirmed, so every entry is a
// placeholder pending Akash.
export const credentials = [
  "Professional association membership — pending confirmation",
  "Professional association membership — pending confirmation",
  "Continuing-education / certification — pending confirmation",
];

// Homepage services teaser — trimmed to exactly 4 per Akash's call to
// match smilemakersfortworth.com's 4-big-item pattern. Same-day crowns
// and same-day appointments are already-locked real differentiators (see
// differentiators above); the rest are common general-dentistry
// categories used as a structural placeholder until Akash confirms the
// practice's actual service list (still an open content item, build-spec
// Section 8).
export const services = [
  {
    title: "General & preventive care",
    detail: "Cleanings, exams, and same-day appointments when you need them.",
    real: true,
  },
  {
    title: "Same-day crowns",
    detail: "In-house technology — no second visit, no temporary crown.",
    real: true,
  },
  { title: "Cosmetic dentistry", detail: "Veneers, whitening, and smile design.", real: false },
  { title: "Restorative care", detail: "Crowns, bridges, and implant restorations.", real: false },
];

// Neighborhoods served, for the map section — modeled on
// smilemakersfortworth.com's "Proudly Serving Fort Worth & Surrounding
// Areas" pattern. Only the practice's own neighborhood is confirmed real;
// the rest are plausible-by-proximity Seattle neighborhoods, held as
// placeholders until Akash confirms the actual service-area list (an
// unverifiable-claims risk per build-spec Section 7 if stated as fact).
export const serviceAreas = [
  practice.neighborhood, // real
  "Magnolia",
  "Belltown",
  "South Lake Union",
  "Fremont",
  "Ballard",
];

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insurance & New Patients", href: "/insurance-new-patients" },
  { label: "Contact", href: "/contact" },
];
