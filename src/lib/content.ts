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
  // Main line, full address, and hours below are real — sourced from the
  // practice's existing site (gray-rail-265889.hostingersite.com), the
  // same source already trusted for Dr. Archana's bio (see `archana`
  // below and docs/supertooth-webflow-build-spec.md Status section).
  phone: "(206) 687-7571",
  address: "133 Queen Anne Ave N, Suite A, Seattle, WA 98109",
  // Akash's exact wording (given directly in chat), not scraped.
  parkingNote: "Bus stop on the same block. Street parking available on nearby streets.",
};

export const hours = [
  { days: "Tue–Fri", time: "7:00 AM – 4:30 PM" },
  { days: "Sat–Mon", time: "Closed" },
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

// Each offer is one line of text + a half-card photo (per Akash's
// "half page picture and 1 line text offer" call). Offer text is still
// unconfirmed pricing, so it renders through <Placeholder>. Images are
// stock photos pulled from Unsplash as a temporary stand-in ("bring from
// internet for now, i'll change later" — Akash) — swap `image.src` for
// real practice photography once available, same pattern as `services`
// above.
export const offers = {
  newPatient: {
    text: "$149 new-patient offer — exam, cleaning, and x-rays included.",
    image: {
      src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      alt: "Dentist examining a patient's smile",
    },
  },
  invisalign: {
    text: "$500 off Invisalign clear aligners.",
    image: {
      src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
      alt: "Clear aligner tray held up against a smile",
    },
  },
}; // pricing unconfirmed, verify before launch

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

// Hero photo carousel — replaces the single "video-styled" hero photo
// (previously ClinicVideo.tsx, now HeroCarousel.tsx) with a rotating set
// of real photos so the hero reads as "this is a real team and a real
// place," not just the lead dentist. Source photos supplied by Akash
// 2026-08-23. archana.webp is the same portrait the hero already used —
// kept first so the opening frame is unchanged.
//
// Only Dr. Archana Dubey is a confirmed identity here: her named photos
// elsewhere in this file (archana.webp / archana-profile.jpg) both show
// "Archana Dubey" embroidered on her coat, which is how the candid
// portrait below was matched to her, not a guess. The other people
// pictured don't have confirmed names/roles yet — same gap as the
// "Hygienist name" / "Staff name" placeholders in `team` below — so
// their `alt` text describes the moment/role instead of inventing an
// identity (would violate the no-unverifiable-claims rule in
// docs/supertooth-build-principles.md Section 8). Update once Akash
// confirms real names. No visible caption in the carousel itself
// (Akash's call — see HeroCarousel.tsx) so `alt` is the only place
// these distinctions need to live now.
export const heroPhotos = [
  { src: "/team/archana.webp", alt: "Dr. Archana Dubey at Super Tooth Dentistry" },
  { src: "/team/team-group.jpg", alt: "The Super Tooth Dentistry team together in the office" },
  { src: "/team/front-desk.jpg", alt: "A team member at the front desk" },
  { src: "/team/archana-candid.jpg", alt: "Dr. Archana Dubey in the office" },
  { src: "/team/team-itero-scan.jpg", alt: "Reviewing a digital scan on-screen" },
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
// differentiators above); the description text for cosmetic/restorative
// is still a structural placeholder pending Akash's confirmed service
// list (build-spec Section 8) even though the photos backing them are
// now real.
//
// `image` is real marketing photography Akash supplied directly
// (same-day onlay before/after, implant x-ray before/after, in-office
// Zoom whitening before/after) — matched by content to the closest of
// the 4 categories (same-day onlay -> same-day crowns; implant ->
// restorative care; whitening -> cosmetic dentistry). No photo was
// supplied for general/preventive care, so that card uses a temporary
// Unsplash stand-in instead (per Akash's "bring images where we don't
// have" call) — swap for real photography later, same as the other 3;
// ServicesSection.tsx's icon-tile fallback still exists for any future
// service entry that ships with no `image` at all.
//
// The 3 supplied files are full Instagram-post-style graphics (a big
// title, our own logo, a brand/product badge, all above the actual
// before/after photos) — cropping those into a small `aspect-[4/5]`
// card via `object-cover` read as "elongated"/unnatural (Akash) since
// it either cut the photos off mid-frame or squeezed a whole poster
// into a thumbnail. `*-crop.jpg` variants below are cropped to just the
// labeled before/after photos (title/logo/badge removed) — same source
// photography, not new/different images. `width`/`height` are set so
// ServicesSection.tsx can render them at their natural aspect ratio
// instead of force-cropping again.
//
// Two other supplied images (Invisalign Gold Provider badge, Masseter
// Botox before/after) don't map to any of these 4 categories and aren't
// used here — worth a follow-up on where those belong (e.g. Botox next
// to Dr. Archana's "Certified Botox Provider" credential, Invisalign
// alongside the existing $500-off offer).
export const services = [
  {
    title: "General & preventive care",
    detail: "Cleanings, exams, and same-day appointments when you need them.",
    real: true,
    // No real photo supplied yet for this category (see comment above) —
    // temporary Unsplash stand-in per Akash's "bring images where we
    // don't have" call, same pattern as the NewPatientOffersBlock photos.
    // Swap for real practice photography once available.
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      alt: "Dental cleaning and checkup",
    },
  },
  {
    title: "Same-day crowns",
    detail: "In-house technology — no second visit, no temporary crown.",
    real: true,
    image: {
      src: "/services/same-day-crown-onlay-crop.jpg",
      alt: "Same-day onlay, before and after",
      width: 1320,
      height: 730,
    },
  },
  {
    title: "Cosmetic dentistry",
    detail: "Veneers, whitening, and smile design.",
    real: false,
    image: {
      src: "/services/teeth-whitening-crop.jpg",
      alt: "In-office Zoom teeth whitening, before and after",
      width: 1200,
      height: 1137,
    },
  },
  {
    title: "Restorative care",
    detail: "Crowns, bridges, and implant restorations.",
    real: false,
    image: {
      src: "/services/implant-dentistry-crop.jpg",
      alt: "Dental implant, before and after x-ray",
      width: 1251,
      height: 670,
    },
  },
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
