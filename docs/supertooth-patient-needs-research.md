# Patient Needs & Website Blueprint — Super Tooth Dentistry

**Deep research report · 2026-08-30**
First-principles research into what patients need from a family dental practice website serving the Downtown Seattle catchment. Not a current-state audit — this was researched as if designing a new site, then reconciled against what this repo has actually built (Section 20 onward).

The machine-readable backlog derived from this report lives in `src/lib/backlog.ts` and renders at `/backlog`.

---

## 1. Executive summary

**The single most important correction to the brief.** The brief specifies "Downtown Seattle." The practice is at **133 Queen Anne Ave N, Suite A, Seattle WA 98109** — Lower Queen Anne / Uptown, not the downtown core. That distinction is not pedantic; it changes what the website must do. Downtown-working patients *are* a realistic segment (the Monorail reaches Westlake in roughly two minutes, RapidRide D and Metro routes 1/2/3/4/13 serve the neighborhood), but they will not find the practice by walking past it. The site has to actively close a distance gap that a 5th-and-Pike practice would not have. Everything about arrival — transit, parking, "Suite A," which door — is therefore conversion infrastructure here, not footer trivia.

**Six findings drive the entire backlog.**

1. **Insurance ambiguity is the highest-consequence content risk on the site.** "We accept your insurance" and "we are in-network with your plan" mean different things, patients routinely conflate them, and the failure mode is a surprise balance bill months later. The ADA has published guidance on precisely this confusion, and a documented case exists of a practice website listing carriers that the insurer's own directory did not corroborate. This site currently names six carriers that its own source file flags as unconfirmed.

2. **Cost uncertainty is an abandonment cause, not a nice-to-have.** Commonly cited industry figures put the share of patients wanting accurate out-of-pocket costs before service in the low-to-mid 80s percent, and the share who have *delayed* care because they didn't know the cost in the mid-40s. The website cannot quote prices it cannot verify — but it can explain, precisely, what a patient will and won't know before they sit in the chair. That is achievable today and costs nothing but writing.

3. **The phone is the practice's leakiest channel, and the repo already knows it.** `supertooth-webflow-build-spec.md` Section 1 names two conversion leaks: form → email → manual callback, and missed call → voicemail → patient calls a competitor. Industry data corroborates both hard: practices miss roughly a third of in-hours calls, only a small minority of new patients leave a voicemail, and the rest call the next practice on the list — often within ten minutes. Meanwhile 68–77% of patients say they'd prefer to book online and a minority of practices offer it, with roughly a third of online bookings placed outside office hours. **Real online booking is the highest-value single item in this backlog.** It is also the one still blocked on the Tab32 service-layer decisions.

4. **Dental anxiety is the best-evidenced patient need in the entire research set, and the site says nothing about it.** Peer-reviewed prevalence estimates put dental anxiety around 19% of US adult dental patients, with high fear around 15%; over 20% of anxious patients don't see a dentist regularly and 9–15% avoid care altogether. Among patients presenting for *emergency* care, prevalence estimates run near 49% — meaning the anxious patient and the urgent patient are frequently the same person. There is currently no anxiety or comfort content anywhere on this site.

5. **Patients arrive by symptom, not by procedure name.** Nobody searches "endodontic consultation"; they search why a tooth throbs at night, and they do it disproportionately late in the evening. Service discovery should offer a plain-language concern-led entry point. It should **not** be a symptom checker — that is a diagnostic tool, and this site must not be one.

6. **Three of four primary navigation links are dead.** `/services`, `/about`, and `/insurance-new-patients` are in the nav array and none of those routes exist. On a site whose stated goal is a 4–5× increase in new patients, three quarters of the primary nav 404s. This is the cheapest, highest-severity fix available and it heads the backlog.

**Shape of the recommendation.** Fourteen P0 items make the site patient-ready, credible, and legally publishable. Eight P1 items convert materially better. Four P2 items are deferred on purpose. The first four P0 items are all Small, need no new content from the practice, and could ship this week.

---

## 2. Research methodology and limitations

**What was done.** Structured searching across patient-generated sources (community discussion, review-platform themes), practice-generated sources (dental practice websites in and near the catchment), professional and clinical guidance (ADA / MouthHealthy / JADA), peer-reviewed literature (dental anxiety epidemiology), accessibility standards (WCAG 2.2, HHS Section 504 rulemaking), and cross-domain design writing (hospitality and travel booking UX). Findings were then reconciled against this repo's locked decision docs and its actual shipped code.

**Evidence tiers used throughout.** Not all sources deserve equal weight, so each claim in this report carries one:

| Tier | Meaning | Trust |
|---|---|---|
| **Clinical / peer-reviewed** | JADA, ADA guidance, indexed journals | Strongest. Cite directly. |
| **Standards** | WCAG, W3C, federal rulemaking | Strong, but check applicability |
| **Patient-generated** | Reviews, community discussion | Good for *themes*, never for numbers |
| **Practice-generated** | Competitor site copy | Design precedent only — **not** patient evidence |
| **Vendor / marketing** | Dental-marketing blogs, SaaS stat roundups | Directional only. Treat every percentage as unverified. |

**Limitations, stated plainly.**

- **Most quantitative figures in dental digital marketing are vendor-sourced and uncorroborated.** The booking-preference, missed-call, and cost-transparency percentages in this report all come from vendor content that cites surveys without reliably reproducible methodology. They are used here as *directional corroboration of a qualitative theme*, never as a forecast. No search volume, market share, or demand estimate has been fabricated, and none should be quoted to the practice as fact.
- **No primary patient research was conducted.** No interviews, no surveys, no session recordings, no analytics. Every "patients want X" statement is an inference from secondary sources.
- **Reddit and local-forum evidence was thin.** Targeted searching for Seattle-specific community discussion about choosing a dentist returned directory listings and press releases rather than genuine threads. Two professional-community posts asking for Seattle dentist and orthodontist recommendations were located, which weakly corroborates that word-of-mouth recommendation-seeking is a real acquisition channel here — but this is an **isolated signal**, not a repeated theme, and it is labeled as such.
- **The practice's own operational facts are unverified.** Insurance network status, offer pricing, review count, service-area list, sedation options, and languages spoken are all unconfirmed in `content.ts` today. Section 22 lists every one of them.
- **Patient privacy was protected.** No names or identifying details were taken from reviews or public discussion. Themes are paraphrased.

---

## 3. Audience and scenario model

The practice serves everyone. The *website* has to make one experience work for all of them, because building a separate journey per segment is exactly the over-engineering the brief warns against. The needs matrix below exists to find the **shared** needs — and it does: nine of twelve scenarios need arrival clarity, eight need financial clarity, seven need a fast non-phone contact path.

| # | Scenario | Trigger | Top question | Primary concern | Best primary CTA | Mobile-specific need | Likely abandonment point |
|---|---|---|---|---|---|---|---|
| 1 | Downtown professional, preventive care | New job, new benefits, "I should find a dentist" | Can I get there and back around work? | Time cost | Book / request appointment | One-tap directions + transit time | No visible availability; form promises only a callback |
| 2 | Parent coordinating a household | School year, benefits reset | Can you see all of us, and back-to-back? | Coordination effort | Book, with a "more than one person" affordance | Booking on a phone between tasks | Nothing addresses multi-person scheduling |
| 3 | New to Seattle | Relocation | Are you accepting new patients, and do you take my plan? | Starting over | Book + insurance check | Map + neighborhood orientation | Insurance answer is vague |
| 4 | Anxious returner | Pain, guilt, a deadline | Will I be judged for how long it's been? | Shame, loss of control | "How we make visits easier" → book | Reading privately, quickly | Zero anxiety content — bounces to a practice that has some |
| 5 | Urgent need | Pain, swelling, broken tooth | Can I be seen today? | Speed | **Call** (in hours) / clear alternative (out of hours) | One-tap call above everything | Buried phone number; no after-hours instruction |
| 6 | Insurance-uncertain | Has a card, doesn't understand it | Are you in-network *with my specific plan*? | Surprise bill | "Check my coverage" | Reading a card while on the page | "We accept most plans" — not an answer |
| 7 | Uninsured | Cost-driven delay | What does this actually cost me? | Affordability | Payment options / financing | Scannable, no jargon | No path that doesn't assume insurance |
| 8 | Evaluating restorative work | Diagnosis elsewhere, seeking confidence | Is this dentist good at *this*? | Competence, cost | Consultation request | Before/after evidence | Generic service blurb, no depth |
| 9 | Cosmetic explorer | Self-driven, no urgency | What's involved, and will I be pressured? | Sales pressure | Low-pressure consultation | Visual proof | Aggressive discount framing |
| 10 | Older adult / caregiver | Health change, coordinating for another | Can you handle complex needs, and can I help manage it? | Accessibility, dignity | Call or request | Larger text, simple structure | Design skews juvenile or dense |
| 11 | Assistive-technology user | Any of the above | Can I use this site at all? | Exclusion | Whichever CTA is reachable | Screen reader + keyboard parity | Unlabeled controls, focus traps, contrast |
| 12 | Limited English proficiency | Any of the above | Will someone understand me? | Communication | Call, with language signal | Plain language, translatable | No language information anywhere |

**Shared needs that fall out of this matrix** — and these, not the segments, are what the site should be built around:

- **Arrival certainty** (9/12) — address, suite, entrance, transit, parking, one-tap directions
- **Financial certainty** (8/12) — network status, what's estimable, what isn't, options without insurance
- **A fast path that isn't a phone call** (7/12) — but never *instead of* the phone for urgent cases
- **Proof of a real, competent, specific human** (7/12) — Dr. Dubey, named, credentialed, photographed
- **Permission to be a beginner** (5/12) — anxious, lapsed, uninsured, new-to-country patients all need the same non-judgmental tone

---

## 4. Complete jobs-to-be-done map

Organized by patient progress, not by procedure or page. Evidence strength is labeled per the Section 2 tiers.

### A. Recognizing and understanding a dental need

| Job | Emotional job | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|
| Decide whether this needs attention now or can wait | Not wanting to overreact — or under-react | Non-diagnostic urgency guidance: red flags → seek care immediately; everything else → call us | Call | Clinical (ADA/JADA) | **P0** |
| Understand what kind of care a concern maps to | Not wanting to sound ignorant | Plain-language concern list linking to services | Browse | Emerging theme | P1 |
| Understand a treatment without self-diagnosing | Fear of the unknown | Service pages written to explain, not sell | Read → consult | Repeated theme | P1 |

> **Hard constraint.** The site must not present medical certainty and must not be a diagnostic tool. ADA patient guidance is explicit that most toothaches — including severe ones — are not ER emergencies, while spreading swelling, fever, or difficulty breathing or swallowing *are*. Reproduce that structure (red flags → emergency care; everything else → call the practice) and stop there. **No symptom checker.**

### B. Finding a dentist

| Job | Website response | Evidence | Priority |
|---|---|---|---|
| Confirm the practice is accepting new patients | Explicit, dated statement — not an evergreen badge | Repeated theme | **P0** |
| Confirm it's real, established, and near me | Consistent NAP, real photography, map, GBP parity | Vendor + standards | **P0** |
| Confirm it serves people like me | Life-stage language covering children through older adults | Repeated theme | P1 |
| Care for a whole household in one place | Explicit family/household statement | Repeated theme | P1 |
| Replace a dentist after moving | Records-transfer guidance | Practice-generated precedent | P1 |

### C. Evaluating trust and clinical credibility

| Job | Website response | Evidence | Priority |
|---|---|---|---|
| Know who will actually treat me | Named dentist, real photo matching who's in the room, credentials, training | Practice-generated + usability | **P0** |
| Judge whether they listen and explain | Philosophy in her own words; reviews that speak to communication | Patient-generated | P1 |
| See that the space is clean and safe | Real office photography (already shipped) | Patient-generated | ✅ Done |
| Read reviews without drowning | Rating + count + a few real, attributed excerpts | Vendor + patient-generated | **P0** (real data) |
| Know what happens if I need something you don't do | Referral honesty statement | Isolated signal | P2 |

> **Anti-pattern, evidenced.** Vague trust language — "compassionate care," "patient-centered," "years of experience" — is so universal in medical web copy that it reads as noise. Specificity is the trust mechanism: *"DDS, University of Colorado. Practicing since 2012. Master's in Prosthodontics."* beats *"experienced and caring"* every time. Dr. Dubey's real bio already does this well; the rest of the site should match its register.

### D. Understanding insurance, cost, and payment — **highest-risk job family**

| Job | Website response | Evidence | Priority |
|---|---|---|---|
| Determine whether you take *my specific plan* | Verified carrier list + explicit "verify your specific plan with us, plans differ" | Clinical/ADA guidance | **P0** |
| Understand "accepted" vs "in-network" | One plain paragraph explaining the difference | Clinical/ADA guidance | **P0** |
| Avoid an unexpected bill | State when an estimate is possible (after exam) and when it isn't (before) | Vendor + patient-generated | **P0** |
| Know my options without insurance | A path that doesn't assume a card | Vendor | **P0** |
| Understand financing | Verified terms only | Repeated theme | P1 |
| Know what to bring | New-patient checklist | Practice-generated precedent | **P0** |

> **Why this is P0 and not P1.** Publishing a carrier list that the insurer's own directory contradicts is how patients get balance-billed, and it is a documented failure mode. This repo's `insuranceCarriers` array carries six names its own comment marks as *"still unconfirmed against the practice's actual current network status."* Either verify them or don't publish them. The compliance rule in `CLAUDE.md` — no unverifiable claims about insurance carriers — already says this; the research explains the cost of ignoring it.

### E. Overcoming dental anxiety — **best-evidenced, least-served**

| Job | Emotional job | Website response | Evidence | Priority |
|---|---|---|---|---|
| Return after years away | Not be judged | Explicit "it's been a while? that's fine" statement | Peer-reviewed | **P0** (as copy) |
| Know what will happen | Regain control | Step-by-step first-visit walkthrough | Peer-reviewed | P1 |
| Tell someone I'm anxious before arriving | Not have to say it out loud at the desk | Optional free-text field on the appointment form | Peer-reviewed | P1 |
| Understand comfort options | Reassurance | Only what the practice verifiably offers | Peer-reviewed | P1 |
| Keep control during treatment | Agency | Stop-signal / pacing statement, if genuinely practiced | Peer-reviewed | P1 |

> Roughly one in five adult dental patients experiences dental anxiety; high fear sits around 15%; over a fifth of anxious patients don't attend regularly and up to 15% avoid entirely. Among *emergency* patients, prevalence approaches half. This is the strongest evidence in the report and the largest content gap on the site. **The cheapest version — one honest, non-judgmental sentence in the new-patient copy and an optional "anything we should know?" field on the form — is nearly free and belongs in P0.**

### F. Handling urgent dental needs

| Job | Website response | Evidence | Priority |
|---|---|---|---|
| Get help fast for pain, swelling, a break | Persistent, obvious urgent path; call-first during hours | Clinical | **P0** |
| Know how fast you might respond | Only what's verifiable — no invented time windows | Clinical | **P0** |
| Know when to go to an ER instead | Red-flag list: spreading swelling, fever, trouble breathing/swallowing → emergency care | Clinical (ADA/JADA) | **P0** |
| Know what to do right now while waiting | ADA-consistent first aid: rinse with warm water, cold compress, **no aspirin on the gum** | Clinical | P1 |
| Know what happens after hours | Honest statement of what's available and when | Vendor (92% of after-hours calls unanswered) | **P0** |

> Note the ER limitation, which patients consistently don't know and which the site can honestly explain: emergency rooms rarely staff dentists and generally treat the symptom, not the tooth. Saying so is a genuine service and a trust signal — and it is safe, because it routes toward professional evaluation rather than away from it.

### G. Discovering appropriate services

Patients browse by **symptom** and **goal** far more than by procedure name. Recommended model — deliberately the simplest thing that works:

> A short, plain-language concern list — *"A tooth hurts" · "I chipped or broke something" · "It's time for a cleaning" · "I want straighter teeth" · "I want a whiter smile" · "I need a crown or implant"* — where each entry is **a link to the relevant service section.** Static links. No logic, no branching, no scoring, no checker.

**Explicitly deferred:** interactive symptom triage, quizzes, "find your treatment" wizards. Higher build cost, meaningful clinical risk, no supporting evidence that patients want it from a single practice's site.

### H. Making dental care convenient — **the segment-defining job family**

| Job | Website response | Evidence | Priority |
|---|---|---|---|
| Schedule around work | Real availability, or an honest statement of how requests are handled and how fast | Vendor (strongly corroborated) | **P0** copy / **P1** booking |
| Book without phoning | Online booking | Vendor (68–77% preference vs 26–40% availability) | **P1** (Tab32-blocked) |
| Reach a human fast when it matters | One-tap call, always visible | Vendor (86% don't leave voicemail) | ✅ Shipped |
| Judge whether the location is practical | Transit lines, walk time, Monorail-from-Westlake framing | Local | **P0** |
| Find parking and know what it costs | Honest parking reality — street parking, no invented garage | Local | **P0** |
| Find the actual door | **"Suite A"** — which building, which entrance, which floor | Practice-generated precedent | **P0** |
| Coordinate several family members | An affordance to say "this is for 2 people" | Repeated theme | P1 |
| Complete forms before arriving | Pre-visit digital forms | Vendor | P2 |

### I. Starting as a new patient

Confirm eligibility → know what happens at visit 1 → know what to bring → transfer records and x-rays → submit insurance → know whether treatment happens that day → know the next step after the exam. Practice-generated precedent in this exact catchment is strong and consistent: nearby practices publish first-visit pages covering comprehensive evaluation, medical-history and medication disclosure, a minors-must-be-accompanied policy, and x-ray forwarding. That's a proven content template. **P0.**

### J. Receiving and managing ongoing care

Understand the plan → prepare → aftercare → know when to call → return for prevention → finish multi-visit treatment → coordinate for a dependent → request records → update insurance → give feedback → refer someone. Mostly **P1/P2**; aftercare and records-request are the two worth doing early, because both otherwise become phone calls.

### K. Exploring elective and cosmetic care

Understand options without pressure → understand process, commitment, maintenance → judge credibility → know what a consultation involves → start low-pressure. **P1.** The tone constraint is the locked "blend, not urgency/discount-led" decision: cosmetic content that leads with a discount reads as a sales funnel and undermines the clinical credibility the rest of the site is building.

---

## 5. Patient journey and points of abandonment

```
TRIGGER          DISCOVER         EVALUATE          DECIDE           ACT            ARRIVE
symptom /        Google / GBP     site: who,        can I afford     book or        find the door
new benefits  →  Maps / word   →  where, cost,   →  it? can I     →  call       →   / be seen
/ moved          of mouth         proof             get there?
```

**Where patients leave — ordered by estimated loss, mapped to the fix.**

| # | Abandonment point | Why it happens | Fix | Priority |
|---|---|---|---|---|
| 1 | Clicks a nav link → 404 | 3 of 4 primary nav routes don't exist | Build minimums or remove links | **P0** |
| 2 | Can't confirm insurance | "Most major plans" isn't an answer | Insurance page + explicit verify step | **P0** |
| 3 | Won't call, form only promises a callback | The named conversion leak | Set expectations now; real booking later | **P0** → **P1** |
| 4 | Calls, gets voicemail | ~86% don't leave one; they call the next practice | Honest hours + a working non-phone path | **P0** |
| 5 | Urgent, can't find what to do | No emergency pathway exists | Emergency guidance + persistent access | **P0** |
| 6 | Anxious, sees nothing acknowledging it | Largest evidence-to-content gap on the site | Anxiety copy + form field | **P0**/P1 |
| 7 | Can't tell if the location works | Neighborhood ≠ downtown; distance must be closed | Arrival + transit + parking + Suite A | **P0** |
| 8 | Assistive tech user hits a barrier | Untested | WCAG 2.2 AA QA pass | **P0** |
| 9 | Sees bracketed `[placeholder]` text | Placeholders currently render in production | Verify-or-remove pass | **P0** |
| 10 | Cost unknown, delays indefinitely | Silence reads as "expensive" | Explain what's estimable and when | **P0** |

Point 9 deserves emphasis: `<Placeholder>` renders visibly bracketed with a dashed underline. That is exactly right for internal review and exactly wrong for a production site a prospective patient is judging. Every remaining placeholder is either verified content or deleted content before launch — there is no third option.

---

## 6. Downtown Seattle-specific needs

**Geography, stated accurately.** 133 Queen Anne Ave N, Suite A, 98109 sits in Lower Queen Anne / Uptown, adjacent to Seattle Center — not the downtown core, and a meaningful distance from South Lake Union and Denny Triangle employment centers. Approach honestly and it is an advantage: quieter, easier, genuinely reachable. Approach it by claiming "downtown" and it becomes a credibility problem the first time someone maps it.

**Transit, verified.** RapidRide D Line and Metro routes 1, 2, 3, 4, and 13 serve the neighborhood; the Seattle Center Monorail connects to Westlake Center downtown in roughly two minutes. That Monorail fact is the single most useful piece of local information the site can publish for a downtown-working patient, and no competitor copy reviewed made use of it.

**Parking, honestly.** The confirmed practice statement is a bus stop on the same block and street parking on nearby streets. Publish exactly that. Do not invent a garage, a validation program, or a "plenty of free parking" claim — Lower Queen Anne parking pressure around Seattle Center events is real and locally known, and overclaiming is both an unverifiable claim and a trust loss on arrival.

**Neighborhood targeting.** `serviceAreas` currently lists Queen Anne (real) plus five proximity guesses. Local search rewards genuine neighborhood relevance and punishes NAP inconsistency; padding a service-area list with unconfirmed neighborhoods buys nothing and risks contradicting the Google Business Profile. Confirm the real list or ship only Queen Anne.

**Downtown-professional expectations, restated as design requirements:** efficient digital interaction (booking, not a callback), explicit cost and network clarity, fast predictable scheduling, transit and parking legibility, minimal administrative friction, and clinical credibility conveyed by specifics rather than adjectives. Every one is already in the backlog.

---

## 7. Family-practice needs across life stages

"Family practice" here means comprehensive relationship-based care for individuals and households — **not** "we have a kids' room." Roughly a third of the twelve scenarios involve no children at all.

| Life stage | Distinct need | Site response |
|---|---|---|
| Children | When is the first visit? Will they be gentle? | The existing FAQ already answers the age question — keep it |
| Teens | Orthodontics, appearance, autonomy | Invisalign content that speaks to the teen and the parent |
| Adults | Efficiency, prevention, restoration | The site's current center of gravity — correct |
| Older adults | Complex needs, dignity, accessibility | Larger type, simple structure, no juvenile styling |
| Caregivers | Managing another person's care | Say plainly that you can help coordinate |
| Households | One practice, coordinated visits | Explicit multi-person statement + a form affordance |

**Design constraint:** family-friendly must not become childish. Cartoon teeth and primary colors read as a pediatric practice and actively repel the adult professional segment. The locked warm-ivory / terracotta / espresso palette already threads this correctly — warm and human without being juvenile. Don't touch it; that palette is approved and locked.

---

## 8. Trust and decision-making requirements

Ranked by how much trust each unit of effort buys:

1. **A specific, named, credentialed human with a real photograph.** ✅ Already the site's strongest asset.
2. **Real photography of the actual space.** ✅ Shipped.
3. **Reviews with a real rating, count, and attributed excerpts.** ⚠️ Rating and count are unconfirmed; all three quotes are placeholders.
4. **Concrete specifics over adjectives.** Partially there — the bio does it; other sections still lean generic.
5. **Consistent identity across the web** — same name, address, and phone on the site, GBP, and directories. ⚠️ **A phone conflict is documented in this repo:** the source site showed (206) 593-3131 in one place and (206) 687-7571 in another. One number. Everywhere. Matching the Google Business Profile.
6. **Visible privacy and accessibility posture.** ❌ Neither page exists.
7. **Honest limits** — what you don't do, and who you refer to.

**HIPAA constraint, locked and non-negotiable:** testimonials use the Google Reviews widget or first-name-plus-last-initial only. Never a full patient name without written authorization. The three placeholder quotes must be replaced with real reviews in that format, not with invented ones.

---

## 9. Insurance, cost, and financial needs

The site needs to answer five questions and it currently answers none of them completely.

1. **"Are you in-network with my plan?"** → Verified carrier list, plus the honest caveat that plans differ within a carrier and specific coverage should be confirmed. A carrier logo wall is not an answer.
2. **"What's the difference between accepted and in-network?"** → One plain paragraph. This single paragraph prevents the surprise-bill scenario that produces the angriest reviews in the entire research set.
3. **"What will this cost me?"** → State the truth of the process: a specific estimate follows the exam, because it depends on findings and on the plan. Saying *when* a patient will know is nearly as valuable as saying the number, and unlike the number, it's publishable today.
4. **"What if I have no insurance?"** → A named path. Roughly half the scenarios in Section 3 are cost-sensitive, and two involve no insurance at all.
5. **"What do I bring?"** → Card, ID, medication list, prior x-rays.

Everything currently published on this topic — six carrier names, a $149 offer, a $500 Invisalign discount, interest-free financing, a $50 referral credit, a 48-hour cancellation policy — is flagged unconfirmed in the repo's own source comments. **Every one requires practice sign-off before launch** (Section 22).

---

## 10. Convenience, scheduling, and arrival needs

**Scheduling.** The honest current state is a request form that generates a callback. Until Tab32 booking lands, the form must state *what happens next and how fast* — "we'll call you back within one business day" beats silence, and the same field can carry an "anything we should know?" line that serves the anxiety job for free.

**Arrival — the underbuilt, high-leverage area.** Required content: street address; **which building and which entrance**; **Suite A** — what floor, how to find it; nearest transit stop and route numbers; the Monorail-to-Westlake framing; honest street-parking guidance; step-free access if it exists; and one-tap directions plus one-tap call on mobile. The hero address already links to Google Maps (PR #36) — good start, not sufficient.

**Cross-domain principle that applies directly:** hospitality booking UX treats the arrival instruction as part of the booking product, not as an afterthought. A hotel that tells you which door, which floor, and where to park reduces both anxiety and support calls. A dental practice in a suite inside a mixed-use building on a busy avenue has exactly the same problem and almost none of them solve it.

---

## 11. Emergency and anxiety-related needs

These are treated together deliberately: emergency-presenting patients show dental-anxiety prevalence near 49%, so the urgent path is very often also the anxious path. An emergency page written coldly fails half its audience.

**Required emergency structure — safe, non-diagnostic, three tiers:**

1. **Call 911 or go to an emergency room if:** swelling is spreading, there's a fever with facial swelling, or breathing or swallowing is affected. *(Clinical, ADA-consistent.)*
2. **Call the practice for:** pain, a broken or knocked-out tooth, a lost filling or crown, swelling without red flags.
3. **While you wait:** rinse with warm water, cold compress for swelling, **do not put aspirin directly on the tooth or gum.** *(Directly ADA-consistent — this specific misconception is common enough that the ADA calls it out.)*

Plus an honest after-hours statement. Roughly 92% of after-hours calls go unanswered industry-wide; a patient who knows the office opens at 7:00 AM Tuesday will wait, while one who reaches unexplained silence calls someone else.

**Constraints:** no invented response-time promise ("seen within an hour"), no diagnosis, no symptom checker. The existing FAQ answer — *"in most cases we can accommodate emergency visits the same day you call"* — is appropriately hedged and reusable. **This is a content problem, not an engineering problem.** It needs one page and one persistent entry point, not a triage system.

---

## 12. Cross-domain design inspiration

Principles, not surface imitation. Nothing here means copying anyone's branding, copy, photography, or layout.

| # | Domain | Problem it solves | Principle | Why it transfers | Where it goes | Risk | Pri |
|---|---|---|---|---|---|---|---|
| 1 | Hotels | "Where do I actually go?" | Arrival instructions are part of the product | Suite A in a mixed-use building is the same problem | Arrival section + confirmation | Verbosity | **P0** |
| 2 | Airlines | "Did that work?" | Explicit confirmation stating what happens next and when | Form → silence is the named conversion leak | Form success state | None | **P0** |
| 3 | Insurance | Coverage opacity | Say what's covered *and what isn't*, in plain words | Directly the surprise-bill failure | Insurance page | Overwhelming detail | **P0** |
| 4 | Financial services | Fear of hidden costs | Progressive disclosure of cost mechanics | Patients delay on cost uncertainty | Cost explainer | Reads legalistic | **P0** |
| 5 | Public services | Low-literacy, high-stakes | Plain language, short sentences, one idea per block | LEP + anxious + older-adult readers | Sitewide | Can read curt | **P0** |
| 6 | Mental health | Stigma and shame | Non-judgmental, permission-giving tone | Lapsed and anxious patients | Anxiety + new-patient copy | Saccharine if overdone | **P0** |
| 7 | Accessibility-first products | Exclusion | Keyboard/SR parity, visible focus, real targets | Locked WCAG AA requirement | Sitewide | Effort | **P0** |
| 8 | Premium retail | "Is this quality?" | Restraint, generous whitespace, few excellent photos | Credibility without expensive-signaling | Sitewide | Can feel cold | ✅ |
| 9 | Consumer tech | Friction | One primary action per screen | Persistent single Book CTA | Sitewide | Over-simplification | ✅ |
| 10 | Real estate | Remote evaluation | Rich, honest photography of the real space | Anxiety reduction | Office carousel | Staged look | ✅ |
| 11 | Travel | Comparison fatigue | Show constraints early (hours, location, network) | Avoids wasted evaluation | Hero trust strip | Clutter | ✅ |
| 12 | Wellness | Calm | Slow motion, soft contrast, no urgency countdowns | Anxiety-sensitive audience | Motion system | Sluggishness | ✅ |
| 13 | Primary care | Provider choice | Structured bios: training, focus, languages, photo | Highest-trust element | About page | Sameness | P1 |
| 14 | Banking | Error recovery | Errors say what's wrong and how to fix it | Forms are the conversion path | Form errors | — | **P0** |
| 15 | Hospitality | Multi-guest | Booking that accommodates more than one person | Household coordination | Form field | Complexity | P1 |

**Coherence rule:** the result must feel like one practice, not a scrapbook. The locked design system is the unifier — warm ivory, terracotta accents, espresso text, Fraunces + Inter, 8px spacing. Every borrowed pattern gets re-expressed in that system.

---

## 13. Recommended design direction

The design direction is **already locked and approved** in `CLAUDE.md` and `supertooth-webflow-build-spec.md` Section 5. This research **corroborates it and proposes no changes to any base color or font token.** Those are locked, and per the repo guardrail a change would require an explicit conversation with Akash and a real reason.

**Why the locked system is right, per the research:** warm ivory dominance avoids clinical sterility; terracotta restricted to CTAs gives one unambiguous primary action per screen; espresso headline text carries authority without the corporate coldness of navy; Fraunces adds human warmth where a geometric sans would read generic; Inter at ≥16px with ≥1.5 line-height is the healthcare-accessibility standard and serves older adults and LEP readers directly.

**Component-level direction:**

- **CTAs** — one terracotta primary per view; call is a secondary outlined pill; urgent contexts may promote call to primary
- **Forms** — labels above fields (never placeholder-as-label), inline validation on blur, errors naming the fix, ≥44px targets
- **Reviews** — rating, count, source, short attributed excerpts; no wall of stars
- **Emergency states** — calm and clear, not alarming; red is for genuine 911-tier red flags only, and used nowhere else on the site
- **Confirmation states** — restate what was submitted, what happens next, by when, and how to reach a human meanwhile
- **Motion** — slow, subordinate to comprehension; `prefers-reduced-motion` honored (already the pattern in `HeroCarousel`/`OfficeCarousel`)

**Failure modes to design against**, each with its antidote: *generic* → real photography and specific credentials; *untrustworthy* → consistent NAP, privacy page, real reviews; *too expensive* → warm palette, plain language, visible payment options; *sterile* → ivory over white, real faces; *juvenile* → no cartoons, no primary colors; *intimidating* → no clinical procedure photography above the fold; *noisy* → one primary action per view; *hard to read* → locked type minimums; *sales-driven* → offers stay late in the page and never lead.

---

## 14. Information architecture

Lean. Primary nav stays at four items — **the current four are right**; three simply need to exist.

| Route | Jobs | Primary CTA | Priority | Minimum useful version |
|---|---|---|---|---|
| `/` | Trust, evaluate, act | Book | ✅ Built | Shipped |
| `/services` | Discover care | Book | **P0** | One page, 4 real services, concern list |
| `/about` | Credibility | Book | **P0** | Dr. Dubey (content exists) + team |
| `/insurance-new-patients` | Financial + onboarding | Book | **P0** | Network explainer, what to bring, first visit |
| `/contact` | Act | Submit | ✅ Built | Needs confirmation + error states |
| `/emergency` | Urgent | Call | **P0** | Three-tier guidance + after-hours |
| `/location` | Arrival | Directions | **P0** | May start as a homepage section |
| `/privacy` | Legal | — | **P0** | Required before go-live |
| `/accessibility` | Inclusion | — | **P0** | Statement + contact route |
| `/anxiety` | Reassurance | Book | P1 | May start as a section |
| `/reviews` | Social proof | Book | P1 | GBP-fed |
| `/faq` | Objections | Book | ✅ On homepage | Split per-service later |
| Per-service pages | Depth + SEO | Book | P1 | One per real service |

**Section vs. page:** anxiety, family care, and arrival start as homepage sections and graduate to pages when they have enough real content. Emergency is a page from day one — it needs a URL people can be sent to and Google can index. Privacy and accessibility are pages by legal necessity.

**Nav rule:** primary nav stays at four. Emergency, privacy, and accessibility live in the footer and in the mobile menu; emergency additionally needs a persistent, always-reachable entry point.

---

## 15. Homepage blueprint

The current homepage order is **already close to correct** and matches the locked trust-first ordering. Recommended target order, with deltas marked:

| # | Section | Job | CTA | Trust mechanism | Status |
|---|---|---|---|---|---|
| 1 | Hero — photo-first, full-bleed | Orient, act | Book + Call | Real faces, real place | ✅ |
| 2 | Trust strip — differentiators | Evaluate | — | Specific capability claims | ✅ |
| 3 | Office carousel + blurb | Reduce anxiety | — | Real space | ✅ |
| 4 | Dr. Archana bio | Credibility | — | Named, credentialed human | ✅ |
| 5 | Reviews | Social proof | — | Real rating + excerpts | ⚠️ Placeholder quotes |
| 6 | **Concern-led entry** | Discover | Browse | Plain language | ➕ **New, P1** |
| 7 | Services (4) | Discover | Browse | Before/after photography | ✅ |
| 8 | **Insurance + cost clarity** | Financial certainty | Check coverage | Honest network language | ➕ **New, P0** |
| 9 | **New-patient / anxiety strip** | Permission | Book | Non-judgmental tone | ➕ **New, P0** |
| 10 | Location + arrival | Convenience | Directions | Transit, parking, Suite A | ⚠️ Needs depth |
| 11 | Offers | Reinforce | Book | Kept late by locked decision | ✅ |
| 12 | FAQ | Objections | Book | Direct Q&A + schema | ✅ |
| 13 | Booking block | Convert | Book + Call | Hours, address, photo | ✅ |
| 14 | Footer | Close | Call | NAP, privacy, accessibility | ⚠️ Needs legal links |

Three additions, no removals, no reordering of anything locked. Insurance returning to the homepage as a *clarity* block is not a reversal of the decision to remove the old carrier-logo block — that block was a logo wall; this is a plain-language answer to the highest-risk question on the site, and it earns its place on evidence.

**Hero message directions** (all avoid unverifiable claims; all need sign-off):
- *"Your long-term dentist in Queen Anne."* — current; relationship-led, locally specific, safe. Recommended.
- *"Dentistry for every stage of your family's life."* — family-practice-led.
- *"Two minutes from Westlake. A world away from a rushed appointment."* — local convenience + calm, the most differentiated option, contingent on confirming the Monorail framing is honest for the practice's actual patients.

None may add credentials, availability promises, prices, awards, or outcome claims.

---

## 16. Page-level requirements

Condensed; full per-item detail lives in the build plan and in `src/lib/backlog.ts`.

- **`/services`** — 4 verified services; each with what it is, when it's needed, what a visit involves, an insurance note, and 2–3 FAQ pairs; concern-led entry at the top; Book CTA. *P0 minimum, P1 depth.*
- **`/about`** — Dr. Dubey (real content ready), team with real names and roles once confirmed, philosophy, office photography, credentials once verified. *P0.*
- **`/insurance-new-patients`** — accepted-vs-in-network explainer, verified carriers with a verify-your-plan caveat, when an estimate is possible, no-insurance path, financing (verified only), what to bring, first-visit walkthrough, records transfer, minors policy. *P0.*
- **`/emergency`** — three-tier guidance, first aid, after-hours statement, one-tap call. *P0.*
- **`/location`** — address, entrance, Suite A, transit, Monorail, parking, accessibility, one-tap directions and call. *P0 (may begin as a homepage section).*
- **`/privacy`**, **`/accessibility`** — required before go-live. *P0.*
- **`/contact`** — exists; needs a real confirmation state, error states, and an "anything we should know?" field. *P0.*

---

## 17. Content and messaging blueprint

**Voice:** plain, warm, specific, unhurried. Short sentences. One idea per paragraph. No adjectives doing a fact's job.

| Element | Direction |
|---|---|
| Nav labels | Keep the locked four. Plain nouns. |
| CTA labels | "Book Appointment" / "Request an Appointment" / "Call (206) …". Never "Submit". |
| Emergency | Calm, three tiers, no invented timing |
| Insurance | Lead with the distinction, follow with the list, close with "confirm your specific plan with us" |
| Cost | Explain the *process* and the timing, not invented numbers |
| Anxiety | "It's been a while? You won't hear about it from us." Permission, not pity. |
| New patient | Numbered, concrete, checkable |
| Family | Explicitly include households without children |
| Arrival | Directional and physical — which door, which floor |
| Form help | Say why each field is needed |
| Errors | Name the problem and the fix |
| Confirmation | What you sent, what happens next, by when, how to reach a human |

**Never write** without verification: any price, any carrier or network status, any response-time promise, any award or outcome claim, any sedation option, any accessibility accommodation, any language capability, any years-of-experience figure not already in the verified bio.

---

## 18. Reusable component inventory

Existing components cover most of this. New components are marked ➕ — and there are only five, deliberately.

| Component | Status | Priority |
|---|---|---|
| Header / Nav | ✅ `Nav.tsx` | — |
| Mobile menu | ✅ `Nav.tsx` | — |
| Hero | ✅ `Hero.tsx` + `HeroCarousel.tsx` | — |
| Trust strip | ✅ `TrustBlock.tsx` | — |
| Service card | ✅ `ServicesSection.tsx` | — |
| Dentist profile | ✅ in `TrustBlock` — extract for `/about` | P1 |
| Review card | ✅ `TestimonialsSection.tsx` — needs real data | **P0** |
| Insurance module | ✅ `InsuranceBlock` / `InsuranceExpandCard` — reuse on `/insurance-new-patients` | **P0** |
| FAQ accordion | ✅ `FAQSection.tsx` — extract for reuse per service | P1 |
| Appointment CTA | ✅ used throughout | — |
| Form field | ✅ `AppointmentForm.tsx` | — |
| Location card | ✅ `LocationMapSection.tsx` — needs arrival depth | **P0** |
| Footer | ✅ `Footer.tsx` — needs legal links | **P0** |
| ➕ **PageShell** | Nav + breadcrumb + footer wrapper — 6 new pages need it | **P0** |
| ➕ **EmergencyGuidance** | Three-tier urgent block | **P0** |
| ➕ **ArrivalCard** | Transit, parking, entrance, one-tap actions | **P0** |
| ➕ **FormStatus** | Success and error states | **P0** |
| ➕ **ConcernList** | Plain-language links into services | P1 |

**Not building:** symptom checker, cost calculator, patient portal, chatbot, personalization engine, appointment-slot simulator. Each is high cost, and none is supported by the evidence gathered.

---

## 19. P0 / P1 / P2 prioritized backlog

> **Superseded by the scoring pass (2026-08-30).** The bands below were the *first* cut, asserted from the research. Every item has since been scored against a weighted 5-factor model and the bands re-derived from that score — see **Section 19a**. The authoritative version is `src/lib/backlog.ts`, rendered at **`/backlog`**, and verified by `npx tsx scripts/check-backlog.ts`.

Original summary, kept for the audit trail:

**P0 — patient-ready foundation (items 1–14).** Fix the dead nav routes · verify-or-remove every unverifiable claim · resolve the phone/NAP conflict · LocalBusiness schema + robots + sitemap · extract a `PageShell` · `/insurance-new-patients` · `/emergency` · arrival & transit detail · form confirmation and error states · `/about` · `/services` minimum · privacy & accessibility pages · real testimonials · WCAG 2.2 AA and mobile QA pass.

**P1 — trust, clarity, conversion (items 15–22).** Online booking via the Tab32 service layer · anxiety and comfort content · concern-led service entry · per-service pages with FAQ pairs · family and life-stage clarity · cost and financing explainer · GBP-fed reviews · aftercare and records requests.

**P2 — differentiation and optimization (4 items).** Language support signal and key-page translation · pre-visit digital forms · neighborhood content · analytics dashboard beyond baseline instrumentation.

**Explicitly deferred, with reasons.** Symptom checker (clinical risk, no supporting evidence). Cost calculator (can't be accurate without plan data; inaccuracy is worse than silence). Patient portal (operational maturity Tab32 should own). Chatbot (adds a channel before the existing ones work). Personalization (locked principle: not before basic content and navigation work). Live "open now" status (a static hours list is the accepted lower-cost v1 per `supertooth-navigation-requirements.md`).

---

## 19a. Scoring model and re-prioritization

Section 19's bands were argued from the research but ultimately asserted. This section replaces assertion with a model.

### The model

Each item scores 1–5 on five factors, weighted and summed out of 50. The weights encode *this* project's situation, not a generic template:

| Factor | Weight | What it measures | Why this weight |
|---|---|---|---|
| New-patient conversion | **×3.0** | How directly it moves someone from evaluating to booked | The locked goal is 10–15 → 52–69 new patients/month. This is the point of the site. |
| Risk if skipped | **×2.5** | Legal, clinical, HIPAA, accessibility, trust harm | Healthcare. The failure modes are surprise medical bills, HIPAA exposure and unsafe urgent guidance — not a missed quarter. |
| Patient reach | **×2.0** | How many of the 12 scenarios in Section 3 it serves | Items helping everyone should beat items helping one segment. |
| Cheapness | **×1.5** | Inverted effort (5 = Small, 1 = Large) | A tiebreaker. Cheap should win ties, not outrank importance. |
| Ready to start | **×1.0** | 5 = startable today, 1 = fully blocked | Lightest on purpose: being blocked lowers the *sequence*, not the *importance*. |

**Bands:** P0 ≥ 33, P1 ≥ 26, P2 below. Thresholds come from the actual distribution — there are natural gaps at ~33 and ~26 — not from round numbers.

**Two pin types can promote an item to P0 regardless of score. Nothing can demote.**
- `legal` — legally or ethically non-negotiable (items 2, 6, 7, 12, 13, 14).
- `dependency` — a pure enabler that P0 items need (item 5 only).

### What moved, and why

| # | Item | Score | Was | Now | Why |
|---|---|---|---|---|---|
| 16 | Dental anxiety content | **35.5** | P1 | **P0** | Best-evidenced patient need in the research, Small, effectively unblocked. Outscored five items already sitting in P0. |
| 20 | Cost and financing explainer | **34.0** | P1 | **P0** | The publishable part — the process and the timing — needs no price verification at all. |
| 11 | `/services` minimum | **29.5** | P0 | **P1** | The urgent part (a 404 nav link) is fully handled by item 1. What remains is ordinary content work with no compliance risk. |
| 18 | Per-service pages | **22.0** | P1 | **P2** | Large, no compliance risk, depends on an item that is itself now P1. The AEO goal is already partly met by the homepage FAQ. |
| 22 | Aftercare and records | **21.5** | P1 | **P2** | Serves existing patients rather than the new-patient goal driving this project. |

**Result: 15 P0 / 5 P1 / 6 P2** (was 14 / 8 / 4).

### Two results worth arguing about

**Online booking (item 15) scores 32.5 and stays P1** — despite scoring the maximum on both conversion and reach. Large effort and being fully blocked on Tab32 pull it under the line. This is the model working as designed: it is the biggest prize in the backlog *and* it cannot start today. The moment Tab32 is unblocked, `readiness` goes 1 → 4 and it moves to P0 at 35.5. If Akash disagrees with anything in this pass, this is the item to disagree about.

**PageShell (item 5) scores 22** — genuinely low value on its own, which is honest. It is pinned only because five P0 items depend on it. Recording that as a pin rather than inflating its score keeps the model trustworthy.

### Per-item additions

Every item now also carries:
- **2–3 references** — real examples of what good looks like, each with a link, what is specifically good about it, what to copy versus deliberately avoid, and **what it does on a small screen**. 60 references total, deepest on P0. Sources span dental practices, health systems, government design systems (GOV.UK, NHS), standards bodies (W3C, Schema.org) and regulators (ADA, HHS, CMS, ICO).
- **An agent-executable, mobile-first test scenario** — preconditions, numbered steps each tagged with the tool to use (`browser` / `shell` / `validator` / `manual`) and the viewport it runs at, explicit pass criteria, a mobile gate, and gotchas that would otherwise produce false passes. Written so an LLM with browser and shell tools can run it unattended and loop until green.

---

## 19b. Mobile-first correction

Section 19a's first pass was written desktop-first without noticing. An audit on 2026-08-30 measured it:

| Measure | Before | After |
|---|---|---|
| Test steps mentioning mobile at all | **9 of 129** | — |
| Rendering steps at 375px | — | **101 of 148** |
| Rendering steps at 1280px | — | 18 |
| Items with zero mobile-aware steps | **13 of 26** (incl. 5 P0s) | **0** |
| References considering mobile | **3 of 26 items** | **60 of 60 references** |

That is desktop-first work with mobile bolted on, on a project whose own build principles require the mobile experience to be complete rather than a reduced desktop version. The fix is structural, not cosmetic.

**Mobile is now the default, by construction.** A test step with no viewport tag runs at **375×812**. Desktop is a confirmation pass tagged explicitly, and it only runs after mobile passes. `any` marks steps with no rendered surface at all (schema parsing, provenance sign-off).

**Every item carries a mobile gate** — criteria that must hold at 375px *before any desktop check counts*. If mobile fails, the item fails; a desktop pass cannot rescue it. 98 gate criteria across 26 items.

**Every reference carries a mobile assessment.** This is where the audit was most useful, because several references are genuinely good on desktop and poor on a phone — and saying so is more valuable than the original praise:

- **MedStar's wayfinding** — the content model is right, but their floorplan PDFs and wide diagrams are near-unusable on a phone, which is exactly where arrival instructions get read. Copy the model, reject the delivery.
- **Humana's plain-language policy** — excellent register, but at 375px the length buries the key distinction below the fold. Take the register, reject the length.
- **CMS price transparency** — the machine-readable files it produced are technically transparent and practically unusable on a phone. Transparency a patient can't read at 375px isn't transparency.
- **Bedford Dentistry's triage guide** — the tiering is the thing that works on mobile; their long intro paragraph is what pushes Tier 1 below the fold.

**The guard now enforces all of it.** `scripts/check-backlog.ts` fails if any item lacks a mobile gate, if any reference lacks a substantive mobile note, if an item with a rendered surface has no 375px step, if desktop steps outnumber mobile ones, or if the first viewport-bound step isn't mobile. Desktop-first work can no longer pass the check regardless of what the prose claims.

**Findings this surfaced that would otherwise have been missed**, now written into the relevant items:
- **Item 7 (emergency)** — a three-column tier layout puts everything above the fold at 1280px and pushes Tier 1 detail below it at 375px. A red flag below the fold on a phone is a patient-safety failure, and desktop-first testing would never have caught it.
- **Item 14 (WCAG)** — WCAG 2.2's genuinely new criteria are mostly touch concerns: Target Size, Dragging Movements, Focus Not Obscured. Our two carousels drag and our nav is a fixed overlay, so 2.2 is precisely where our mobile risk sits. Running axe only at desktop width is a false pass.
- **Item 15 (booking)** — a calendar grid at mobile width produces sub-30px targets. It's the single most common place a booking flow breaks on a phone.
- **Item 9 (forms)** — a resized desktop window does not reproduce the on-screen keyboard, so keyboard-obscuring bugs need a real device.
- **Item 5 (PageShell)** — the fixed-nav overlap bug is invisible on a tall desktop viewport and eats most of the screen at 375×812.

### Guarding the model

`priority` is hand-written but must equal `bandFor(scores, pin)`. Nothing enforces that at the type level, so `scripts/check-backlog.ts` re-derives every band and fails on drift. It also enforces structural invariants: unique ids, scores in range, effort consistent with the cheapness score, a rationale on every moved or pinned item, ≥2 references and ≥2 test steps and ≥2 pass criteria per item, and no test step with an empty expected result.

```bash
npx tsx scripts/check-backlog.ts
```

It caught six genuinely thin entries on first run — four test steps with non-assertions like "Passes." and two items with a single acceptance criterion — all since fixed.

---

## 20. Sequential build plan

Ordered so the site becomes patient-ready as fast as possible. Items 1–4 need **no new content from the practice** and are all Small.

**Wave 1 — stop the bleeding (no practice input needed).**
1. Fix the three 404 nav routes
2. Verify-or-remove pass on all placeholder claims
3. Single phone number, NAP-consistent everywhere
4. LocalBusiness/Dentist schema, `robots.ts`, `sitemap.ts`, per-page metadata

**Wave 2 — the shell (needs practice input).**
5. `PageShell` component
6. `/insurance-new-patients`
7. `/emergency`
8. Arrival and transit depth
9. Form confirmation and error states

**Wave 3 — credibility and compliance.**
10. `/about`
11. `/services` minimum
12. Privacy and accessibility pages
13. Real testimonials
14. WCAG 2.2 AA + mobile QA pass · **← patient-ready line**

**Wave 4 — conversion (P1).**
15. Online booking (Tab32) — *the largest single expected gain*
16. Anxiety content · 17. Concern-led entry · 18. Per-service pages · 19. Family clarity · 20. Cost explainer · 21. GBP reviews · 22. Aftercare and records

**Wave 5 — optimization (P2).** 23. Language support · 24. Pre-visit forms · 25. Neighborhood content · 26. Analytics depth

---

## 21. First-pass modification checklist

Concrete actions. Full detail per item at `/backlog`.

- [ ] **P0/S** — Remove `/services`, `/about`, `/insurance-new-patients` from `nav` in `content.ts`, or ship minimum pages. No nav link may 404.
- [ ] **P0/S** — Delete or verify every `<Placeholder>`: carriers, offers, review count, service areas, credentials, testimonial quotes.
- [ ] **P0/S** — One phone number sitewide, matching the Google Business Profile.
- [ ] **P0/S** — Add `LocalBusiness`/`Dentist` JSON-LD, `robots.ts`, `sitemap.ts`, per-page metadata.
- [ ] **P0/M** — Build `/insurance-new-patients`: accepted-vs-in-network paragraph, verified carriers + verify-your-plan caveat, when estimates are possible, no-insurance path, what to bring, first-visit walkthrough.
- [ ] **P0/M** — Build `/emergency`: three-tier guidance, ADA-consistent first aid, honest after-hours statement, one-tap call. No invented response times.
- [ ] **P0/M** — Expand arrival: entrance, Suite A and floor, RapidRide D + routes 1/2/3/4/13, Monorail-from-Westlake, honest street parking, one-tap directions and call.
- [ ] **P0/S** — Add form success and error states naming what happens next and by when; add an optional "anything we should know?" field.
- [ ] **P0/M** — Build `/about` from Dr. Dubey's existing real bio; add team once names are confirmed.
- [ ] **P0/S** — Add `/privacy` and `/accessibility`; link both in the footer.
- [ ] **P0/S** — Replace all three placeholder testimonials with real reviews, first-name + last-initial.
- [ ] **P0/M** — WCAG 2.2 AA pass: contrast, 44px targets, visible focus, keyboard order, alt text, reduced motion, 320px reflow.
- [ ] **P1/L** — Online booking via the Tab32 service layer, including failure states.
- [ ] **P1/S** — Anxiety strip: one honest, non-judgmental paragraph plus the form field.
- [ ] **P1/S** — Concern-led entry: six plain-language links into services. Static links only.
- [ ] **P1/M** — Per-service pages with 2–3 FAQ pairs each and `FAQPage` schema.

---

## 22. Claims requiring practice verification

**Nothing on this list may be published until Akash or Dr. Dubey confirms it.** Every item is currently in `content.ts`, most already flagged there.

| # | Claim | Where | Risk if wrong |
|---|---|---|---|
| 1 | Six insurance carriers / network status | `insuranceCarriers` | **Highest** — surprise balance bills |
| 2 | $149 new-patient offer | `offers.newPatient` | Pricing misrepresentation |
| 3 | $500 off Invisalign | `offers.invisalign` | Pricing misrepresentation |
| 4 | 4.9★ / 487 reviews | `reviews` | Must match the live GBP exactly |
| 5 | Three testimonial quotes | `testimonials` | Currently placeholders — HIPAA if invented |
| 6 | Which phone number is correct | `contact.phone` | NAP inconsistency; missed calls |
| 7 | Five of six service areas | `serviceAreas` | Unverifiable local claim |
| 8 | Three credential lines | `credentials` | Professional misrepresentation |
| 9 | "In-network with most plans" | `differentiators[2]` | Same as #1 |
| 10 | Same-day appointment availability | `differentiators[0]` | Availability promise |
| 11 | Interest-free financing | `faqs` | Financial-terms claim |
| 12 | $50 referral credit | `faqs` | Offer terms |
| 13 | 48-hour cancellation policy | `faqs` | Policy claim |
| 14 | Sedation / anxiety options | `faqs` | **Clinical claim** |
| 15 | First-visit age recommendation | `faqs` | Clinical guidance |
| 16 | Emergency same-day accommodation | `faqs` | Availability promise |
| 17 | Hours (Tue–Fri, 7:00–4:30) | `hours` | Must match GBP |
| 18 | Names and roles of two staff | `heroPhotos` alt text | Currently role-described, not named — correct |
| 19 | Languages spoken | Not yet published | Don't publish until confirmed |
| 20 | Step-free access / accommodations | Not yet published | **Accessibility claim — verify before publishing** |

---

## 23. Open questions

1. **Which phone number is correct?** Blocks NAP consistency and item #6 above.
2. **Actual in-network carrier list?** Blocks the highest-value P0 content item.
3. **Are the $149 and $500 offers current?** They currently render as visible placeholders in production.
4. **Real Google rating and review count**, and permission to quote three reviews first-name + last-initial?
5. **Tab32 service layer** — hosting, auth, response shape, instrumentation hooks. Blocks the single highest-value P1 item. *(Open since the original build spec.)*
6. **After-hours reality** — voicemail, answering service, or nothing? Determines what the emergency page can honestly say.
7. **Physical arrival specifics** — which entrance, what floor, step-free access, elevator?
8. **Languages spoken by the team?**
9. **Team names and roles** — unblocks `/about`.
10. **Confirmed service-area list?**
11. **CMS decision** — still open from the platform pivot; `content.ts` is the current single source of truth.
12. **Custom domain** — production is still on the default Vercel subdomain, which weakens NAP consistency.

---

## 24. Source appendix

Accessed 2026-08-30. Grouped by evidence tier.

**Clinical / peer-reviewed (strongest)**
- ADA MouthHealthy, Dental Emergencies — https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies — first-aid guidance; the aspirin-on-gum warning
- JADA, Dental emergency procedures — https://jada.ada.org/article/S0002-8177(14)63508-X/fulltext — urgent-management framing
- JADA, Antibiotic use for urgent pulpal/periapical pain and swelling — https://jada.ada.org/article/S0002-8177(19)30617-8/fulltext — red-flag symptom framing
- Journal of Dental Hygiene, Prevalence of Dental Anxiety in Dental Practice Settings — https://jdh.adha.org/content/91/1/30 — ~19% adults; ~49% among emergency patients; avoidance rates
- Estimated prevalence of dental fear in adults: systematic review and meta-analysis — https://www.sciencedirect.com/science/article/abs/pii/S0300571221000531 — 15.3% high fear
- Dental anxiety, self-reported oral health and prior unpleasant experiences (adult e-survey) — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11356593/ — avoidance correlates with anxiety
- Frontiers in Oral Health, origins of dental anxiety and coping — https://www.frontiersin.org/journals/oral-health/articles/10.3389/froh.2025.1589764/full

**Professional guidance**
- ADA News, Dear ADA: Out-of-network providers — https://adanews.ada.org/ada-news/2025/november/dear-ada-out-of-network-providers/ — documented site-vs-directory mismatch and balance bill
- ADA, Managing Dental Practice Online Reviews — https://www.ada.org/resources/practice/legal-and-regulatory/managing-dental-practice-online-reviews

**Standards / accessibility**
- Healthcare Website Accessibility: WCAG 2.2 Guide for Medical Practices — https://envydesign.co/healthcare-website-accessibility-wcag-2-2/
- Healthcare Website Accessibility: HIPAA, ADA, WCAG 2.2 — https://www.allaccessible.org/blog/healthcare-website-accessibility-hipaa-ada-compliance
- What WCAG 2.1 AA Means for Healthcare Organizations in 2026 — https://pilotdigital.com/blog/what-wcag-2-1aa-means-for-healthcare-organizations-in-2026/ — HHS Section 504 May 2026 deadline; **applicability to a private practice needs legal confirmation**

**Local — Seattle / Queen Anne**
- Lower Queen Anne, Seattle (Wikipedia) — https://en.wikipedia.org/wiki/Lower_Queen_Anne,_Seattle
- Seattle/Queen Anne–South Lake Union travel guide — https://en.wikivoyage.org/wiki/Seattle/Queen_Anne-South_Lake_Union
- CityPASS, Visit Seattle's Lower Queen Anne — https://www.citypass.com/articles/seattle/visit-seattles-lower-queen-anne — Monorail ~2 min to Westlake
- Moovit, transit to Queen Anne Avenue North — https://moovitapp.com/index/en/public_transit-Queen_Anne_Avenue_North-Seattle_Tacoma_Bellevue_WA-street_2077970-522 — RapidRide D; routes 1/2/3/4/13
- Seattle Office of Immigrant and Refugee Affairs, Language Access — https://www.seattle.gov/iandraffairs/LA
- King County Language Access Program — https://kingcounty.gov/en/dept/executive/governance-leadership/equity-social-justice/office-of-equity-racial-social-justice/coalitions-programs/language-access
- EthnoMed, Collaborative Strategies for Language Access in Seattle & King County — https://ethnomed.org/wp-content/uploads/2020/01/Collaborative-Strategies-For-Language-Access-In-Health-Care-In-Seattle-King-County.pdf

**Practice-generated — design precedent only, not patient evidence**
- Dentistry on Queen Anne, New Patients / First Visit — https://www.dentistryonqueenanne.com/patient-information/new-patients/ · https://www.dentistryonqueenanne.com/patient-information/first-visit/ — first-visit content template; minors and x-ray-transfer policies
- Belltown Modern Dentistry — https://www.belltownmoderndentistry.com/
- Seattle Dental Co. (Queen Anne) — https://www.seattledentalco.com/
- Queen Anne Dental Group — https://www.queenannedentalgroup.net/index.html
- Innovative Dentistry (Queen Anne / Belltown) — https://innovativedentistry.com/

**Patient-generated — themes only**
- Blind, Seattle dentist and orthodontist recommendation threads — https://www.teamblind.com/post/good-dentists-orthodontists-in-seattle-dwpkdaqc · https://www.teamblind.com/post/orthodontist-recommendations-in-seattle-vvbpkvtt — *isolated signal:* professionals seek peer recommendations locally
- Quora, "accepts insurance" vs in-network — https://www.quora.com/If-a-dentists-office-says-they-accept-your-insurance-can-you-assume-they-are-in-network-If-they-are-not-and-they-didnt-tell-you-are-they-liable-for-the-difference-you-owe-versus-being-in-network — *repeated theme*
- ConsumerAffairs, Gentle Dental reviews — https://www.consumeraffairs.com/dentists/gentle-dental.html — billing-surprise and communication themes

**Vendor / marketing — directional only, every figure unverified**
- Dental Economics, "I know why your patients are leaving" — https://www.dentaleconomics.com/practice/article/14068333/i-know-why-your-patients-are-leaving
- Scheduling Institute, losing 1 in 3 new-patient calls — https://schedulinginstitute.com/blog/why-your-dental-practice-is-losing-1-in-3-new-patient-calls-and-doesnt-know-it/
- Peerlogic, missed dental phone calls — https://www.peerlogic.com/post/turning-missed-dental-phone-calls-into-profit
- Crown Council, what patients wish you knew about booking — https://www.crowncouncil.com/blog/what-your-patients-wish-you-knew-about-booking-appointments
- 8th & Palm, what patients look for before they book — https://www.8thpalm.com/blog/dental-practice-website-that-converts/
- Teero, common dental insurance misconceptions — https://www.teero.com/blog/dental-insurance-misconceptions
- Rivet, importance of patient cost estimates — https://www.rivethealth.com/blog/how-important-are-patient-cost-estimates
- ScienceDirect, disclosing healthcare costs and consumer decision-making — https://www.sciencedirect.com/science/article/pii/S089970712300284X
- Marketing 360, targeting patients searching dental symptoms — https://www.marketing360.com/trends/how-do-i-target-paitents-searching-for-specific-dental-symptoms
- Web Tonic, dental local SEO statistics — https://www.webtonic.io/blog/dental-local-seo-statistics
- LogRocket, trust-driven UX — https://blog.logrocket.com/ux-design/trust-driven-ux-examples/
- Zeka Design, designing trust for travel and hospitality — https://www.zekagraphic.com/best-practices-for-travel-hospitality-websites/

**Internal (locked decisions)**
- `docs/supertooth-webflow-build-spec.md` · `docs/supertooth-build-principles.md` · `docs/supertooth-ux-flow.md` · `docs/supertooth-navigation-requirements.md` · `docs/supertooth-priority-dimensions.md` · `docs/supertooth-platform-pivot.md` · `CLAUDE.md` · `src/lib/content.ts`
