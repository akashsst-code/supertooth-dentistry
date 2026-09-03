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

/**
 * Copy for the editorial mobile-hero variation only (EditorialHero.tsx,
 * spec'd in docs/supertooth-mobile-design-spec.md). `practice.headline`
 * above is untouched and still drives the existing hero and every other
 * surface — this is a parallel option for Akash to compare, not a
 * replacement of the locked string.
 *
 * The spec caps a headline at 3–7 words and the support line at one
 * sentence, and bans urgency/superlative language; these are its own
 * recommended examples. `accent` is the single word that gets the serif
 * italic treatment, so the split lives here rather than as markup
 * hardcoded in the component. No claim here needs verification — it's
 * positioning language, not a fact about pricing, insurance, or
 * availability.
 */
export const editorialHero = {
  // Split into explicit lines rather than left to wrap: the spec names
  // "Dental visits, / made better." as the preferred mobile break and
  // says to control it at the component level if needed, which it is —
  // relying on a max-width to force it re-broke to "Dental visits, made
  // / better." as soon as the type scale changed, orphaning the accent
  // word on its own line.
  headlineLine1: "Dental visits,",
  headlineLine2Lead: "made",
  headlineAccent: "better",
  support: "Modern care in Queen Anne.",
  cta: "Book a visit",
  image: {
    src: "/office/office-2.webp",
    alt: "Sunlit treatment room at Super Tooth Dentistry in Queen Anne",
  },
};

// Backlog item 4 — canonical domain for metadataBase, LocalBusiness schema
// and sitemap.ts. Not independently confirmed with Akash: this is the
// practice's real existing domain (cited elsewhere in this file and in
// docs/supertooth-webflow-build-spec.md as the source for FAQ content),
// and per docs/supertooth-platform-pivot.md this Next.js build is what
// replaces that site — so it's the only domain this project is actually
// headed toward, not a guess. Flag if production ends up going live
// somewhere else.
export const siteUrl = "https://www.supertoothdentistry.com";

export const contact = {
  // Backlog item 3 — the practice's source site showed two conflicting
  // numbers, (206) 593-3131 and (206) 687-7571 (docs/supertooth-
  // webflow-build-spec.md Status section, docs/supertooth-patient-
  // needs-research.md). Akash confirmed (206) 593-3131 is correct
  // 2026-09-01, matching the live Google Business Profile listing
  // checked directly (same 593-3131 number, same address) — one number,
  // everywhere, matching GBP per the NAP-consistency requirement.
  phone: "(206) 593-3131",
  address: "133 Queen Anne Ave N, Suite A, Seattle, WA 98109",
  // Akash's exact wording (given directly in chat), not scraped.
  parkingNote: "Bus stop on the same block. Street parking available on nearby streets.",
  // Real embed src from Google Maps' own Share -> "Embed a map", grabbed
  // by Akash directly against the practice's actual Business Profile
  // listing (searched by name, so it's place-linked via place_id, not a
  // bare address geocode). This is Google's lightweight embed made for
  // iframes — unlike the informal `/maps?q=...&output=embed` trick this
  // replaced, it has no "open in Maps app" chip, loads lighter (fixes
  // the slow Safari load), and clicking the marker shows Google's real
  // place card (name, rating, reviews) since it resolves to the actual
  // listing. Re-grab this the same way if the office ever moves.
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.3360303923164!2d-122.35969792320054!3d47.61959897119115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549015452bd2ce89%3A0x924ad9078701e7fa!2sSupertooth%20Dentistry!5e0!3m2!1sen!2sus!4v1788069595923!5m2!1sen!2sus",
};

// Item 59 — a plain https://www.google.com/maps/search/?api=1&query=... link,
// per Google's own "Maps URLs" documentation. Deliberately separate from
// mapEmbedSrc above: the embed stays sandboxed against navigating away
// (Akash's locked call to keep visitors on-page), and this is instead a
// real, additional anchor rendered outside the iframe — the one thing the
// sandboxed embed can never provide, a one-tap handoff to the visitor's
// own installed maps app for turn-by-turn directions.
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

export const hours = [
  { days: "Tuesday – Friday", time: "7:00 AM – 4:30 PM" },
  { days: "Saturday – Monday", time: "Closed" },
];

// Same hours, one row per day (Akash, 2026-09-03: "expand each date
// Tuesday, wednesday, thursday, friday"). DERIVED from `hours` above
// rather than typed out a second time — the ranges stay the single
// source of truth, so this cannot drift from them or from the
// OpeningHoursSpecification in layout.tsx that reads the same array,
// and expanding a stated range into its days states nothing new.
//
// Week starts Tuesday because that is where the practice's own week
// starts; the order falls out of walking each range in `hours`, so
// Saturday/Sunday/Monday land last, closed.
const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const hoursByDay = hours.flatMap(({ days, time }) => {
  const [start, end] = days.split("–").map((d) => d.trim());
  const startIdx = WEEK.indexOf(start);
  const endIdx = WEEK.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [{ day: days, time }];
  const out: { day: string; time: string }[] = [];
  for (let i = startIdx; i !== endIdx; i = (i + 1) % WEEK.length) {
    out.push({ day: WEEK[i], time });
  }
  out.push({ day: WEEK[endIdx], time });
  return out;
});

// `image` on each entry backs the mobile photo-card treatment in
// TrustBlock (2026-08-29 declutter pass — the old icon-only cards read as
// empty/no-visuals on mobile). Reuses real photography already sourced
// elsewhere in this file rather than adding new stock images: office-1
// (reception, already in officePhotos), the same-day-crown before/after
// (already in services), and front-desk.jpg (already in heroPhotos) —
// same photos, no new content-sourcing dependency.
// `expandedNote` backs the tap-to-expand panel each differentiator card
// opens to (see ExpandCard in InsuranceExpandCard.tsx) — one sentence
// expanding on the already-real `detail` line above it, not a new claim:
// same capability, same tone as `detail`/`officeBlurb`, deliberately
// free of specific promises (no time windows, no "guaranteed") per the
// no-unverifiable-claims rule. "In-network" doesn't need one — its
// expanded panel is the real carrier list instead.
// Backlog items 62 and 64 (2026-09-03 homepage review, WI-06/WI-07).
// Two changes, both Akash's:
//
// 1. "Same-day appointments" is GONE. He called the claim inaccurate in
//    the review — same-day CROWNS were confirmed and kept, and the two
//    must never be conflated. Nothing softer replaced it: item 62's rule
//    is that an unconfirmed time promise is dropped rather than hedged,
//    and "instant online booking" can't stand in for it while item 15
//    (Tab32) is still blocked. The same promise was swept out of
//    `services`, BookingBlock and the emergency FAQ answer in the same
//    pass so the site doesn't contradict itself.
// 2. In-network leads, because most patients here are insurance-driven
//    (his stated rationale), with the modern/digital experience second.
//
// The review named seven rows. Only these three are shippable today —
// the other four (verified Botox qualification, a verified convenience
// benefit, care/skill/choice, downtown location) all need answers from
// item 63, which is blocked, and item 64's own rule is that every row
// traces to a verified fact. Three real rows beat seven padded ones.
//
// The modern/digital row claims nothing new: digital scanning and
// in-house milling are already published in `services` (real: true) and
// are the same capability the same-day-crown row rests on.
export const differentiators = [
  {
    title: "In-network with most plans",
    detail: "We handle the insurance paperwork.",
    image: { src: "/team/front-desk.jpg", alt: "A team member at the front desk" },
  },
  {
    title: "Modern, digital dentistry",
    detail: "Digital scans, designed and milled in-house.",
    image: { src: "/team/team-itero-scan.jpg", alt: "A team member reviewing a digital scan on-screen" },
    expandedNote:
      "Your teeth are scanned digitally rather than pressed into a tray of putty, and that scan is what the crown is designed from — the same file from the first appointment to the finished tooth.",
  },
  {
    title: "Same-day crowns",
    detail: "In-house technology, no second visit.",
    image: { src: "/services/same-day-crown-onlay-crop.jpg", alt: "Same-day crown, milled in-office" },
    expandedNote:
      "Crowns are designed and milled right here in one visit — no impressions sent to an outside lab, no temporary crown, no second appointment.",
  },
];

// Backlog item 13 — checked directly against the live Google Business
// Profile ("Supertooth Dentistry", 133 Queen Anne Ave N Unit A) on
// 2026-09-01. Rating matched the prior placeholder exactly; count did
// not (487 -> 427) and is corrected here. Item 20 (API-fed live rating)
// still applies for keeping this in sync going forward — this is a
// manual point-in-time verification, not a live feed.
export const reviews = {
  rating: "4.9",
  count: "427",
};

// Each offer is one line of text + a half-card photo (per Akash's
// "half page picture and 1 line text offer" call). Pricing confirmed
// accurate and current by Akash 2026-09-02 (item 6) — no longer
// Placeholder-wrapped. Images are stock photos pulled from Unsplash as a
// temporary stand-in ("bring from internet for now, i'll change later"
// — Akash) — swap `image.src` for real practice photography once
// available (tracked as backlog item 60), same pattern as `services`
// above.
export const offers = {
  newPatient: {
    label: "New patients",
    text: "$149 new-patient offer — exam, cleaning, and x-rays included.",
    image: {
      src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      alt: "Dentist examining a patient's smile",
    },
  },
  invisalign: {
    label: "Invisalign",
    text: "$500 off Invisalign clear aligners.",
    image: {
      src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
      alt: "Clear aligner tray held up against a smile",
    },
  },
};

export const insuranceCarriers = [
  "Delta Dental",
  "Premera Blue Cross",
  "Aetna",
  "Cigna",
  "Guardian",
  "Humana",
]; // named per Akash in chat as examples of majors to feature — confirmed
// accurate against the practice's current network status by Akash
// 2026-09-02 (item 2), no longer Placeholder-wrapped.

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
// 2026-08-23; reordered and extended 2026-08-29 per Akash's feedback
// that the doctor wasn't reading as prominent enough. Fixed order now
// (see HeroCarousel.tsx — no more random start index): opens and closes
// on Dr. Archana so she's never more than 2 slides away, with the
// team/staff photos grouped in the middle rather than scattered — "keep
// the doc in focus" while still showing the office isn't a one-person
// operation. archana-profile.jpg (previously only used in TrustBlock's
// bio card) and archana-candid-outdoor.jpg (new photo Akash supplied
// 2026-08-29) are both added here for that reason.
//
// archana-candid-crop.jpg is a tighter crop of archana-candid.jpg (same
// source photo, original kept as-is) — the uncropped version left her
// small in frame next to a large floor lamp; cropping out most of the
// lamp on the left brings her to the visual center per Akash's "zoom in
// on the doctor" follow-up.
//
// No real patient photos exist yet to satisfy the "show patients" half
// of that feedback — HIPAA/no-unverifiable-claims rules out staging or
// mislabeling a staff member as a patient, so this still only rotates
// through confirmed staff. Revisit once real, consented patient photos
// exist.
//
// Only Dr. Archana Dubey is a confirmed identity here: her named photos
// elsewhere in this file (archana.webp / archana-profile.jpg) both show
// "Archana Dubey" embroidered on her coat, which is how the candid
// portraits below were matched to her, not a guess. The other people
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
  { src: "/team/archana-candid-crop.jpg", alt: "Dr. Archana Dubey in the office" },
  { src: "/team/archana-candid-outdoor.jpg", alt: "Dr. Archana Dubey" },
  { src: "/team/team-group.jpg", alt: "The Super Tooth Dentistry team together in the office" },
  { src: "/team/front-desk.jpg", alt: "A team member at the front desk" },
  { src: "/team/team-itero-scan.jpg", alt: "A team member reviewing a digital scan on-screen" },
  { src: "/team/archana-profile.jpg", alt: "Dr. Archana Dubey, DDS, MDS" },
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
// Placeholder treatment.
//
// Backlog item 67 (2026-09-03 review, WI-09): the opening line stays,
// shortened; the equipment list that followed it ("comfortable
// treatment rooms, same-day crown technology on-site") is gone. That
// was the one place on the homepage that could say what the practice
// believes, spent on a capability already claimed twice above it.
//
// What replaces it is RETRIEVED, not written: "Care. Skill. Choice." is
// the practice's own values framing on its live site
// (www.supertoothdentistry.com, read 2026-09-03), down to the phrases
// used here — "the highest quality dental care available" (Care),
// treatment completed "with the utmost skill", "as gentle, yet as
// effective, as possible" (Skill), and working with you "every step of
// the way in order to make the best choices" (Choice). Same trust tier
// as the FAQ content and Dr. Dubey's bio, both of which are sourced
// from that site. The item's own instruction was to retrieve the
// language rather than improve it, so the three words lead the sentence
// unchanged and the compression is in the connective tissue only.
export const officeBlurb =
  "Step inside and it feels less like a dental office and more like a quiet reset. Care, skill and choice are what we promise: the highest quality dental care we can give, treatment carried out as gently as it can be while still being effective, and a team that works with you at every step so the choices stay yours.";

// "What patients are saying" — backlog item 13. Real Google rating/count
// already exist above (reviews). These five are the top reviews pulled
// directly from the live Google Business Profile ("Supertooth Dentistry",
// 133 Queen Anne Ave N Unit A) — the first three on 2026-09-01, two more
// added the same day at Akash's request — all 5-star (verified per-review
// against the star-fill markup, not just assumed from the aggregate).
// Reviewer names are redacted to first-name + last-initial per the HIPAA
// attribution rule (docs/supertooth-webflow-build-spec.md Section 7) —
// same format this field already used as its placeholder. Quotes are
// either used in full (Dawn B., Karthik B. had no Google truncation) or
// trimmed to the last complete sentence available before Google's own
// "... More" truncation point — wording within that trim is verbatim,
// nothing paraphrased or invented. Item 20 (API-fed live reviews)
// supersedes this with a live feed later; this is a manual point-in-time
// pull.
// `meta` and `postedAt` are the reviewer's real "Local Guide · N reviews"
// line and the review's real relative timestamp, straight off the GBP
// listing at the same pull — used by the Google-widget-style card variant
// (see TestimonialsSection.tsx) to read as authentically Google rather
// than a generic quote card. `initial` backs that variant's avatar circle
// (no real photo available, so a colored initial is the honest fallback
// real widgets also use for reviewers without a profile photo).
export const testimonials = [
  {
    quote:
      "I've always hated the dentist, but love coming to Supertooth Dentistry. Dr. Archana is sweet, knowledgeable and makes me feel comfortable. Her staff is wonderful too!",
    name: "Elise T.",
    initial: "E",
    meta: "Local Guide · 33 reviews",
    postedAt: "2 months ago",
  },
  {
    quote:
      "I had an excellent experience with Dr. Dubey and her team. I went in for a deep cleaning and later had to get a cavity filled. Dr. Dubey was very thorough and explained every step of the process, which helped ease my anxiety.",
    name: "Vandana S.",
    initial: "V",
    meta: "Local Guide · 123 reviews",
    postedAt: "a year ago",
  },
  {
    quote:
      "Supertooth is always kind, caring, thorough, and efficient. I've been going to there for 5+ years and have always had a good experience. The team has continuously gotten ahead of any dental issues I have before they became too problematic.",
    name: "Berri R.",
    initial: "B",
    meta: "Local Guide · 34 reviews",
    postedAt: "10 months ago",
  },
  {
    quote:
      "I never thought I'd say this, but I now love going to the dentist. Supertooth in Queen Anne feels like walking into a friend's house, warm, welcoming, and genuinely caring. The team is fantastic, the space is beautiful, and the care is excellent. Couldn't recommend them more.",
    name: "Dawn B.",
    initial: "D",
    meta: "6 reviews",
    postedAt: "8 months ago",
  },
  {
    quote:
      "Dr. Archana Dubey is one of the best dentists I've ever been to. She is incredibly patient, helpful, and friendly. I highly recommend her to anyone looking for a dentist who is genuinely considerate of your budget and transparent about all costs. She takes the time to ensure you understand everything, which I really appreciated.",
    name: "Karthik B.",
    initial: "K",
    meta: "6 reviews",
    postedAt: "11 months ago",
  },
];

/**
 * Dr. Archana's credentials — experience/education, certifications/
 * training, and professional-association memberships — rendered as
 * compact grouped pills inside her bio card in TrustBlock ("training &
 * affiliations along with her bio space" — Akash), not a standalone
 * section. Real data supplied directly by Akash 2026-09-01 (replaces the
 * earlier `archana.badges`/`archana.certifications` flat-pill row and
 * the placeholder `credentials` list, both retired by this same change).
 *
 * `group` is what drives the compact layout Akash asked for ("pills ...
 * grouped with few items logically together" — a first pass as a tall
 * one-per-row medallion list read as too much space for what's
 * fundamentally a scan-and-move-on trust signal): 3 groups instead of a
 * flat list of 8, each rendered as its own labeled row of inline pills.
 * `icon`/`group` are presentation keys only (`icon` picks a glyph from
 * icons.tsx, `group` picks which labeled pill row) — the actual content
 * is `title`/`detail`.
 */
export type CredentialBadge = {
  icon: "star" | "graduationCap" | "aligner" | "syringe" | "badge" | "implant" | "shieldCheck";
  title: string;
  detail: string;
  group: "Experience & Education" | "Certifications & Training" | "Professional Memberships";
};

export const credentialBadges: CredentialBadge[] = [
  { icon: "star", title: "15+ Years Experience", detail: "Practicing dentistry since 2012", group: "Experience & Education" },
  { icon: "graduationCap", title: "DDS, University of Colorado", detail: "Doctor of Dental Surgery", group: "Experience & Education" },
  { icon: "aligner", title: "Certified Invisalign Provider", detail: "Clear aligner treatment", group: "Certifications & Training" },
  { icon: "aligner", title: "AACA Gold Status Provider", detail: "American Academy of Clear Aligners", group: "Certifications & Training" },
  // Title wording is Akash's own (2026-09-03): "AACE trained and
  // certified botox provider". Note the acronym differs from the
  // issuing body previously recorded here — this entry's `detail` read
  // "American Academy of Facial Esthetics (AAFE)". Rather than assert
  // an expansion that contradicts the title, `detail` states the
  // credential without naming an organisation until Akash confirms
  // which acronym is right; the AAFE attribution is preserved in this
  // comment so it can go straight back in if AAFE was correct.
  { icon: "syringe", title: "AACE Trained and Certified Botox Provider", detail: "Trained and certified in therapeutic and esthetic Botox", group: "Certifications & Training" },
  { icon: "implant", title: "Trained in Implant Dentistry", detail: "Implant placement & restoration", group: "Certifications & Training" },
  { icon: "badge", title: "Member, AGD", detail: "Academy of General Dentistry", group: "Professional Memberships" },
  { icon: "shieldCheck", title: "Member, ADA", detail: "American Dental Association", group: "Professional Memberships" },
];

// Homepage services teaser — trimmed to exactly 4 per Akash's call to
// match smilemakersfortworth.com's 4-big-item pattern.
//
// Round 4 (2026-09-01): Akash asked for the 4 tiles to render the same
// size (matching the "same-day crowns" card) and for patient-facing
// photography instead of the raw clinical shots ("don't show broken
// crowns"). The previous round's real marketing photography (same-day
// onlay, implant x-ray, in-office whitening before/afters) was Akash's
// own supplied clinical macro/x-ray photography — each cropped to a
// different natural size (1320x730 / 1251x670 / 1200x1137), which is
// why the tiles were uneven, and extreme macro intraoral shots and a raw
// implant x-ray read as clinical rather than reassuring to a patient
// audience. Swapped all 4 for tasteful, patient-facing stock photography
// in the same warm/modern tone as the general-preventive card already
// used — same Unsplash hotlink pattern as `offers` below, one shared
// `aspect-[4/3]` box in ServicesSection.tsx so every tile matches. The 3
// original clinical files still live in `public/services/` if real
// photography is preferred later; ServicesSection.tsx's icon-tile
// fallback still exists for any future service entry with no `image`.
//
// `real` for cosmetic dentistry and restorative care flipped from
// false -> true here: both are independently confirmed by Dr. Archana's
// already-real bio below (`archana.bio`, sourced from the practice's
// existing site) — "she specializes in esthetic and restorative
// dentistry — implants, crowns, veneers, smile design, and
// implant-supported dentures" covers every claim in both cards' detail
// text. Flag to Akash to confirm before launch in case that bio line
// doesn't fully match current in-house capability.
// ── Backlog items 65 and 66 — the "what we treat" rebuild ────────────
//
// The 2026-09-03 review asked for a fresh information architecture and
// fresh copy, not incremental editing, and left two questions open:
// whether restorative care is top-level or nested under general
// dentistry, and whether emergency care becomes a category. Akash
// delegated the call ("do market assessment research along with the
// blueprint categories and make a call, defensible"), so both are
// answered here from evidence rather than preference. Full reasoning
// lives on backlog item 65's decision record; in short:
//
// RESTORATIVE STAYS TOP-LEVEL, in patient language. Two of the three
// nearest competitors (queenannefamilydental.com,
// qasmiles.com) carry restorative as a peer of cosmetic rather than a
// child of general dentistry, and Dr. Dubey's own specialty is esthetic
// AND restorative work (MDS Prosthodontics) — filing it under "general"
// would bury the thing she is most qualified for. But the blueprint's
// vocabulary rule (§6: lead with the patient word, keep the clinical
// term as a subtitle) rules out the label peers use: patients say "my
// tooth broke" and "replace a missing tooth", not "restorative
// dentistry". Hence the plain title plus a `clinical` subtitle.
//
// EMERGENCY IS A SHORTCUT, NOT A CATEGORY. It was raised verbally in
// the review and dropped from the written list. /emergency already
// exists as a P0 safety page (item 7); a fifth catalogue card would
// duplicate safety-critical guidance in a second place, which is how
// the two drift apart. The blueprint's own services-overview spec
// (§"Services (overview)") calls for an "emergency shortcut" on this
// surface rather than a category — see `servicesEmergencyShortcut`.
//
// The review named a fifth category, "Botox for headaches/TMJ". It is
// deliberately NOT here: it is absent from the practice's own live site,
// and the only Botox claim anywhere in this repo is the credential row
// item 63 is currently blocked on verifying. One nearby practice
// (queenannefamilydental.com) does publish "TMJ Treatments and Botox",
// so the category is defensible in this market — it ships the day 63
// confirms the practice treats TMJ/headache patients, and not before.
//
// Sourcing for every line below: the practice's own live site
// (www.supertoothdentistry.com — comprehensive exams, periodontal
// therapy/cleaning, preventative care, fillings, crowns and bridges,
// root canals, extractions, implants, Invisalign, Opalescence
// whitening) and `archana.bio` (esthetic and restorative dentistry —
// implants, crowns, veneers, smile design, implant-supported dentures),
// which is the same trust tier the FAQ content already uses. Same-day
// crowns moves from its own top-level card to a sub-service of the
// repair door, exactly as the review proposed — the capability is
// unchanged and still leads the differentiator row above.
//
// Photography is untouched from the 2026-09-01 round (patient-facing
// stock, one shared aspect-[4/3] box); the Invisalign card reuses the
// aligner photo already used by `offers.invisalign`. Item 60 still
// covers swapping all of it for real practice photography.
export const services = [
  {
    title: "Checkups & cleanings",
    clinical: "General & preventive dentistry",
    detail: "The visit that keeps the other ones small — and anything we find gets explained before it's treated.",
    includes: ["Comprehensive exams", "X-rays", "Cleanings", "Gum (periodontal) care"],
    real: true,
    image: {
      src: "https://images.unsplash.com/photo-1663755489920-5e09f66d011a?auto=format&fit=crop&w=1200&q=80",
      alt: "Dentist and patient sharing a smile during a routine checkup",
    },
  },
  {
    title: "Fix a damaged or missing tooth",
    clinical: "Restorative dentistry",
    detail: "Chipped, cracked, worn down or missing — the work that gets a tooth back to chewing and looking like itself.",
    includes: [
      "Same-day crowns",
      "Fillings and bonding",
      "Root canals and extractions",
      "Bridges, dentures and implant restorations",
    ],
    real: true,
    image: {
      src: "https://images.unsplash.com/photo-1771442873035-474765b40ac6?auto=format&fit=crop&w=1200&q=80",
      alt: "Gloved hand holding a dental implant and crown model",
    },
  },
  {
    title: "Change how your smile looks",
    clinical: "Cosmetic dentistry",
    detail: "For the tooth you notice in every photograph. You'll see what's possible, and what it involves, before anything is decided.",
    includes: ["Veneers", "Teeth whitening", "Smile design"],
    real: true,
    image: {
      src: "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?auto=format&fit=crop&w=1200&q=80",
      alt: "Dentist consulting with a smiling patient about cosmetic treatment options",
    },
  },
  {
    title: "Straighten your teeth",
    clinical: "Orthodontics",
    detail: "Clear aligners you take out to eat and brush. A consultation tells you whether they'll work for your teeth.",
    includes: ["Invisalign clear aligners", "Fastbraces", "Consultation and treatment plan"],
    real: true,
    image: {
      src: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80",
      alt: "Clear aligner tray held up against a smile",
    },
  },
];

// The emergency shortcut that sits under the service cards rather than
// among them — see the reasoning above. It points at /emergency, which
// stays the single source for urgent guidance (backlog item 7).
export const servicesEmergencyShortcut = {
  text: "In pain, or broke a tooth right now?",
  linkLabel: "What to do in a dental emergency",
  href: "/emergency",
};

// Neighborhoods served, for the map section — modeled on
// smilemakersfortworth.com's "Proudly Serving Fort Worth & Surrounding
// Areas" pattern. Full list confirmed accurate by Akash 2026-09-02
// (item 2) — no longer a placeholder/unverifiable-claims risk.
export const serviceAreas = [
  practice.neighborhood, // real
  "Magnolia",
  "Belltown",
  "South Lake Union",
  "Fremont",
  "Ballard",
];

// Homepage FAQ — AEO/SEO-required per docs/supertooth-webflow-build-spec.md
// Section 7 ("FAQ content structured as direct Q&A pairs") and Section 2's
// service-page spec; landing it on the homepage first since /services and
// the other content pages (nav array below) aren't built yet, and a
// general-practice FAQ still serves the same AEO goal today. Sourced from
// the practice's own live site (www.supertoothdentistry.com's "frequently
// asked questions" section) — same trust tier as `contact`/`archana`
// above, which cite "the practice's existing site" as their source; this
// is that same site's current domain. Rewritten (not copy-pasted) into
// concise direct-answer form for AEO, and trimmed against the
// no-unverifiable-claims rule (build-principles Section 8):
//  - Dropped the site's stated 10% senior discount and its SMS privacy
//    policy blurb — neither could be re-verified word-for-word on a second
//    pass, and the SMS policy is a legal-disclosure item that belongs with
//    the "Privacy policy and required disclosures" launch checklist item
//    (build-spec Section 7), not an FAQ answer improvised from a summary.
//  - Dropped the specific new-patient/Invisalign offer amounts and
//    insurance carrier names here rather than repeating them a second
//    time — those already live in `offers`/`insuranceCarriers` above
//    (both confirmed real, item 6/2) at their one real display site;
//    this FAQ points to that section instead of restating the numbers.
//  - The emergency-visit answer deliberately doesn't hardcode a phone
//    number — the source site shows two different numbers for its
//    emergency line (see the dropped `contact.emergencyPhone` history,
//    build-spec Status section), which is exactly why that field was
//    removed from `contact` above. FAQSection.tsx interpolates the one
//    confirmed real number (`contact.phone`) instead, so there's a single
//    source of truth and no second, possibly-conflicting number.
//
// Parity pass (2026-09-02): the source site has 13 real FAQ items (plus
// an "SMS Privacy Policy" block that's a legal disclosure, not an FAQ —
// still correctly excluded here). This file originally ported 9; the
// remaining 4 (philosophy, new-patient offers, other forms, procedures)
// are added below, each still going through the same rewrite-and-trim
// pass as the original 9 rather than being copy-pasted. None of the four
// contain a link or image — Akash flagged the source site's insurance
// FAQ as an example of the pattern to avoid (an FAQ answer that hands the
// visitor off to another page instead of just answering), so every entry
// in this array stays self-contained plain text; "What procedures do you
// offer?" mentions the Services section by name instead of linking to it.
export const faqs = [
  {
    question: "What is Super Tooth's philosophy?",
    // Trimmed against the specific "10x lower radiation than conventional
    // x-rays" claim in the source site's answer — an unverifiable comparison
    // (build-principles Section 8), not a made-up substitute for it.
    answer:
      "Care, skill, and choice. We use modern, gentle techniques and take the time to walk you through your options so you can make the choice that's right for you.",
  },
  {
    question: "Do you accept my dental insurance?",
    answer:
      "We're in-network with most major dental insurance plans and handle the paperwork for you. We also offer financing through CareCredit, including promotional plans with no interest if paid in full within the promotional period, for any treatment cost insurance doesn't cover.",
  },
  {
    question: "Do you offer any new-patient offers?",
    // Deliberately no dollar amount here — see the file-level comment
    // above on why specific offer numbers stay out of the FAQ text.
    answer: "We periodically run new-patient offers — ask when you call or book, since current offers can change.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring your insurance card and a photo ID, and come ready to share your health history and any medications you're taking. We'll also have you fill out some brief new-patient paperwork when you arrive.",
  },
  {
    question: "What other forms will I need to fill out, and when?",
    answer:
      "At your first visit, we'll have you fill out new-patient paperwork covering your insurance and general health information — no need to fill anything out ahead of time.",
  },
  {
    question: "What happens during a comprehensive exam?",
    answer:
      "We review your dental history, do a thorough exam of your teeth, gums, and jaw, and walk you through any treatment options we find — so you leave with a clear picture of your oral health, not just a cleaning.",
  },
  {
    question: "What procedures do you offer?",
    // Self-contained on purpose — no link out, see file-level comment above.
    answer:
      "A full range of general, cosmetic, and restorative dental care, from cleanings and fillings to crowns, Invisalign, and implants. See Services on this site for the complete list.",
  },
  {
    question: "When should my child have their first dental visit?",
    answer:
      "We recommend bringing your child in for their first visit between ages 2 and 3, or sooner if you have questions about brushing, flossing, or habits like thumb-sucking.",
  },
  {
    question: "What sedation or pain-management options do you offer?",
    answer:
      "We use local anesthesia for all treatments to keep you comfortable. Let us know if you feel anxious about a procedure and we'll talk through what will help.",
  },
  {
    question: "How much will my treatment cost, and how does billing work?",
    answer:
      "Cost depends on the treatment, so after your exam we'll give you a detailed plan and cost estimate before any work begins. Payment is due at the time of service — we accept major credit cards, checks, cash, and offer financing through CareCredit, including promotional no-interest plans if paid in full within the promotional period.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We ask for at least 2 business days' notice if you need to cancel or reschedule, so we can offer that appointment time to another patient.",
  },
  {
    question: "What should I do if I have a dental emergency?",
    // Deliberately no phone number baked in here — see the file-level
    // comment above. FAQSection.tsx prepends the one confirmed real
    // number (`contact.phone`) when it renders this specific answer.
    // Item 62 sweep: this previously promised "in most cases we can
    // accommodate emergency visits the same day you call". That is a
    // time-bound availability promise of exactly the kind Akash called
    // inaccurate, so it is process-first here until item 63 confirms
    // what the practice actually delivers — at which point the stronger
    // wording goes straight back in.
    answer:
      "Call us right away and tell us what's happening — urgent problems come first, and we'll tell you the soonest we can see you.",
  },
  {
    question: "Do you have a referral program?",
    answer:
      "Yes — refer a friend or family member and we'll thank you with a $50 gift card or account credit once they complete their first visit.",
  },
];

// Backlog item 51 — plain-language benefits glossary. Five terms only
// (blueprint v2 §16 CD-5, sourced to HealthCare.gov and Oscar Health):
// each pairs a plain definition with what it means for the patient's
// bill, since a definition alone doesn't resolve the confusion — the
// cost consequence does. Deliberately no ACA metal-tier machinery;
// dental coverage doesn't have that shape. Rendered inline next to the
// coverage content on /insurance-new-patients, not a separate page.
export const benefitsGlossary = [
  {
    term: "Premium",
    definition: "The amount you or your employer pays to keep your dental plan active.",
    meaning: "This is paid whether or not you visit us — it doesn't change your bill for a specific treatment.",
  },
  {
    term: "Deductible",
    definition: "What you pay out of pocket before your plan starts covering costs.",
    meaning: "Until you've spent this much in a plan year, you're paying the full cost yourself.",
  },
  {
    term: "Copay",
    definition: "A fixed dollar amount you pay for a covered service, regardless of the total cost.",
    meaning: "You'll know this number in advance — it doesn't change based on what the visit actually costs.",
  },
  {
    term: "Coinsurance",
    definition: "Your share of a covered cost, shown as a percentage rather than a flat amount.",
    meaning: "The bill moves with the cost of treatment — a bigger procedure means a bigger share for you.",
  },
  {
    term: "Annual maximum",
    definition: "The most your plan will pay toward your dental care in a plan year.",
    meaning: "Once you hit this amount, you cover 100% of any further cost until the year resets.",
  },
];

// Backlog item 1 (2026-08-31): /services, /about and /insurance-new-patients
// 404'd — linked here with no page behind them. First pass removed the
// links; Akash's direct correction was to build the pages instead, so
// all three now have a real minimum-viable route (see src/app/services,
// src/app/about, src/app/insurance-new-patients) and the locked
// four-item nav is restored as originally specified. Every fact-bearing
// claim on those three pages either traces to a `real: true` field
// below or renders through <Placeholder> — none of this data changed
// to make the pages possible.
// docs/supertooth-navigation-requirements.md locks the four primary
// links (Services · About · Insurance & New Patients · Contact). "New-
// Patient Offers" is a deliberate fifth, added 2026-09-03 on Akash's
// call when the offers moved off the homepage — they need a route into
// them, and the menu is where he asked for it. Recorded as an amendment
// in the build-spec status, not a silent drift. Placed directly above
// Insurance & New Patients: the two are the same "before you book"
// errand, and offers is the shorter, more concrete of the pair.
//
// Labelled "Offers", not "New-Patient Offers", for a measured reason:
// Nav.tsx's own comment records the desktop row already crowding at
// 768–790px with four items ("Insurance & New Patients" wrapping to two
// lines). Measured at 790px, the long label made a second item wrap;
// "Offers" does not. The page's own title and H1 still say new-patient
// offers, so nothing is lost but the row width.
export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/offers" },
  { label: "Insurance & New Patients", href: "/insurance-new-patients" },
  { label: "Contact", href: "/contact" },
];

// Backlog item 16 — dental anxiety and comfort content, v1 minimum scope
// only (the v2 items — a concrete stop-signal beyond "gentle", naming a
// specific sedation type — are deliberately not included; they're policy
// claims that need Akash's confirmation first, per this item's own
// outOfScope note). Placed on /contact rather than the homepage strip
// the item originally sketched (Akash's call, 2026-09-03) — directly
// above AppointmentForm's optional "Additional details" field, since the
// item's own scope explicitly pairs this content with that field. The
// "about 1 in 5" figure is the peer-reviewed prevalence stat from this
// item's own evidence citation (docs/supertooth-patient-needs-research.md),
// not a claim about this practice specifically, so it doesn't need the
// same practice-capability verification pricing/insurance claims do.
export const anxietyNote =
  "Nervous about the dentist, or it's been a while since your last visit? You're not alone — about 1 in 5 adults feel the same way, and we won't make you feel bad about it. Let us know below and we'll make sure you're comfortable every step of the way.";

// Backlog item 7 — /emergency, v1 scope only (the v2 items in that
// backlog entry — a "what to have ready" checklist, NHS-style "when
// unsure, default up" framing — are deliberately not included here).
// Tier 1/2/3 structure and the specific first-aid actions are sourced
// from ADA MouthHealthy per that item's evidence citation; do not
// paraphrase loosely or add advice it doesn't support. `afterHours` is
// Akash's own confirmed after-hours reality (2026-09-01): call, or book
// online — no answering service, no voicemail-specific promise, and
// deliberately no response-time commitment (item 7 acceptance: "No
// invented response-time promise anywhere on the page").
export const emergencyGuidance = {
  tiers: [
    {
      tier: "911 or the ER",
      when: "Call 911 or go to the nearest emergency room right away if you have any of these:",
      symptoms: [
        "Swelling that is spreading to your neck or eye",
        "Fever along with facial swelling",
        "Trouble breathing or swallowing",
      ],
    },
    {
      tier: "Call us",
      when: "Call us as soon as you can for:",
      symptoms: [
        "A knocked-out, cracked, or broken tooth",
        "A lost filling or crown",
        "Dental pain",
        "Swelling without any of the red flags above",
      ],
    },
    {
      tier: "While you wait",
      when: "Until you're seen:",
      symptoms: [
        "Rinse gently with warm water",
        "Use a cold compress on any swelling",
        "Do not place aspirin or any other painkiller directly on the tooth or gum — it can burn the tissue",
      ],
    },
  ],
  afterHours:
    "If it's outside office hours, call us — or schedule your next available appointment online right now.",
  erNote:
    "An emergency room can treat pain and infection, but only a dentist can fix the underlying problem — plan to follow up with us as soon as you can.",
};

// Backlog item 12 — /privacy and /accessibility. Originally drafted
// `draft: true` since the item's own scope calls for text that's
// "practice-supplied or counsel-reviewed." Rewritten 2026-09-02 per
// Akash's direct instruction ("model, look at all competitors in market
// and find it") — informed by how real, comparable Seattle-area dental
// practices structure this page (e.g. seattledentalstudio.com's section
// order: collection, use, SMS/compliance, sharing, security, cookies,
// rights, third-party links, changes, contact) and the HHS model Notice
// of Privacy Practices' standard elements, rather than a generic
// boilerplate template. `draft: false` now that Akash has directed and
// reviewed this sourcing approach; still worth a counsel pass if the
// practice wants that extra assurance, but not a blocker to publishing.
//
// The SMS section is real, not hypothetical, as of this rewrite — Akash
// confirmed 2026-09-02 that the practice does send appointment texts,
// which is also why item 12's "if that changes" hedge from the prior
// draft is gone.
export const privacyPolicy = {
  draft: false,
  lastUpdated: "2026-09-02",
  sections: [
    {
      heading: "Information we collect",
      body: "When you request an appointment or contact us through this site, we collect the information you provide — name, phone number, email, and anything you tell us about the reason for your visit. We do not sell or rent this information to anyone.",
    },
    {
      heading: "How we use it",
      body: "We use your information to respond to your request, schedule and manage appointments, and communicate with you about your care. Health information you share with our clinical team is handled under our HIPAA Notice of Privacy Practices, available at our office — that notice, not this page, governs your protected health information; this page covers the website itself.",
    },
    {
      heading: "SMS / text messaging",
      body: "If you provide your mobile number, we may send appointment reminders and related messages by text. We only send these if you've opted in (by giving us your number for this purpose), message frequency depends on your upcoming appointments, and message-and-data rates may apply. Reply STOP at any time to stop receiving texts, or let us know by phone. We don't share your mobile number with third parties for their own marketing.",
    },
    {
      heading: "Sharing and disclosure",
      body: "We don't sell or rent your information. We share it only with the vendors that help us run this site and our practice (such as our booking and communications tools), and only as needed for them to provide that service to us — never for their own marketing.",
    },
    {
      heading: "Cookies and analytics",
      body: "This site may use basic, privacy-respecting analytics to understand which pages are useful to visitors. We do not use this data to identify you personally.",
    },
    {
      heading: "Your choices",
      body: "You can ask us what information we have about you, ask us to correct it, or ask us to delete it, by contacting us using the information below. This is separate from — and doesn't replace — the rights described in our HIPAA Notice of Privacy Practices for your health records specifically.",
    },
    {
      heading: "Changes to this policy",
      body: "If we make a material change to how we handle your information, we'll update this page and its \"last updated\" date above.",
    },
  ],
};

export const accessibilityStatement = {
  conformanceTarget: "WCAG 2.2 Level AA",
  lastUpdated: "2026-09-01",
  commitment:
    "Super Tooth Dentistry is committed to making this website usable by everyone, including people who use assistive technology.",
  knownLimitations: [
    "A full accessibility audit against WCAG 2.2 AA has not yet been completed (tracked internally as backlog item 14) — some issues may exist that we haven't found yet.",
    "Some third-party embeds (such as the Google Maps location panel) are outside our direct control and may not fully meet this standard.",
  ],
};
