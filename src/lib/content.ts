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
 * (InsuranceOfferBlock, the /services carrier chips) — this is a
 * presentation-only abbreviation for one tight space, not a separate
 * source of truth.
 */
export const insuranceCarriersHeroTeaser = ["Delta", "Premera", "Aetna"];

// Dr. Archana Dubey's real bio and credentials — supplied by Akash
// 2026-08-23, resolves the "Dr. Archana bio" content blocker in
// docs/supertooth-webflow-build-spec.md Section 8. `real: true` per the
// same convention as team[0]/archana.webp above. Sourced from the
// practice's existing site (gray-rail-265889.hostingersite.com and its
// /about-us/ page, per Akash) — that site has no personal-life/hobby
// content beyond her professional passion and philosophy, so this
// doesn't invent any (would violate the no-unverifiable-claims rule in
// docs/supertooth-build-principles.md Section 8). Photo is a real,
// candid shot (at an ADA event, badge visible) rather than a posed
// studio headshot — swapped in for the Trust block specifically because
// it reads as more human/trustworthy at large size; the original
// studio headshot (archana.webp) stays as-is for the Hero video panel
// and team grid.
export const archana = {
  name: "Dr. Archana Dubey, DDS, MDS",
  tagline: "Experienced care. Personalized smiles.",
  photo: "/team/archana-profile.jpg",
  quote:
    "My philosophy is to combine the precision of modern dental science with the warmth of human care, enhancing every smile with thoughtful, personalized treatment.",
  bio: "Dr. Dubey discovered her passion for dentistry in 2007 and has been practicing since 2012, with a DDS from the University of Colorado and a Master's in Prosthodontics from India. She specializes in esthetic and restorative dentistry — implants, crowns, veneers, smile design, and implant-supported dentures — and is especially passionate about creating joyful dental experiences for patients of every age, from children to seniors.",
  badges: ["15+ years experience", "University of Colorado", "Invisalign certified"],
  certifications:
    "Certified Invisalign Provider · Certified Botox Provider · Nationally recognized scientific research",
};

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
