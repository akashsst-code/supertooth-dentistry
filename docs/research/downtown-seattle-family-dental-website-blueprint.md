# Website Blueprint for a Downtown Seattle Family Dental Practice
*A from-first-principles, evidence-based plan for patient needs, experience design, and an incremental build*

**Prepared:** August 2026 · **Scope:** New website designed from scratch (no current-state audit, no comparison to any existing site) · **Audience for this document:** the designer, content writer, and developer who will build the site one experience at a time.

---

## Contents

1. [Executive summary](#1-executive-summary)
2. [Research methodology and limitations](#2-research-methodology-and-limitations)
3. [Audience and scenario model](#3-audience-and-scenario-model)
4. [Complete jobs-to-be-done map](#4-complete-jobs-to-be-done-map)
5. [Patient question inventory](#5-patient-question-inventory)
6. [Patient vocabulary vs clinical vocabulary](#6-patient-vocabulary-vs-clinical-vocabulary)
7. [What patients praise / What patients abandon over](#7-what-patients-praise-what-patients-abandon-over)
8. [Patient journey and points of abandonment](#8-patient-journey-and-points-of-abandonment)
9. [Downtown Seattle-specific needs](#9-downtown-seattle-specific-needs)
10. [Family-practice needs across life stages](#10-family-practice-needs-across-life-stages)
11. [Trust and decision-making requirements](#11-trust-and-decision-making-requirements)
12. [Insurance, cost, and financial needs](#12-insurance-cost-and-financial-needs)
13. [Convenience, scheduling, and arrival needs](#13-convenience-scheduling-and-arrival-needs)
14. [Emergency and anxiety-related needs](#14-emergency-and-anxiety-related-needs)
15. [Dental website pattern frequency scan](#15-dental-website-pattern-frequency-scan)
16. [Cross-domain design inspiration](#16-cross-domain-design-inspiration)
17. [Recommended design direction](#17-recommended-design-direction)
18. [Information architecture](#18-information-architecture)
19. [Homepage blueprint](#19-homepage-blueprint)
20. [Page-level requirements](#20-page-level-requirements)
21. [Content and messaging blueprint](#21-content-and-messaging-blueprint)
22. [Reusable component inventory](#22-reusable-component-inventory)
23. [P0, P1, and P2 prioritized backlog](#23-p0-p1-and-p2-prioritized-backlog)
24. [Sequential build plan](#24-sequential-build-plan)
25. [How to run each build item with an LLM](#25-how-to-run-each-build-item-with-an-llm)
26. [First-pass website modification checklist](#26-first-pass-website-modification-checklist)
27. [Claims requiring practice verification](#27-claims-requiring-practice-verification)
28. [Open questions](#28-open-questions)
29. [Source appendix](#29-source-appendix)

---

## 1. Executive summary

A person looking for a dentist in Downtown Seattle is almost always trying to make one small, nervous decision with confidence: *"Can I trust these people with my mouth, will they take my insurance, and can I actually get in around my life?"* Everything this website must do flows from that sentence. The research below — drawn from clinical guidance, health-literacy standards, accessibility law, Seattle community discussion, local geography, and healthcare design precedent — converges on a clear, unglamorous conclusion: **the winning site is not the most interactive one; it is the clearest, calmest, fastest-to-answer, most mobile-friendly, and most honest one.**

Five findings shape the entire blueprint:

1. **Trust is decided fast and on human, verifiable signals.** Visitors judge a healthcare site's credibility in a fraction of a second, then look for real faces, real credentials, clean design, and plain language ("Designing Trust," designyourway.net, accessed Aug 2026, https://www.designyourway.net/blog/healthcare-website-design-trust/). In Seattle community threads, the single loudest patient-generated theme is *distrust of over-treatment* — people prize a dentist who is "thorough but doesn't over-prescribe" and who respects their financial timeline (r/Seattle, accessed Aug 2026, https://www.reddit.com/r/Seattle/comments/1c7ocjp/trustworthy_dentist_recs/). A family-dental site earns trust by showing who you'll see, explaining philosophy of conservative care, and never feeling sales-driven.

2. **Insurance and cost clarity is a primary job, not a footnote.** Patients are confused by the difference between a practice "accepting" insurance and being "in-network," and surprise bills / sticker shock are among the most common complaints in dentistry (Birdeye, accessed Aug 2026, https://birdeye.com/blog/dental-complaints/; Delta Dental of Washington, accessed Aug 2026, https://www.deltadentalwa.com/knowledge-center/In-Network-Care-Benefits). The site must explain network status honestly, tell patients how to verify benefits, and give uninsured patients a real path.

3. **Convenience is a Downtown-specific, mobile-first problem.** Downtown Seattle and its edges (South Lake Union, Belltown, Denny Triangle, First Hill) skew young, professional, renter-heavy, and largely car-light — Belltown is roughly 60% aged 25–44 and about three-quarters non-family households (Point2, accessed Aug 2026, https://www.point2homes.com/US/Neighborhood/WA/Seattle/Belltown-Demographics.html). Parking is scarce and paid; transit and light rail are the default (Sound Transit, accessed Aug 2026, https://www.soundtransit.org/ride-with-us/parking/parking-locations). The site must make hours, booking, transit, building entry, and one-tap calling effortless on a phone.

4. **Anxiety and emergencies need dedicated, calm, non-diagnostic pathways.** About a third of people carry dental anxiety and roughly 1 in 8 an extreme fear (Cleveland Clinic, accessed Aug 2026, https://my.clevelandclinic.org/health/diseases/22594-dentophobia-fear-of-dentists). Emergencies need a fast route to the right person plus safe first-aid guidance and a clear "when to go to the ER instead" line (Cleveland Clinic Dental Emergencies, accessed Aug 2026, https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do). Neither should require navigating the whole site.

5. **"Family" means all of life, not just kids.** Family dentistry is comprehensive, relationship-based care from childhood through older adulthood, delivered under one roof with one record (NewMouth, accessed Aug 2026, https://www.newmouth.com/dentistry/family/). The site must welcome single professionals, couples, parents, and caregivers equally, and must not assume every household has children.

**What to build, in order.** The plan translates these findings into ~26 small, independently shippable build items, prioritized P0/P1/P2. The P0 foundation makes the site *patient-ready*: a trustworthy shell and navigation; a homepage that establishes credibility and offers one obvious appointment action plus an emergency action; a real dentist/team page; a low-friction appointment-request flow; a location/parking/transit/arrival section; honest insurance and cost information; and an emergency pathway — all mobile-first and accessible (WCAG 2.2 AA). P1 adds service discovery, anxiety reassurance, new-patient onboarding, family-care clarity, and reviews. P2 adds optional polish and lower-frequency content. Throughout, the guardrail is the same: **build one clear patient experience at a time, prefer content over complexity, and never publish an unverified claim as fact.**

---

## 2. Research methodology and limitations

### Method
This report was produced with a two-stage protocol: first close information gaps by retrieving public evidence, then synthesize into an implementable plan. Retrieval covered current, publicly available sources across the categories the brief requested: clinical/professional guidance (Cleveland Clinic, CDC health literacy, HHS), patient-generated discussion (Reddit r/Seattle, Yelp topic threads), directory and booking platforms (Zocdoc, Healthgrades), insurance/financing pages (Delta Dental of Washington, DentalPlans, GoodRx), emergency-care guidance (Cleveland Clinic, TRICARE), accessibility/inclusive-design guidance (WCAG/ADA explainers), healthcare information-design writing, local geography and demographics (Seattle.gov, Sound Transit, Point2), and design precedent from healthcare and adjacent industries. More than 60 distinct sources were reviewed; each conclusion below is tagged to its evidence.

### Evidence typing (kept explicitly separate, per brief)
- **Patient-generated evidence (PG):** what real patients say (Reddit, Yelp). Strongest for *needs, anxieties, and language*, but non-representative.
- **Practice/vendor-generated (PR):** dental-practice blogs and software vendors. Useful for *what practices do*; treated with bias caution — never as patient demand evidence.
- **Professional/clinical guidance (CG):** Cleveland Clinic, CDC, HHS. Strongest tier.
- **Design precedent/research (DP):** healthcare-design writing and cross-industry patterns. Used for *principles*, not imitation.
- **Researcher interpretation & recommendations:** clearly my synthesis, labeled as such in recommendations.

### Evidence-strength labels (used throughout; no fabricated numbers)
Where quantitative demand data is unavailable, findings use responsible qualitative labels: **Repeated theme**, **Commonly observed concern**, **Emerging theme**, **Isolated signal**, **Insufficient evidence**, **Conflicting evidence**. The report does **not** invent search volumes, review counts, rankings, market share, or demand percentages. Where a source states a statistic, it is attributed and, if commercially motivated, bias-flagged.

### Limitations and residual risks (pre-mortem)
Imagining this plan failed a few months after launch, the likeliest causes would be: **(a)** treating vendor scheduling statistics ("most patients prefer online booking") as if they were neutral patient evidence — so those numbers are bias-flagged and the design keeps a human phone path; **(b)** publishing plausible-sounding but unverified specifics about the practice (insurance networks, hours, sedation, prices, credentials) — so every such item is a bracketed placeholder routed to a verification checklist; **(c)** designing only for the tech professional and alienating anxious, older, uninsured, disabled, or limited-English patients — so scenarios are used to find *shared* inclusive experiences; and **(d)** over-engineering (symptom checkers, personalization, clever navigation) that adds complexity without patient value — explicitly deferred. Other limitations: patient-generated sources are self-selected and skew toward strong experiences; national cost and scheduling figures must be localized/verified before they appear as copy; neighborhood demographics come from secondary census aggregators and are directional, not exact. No data specific to the (hypothetical) practice was available, so the plan is a reusable blueprint plus a rigorous list of things the practice must confirm before publishing.
## 3. Audience and scenario model

**Principle:** design for *shared* needs first. The scenarios below span the full population the brief requires — professionals *and* individuals, parents *and* child-free households, all ages, anxious and confident, insured and not, disabled, and limited-English. The striking result of laying them side by side is how much they overlap: nearly everyone needs fast trust signals, honest cost/insurance information, a low-friction way to reach a human or request a time, and clear arrival logistics. Those shared needs become the P0 foundation; segment-specific content becomes contextual blocks, not separate mini-sites.

### Primary audiences
- **Downtown professionals** (work patterns like Amazon/Meta staff): time-poor, digital-first, insured through an employer, value efficiency, predictability, proximity to work/transit, and respect for their time. *Not* the only audience.
- **Individuals seeking a long-term dentist** (incl. new-to-Seattle arrivals) who want a relationship, not a transaction.
- **Parents and caregivers** coordinating care for children, partners, or aging parents.
- **Couples/roommates/households** coordinating two-plus people's care.
- **Anxious or lapsed patients** returning after avoidance.
- **Urgent patients** in pain right now.
- **Cost-sensitive patients**: uninsured, underinsured, or unsure of coverage.
- **Patients with disabilities / assistive-technology users.**
- **Patients with limited English proficiency (LEP).**

### Needs matrix (12 required scenarios)
Legend for CTA = the single most useful next action to offer.

| # | Scenario & trigger | Top questions | Desired outcome | Primary concern | Trust requirement | Content needed | Interaction needed | Best primary CTA | Mobile-specific need | Accessibility consideration | Likely abandonment point | Website opportunity |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Busy downtown professional** booking a routine cleaning; trigger: overdue checkup, employer dental benefits | Do they take my insurance? Early/late hours? How close to work/transit? Can I book without calling? | A confirmed time around work | Wasting time; phone tag | Efficient, modern, credible | Hours, in-network list, location/transit, online request | Request/book in <2 min | **Request an appointment** | One-tap book + add-to-calendar | Keyboard + screen-reader friendly form | Phone-only booking; unclear hours | 24/7 request form + clear hours + transit line |
| 2 | **Parent coordinating** care for 2+ family members; trigger: school/benefit year, family overdue | Do you see kids and adults? Can we do back-to-back visits? What ages? | One practice for everyone, fewer trips | Juggling schedules | Good with kids *and* adults | Family/life-stage care, ages served, coordinating visits | Request multiple/family visits | **Request family appointment** | Note field for multiple patients | Clear labels; simple forms | No mention of children/families | "Care for your whole household" module |
| 3 | **New-to-Seattle adult** seeking a long-term dentist; trigger: recent move | Are you accepting new patients? Who are the dentists? Do you take my new plan? | A trusted ongoing dentist | Choosing blind in a new city | Established, legitimate, welcoming | New-patient page, dentist bios, insurance, reviews | Read bios; request first visit | **New patient? Start here** | Fast-loading bios + map | Semantic headings for scanning | No "accepting new patients" clarity | New-patient onboarding path |
| 4 | **Anxious / lapsed patient**; trigger: pain or guilt after years away | Will I be judged? Will it hurt? Can I go slow? What happens first? | Courage to book without shame | Judgment, pain, loss of control | Warm, non-judgmental, in-control | Anxiety/comfort page, what-to-expect, comfort options [verify] | Read reassurance; low-pressure contact | **Talk to us first** (call/message) | Tap-to-call; short calming copy | Calm color/contrast; no autoplay | Clinical, cold, or sales tone | Dedicated comfort/anxiety pathway |
| 5 | **Urgent dental issue**; trigger: broken tooth, swelling, severe pain | How fast can I be seen? Who do I call now? Is this an ER situation? | Seen fast / safe next step | Delay; not knowing severity | Responsive, reachable | Emergency page: call, hours, safe first-aid, ER guidance | One-tap call immediately | **Call now — dental emergency** | Sticky tap-to-call + hours | Plain language; high contrast | Buried phone number | Always-visible emergency access |
| 6 | **Insurance-uncertain** patient; trigger: has a plan, unsure if covered | Are you in-network for my plan? What's "accepted" vs "in-network"? | Confidence about coverage | Surprise bills | Transparent, honest | Insurance explainer + how to verify + plans listed [verify] | Read; submit plan to verify | **Check my coverage** | Simple form; no jargon | Readable tables; labeled fields | Vague "we accept most insurance" | Honest network explainer + verify path |
| 7 | **Uninsured** patient; trigger: cost fear, skipped care | What will it cost? Any membership/financing? Cheapest way in? | A realistic, affordable path | Cost; embarrassment | Non-judgmental, upfront | No-insurance options: membership/financing [verify], new-patient exam info | Read options; contact | **See payment options** | Concise, scannable | Plain numbers ("one in four") | Only "insurance accepted" | Uninsured-friendly financial page |
| 8 | **Restorative decision** (crown/implant/root canal); trigger: dentist said it's needed / pain | What's involved? How many visits? Cost? Is it necessary? | Understand & consent confidently | Being oversold | Conservative, explains options | Service page in plain terms + what-to-expect | Read; ask; request consult | **Ask about this treatment** | Scannable steps | Reading-level ≤8th grade | Jargon; scare tactics | Plain, non-pushy service explainer |
| 9 | **Cosmetic explorer** (whitening/Invisalign/veneers); trigger: self-image, event | What are my options? Cost/commitment? Low-pressure? | Explore without pressure | Being pressured/judged | Credible, no hard sell | Cosmetic overview + consultation expectations | Request a consultation | **Book a consultation** | Simple gallery [verify consent] | Alt text describes clinical purpose | Salesy, aspirational-only tone | Low-pressure consultation offer |
| 10 | **Older adult / caregiver**; trigger: denture/implant need, coordinating a parent's care | Do you treat seniors? Accessible? Can I help book for someone? | Coordinated, dignified care | Complexity; access | Patient, respectful | Life-stage care, accessibility of suite [verify], contact | Call or message; book for another | **Call to coordinate care** | Large tap targets; tap-to-call | Larger text; strong contrast | Youth-only imagery | Life-stage + caregiver-friendly content |
| 11 | **Assistive-technology user**; trigger: any of the above, using screen reader/keyboard | Can I use this site at all? Book, read, contact? | Complete tasks independently | Inaccessible forms/widgets | Genuinely accessible | Every page WCAG 2.2 AA | Keyboard/screen-reader flows | (Same CTAs, fully accessible) | Accessible on mobile too | Labels, focus order, contrast, alt text | Inaccessible scheduler/PDF/carousel | Accessibility as baseline, not add-on |
| 12 | **Limited-English / limited time or dental knowledge**; trigger: needs care, English not first language | Can I understand this? Who can help in my language? | Understand and act | Confusion; being lost | Clear, human, inclusive | Plain language; language help note [verify]; phone option | Read simply; call for help | **Call us** / request | Simple mobile layout | Plain language; translate-friendly markup | Dense jargon; English-only assumptions | Plain-language + language-support signal |

### Shared needs that become the foundation
Across all 12: (1) fast, human **trust** signals; (2) honest **insurance/cost** information; (3) a **low-friction path to a human or a requested time**; (4) clear **arrival logistics**; (5) **mobile-first + accessible** everything; (6) **plain, calm language**. These are the P0 spine of the site. Segment-specific reassurance (anxiety, family, uninsured, cosmetic) attaches as contextual blocks — not as twelve separate experiences.
## 4. Complete jobs-to-be-done map

This model is organized around **patient progress**, not pages or procedures. Each job family lists individual jobs with: the situation/trigger, the functional job, the emotional and social jobs, the questions that must be answered, the barrier/anxiety, the website's appropriate (non-diagnostic) response, the recommended call to action, the evidence strength, and priority. A guiding constraint from the brief and the evidence: **the site must never act as a diagnostic tool.** It helps patients recognize the *next safe action*, not reach medical certainty.

### A. Recognizing and understanding a dental need

*Narrative:* People often arrive unsure whether a symptom matters. The job is to help them decide "act now, book soon, or monitor" and understand a treatment *category* without self-diagnosing. Clinical sources frame this well: not every problem is an emergency, but certain signs (uncontrolled bleeding, swelling, severe pain) need prompt attention (Cleveland Clinic, accessed Aug 2026, https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do).

| Job (functional) | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Appropriate website response (non-diagnostic) | Recommended CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Decide if a symptom needs attention | Ache/sensitivity started | Feel reassured, not alarmist | Is this serious? Wait or act? | Fear of overreacting or underreacting | Plain "signs it's urgent vs. can wait" list linking to emergency page; encourage contacting the practice | Contact us / Emergency guidance | CG (Cleveland Clinic, TRICARE) — Repeated theme | P0 (emergency guidance); P1 (symptom-orientation content) |
| Judge urgency | Pain/swelling escalating | Avoid panic; keep control | ER or dentist? How fast? | Not knowing severity | Clear triage language: what to do now, when the ER is the right call | Call now | CG — SUPPORTED | P0 |
| Understand a treatment category | Told they "might need a crown/root canal" | Not feel ignorant or oversold | What is this, roughly? | Jargon; being upsold | Plain-language service explainers (what it is, why, typical steps) — no diagnosis | Learn about [service] | CG/PR — Commonly observed | P1 |
| Choose "contact now vs monitor" | Mild, intermittent issue | Feel responsible, not neurotic | Should I book or watch it? | Guilt/uncertainty | "Not sure? Send us a message / request a visit" low-pressure path | Request a visit | PG/CG — Emerging theme | P1 |

**Guardrail:** Do **not** build a symptom checker. Evidence supports simple, safe orientation content and an easy path to a human — not automated triage.

### B. Finding a dentist

*Narrative:* The decision to pick a practice hinges on credibility, insurance fit, convenience, and "do they serve people like me." Directory guidance lists credentials, in-network status, location/hours, communication, and services as the core comparison factors (Zocdoc, accessed Aug 2026, https://www.zocdoc.com/blog/guides/how-to-find-a-good-dentist/). New arrivals to Seattle explicitly ask communities for a "thorough but not over-prescribing" dentist (r/Seattle, accessed Aug 2026).

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Find a credible dentist near work/home | Overdue or relocating | Confidence in the choice | Who are they? Legit? Close? | Choosing blind | Dentist/team bios, credentials [verify], map/transit, reviews | Meet the team | PG+PR — Repeated theme | P0 |
| Confirm accepting new patients | Ready to commit | Not waste effort | Can I even join? | Uncertainty/rejection | Explicit "accepting new patients" status [verify] + new-patient page | New patient? Start here | PR — Commonly observed | P0 |
| Confirm "serves patients like me" | Anxious/older/child/LEP | Belonging | Do they treat my situation/age? | Feeling out of place | Family/life-stage + anxiety + inclusive language | See who we care for | PG — Repeated theme | P1 |
| One practice for the household | Coordinating family | Simplify life | Can everyone go here? | Multiple providers | Family-care module; back-to-back visits | Care for your household | PR (NewMouth) — SUPPORTED | P1 |
| Replace a former dentist / resume care | Moved or lapsed | Fresh start without shame | Easy to switch? Transfer records? | Hassle/embarrassment | New-patient steps: records transfer, what to bring | Start as a new patient | PR — Commonly observed | P1 |

### C. Evaluating trust and clinical credibility

*Narrative:* This is the emotional heart of the decision. Credibility is judged in milliseconds on visual and human signals (designyourway.net, accessed Aug 2026), and the strongest *patient-generated* Seattle theme is trusting a dentist who is conservative and honest rather than sales-driven (r/Seattle, accessed Aug 2026). Cleanliness, clear communication, and listening recur as decision factors (Zocdoc; Dentist Decoded, accessed Aug 2026, https://dentistdecoded.com/articles/how-to-choose-right-dentist/).

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Know who will treat me | Pre-booking | Feel safe with a person | Who is the dentist? Experience? | Faceless practice | Real photos + bios + credentials [verify] | Meet your dentist | DP+PG — SUPPORTED | P0 |
| Judge if they listen/explain | Prior rushed care | Feel respected | Will they explain options? | Being talked over | Stated care philosophy; "we explain before we treat" | How we care | PG — Repeated theme | P0/P1 |
| Confirm safe, clean, professional | Infection-control worry | Peace of mind | Is it clean/modern? | Doubt | Real office photos; sterilization note [verify] | Tour our office | PR/DP — Commonly observed | P1 |
| Understand treatment philosophy | Fear of over-treatment | Trust intentions | Conservative? Options-first? | Upselling distrust | Explicit conservative-care statement; second-opinion welcome | Our approach | PG — Repeated theme (strong) | P0/P1 |
| Evaluate reviews without overwhelm | Reading Yelp/Google | Reassurance, not noise | Are they consistently good? | Review overload/fakes | Curated, honest review snippets + link to full profiles | Read patient reviews | PG/DP — Commonly observed | P1 |
| Confirm legitimacy/established | Skeptical | Avoid a bad actor | Licensed? Real? | Scam fear | Credentials, license info [verify], address, real team | About the practice | PR — Commonly observed | P0 |
| Understand referrals / out-of-scope | Complex need | Trust they won't overreach | Will they refer if needed? | Being kept in-house for money | "When we refer to specialists" note | (contextual) | PG — Emerging theme | P2 |

### D. Understanding insurance, cost, and payment

*Narrative:* Cost is the most cited complaint category and a top reason care is skipped (Birdeye, accessed Aug 2026; Aspen Dental/PR Newswire, accessed Aug 2026). Patients confuse "accepted" with "in-network," which drives surprise bills; in-network means contracted, discounted fees (Delta Dental of Washington, accessed Aug 2026, https://www.deltadentalwa.com/knowledge-center/In-Network-Care-Benefits; Ocean Breeze Prosthodontics, accessed Aug 2026). Honest, plain explanation is the differentiator.

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Know if my insurance is accepted / in-network | Has a plan | Avoid surprise bills | Are you in-network for X? | "Accepted" ≠ "in-network" confusion | Plain explainer of the difference; plans listed [verify] | Check my coverage | CG/PR — SUPPORTED | P0 |
| Verify benefits before visiting | Pre-appointment | Feel prepared | How do I confirm coverage? | Doing it wrong | "How to verify your benefits" steps; offer to help | We'll help verify | PR — Commonly observed | P1 |
| Estimate my responsibility | Facing treatment | No sticker shock | What will I pay? | Unknown cost | Explain what an estimate can/can't cover; offer written estimate | Ask for an estimate | PR (Birdeye) — SUPPORTED | P1 |
| Avoid unexpected charges | Past bad billing | Trust the bill | Any hidden costs? | Betrayal | Cost-transparency statement; discuss cost before treatment | (contextual) | PR — SUPPORTED | P1 |
| Pay without insurance | Uninsured | Dignity; affordability | Options if I have no plan? | Shame/cost | Membership/financing options [verify]; new-patient exam info | See payment options | PR (DentalPlans, GoodRx) — SUPPORTED | P0/P1 |
| Know payment methods/financing | Budget-planning | Control | Cards? Plans? CareCredit? [verify] | Can't pay upfront | Payment methods & financing list [verify] | Payment & financing | PR — Commonly observed | P1 |
| Know what to bring re: insurance | Booking first visit | Be prepared | What info do you need? | Forgetting docs | New-patient checklist: card, ID, records | New-patient checklist | PR (drparrella) — SUPPORTED | P1 |

### E. Overcoming dental anxiety

*Narrative:* Anxiety is common (~36% of people; ~12% extreme) and specific (needles, drill noise, pain, gagging, embarrassment, loss of control, past trauma) (Cleveland Clinic Dentophobia; Healthline, accessed Aug 2026). The evidence-based antidotes are communication, being told what will happen, permission to pause, distraction, and non-judgment (Healthline, accessed Aug 2026). The website's job is reassurance and control, delivered calmly.

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Return after avoidance without shame | Guilt/pain after years away | Feel welcomed, not judged | Will they judge me? | Shame | Explicit non-judgment statement; "it's okay if it's been a while" | You're welcome here | CG/PG — SUPPORTED | P1 |
| Know what will happen | Fear of the unknown | Regain control | What happens step by step? | Uncertainty | Plain "what to expect" walk-through | What to expect | CG — SUPPORTED | P1 |
| Communicate anxiety in advance | Wants to warn the team | Be understood | Can I tell you I'm scared? | Not being heard | Message/notes field; "tell us how we can help you feel comfortable" | Tell us your concerns | CG/PG — Repeated theme | P1 |
| Understand comfort/sedation options | Needs reassurance | Safety | Do you offer numbing/sedation? [verify] | Pain fear | Comfort-options list [verify] — no promises unverified | Comfort options | CG — Commonly observed | P1/P2 |
| Retain control during the visit | Panic mid-visit | Agency | Can I pause? Signal? | Feeling trapped | "You can stop us anytime" / stop-signal policy [verify] | (contextual) | CG — SUPPORTED | P1 |
| Ask questions without feeling rushed | Time pressure fear | Respect | Will they take time? | Being hurried | Care philosophy: unhurried, questions welcome | (contextual) | PG — Repeated theme | P1 |

### F. Handling urgent dental needs

*Narrative:* Emergencies need the *right person fast* plus safe interim guidance and a clear ER boundary. Clinical guidance: call the dentist first; go to the ER for facial-bone fracture or uncontrolled bleeding; ERs don't do fillings/crowns (Cleveland Clinic; TRICARE, accessed Aug 2026, https://newsroom.tricare.mil/News/TRICARE-News/Article/4308160). Specific first-aid (knocked-out tooth held by the crown, kept in milk, reinserted within an hour) is well established (Cleveland Clinic, accessed Aug 2026).

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Get help for pain/swelling/broken tooth | Acute event | Relief; not alone | Can you see me today? | Delay | Emergency page: how to reach us now, same-day policy [verify] | Call now — emergency | CG — SUPPORTED | P0 |
| Reach the right person fast | Mid-crisis | Efficiency | Who do I call? After hours? | Navigating a whole site | Sticky tap-to-call + after-hours instructions [verify] | Call now | CG/DP — SUPPORTED | P0 |
| Know what info to give | Calling in | Be useful | What should I tell you? | Fumbling | "What to have ready" short list | (contextual) | CG — Commonly observed | P1 |
| Know when to seek the ER instead | Severe symptoms | Safety | Is this an ER situation? | Wrong venue | Clear ER-instead triage line | (contextual) | CG — SUPPORTED | P0 |
| Safe first-aid while waiting | En route | Reduce harm | What can I do now? | Making it worse | Non-diagnostic first-aid steps (knocked-out tooth, bleeding, pain) citing clinical sources | (contextual) | CG — SUPPORTED | P0/P1 |
### G. Discovering appropriate services

*Narrative:* Patients look for services in different mental models — by **symptom** ("my tooth hurts"), **concern/goal** ("I want a straighter smile"), **treatment name** ("root canal"), **urgency** ("emergency"), **life stage** ("kids' dentist"), or **dentist recommendation** ("they said I need a crown"). The evidence does *not* support a complex symptom checker; it supports a **simple dual model**: browse by common **concern/goal** and by **treatment name**, with a clear emergency shortcut and a family/life-stage entry. Family practices legitimately span exams/cleanings, preventive, fillings, crowns, root canals, extractions, gum care, implants, restorative, cosmetic, Invisalign/ortho, whitening, veneers, emergency, and care for every age (NewMouth, accessed Aug 2026, https://www.newmouth.com/dentistry/family/).

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Find care by concern/goal | "Tooth hurts" / "want whiter teeth" | Feel understood in my words | Which service fits my problem? | Not knowing the clinical name | Lightweight "browse by concern" links mapping plain concerns → service pages | Find care for your concern | DP/PR — Emerging theme | P1 |
| Find a named treatment | Told the term | Efficiency | Do you do X? | Missing service | Clear services list/overview | See our services | PR — Commonly observed | P0/P1 |
| Find urgent care fast | Pain now | Speed | Emergency? | Slow discovery | Emergency shortcut in nav + homepage | Dental emergency | CG — SUPPORTED | P0 |
| Find age/life-stage care | Kids/teens/seniors | Belonging | Do you treat this age? | Age-inappropriate practice | Life-stage care section | Care by life stage | PR — SUPPORTED | P1 |
| Explore aesthetic outcomes | Self-image | Low pressure | What could my smile look like? | Feeling vain/pressured | Cosmetic overview + consultation | Explore cosmetic options | PR — Commonly observed | P1/P2 |

**Recommended model (simplest that works):** a **services overview** page + individual **service pages**, plus a small **"browse by concern"** module (a curated list, not an interactive diagnostic). Defer anything more complex until proven necessary.

### H. Making dental care convenient

*Narrative:* This is where Downtown Seattle specifics dominate. The population skews young, professional, renter-heavy, and car-light (Point2 Belltown/South Lake Union, accessed Aug 2026). Parking is scarce and paid; light rail (1 Line: Westlake, Symphony/University St, Pioneer Square, Intl District stations) and the South Lake Union Streetcar are primary access (Sound Transit; Seattle.gov Streetcar, accessed Aug 2026). Convenience jobs are also digital: patients want to book/reschedule around work without phone tag (vendor sources report a strong preference for online scheduling — bias-flagged; Dental Economics, Solutionreach, accessed Aug 2026).

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Schedule around work/family | Limited free time | Control of my calendar | Early/late/weekend hours? | Only 9–5 phone booking | Clear hours + 24/7 request form + phone option | Request an appointment | PR (vendor, bias-flagged) — Commonly observed | P0 |
| Book / request / reschedule / cancel | Plans change | Low friction | Can I change it easily? | Rigid process | Request + easy reschedule/cancel instructions | Manage your appointment | PR — Commonly observed | P0/P1 |
| Judge if location is practical | Deciding | Save time | Near my work/home/transit? | Hard-to-reach office | Map, neighborhood, transit lines, walk note | See location & transit | GOV/DP — SUPPORTED | P0 |
| Solve parking | Driving in | Avoid stress/cost | Where do I park? Cost? Validation? [verify] | Downtown parking dread | Parking options + validation [verify] + garage names | Parking & directions | GOV/PG — SUPPORTED | P0 |
| Use transit/light rail | Car-light | Easy arrival | Nearest station/stop? Walk time? | Wayfinding | Nearest Link station + streetcar/bus + walking directions | Transit directions | GOV — SUPPORTED | P0 |
| Find building entrance/floor/suite | Arriving | Not get lost | Which door/floor/suite? Accessible route? | Confusing building | Building-entry instructions + accessible route [verify] | Arrival instructions | PG/DP — Repeated theme | P0 |
| Do it from mobile | On the go | Speed | Can I do this on my phone? | Desktop-only friction | Mobile-first everything; tap-to-call/map | (all CTAs) | DP — SUPPORTED | P0 |
| Complete forms before arrival | Pre-visit | Save time in office | Can I fill forms ahead? | Waiting-room paperwork | Downloadable/online forms (accessible) [verify] | Complete your forms | PR — Commonly observed | P1 |
| Coordinate multiple family members | Household visits | Efficiency | Can we go together? | Separate trips | Family/back-to-back booking note | Book for your family | PR — SUPPORTED | P1 |

### I. Starting as a new patient

*Narrative:* First visits are foundational and predictable: complete history/consent forms, bring insurance card + photo ID + prior records/X-rays + medication list; expect exam, X-rays, cleaning, oral-cancer screening, and a personalized plan; visits run roughly 30–45 minutes (drparrella.com; Smile Generation, accessed Aug 2026). Knowing this in advance reduces anxiety and no-shows.

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Confirm eligibility to book | Ready to join | Get started | Accepting new patients? | Uncertainty | Clear status [verify] + request path | New patient? Start here | PR — Commonly observed | P0 |
| Know what happens at visit 1 | Pre-visit nerves | Feel prepared | What will they do? | Fear of unknown | Step-by-step first-visit guide | What to expect | PR — SUPPORTED | P1 |
| Know what to bring | Packing to go | Not forget | ID? Card? Records? Meds? | Arriving unprepared | New-patient checklist | New-patient checklist | PR — SUPPORTED | P1 |
| Transfer records/X-rays | Switching dentist | Smooth switch | How do I move records? | Hassle | Records-transfer instructions [verify] | Transfer your records | PR — Commonly observed | P1 |
| Submit insurance / complete forms | Pre-visit admin | Save time | Where do I send info? | Confusing intake | Online/downloadable accessible forms [verify] | Complete forms | PR — Commonly observed | P1 |
| Prepare questions | Wants to advocate | Confidence | What should I ask? | Forgetting concerns | "Questions to bring" prompt | (contextual) | CG — Emerging theme | P2 |
| Know if treatment happens at visit 1 | Wants efficiency | Set expectations | Will you treat that day? | Wasted trip | "Usually exam first, treatment planned next" note [verify] | (contextual) | PR — Commonly observed | P1 |
| Know the next step after the exam | Post-exam | Clarity | What now? | Left hanging | Explain plan → schedule follow-up | (contextual) | PR — Commonly observed | P1 |

### J. Receiving and managing ongoing care

*Narrative:* Retention depends on the *around-the-care* experience — clear treatment plans, aftercare, knowing when to call, easy re-booking, and respectful billing (CERTIFY Health, accessed Aug 2026, https://www.certifyhealth.com/blog/challenges-faced-by-dentists-impacting-dental-patient-experience/). Much of this is operational, but the website supports it with clear pathways and information.

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Understand a treatment plan | After diagnosis | Confident consent | What, why, cost, when? | Confusion/oversell | Plain plan explanation; written estimate offer | (contextual) | PR — SUPPORTED | P1 |
| Prepare for a procedure | Pre-procedure | Reduce anxiety | How do I prepare? | Unknown | Procedure prep notes on service pages | (contextual) | PR — Commonly observed | P2 |
| Get aftercare instructions | Post-procedure | Heal safely | What now? When to call? | Missing guidance | Aftercare content + "call us if…" | Aftercare guidance | CG/PR — Commonly observed | P1/P2 |
| Return for preventive care | Recall due | Stay on track | When am I due? | Forgetting | Easy re-book + reminder sign-up [verify] | Book your next cleaning | PR — Commonly observed | P1 |
| Complete multi-visit plans | Mid-treatment | Finish confidently | What's left? | Drop-off | Clear next-step scheduling | Schedule next visit | PR — Commonly observed | P2 |
| Coordinate care for a dependent | Caregiving | Help a loved one | Can I manage another's care? | Access/permission | Caregiver-friendly contact/booking notes | Call to coordinate | PG — Emerging theme | P2 |
| Request records / update info | Admin need | Control | How do I get records / update details? | Bureaucracy | Records/updates instructions [verify] | Request records | PR — Commonly observed | P2 |
| Give feedback / refer others | Post-good-experience | Reciprocate | How do I review/refer? | Friction | Link to review + simple referral note | Share your experience | PR — Commonly observed | P2 |

### K. Exploring elective or cosmetic care

*Narrative:* Cosmetic seekers want to explore **without pressure**, understand process/commitment/maintenance, judge credibility, and start with a **low-pressure consultation** — explicitly framed as fact-finding, not commitment (SafeAndHealthyLife cosmetic guide; consultation guides, accessed Aug 2026). A crucial, trust-building message: cosmetic work sits on a **healthy foundation first**, and cosmetic care is usually **not insured**.

| Job | Situation / trigger | Emotional / social job | Key questions | Barrier / anxiety | Website response | CTA | Evidence | Priority |
|---|---|---|---|---|---|---|---|---|
| Understand options without pressure | Self-image trigger | Explore safely | What are my choices? | Hard sell | Neutral overview of whitening/Invisalign/veneers | Explore options | PR — Commonly observed | P1/P2 |
| Understand process/commitment/maintenance | Considering | Realistic expectations | Time? Upkeep? Reversible? | Regret | Plain "what you're committing to" per option | (contextual) | PR — Commonly observed | P2 |
| Judge dentist credibility for cosmetic | Quality worry | Trust the hands | Are they experienced? [verify] | Bad outcome | Case examples [verify consent] + credentials | See our work | PR/DP — Commonly observed | P2 |
| Know consultation expectations | Ready to ask | No obligation | What happens at a consult? | Feeling trapped into buying | "A consult is fact-finding, not a commitment" | Book a consultation | PR — SUPPORTED | P1 |
| Compare broad treatment paths | Deciding | Informed choice | Which path for my goal? | Overwhelm | Simple comparison (goal → typical options) | Compare options | PR — Emerging theme | P2 |
| Start low-pressure | Cautious | Ease in | Can I just talk first? | Commitment fear | Low-pressure consultation CTA | Book a consultation | PR — SUPPORTED | P1 |

### JTBD synthesis: the jobs that must be nailed first
Ranking by evidence strength × frequency × conversion impact, the **must-win jobs for the first release** are: **evaluate trust/credibility (C)**, **understand insurance & cost (D)**, **reach a human or request a time (B/H)**, **handle an emergency (F)**, and **solve arrival logistics (H)**. Anxiety (E), new-patient onboarding (I), family/life-stage (G), and service discovery (G) are close-behind P1 jobs. Ongoing-care (J) and cosmetic depth (K) are largely P2.
## 5. Patient question inventory

These are the real questions prospective and existing patients ask, harvested from Seattle patient discussion (r/Seattle, Yelp), broader patient threads (r/askdentists, r/Anxiety, r/askseattle-style relocation posts), the FAQ sets that real Downtown Seattle-area practices publish (e.g., Dentologie South Lake Union's 10-question FAQ; Integrity Dental Boston's cost/parking/pain FAQ), and directory guidance. Questions are paraphrased into the patient's own framing — not clinical language — and mapped to the page/section that must answer each. "Frequency" is a qualitative rank from observed evidence, **not** a search-volume estimate.

Legend — Evidence: **PG** patient-generated · **PR** practice/marketing · **CG** clinical guidance · **DP** design precedent. Strength: **Repeated** / **Common** / **Emerging** / **Isolated**.

### Job A — Recognizing a need / urgency
| Rank | Question (patient's words) | Evidence | Answer location |
|---|---|---|---|
| 1 | "Is this tooth pain an emergency or can it wait?" | CG Repeated (Cleveland Clinic; TRICARE) | Emergency page: "urgent vs. can-wait" list |
| 2 | "My tooth broke / got knocked out — what do I do right now?" | CG Repeated | Emergency page: safe first-aid steps |
| 3 | "Do I need to be seen, or just watch it?" | PG/CG Emerging | Emergency page + "contact us" low-pressure path |
| 4 | "They said I might need a crown/root canal — what even is that?" | PG Common (askdentists) | Service page, plain-language explainer |

### Job B — Finding a dentist
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Are you accepting new patients?" | PR Repeated (nearly every site answers this) | Header/Home badge + New Patients page |
| 2 | "Are you near my work / on transit / easy to park at?" | PG Repeated (Yelp, r/Seattle "free parking") | Location & arrival section/page |
| 3 | "Do you take my insurance / are you in-network for Delta / Premera / Regence?" | PG Repeated (Yelp "call first"; r/Seattle "in-network Delta") | Insurance section on Home + Insurance page |
| 4 | "Can the whole household go here — kids and adults?" | PR Common (family sites) | Family-care section |
| 5 | "I just moved to Seattle — who's trustworthy?" | PG Repeated (r/Seattle relocation posts) | Home trust strip + Reviews + About |

### Job C — Trust & credibility
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Will you push treatments I don't actually need?" | PG Repeated (strongest theme) | About/"Our approach" conservative-care statement |
| 2 | "Who is the dentist and are they any good?" | PG/DP Repeated | Dentist & team profiles |
| 3 | "Will you explain things and let me ask questions, or rush me?" | PG Repeated (anxiety + upsell threads) | Care-philosophy copy; reviews |
| 4 | "Is the office clean, modern, and legit?" | PR/DP Common | Office photos/tour; credentials |
| 5 | "Will you refer me out if I need a specialist?" | PG Emerging (r/Seattle praised referral-out) | About/"When we refer" note |

### Job D — Insurance, cost & payment
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "How much will this cost me / what will I actually pay?" | PG/PR Repeated (top complaint = sticker shock) | Insurance & payment page; written-estimate offer |
| 2 | "What's the difference between 'we accept it' and 'in-network'?" | CG/PG Repeated (core confusion) | Insurance page explainer |
| 3 | "What if I don't have insurance — is there a plan or discount?" | PR Repeated (membership plans common) | Payment options / membership section |
| 4 | "How do I check my coverage before I come in?" | PR Common | "Verify your benefits" steps |
| 5 | "How do deductibles / annual maximums work?" | PG Common (askdentists deductible confusion) | Insurance FAQ |
| 6 | "Do you offer financing / CareCredit / payment plans?" | PR Common | Payment options |

### Job E — Anxiety & comfort
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Will you judge me for how long it's been / the state of my teeth?" | PG Repeated (r/Anxiety) | Anxiety/comfort section: explicit no-judgment |
| 2 | "What exactly will happen at the appointment?" | CG Repeated | "What to expect" content |
| 3 | "Can I tell you I'm scared and have you go slow / let me pause?" | PG Repeated | "Tell us how to help you be comfortable" field |
| 4 | "Do you offer numbing / laughing gas / sedation?" | PG/CG Common | Comfort-options list [verify] |
| 5 | "Can I bring headphones / take breaks / keep control?" | PG Common (self-comfort tools) | Comfort content |

### Job F — Emergencies
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Can you see me today / same-day?" | PR Repeated (emergency practices lead with this) | Emergency page + Home emergency action |
| 2 | "Who do I call right now, after hours?" | CG/DP Repeated | Sticky call action + after-hours line [verify] |
| 3 | "Should I go to the ER instead?" | CG Repeated | Emergency page ER-triage line |
| 4 | "What should I have ready when I call?" | CG Common | Emergency "what to have ready" |

### Job G — Discovering services
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Do you do [Invisalign / implants / whitening / root canal]?" | PR Repeated | Services overview + service pages |
| 2 | "Which service fits my problem (in my words)?" | DP Emerging | "Browse by concern" module |
| 3 | "Do you treat kids / teens / older adults?" | PR Common | Life-stage section |

### Job H — Convenience, scheduling, arrival
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "Can I book online, and how fast?" | PR Repeated (Dentologie "<60s") | Appointment CTA/flow |
| 2 | "What are your hours — early/late/weekend?" | PG Repeated (Yelp "7am", "weekends") | Home + Contact hours |
| 3 | "Where exactly do I park, and is it validated / how much?" | PG Repeated (r/Seattle parking; Integrity validated) | Arrival card |
| 4 | "Which building entrance/floor/suite, and is there an accessible route?" | PR/PG Repeated (Integrity QR/floor/concierge) | Arrival card |
| 5 | "Which light-rail station / streetcar / bus stop is nearest?" | GOV/DP Common | Arrival card transit block |
| 6 | "Can I reschedule/cancel easily?" | PR Common | Appointment FAQ |
| 7 | "Can I do all this on my phone?" | DP Repeated | Mobile-first everything |

### Job I — New patient
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "What do I bring to my first visit?" | PR Repeated | New Patients checklist |
| 2 | "What happens at the first appointment / how long?" | PR Repeated | "What to expect" |
| 3 | "Can I fill out forms before I arrive?" | PR Common | New Patients forms link |
| 4 | "How do I transfer records/X-rays from my old dentist?" | PR Common | New Patients records step |
| 5 | "Will you do treatment on day one or just look?" | PR Common | New Patients FAQ |

### Job J — Ongoing care
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "What's my treatment plan, and why each item?" | PR/PG Common | Treatment-plan explanation (operational + service pages) |
| 2 | "How do I care for it afterward / when do I call?" | CG Common | Aftercare content |
| 3 | "When am I due for my next cleaning?" | PR Common | Re-book CTA / reminders [verify] |
| 4 | "How do I get my records / update my info?" | PR Emerging | Patient-info page |

### Job K — Cosmetic / elective
| Rank | Question | Evidence | Answer location |
|---|---|---|---|
| 1 | "What are my options for [straighter/whiter/fixed] teeth?" | PR Common | Cosmetic overview |
| 2 | "How long, how much upkeep, is it reversible?" | PR Common | Cosmetic option detail |
| 3 | "Is a consultation a commitment or just a conversation?" | PR Common | "A consult is fact-finding" copy |

**Design takeaway:** the top questions cluster tightly around **trust (no over-treatment), cost/insurance clarity, getting-in convenience, and arrival logistics** — with emergency and anxiety as high-stakes minorities. An FAQ set modeled on the strongest observed examples (Dentologie's 10 Qs; Integrity's cost/parking/pain Qs) should exist, but the *answers to the top five questions must not be buried in an FAQ* — they belong on the Home page and the relevant primary pages.
## 6. Patient vocabulary vs clinical vocabulary

Patients search and think in plain, symptom- and goal-oriented language; practices too often label navigation and services in clinical terms. This mapping should drive **navigation labels, page titles, headings, and the "browse by concern" module.** The rule: lead with the patient word, keep the clinical term as a secondary/parenthetical so the page still ranks and reads as credible. Evidence is drawn from the patient threads and the actual phrasings patients used (PG), cross-checked against how services are named on real practice sites (PR).

| Patient says (use in nav/headings) | Clinical term (keep as subtitle/keyword) | Evidence | Notes for copy |
|---|---|---|---|
| "Check-up and cleaning" | Prophylaxis / recall exam | PG/PR Repeated | Most-searched entry point; pair with "New patient exam." |
| "My tooth hurts" / "toothache" | Pulpitis / irreversible pulpitis | PG Repeated | Route to Emergency + "when it's urgent." Never diagnose. |
| "Broken / chipped / cracked tooth" | Fractured tooth / cusp fracture | PG Repeated | Emergency + restorative. |
| "Knocked-out tooth" | Avulsed tooth | CG Repeated | First-aid steps (milk, reinsert, <1 hr). |
| "Cavity / filling" | Dental caries / composite restoration | PG Repeated | "Tooth-colored fillings." |
| "Cap" | Crown | PG Common | Patients often say "cap"; show both. |
| "Root canal" | Endodontic therapy | PG Repeated | Keep the scary term but reassure ("modern root canals are usually painless"). |
| "Pulling a tooth" | Extraction | PG Common | Plain verb first. |
| "Gum disease / bleeding gums" | Gingivitis / periodontitis | PG/PR Repeated | "Deep cleaning" = scaling & root planing. |
| "Deep cleaning" | Scaling and root planing (SRP) | PG Repeated | High upsell-suspicion term — explain WHY it differs from a regular cleaning. |
| "Straighten my teeth" / "clear aligners" | Orthodontics / Invisalign | PG Repeated | Brand name (Invisalign) is itself a patient search term. |
| "Whiter teeth / whitening" | Bleaching / extrinsic-intrinsic whitening | PG Repeated | Goal-led. |
| "Fix my smile" / "veneers" | Cosmetic / porcelain veneers | PG Common | Goal-led umbrella: "Improve how my smile looks." |
| "Missing tooth / replace a tooth" | Implant / bridge / partial denture | PG Common | Concern-led: "Replace a missing tooth." |
| "Dentures / false teeth" | Complete / partial dentures | PG Common | Dignity in wording; avoid "the elderly." |
| "Kids' dentist" | Pediatric dentistry | PG Common | Clarify if the practice treats children directly or refers very young kids. |
| "Numbing / put me to sleep / laughing gas" | Local anesthesia / sedation / nitrous oxide | PG Repeated | Anxiety patients search these exact words. |
| "Being put to sleep" | IV / oral conscious sedation | PG Common | Distinguish honestly; do not overpromise [verify what's offered]. |
| "Do you take my insurance?" | In-network / participating provider | PG Repeated | Explain "accept" ≠ "in-network." |
| "What will I owe?" / "out of pocket" | Patient responsibility / co-insurance | PG Repeated | Plain-money language: "what you'll pay." |
| "No insurance" | Self-pay / uninsured | PG Repeated | Offer membership/financing without shame. |
| "It's been a while / I'm overdue" | Lapsed patient / recare | PG Repeated | Signal explicitly: "It's okay if it's been years." |
| "I'm scared of the dentist" | Dental anxiety / dentophobia | PG Repeated | Use the patient's word "scared," not the clinical label, in headings. |
| "Emergency / seen today" | Urgent / same-day care | PG/PR Repeated | "Dental emergency? Call now." |

**Copy principles that follow from this table (CG — CDC plain-language / health-literacy):**
- Write at roughly an 8th-grade reading level; sentences ~15–20 words; use "you" and active voice.
- Prefer whole-number phrasing ("about 1 in 3 people") over percentages in body copy.
- Lead headings with the patient concern; put the clinical term in a subhead or parenthetical for credibility and search.
- Avoid euphemism that hides cost or scope ("investment in your smile" reads as sales). Say "cost," "you'll pay," "estimate."
- Never imply diagnosis in plain-language content ("this could mean…") — route to "contact us / see a dentist."
## 7. What patients praise / What patients abandon over

Two tables. Each row names the **kind of source** the signal came from (PG patient-generated, PR practice/marketing about complaints, CG clinical, DP design). These are behavior-level specifics — the concrete things that earn loyalty or trigger walk-aways — not vague sentiments. They directly seed the trust, content, and design sections.

### What patients PRAISE (specific behaviors to design toward)
| Praised behavior | Why it matters (job served) | Source type | Evidence strength | Where the website can signal it |
|---|---|---|---|---|
| Dentist is conservative — doesn't push unneeded work; monitors instead of drilling | Answers the #1 distrust | PG (r/Seattle, r/askdentists) | Repeated | "Our approach" conservative-care statement; reviews that mention it |
| Respected the patient's financial timeline ("you have years, no rush") | Removes cost pressure/shame | PG (r/Seattle) | Repeated | Care-philosophy copy; cost-transparency statement |
| Explained each step; showed imaging; let the patient decide | Converts "upsell" fear into trust | PG (r/askdentists nuance) | Repeated | "We show you what we see" copy (mirrors Chicago Loop "Pinky Promise") |
| Remembered the patient's name and concerns next visit | Relationship, not transaction | PG (r/Seattle) | Repeated | Positioning as a "dental home"; team warmth |
| Referred out to a specialist rather than keeping work in-house | Signals integrity over revenue | PG (r/Seattle) | Emerging | "When we refer" note on About |
| Gentle; got a hard-to-numb patient fully numb; painless | Anxiety/pain relief | PG (r/Seattle, Yelp) | Repeated | Comfort-options content; pain-management honesty |
| Never shamed a lapsed/anxious patient; kind front desk | The anxiety hinge | PG (r/Anxiety, Yelp) | Repeated | Explicit no-judgment line; warm reviews |
| Punctual — seen on time, respected the patient's schedule | Time-poor downtown pros | PG (Yelp), PR (Integrity "we'll plan around your meeting") | Repeated | "We respect your time" copy; realistic scheduling |
| Early / evening / weekend hours | Fits work life | PG (Yelp "7am", "one weekend a month") | Repeated | Prominent hours; early/late badges |
| Free / cheap / on-site / validated parking | Downtown pain point | PG (r/Seattle), PR (Integrity validated) | Repeated | Arrival card with parking specifics |
| Same-day crowns (CEREC) — no second trip | Convenience | PG (r/Seattle) | Emerging | Service page note (only if offered) [verify] |
| Same-day emergency access | Urgent relief | PR (emergency practices) | Repeated | Emergency pathway |
| Language help (e.g., Spanish spoken) | Inclusion/access | PR (iSmile NYC) | Common | Language-access signal [verify] |
| Whole team humanized (even front desk / office manager) | Reduces fear of the unknown | PR (Key Dental) , PG (anxiety threads praise kind front desk) | Common | Team page depth |

### What patients ABANDON over (anti-patterns / walk-away triggers)
| Abandonment trigger | Underlying job broken | Source type | Evidence strength | Design/content countermeasure |
|---|---|---|---|---|
| Surprise bill / sticker shock / charged more than expected | Cost clarity | PG (r/askdentists), PR (Birdeye, Teero, finmkt) | Repeated | Cost-transparency statement; written estimates; explain deductibles |
| Felt upsold — plan full of procedures they doubted | Trust | PG (r/Seattle, r/askdentists) | Repeated | Conservative-care statement; show imaging; welcome 2nd opinions |
| Double-billing / billing for work not done | Trust/billing integrity | PG (r/askdentists) | Isolated-but-severe | Transparent billing promise; itemized estimates |
| Dentist scolded them for time away → panic/shame | Anxiety | PG (r/Anxiety) | Repeated | "It's okay if it's been a while"; no-judgment pledge |
| Rough/painful cleaning | Comfort | PG (r/Seattle recent reply) | Common | Gentle-care messaging; comfort options |
| "Accepts insurance" turned out not in-network → owed more | Insurance clarity | PG/CG Repeated | Repeated | Explain accept≠in-network; name networks [verify]; verify-benefits help |
| Long wait past appointment time | Time respect | PR (Birdeye) | Repeated | Realistic scheduling; "seen within minutes" only if true [verify] |
| Couldn't get an appointment / booked out months | Access | PG (r/Seattle) | Common | Honest availability; waitlist/soonest-opening path |
| Vague "we accept most insurance," no carriers, no cost help | Cost clarity | PR pattern (most sites) + PG "call first" | Repeated | Name carriers; verify path; membership for uninsured |
| Phone-only booking / phone tag | Convenience | PG/PR (vendor, bias-flagged) | Common | 24/7 request form + online booking + phone |
| No faces, no named dentist, generic template, fake-looking reviews | Credibility | DP + observed anti-pattern (Seattle's Capitol Hill Dentist) | Repeated | Real photos, named credentials, genuine reviews |
| Buried/absent emergency contact | Urgent access | CG/DP | Common | Always-visible emergency action |
| Confusing building / couldn't find entrance/parking | Arrival | PG/PR (Integrity solves it) | Common | Building-entry + floor/suite + accessible route |
| Quality failure (crown fell repeatedly, redo work) | Clinical quality | PG (Yelp) | Common | Not a website fix, but reviews/credentials set expectations honestly |
| Inaccessible site (scheduler/PDF/carousel unusable by AT) | Accessibility | CG (WCAG/ADA explainers) | Common | WCAG 2.2 AA; accessible forms |
| English-only / dense jargon | LEP / health literacy | CG (CDC, HHS LEP) | Common | Plain language; language-support note |

**Reading across both tables:** loyalty is built by *behaviors that reduce financial and emotional risk* (conservative care, cost honesty, no judgment, respect for time, easy arrival). Abandonment is almost always about *broken expectations around money, trust, or access* — rarely about clinical outcomes alone. The website cannot change chair-side behavior, but it can **set honest expectations, remove logistical friction, and signal the practice's values credibly** so the right patients self-select in and aren't blindsided.
## 8. Patient journey and points of abandonment

The journey below is synthesized from the JTBD map, the question inventory, and the praise/abandon signals. It is deliberately drawn as a **funnel with named drop-off points**, because the website's job is to remove friction at each transition. Most patients do not move linearly; anxious, urgent, and returning patients enter mid-funnel. The stages are a checklist of moments the site must serve, not a forced path.

### Stage map

| Stage | Patient's internal state | What they do | Primary drop-off risk | What the site must provide to advance them |
|---|---|---|---|---|
| 0. Trigger | Pain, overdue guilt, moved, benefit-year, self-image, a family member needs care | Google "[neighborhood] dentist" / "emergency dentist Seattle" / asks Reddit | Never reaches the site (SEO/reputation) — out of scope here, but reviews + clear local pages help | Local, plain page titles; emergency findability; reviews |
| 1. First impression (≈ seconds) | Skeptical, fast-scanning, often on mobile | Lands on Home or a service/neighborhood page | Bounce on slow, generic, faceless, or salesy pages | Fast load; real faces; clear "who/where/insurance/book"; calm design |
| 2. Trust check | "Can I trust these people not to over-treat or overcharge?" | Reads About, dentist bio, reviews, "approach" | Leaves if no named dentist, no philosophy, fake-looking reviews | Named dentists + credentials; conservative-care statement; genuine reviews |
| 3. Fit check | "Do they take my insurance? Near me? See my whole family? New patients?" | Scans insurance, location, family, new-patient status | Leaves on vague "we accept most insurance," no parking/transit, unclear new-patient status | Named networks [verify] + verify path; arrival specifics; "accepting new patients" badge; family message |
| 4. Cost check | "What will I actually pay? What if I'm uninsured?" | Reads insurance/payment; looks for estimate/membership | Leaves on sticker-shock fear or no path for uninsured | Cost-transparency statement; how-to-verify; membership/financing [verify] |
| 5. Anxiety/urgency gate (subset) | Scared, ashamed, or in pain now | Seeks reassurance or an immediate call | Anxious patient leaves if it feels clinical/judgy; urgent patient leaves if phone is buried | No-judgment content + "tell us your concerns"; always-visible emergency call |
| 6. Convert | "Okay — book / request / call" | Uses CTA: online book, request form, or phone | Abandons long forms, phone-only, broken/inaccessible scheduler, no confirmation | Short form; online + phone; accessible; instant confirmation with next steps |
| 7. Prepare & arrive | "What do I bring? Where do I park/enter?" | Reads new-patient checklist + arrival card | No-shows or arrives stressed if logistics unclear | What-to-bring; forms ahead; parking/entrance/floor/transit; one-tap map + call |
| 8. Post-visit / retain | "What now? Aftercare? Next visit? Was I treated fairly?" | Aftercare, re-book, review, refer | Churns on unclear plans/billing; leaves on network change | Aftercare content; easy re-book; honest billing; feedback/referral path |

### The five highest-value friction points to engineer out (ranked)
1. **Vague or missing insurance/cost information** (Stages 3–4). The single most common walk-away in the evidence. Fix: name networks [verify], explain accept≠in-network, publish a verify-benefits path, surface membership/financing, and offer written estimates. *Evidence: PG Repeated + PR complaint data Repeated.*
2. **Faceless / low-trust first impression** (Stages 1–2). Generic templates with no named dentist and fake-looking reviews read as illegitimate. Fix: real photos, named credentials, conservative-care statement, genuine reviews. *Evidence: DP Repeated + observed anti-pattern.*
3. **Buried emergency access and phone** (Stage 5). Urgent patients won't navigate a whole site. Fix: persistent emergency action + tap-to-call. *Evidence: CG/DP Repeated.*
4. **Arrival uncertainty** (Stage 7) — parking, entrance, floor, transit. Downtown-specific and under-served by almost every site except a few exemplars. Fix: a concrete arrival card. *Evidence: PG Repeated + PR exemplar (Integrity).*
5. **Judgmental or clinical tone for anxious/lapsed patients** (Stage 5). A single scolding vibe causes abandonment (and, offline, panic). Fix: explicit "it's okay if it's been a while," "tell us how to help you feel comfortable." *Evidence: PG Repeated.*

**Mobile note:** Stages 1, 5, 6, and 7 disproportionately happen on a phone (first impression, urgent call, booking on the go, and arriving). These stages must be **complete on mobile** — one-tap call, one-tap map/directions, short accessible forms, and readable arrival details — not a reduced version of the desktop site.
## 9. Downtown Seattle-specific needs

This section isolates what is *distinctive* about serving Downtown Seattle and its dense edges — South Lake Union, Denny Triangle, Belltown, First Hill, Capitol Hill, Pioneer Square, International District, Westlake, Lower Queen Anne, Central District. Everything here is either GOV/geography evidence, patient-generated, or a directly observed local practice pattern.

### The population is car-light, time-poor, renter-heavy, and professional — but not monolithic
- Downtown-core neighborhoods skew young, professional, and non-family-household: secondary census aggregators put Belltown at roughly 60% aged 25–44 and about three-quarters non-family households, with South Lake Union similarly young, renter-heavy, and tech-anchored around Amazon's headquarters campus (Point2, accessed Aug 2026, https://www.point2homes.com/US/Neighborhood/WA/Seattle/Belltown-Demographics.html; BestNeighborhood/CensusEasy South Lake Union, accessed Aug 2026). *Evidence: secondary demographic aggregator — directional, not exact.*
- **Design implication:** the primary segment is a time-poor professional who values efficiency, predictability, and digital self-service — matched by observed practice copy ("Lunch Hour Cleanings," "we'll plan around your meeting," "booking takes under 60 seconds"). But the site must **not** design *only* for them: First Hill and the International District bring older adults, immigrant and limited-English residents, and lower-income patients; a family practice serves all of them.

### Parking is scarce, paid, and a genuine decision factor
- Downtown Seattle has **no park-and-ride**; Sound Transit directs downtown riders to transit rather than parking, and paid garages/lots dominate (Sound Transit parking, accessed Aug 2026, https://www.soundtransit.org/ride-with-us/parking/parking-locations; Parkopedia South Lake Union, accessed Aug 2026, https://en.parkopedia.com/parking/seattle/south-lake-union/). *Evidence: GOV + parking aggregator.*
- Patients name parking explicitly as a choose/reject factor ("free or cheap parking"; a small on-site lot is a selling point) (r/Seattle, accessed Aug 2026). *Evidence: PG Repeated.*
- **The gold-standard response observed** is Integrity Dental Boston's arrival content: garage in the same building with a specific entrance street, *ticket validation*, a day-of QR code for building access, floor/suite, a lobby concierge, "have your ID ready," and short "walking-in / driving-in" navigation videos (integritydentalboston.com, accessed Aug 2026). Almost no Seattle site matches this. **Adopt it.**

### Transit and light rail are the default arrival mode — and almost no dental site says which station
- The Link 1 Line serves the core at Westlake, Symphony/University St, Pioneer Square, and International District/Chinatown stations; the South Lake Union Streetcar connects SLU to downtown (Sound Transit; Seattle.gov Streetcar; Transit App SLU line, accessed Aug 2026). *Evidence: GOV Repeated.*
- Of the practice sites examined, only a couple named transit at all (Dentologie mentions the SLU Streetcar and "a short walk from transit stations"; most gave driving directions only). This is a **clear, cheap differentiation opportunity**: name the nearest station/stop and the walking time.

### Buildings are medical/office towers with real wayfinding friction
- Real downtown practices sit inside towers — the Cabrini Medical Tower (First Hill), the historic Medical Dental Building, Columbia Tower, and shopping-center suites — where the front door, elevator bank, floor, suite, and after-hours building access are non-obvious (First Hill Dental Center; Yelp Seattle references; Integrity Boston "Floor 7 / entrance from 55 Purchase St," accessed Aug 2026). *Evidence: PR/PG Repeated.*
- **Design implication:** an **arrival card** with building name, entrance, floor/suite, elevator/accessible route, parking + validation [verify], nearest transit, and a day-of access note is a P0 Downtown feature, not a nicety.

### Hours are a competitive axis — and many downtown practices under-serve it
- Patients prize early (7 a.m.), evening, and weekend hours ("doors open 7am," "works one weekend a month — super convenient for working people") (Yelp; r/Seattle, accessed Aug 2026). *Evidence: PG Repeated.*
- Yet several examined downtown practices close Friday–Sunday and offer no evening hours (First Hill Dental Center 7–4 Mon–Thu; 3rd & Columbia and Chicago Loop closed Fri–Sun). Whatever this practice's real hours are [verify], the site should **state them prominently and honestly**, and badge early/late/weekend availability where it exists.

### Language access is a Downtown equity requirement
- Seattle has a substantial limited-English population; the city runs a Language Access Program, and community providers like ICHS operate medical/dental clinics in the International District precisely for multilingual, lower-income patients (Seattle.gov Language Access, accessed Aug 2026, https://www.seattle.gov/iandraffairs/LA; ICHS International District Medical & Dental Clinic; The Fulcrum on WA language barriers, accessed Aug 2026). The strongest inclusive commercial example observed is a multi-location NYC family practice advertising "Spanish speaking services at all locations" and accepting Medicaid with a long named carrier list (iSmile, accessed Aug 2026). *Evidence: GOV + PR.*
- **Design implication:** plain language throughout, translate-friendly semantic markup, and an honest "languages spoken" signal [verify] — modeled on the "LANGUAGE SPOKEN" label the Smile Generation Seattle/Portland sites surface.

### Downtown needs summary (what the site must nail)
| Downtown need | Why | Priority |
|---|---|---|
| Concrete parking + validation info | No park-and-ride; paid/scarce; named as choose/reject factor | P0 |
| Nearest Link station / streetcar / bus + walk time | Car-light default; almost no competitor does it | P0 |
| Building entrance, floor/suite, accessible route, day-of access | Tower wayfinding friction | P0 |
| Prominent, honest, badged hours (early/late/weekend) | Time-poor workers; competitors under-serve | P0 |
| Efficient mobile booking + tap-to-call | Digital-first professionals; on-the-go | P0 |
| Plain language + languages-spoken signal | Equity; LEP population | P1 |
| "Fits your workday" framing without excluding non-professionals | Inclusive of First Hill/ID older & lower-income patients | P1 |
## 10. Family-practice needs across life stages

The brief is explicit: treat "family practice" as **comprehensive, relationship-based care for individuals and households across life stages — not a synonym for "kids."** This section models the life-stage needs and the household-coordination needs, and flags the honesty required about what the practice actually treats.

### Principle: "family" = a dental home for a whole life, and for whole households
- Family dentistry spans infancy through older adulthood under one roof with one record; most general dentists provide it (NewMouth, accessed Aug 2026, https://www.newmouth.com/dentistry/family/; One Tree Family Dentistry; First Dental Associates, accessed Aug 2026). *Evidence: PR Common.*
- Patients live this: a Seattle reviewer described transitioning her kids to the same dentist she trusts; another wanted "one practice for everyone" (Zen Dental review; r/Seattle, accessed Aug 2026). *Evidence: PG Common.*
- **Do not assume every family has children.** Single professionals, couples, and roommates are "households coordinating care" too. The positioning line should welcome "you and the people you care for" rather than defaulting to parents-and-kids imagery.

### Life-stage needs matrix
| Life stage | Typical jobs / triggers | Emotional need | Content the site needs | Honesty flags |
|---|---|---|---|---|
| **Children (0–12)** | First visit, cavities, sealants, habits; parent anxiety about their child's fear | Gentle, positive first experience; not scary | "Care for kids" note; what a child's first visit is like; gentle framing | Does the practice treat young children directly, or refer very young kids to a pediatric specialist? Several "family" practices refer out — say which [verify] |
| **Teens (13–19)** | Orthodontics/Invisalign, whitening, wisdom teeth, sports mouthguards | Autonomy; not condescended to | Clear-aligner + wisdom-teeth + mouthguard content | Wisdom-tooth extractions in-house or referred? [verify] |
| **Young adults / professionals (20s–40s)** | Overdue check-ups, cosmetic, first "adult" dentist after a move, efficiency | Respect for time; no lectures | Efficient booking; cosmetic overview; new-patient path | — |
| **Adults / parents (30s–50s)** | Restorative (crowns, root canals), coordinating family visits, gum care | Trust, cost clarity, coordination | Restorative explainers; family-coordination note; cost/insurance | — |
| **Older adults (60+)** | Implants, dentures, bridges, dry mouth, medication interactions, accessibility | Dignity; patience; physical access | Life-stage content (dignified wording); accessible-suite info | Denture/implant scope; accessible route [verify] |
| **Caregivers (any age)** | Booking/coordinating for a partner, parent, or dependent | Permission and ease to act for another | "Coordinating care for a loved one" note; caregiver-friendly contact | Privacy/consent limits for booking on another's behalf [verify] |

### Household-coordination needs (the under-served job)
- Parents and multi-person households want to **reduce trips**: one practice for everyone, and where possible back-to-back appointments (NewMouth; family-practice marketing, accessed Aug 2026). *Evidence: PR Common; PG Emerging.*
- **Design response (kept simple):** a short "Care for your whole household" module and a request-form field to note additional family members and preferred back-to-back timing. **Do not** build a family-account portal or per-member dashboards for the first release — that is premature complexity; a notes field and a phone call cover it.

### Inclusive-family copy guardrails
- Use imagery and words that include child-free households, couples, single adults, and older adults — not only young parents with toddlers.
- Frame children's care as *available and gentle*, not as the practice's whole identity.
- Avoid "the elderly"; use "older adults." Avoid assuming a gender or family structure.
- State the **real scope** honestly: if very young children or complex oral surgery are referred out, say so — it builds the same trust patients praised when a dentist "referred me to an oral surgeon instead of keeping it in-house."

### Family-practice needs summary
| Need | Priority | Minimum useful version |
|---|---|---|
| "All ages, one dental home" positioning (not kids-only) | P0 | One inclusive homepage line + About statement |
| Life-stage service orientation (kids / teen / adult / older-adult entries) | P1 | A simple life-stage section linking to relevant service pages |
| Household-coordination affordance | P1 | Request-form "additional family members" + back-to-back note |
| Honest scope on pediatric / oral-surgery / denture care | P0 | One verified sentence per boundary [verify] |
| Caregiver-friendly contact | P2 | "Coordinating a loved one's care? Call us" note |
## 11. Trust and decision-making requirements

Trust is the pivot of the entire decision, and the evidence points to a specific, unusual conclusion for dentistry: **the dominant trust driver in this market is protection from over-treatment and over-billing, not clinical bragging.** The site earns trust by proving restraint, transparency, and humanity — then by making credentials and reviews easy to verify.

### How trust is formed (fast, visual, then verified)
- Credibility is judged in a fraction of a second on visual and human signals — clean layout, real faces, plain language — before a word is read (designyourway.net; sprypt visual trust signals, accessed Aug 2026). *Evidence: DP Repeated.*
- After the snap judgment, patients look for **named, credentialed, human** proof: who the dentist is, where they trained, and whether the team listens (Zocdoc "how to find a good dentist"; Dentist Decoded, accessed Aug 2026). *Evidence: DP/PR Repeated.*
- The observed anti-pattern (a thin template with no named dentist, contradictory hours, and testimonials that read as fabricated) is exactly what destroys trust (seattlescapitolhilldentist.com, accessed Aug 2026). *Evidence: observed anti-pattern.*

### The five trust requirements, ranked by evidence
| # | Trust requirement | What it answers | How to signal it (site) | Evidence |
|---|---|---|---|---|
| 1 | **Conservative-care / anti-over-treatment stance** | "Will you push work I don't need?" | An explicit "our approach" statement: we recommend only what you need, we show you what we see on imaging, we welcome second opinions, we'll tell you what can wait | PG Repeated (strongest) |
| 2 | **Named dentists with real credentials and photos** | "Who will treat me, are they legit?" | Dentist profiles: name, degree (DDS/DMD), school, years, license [verify], warm photo, short philosophy | PG/DP Repeated |
| 3 | **Cost & billing transparency** | "Will I be blindsided?" | Cost-transparency statement; written estimates; explain accept≠in-network; itemized, honest billing promise | PG/PR Repeated |
| 4 | **Genuine, digestible reviews** | "Do others trust them?" | A few real, attributed reviews (ideally quoting conservative care / kindness), plus a link to the full Google/Yelp profile — not a wall of noise | PG/DP Repeated |
| 5 | **Humanity & listening** | "Will they respect and explain?" | Care-philosophy copy; "we explain before we treat"; team warmth; no-judgment line | PG Repeated |

### Turning the "upsell" problem into a trust asset
The r/askdentists thread is instructive: a patient felt upsold on crowns after root canals — but verified dentists explained that crowning a root-canaled molar *is* standard of care. The real failure was **communication, not (necessarily) clinical intent.** The strongest observed marketing response is Chicago Loop's "Pinky Promise" — *we show you what we see with imaging, we never push unnecessary treatments, we're transparent about pricing, we respect your time.* This is the template: **convert the distrust into an explicit, plain promise, then back it with behavior** (imaging shown, written estimates, second opinions welcomed). *Evidence: PG nuance + PR exemplar.*

### Reviews: present them without overwhelming
- Patients want reassurance, not a firehose; they also distrust obviously fake testimonials. **Adopt:** 3–6 genuine, attributed snippets that illustrate the values patients care about (conservative care, gentleness, no judgment, punctuality), plus a visible aggregate rating and a link out to the full profile. **Avoid:** unattributed glowing blurbs (the anti-pattern) and auto-scrolling carousels that fail accessibility. *Evidence: PG/DP Repeated + accessibility guidance.*

### Legitimacy and referral integrity
- Include verifiable legitimacy signals: practice name/address, dentist license lookup [verify via WA state board], professional memberships [verify], and real office photos. *Evidence: PR Common.*
- Patients specifically praised a dentist who **referred out** rather than keeping complex work in-house. A short "When we refer you to a specialist" note signals that revenue isn't the motive — a cheap, high-trust addition. *Evidence: PG Emerging.*

### Trust requirements summary
| Requirement | Priority | Minimum useful version |
|---|---|---|
| Conservative-care statement (imaging-shown, 2nd-opinions-welcome, "what can wait") | P0 | One honest paragraph on Home + About |
| Named dentist profiles with credentials + photo | P0 | One profile per dentist [verify credentials] |
| Cost/billing transparency statement + written estimates | P0 | One statement + "ask for an estimate" CTA |
| Genuine attributed reviews + aggregate + link out | P1 | 3–6 real snippets + rating + profile link |
| Care-philosophy / "we explain before we treat" copy | P1 | Short section |
| Referral-out integrity note | P2 | One sentence on About |
| License/memberships legitimacy signals | P1 | Footer/About [verify] |
## 12. Insurance, cost, and financial needs

Cost and insurance clarity is not a sub-page — it is a **primary trust job** and the most common walk-away in the evidence. The site's obligation is honesty and orientation, not price quotes it cannot stand behind.

### The core confusion: "accepts insurance" ≠ "in-network"
- In-network means the dentist has a contract with the plan for discounted fees, so the patient pays less; "accepting" or "billing" a plan can still leave the patient owing more if the dentist is out-of-network (Delta Dental of Washington, accessed Aug 2026, https://www.deltadentalwa.com/knowledge-center/In-Network-Care-Benefits; Ocean Breeze Prosthodontics; CoveredUSA in/out-of-network guide, accessed Aug 2026). *Evidence: CG/PR Repeated.*
- Patients feel this directly ("call first to see if she takes your insurance"; a network change forced switching away from a loved dentist) (Yelp; r/Seattle, accessed Aug 2026). *Evidence: PG Repeated.*
- **Observed practice reality:** most sites say a vague "we accept most major insurance" with no carriers and no explanation. A minority name carriers (First Hill Dental Center lists Carington, Delta Dental, Premera, Regence, United Healthcare; Queen Anne Family Dental notes preferred-provider status with Delta and Regence; iSmile lists a long carrier set including Medicaid). **Naming networks and explaining the difference is a clear differentiation.** *Evidence: PR pattern.*

### What patients need to understand (and where the site helps)
| Financial need | Patient question | Site response (non-quoting) | Evidence |
|---|---|---|---|
| Network status | "Are you in-network for my plan?" | List participating networks [verify]; explain accept≠in-network; "call/message to confirm your specific plan" | CG/PG Repeated |
| Benefit mechanics | "How do deductibles / annual max / coinsurance work?" | Plain explainer (deductible = what you pay first; annual max = plan's yearly cap; coinsurance = your %) | PG Common (deductible confusion) |
| Verifying coverage | "How do I check before I come?" | "How to verify your benefits" steps; offer to verify for the patient | PR Common |
| Estimating responsibility | "What will I actually pay?" | Explain what an estimate can/can't include; offer a **written estimate** before treatment | PR/PG Repeated |
| Avoiding surprises | "Any hidden costs?" | Cost-transparency promise; discuss cost before treatment; note the No Surprises Act protects against some balance billing | PR/CG Repeated |
| No insurance | "What if I'm uninsured?" | In-house **membership plan** and/or financing [verify]; new-patient exam info | PR Repeated |
| Payment methods | "Cards? Financing? CareCredit?" | List accepted methods + financing options [verify] | PR Common |
| What to bring | "What info do you need?" | New-patient checklist: insurance card, photo ID, prior records | PR Repeated |

### The uninsured path must be real and non-judgmental
- A large share of adults lack dental coverage, and dental care is among the most-skipped services due to cost (Aspen Dental/PR Newswire — vendor, bias-flagged; DentalPlans; GoodRx, accessed Aug 2026). *Evidence: PR directional.*
- Strong observed responses: **in-office membership plans** for the uninsured (Chicago Loop; Smile Generation Dental Plan advertised at "up to 50% off") and **financing** (Smile Generation "up to $25,000, 0% on approved credit"), plus CareCredit (Zen Dental) (accessed Aug 2026). *Evidence: PR Repeated.*
- **The single best transparency example** is Integrity Dental Boston publishing a real first-visit price ("$200 for patients without insurance; insurance may cover in full"). Publishing even one honest, bounded number — the new-patient exam self-pay price [verify] — would outperform nearly every competitor. *Evidence: PR exemplar.*

### What the site must NOT do
- **Do not invent or publish procedure prices, network participation, or membership terms.** National cash-cost ranges (e.g., DentalPlans' cleaning/filling/crown estimates) are directional context only and must be localized and verified before any number appears as copy. Every financial specific is a bracketed placeholder routed to the verification checklist.
- **Do not** hide behind "we accept most insurance." That vagueness is itself an abandonment trigger.

### Insurance/cost needs summary
| Need | Priority | Minimum useful version |
|---|---|---|
| Explain accept≠in-network + list networks [verify] | P0 | One plain explainer + network list |
| Cost-transparency + written-estimate offer | P0 | One statement + "ask for an estimate" CTA |
| Uninsured path: membership/financing [verify] | P0/P1 | One "no insurance? here's how" section |
| Verify-benefits help | P1 | Short steps + "we'll help" |
| Benefit-mechanics explainer (deductible/max/coinsurance) | P1 | FAQ entries |
| Publish new-patient exam self-pay price [verify] | P1 | One honest number if the practice will commit to it |
## 13. Convenience, scheduling, and arrival needs

Convenience is where a Downtown practice wins or loses the time-poor professional without alienating everyone else. The evidence supports **offering multiple low-friction channels rather than forcing one**, and treating arrival logistics as first-class content.

### Scheduling: offer both self-service and a human path
- Vendor sources report a strong preference for online scheduling and after-hours booking, and claim it reduces phone time and no-shows (Dental Economics; Solutionreach; Resonate; heallist, accessed Aug 2026). **These are commercially motivated and bias-flagged** — treat "80% prefer online" as *Commonly observed*, not fact. *Evidence: PR vendor, bias-flagged.*
- Patients themselves split: digital-first professionals want to self-book on a phone at night, while anxious, complex, LEP, and older patients often prefer to talk to a person ("call first to see if she takes your insurance"; anxiety patients want to explain themselves) (Yelp; r/Anxiety, accessed Aug 2026). *Evidence: PG Repeated.*
- **Observed reality:** practices span a spectrum — instant "Book online in under 60 seconds" (Dentologie) to "some appointments aren't available online; complete this form and we'll call you" (South Lake Union Dentist Office) to phone-first. The resolution is **not** to pick one: offer a prominent **online request/booking flow AND a tap-to-call number AND a short message option**, and let the patient choose. *Evidence: PR pattern.*

### The scheduling jobs and the simplest good response
| Job | Patient need | Simplest response | Priority |
|---|---|---|---|
| Book/request around work | Early/late/weekend, 24/7 request | Prominent CTA → short request form (or booking) + phone; state hours; badge early/late/weekend [verify] | P0 |
| Reschedule / cancel | Low-friction change | Clear instructions + phone; (online reschedule later) | P1 |
| Confirm & remember | Not miss it | Instant on-screen confirmation + email/text reminder [verify] | P1 |
| Forms before arrival | Save waiting-room time | Accessible online/downloadable new-patient forms [verify] | P1 |
| Coordinate household | Fewer trips | Request-form "additional family members" + back-to-back note | P1 |
| Do it all on mobile | On the go | Mobile-first flow; tap-to-call, tap-to-map | P0 |

**Guardrail:** keep the request form short (name, phone, email, preferred time window, reason/notes, insurance optional). Long forms are an abandonment trigger. Every interaction needs loading, success, and error/recovery states — a form that silently fails is worse than a phone number.

### Arrival: treat it as content, not an afterthought
Downtown arrival is a distinct, high-value job (see also the Downtown section). The **arrival card** should contain:
- **Address + building name** (e.g., a named medical/office tower) and a one-tap map link.
- **Parking**: nearest garage/lot, approximate cost, and validation status [verify] — patients name parking as a decision factor.
- **Transit**: nearest Link light-rail station and/or streetcar/bus stop, with walking time — almost no competitor does this.
- **Building entry**: which entrance, floor/suite, elevator/accessible route, and any day-of access step (e.g., check in at a lobby desk) [verify].
- **Contact from the curb**: one-tap call and "text us" [verify].
The exemplar is Integrity Dental Boston (garage entrance street, ticket validation, day-of QR access, Floor 7, concierge, "have your ID ready," walking/driving videos). *Evidence: PR exemplar + PG Repeated + GOV transit.*

### Mobile behavior requirements
- Sticky, thumb-reachable **Call** and **Book/Request** actions on mobile (this is standard on the better sites; exact sticky behavior should be built and tested rather than assumed).
- Tap targets ≥ 44×44 px; single-column forms; native tel: and maps links; no autoplay audio/video; readable without zoom.
- The mobile experience must be **complete**, not a trimmed desktop — first impression, urgent call, booking, and arrival all happen on phones.

### Convenience/arrival needs summary
| Need | Priority | Minimum useful version |
|---|---|---|
| Prominent request/booking + tap-to-call + message | P0 | One CTA cluster site-wide |
| Honest, badged hours | P0 | Hours block on Home + Contact |
| Arrival card (address, parking, transit, entrance, floor, access) | P0 | One card [verify specifics] |
| Mobile sticky call/book + tap-to-map | P0 | Global mobile action bar |
| Accessible forms before arrival | P1 | Linked new-patient forms |
| Reschedule/cancel instructions; reminders | P1 | FAQ + reminder opt-in [verify] |
| Household coordination affordance | P1 | Request-form fields |
## 14. Emergency and anxiety-related needs

These two high-stakes minorities share a requirement: a **calm, fast, non-judgmental, non-diagnostic** pathway that does not force the patient to navigate the whole site. They are separate jobs and deserve separate, always-reachable entry points.

### Emergencies: get the right person fast, guide safely, respect the ER boundary
- Clinical guidance is consistent: **call the dentist first**; go to the ER for facial-bone fracture, uncontrolled bleeding, or serious swelling affecting breathing/swallowing; ERs generally don't do fillings/crowns (Cleveland Clinic dental emergencies, accessed Aug 2026, https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do; TRICARE, accessed Aug 2026, https://newsroom.tricare.mil/News/TRICARE-News/Article/4308160). *Evidence: CG Repeated.*
- Specific first-aid is well established and safe to publish with attribution: a knocked-out tooth held by the crown (not the root), kept moist in milk, and reinserted or brought in within about an hour; rinse and manage bleeding/pain for other injuries (Cleveland Clinic; Medanta; myspecialtydentist; prospersmilestudio, accessed Aug 2026). *Evidence: CG Repeated.*
- **Observed practice reality:** dedicated emergency practices lead with "Call [number] · Book Online · same-day · directions from Downtown · open Saturdays" (emergencydentistseattle.com; acidentistry.com; dentistdowntownseattle.com). A family practice should surface an **emergency action persistently** (nav + homepage + sticky mobile) even if it isn't an emergency-only clinic. *Evidence: PR Repeated.*

**Emergency pathway requirements**
| Requirement | Content | Priority |
|---|---|---|
| Always-visible emergency entry | Nav item + homepage action + sticky mobile call | P0 |
| One-tap call to the right number | Office number (+ after-hours instructions) [verify] | P0 |
| Same-day / how-fast expectation | Honest policy [verify] | P0 |
| ER-instead triage line | Clear "go to the ER if…" list | P0 |
| Safe first-aid while waiting | Non-diagnostic steps for knocked-out/broken tooth, bleeding, pain, lost filling — attributed to clinical sources | P0/P1 |
| "What to have ready" when calling | Short list (what happened, when, symptoms, meds) | P1 |

**Guardrail:** the emergency page **orients and routes** — it must not diagnose. Every symptom item ends in an action ("call us," "go to the ER"), never a conclusion.

### Anxiety: kindness is the whole design problem
- Dental anxiety is common and specific — roughly a third of people report fear and about 1 in 8 an extreme fear; triggers include pain, needles, drill noise, gagging, embarrassment, loss of control, and past bad experiences (Cleveland Clinic dentophobia, accessed Aug 2026, https://my.clevelandclinic.org/health/diseases/22594-dentophobia-fear-of-dentists; Healthline, accessed Aug 2026). *Evidence: CG Repeated.*
- The patient-voice evidence is unambiguous about the hinge: **shame about time away, and the fear of being judged.** The worst trigger is a dentist who scolds ("you haven't been in, your teeth are damaged") — it can cause a panic attack. What helps: a team that never shames, the ability to **tell the team in advance** ("if we know ahead, we can work around your anxieties"), and permission to use comfort tools (headphones, sunglasses, the weighted X-ray apron, nitrous, breaks) and to pause (r/Anxiety, accessed Aug 2026). *Evidence: PG Repeated.*
- **Observed best practice:** "no judgment — whether it's been six months or six years" (Dentologie); "free of stress, anxiety or judgment" (Zen Dental); judgment-free values blocks (Integrity); and reviews that explicitly praise not being shamed (Queen Anne Family Dental). **Adopt this language.** *Evidence: PR/PG Repeated.*

**Anxiety pathway requirements**
| Requirement | Content | Priority |
|---|---|---|
| Explicit no-judgment welcome | "It's okay if it's been a while — we won't lecture you." | P1 (high) |
| "What to expect" walk-through | Plain, step-by-step first visit | P1 |
| "Tell us how to help you feel comfortable" | A notes field on the request form + invitation to call | P1 |
| Comfort options list | Numbing, nitrous/sedation [verify], headphones, breaks, stop-signal ["raise your hand and we stop"] [verify policy] | P1 |
| Reassurance about control | "You can pause anytime; we go at your pace." | P1 |
| Warm, calm visual tone | Soft palette, real kind faces, no clinical coldness, no autoplay | P1 |

**Guardrail:** promise only what the practice actually offers. Sedation, stop-signal policies, and specific comfort amenities are all **[verify]** — do not turn reassuring language into unverified claims.

### Why these belong together in the IA but apart on the page
Both are **calm, fast, non-diagnostic** pathways, so they share design DNA (plain language, high contrast, one obvious action, mobile-first). But an anxious routine patient and a patient in acute pain need *different* first actions — reassurance vs. an immediate call — so they get **separate entry points** (an Emergency page/action and a Dental-anxiety & comfort page/section), not a merged one.
## 15. Dental website pattern frequency scan

### Sample composition and honesty about counts
This scan is based on real dental-practice websites examined during this research, weighted toward Downtown Seattle and its edges, then other dense US/Canada urban markets, plus widely-cited "best dental website" roundups.

- **15 practice homepages examined in depth** (full-page retrieval, every dimension confirmed present/absent):
  - *Seattle-area (9):* 32 Pearls (Downtown), SkyView Family Dentistry (Downtown page), First Hill Dental Center (First Hill), Dentologie (South Lake Union), Queen Anne Family Dental, Zen Dental Center (Capitol Hill), Seattle's Capitol Hill Dentist, 3rd & Columbia Dental (Pioneer Square SEO page), Dentists of Queen Anne.
  - *Comparison markets (6):* Chicago Loop Dentistry (Chicago Loop), Gentry Dentistry (SF Financial District), Integrity Dental Boston (Downtown Boston), Key Dental Clinic (Downtown Vancouver), Portland Modern Dentistry (Portland), iSmile Family Dental Centers (NYC).
- **1 additional in-depth subpage:** Downtown Dental Associates new-patient page (Portland).
- **~21 further practice sites observed at snippet/listing level** (e.g., South Lake Union Dentist Office, Smile Generation SLU, Emergency Dental Care of Seattle, ACI Dentistry, Dentist Downtown Seattle, Anoosh Afifi DDS/Capitol Hill, Devonshire/Arch Street/Boston Dental/Dental Partners of Boston, Cosmo/Downtown Dentist SF/Dental Studio SF/Digital Dental SF, Stadium Dental & Downtown Dental Vancouver, LPS Dental Chicago, Lux Smiles/New York Dental Office/Oral Dental Studio NYC).
- **5 "best dental website" roundup analyses** cross-checked for design conventions (Delmain, DigitalFloss, SiteBuilderReport, MySocialPractice, Orbix).

**Total distinct practice sites touched ≈ 37.** I did **not** reach the ~100 individually-audited target; I am reporting the actual numbers. The frequency table below counts **only the 15 in-depth homepages**, because that is the only set where I could reliably confirm a pattern's presence *or absence*. Snippet-level sites corroborate but never fill an "absent" count. One behavior — sticky mobile call/book bars — could **not** be reliably observed via page retrieval and is honestly marked "not measurable by this method" rather than estimated.

### Frequency tally (N of 15 in-depth homepages)
| # | Observable pattern | Count /15 | Reading |
|---|---|---|---|
| 1 | Appointment CTA present (book/request/schedule) | 15 | Universal |
| 2 | Prominent phone number in header/hero | 13 | Near-universal (2 SEO pages omitted it) |
| 3 | Emergency access surfaced on homepage | 11 | Common; absent on cosmetic/premium/family-forward sites |
| 4 | Insurance addressed on homepage (inline or clear nav) | 12 | Common — but usually vague (see #5–6) |
| 5 | Explains "accepted" vs "in-network" | 0 | **Nobody does it** — the biggest gap vs. patient need |
| 6 | Names specific insurance carriers on the page | 2 | Rare on homepage (a few more on subpages) |
| 7 | Membership plan for uninsured surfaced | 4 | Growing convention (esp. DSO templates) |
| 8 | Financing named (CareCredit / in-house) | 3 | Occasional |
| 9 | Any real price disclosed (e.g., first-visit self-pay) | 1 | **Almost never** (Integrity Boston is the exception) |
| 10 | Named dentist(s) with photo/bio on/from homepage | 11 | Common; absent on thin SEO templates |
| 11 | Embedded reviews/testimonials on homepage | 9 | Common |
| 12 | Aggregate review count/rating shown | 4 | Occasional but persuasive |
| 13 | Anxiety/comfort/"no judgment" language present | 12 | Common — but often a throwaway word, not a pathway |
| 14 | Dedicated anxiety section / strong no-judgment stance | 4 | Uncommon; a differentiator |
| 15 | Sedation explicitly mentioned | 4 | Occasional [verify before copying] |
| 16 | Any parking information | 6 | Mixed |
| 17 | Dedicated parking block/section | 3 | Uncommon |
| 18 | Transit named (station/streetcar/bus) | 3 | **Rare** — big Downtown opportunity |
| 19 | Building entrance/floor/suite/access detail | 2 | **Rare** (Integrity is the model) |
| 20 | New-patient link/section present | ~10 | Common (link); genuinely helpful content ~2 |
| 21 | Family / all-ages messaging | 11 | Common |
| 22 | Accessibility signal (widget/statement/non-discrimination) | 4 | Uncommon — compliance gap |
| 23 | Privacy / Notice of Privacy Practices link | 4 | Uncommon |
| 24 | Languages-spoken / bilingual signal | 3 | Uncommon (iSmile "Spanish at all locations" strongest) |
| 25 | Promotions / new-patient specials | 5 | Common; often salesy |
| 26 | Homepage restraint (curated, not full service dump) | 2 | **Rare** — most dump every procedure |
| 27 | Early/evening/weekend hours advertised | 5 | Mixed; many close Fri–Sun |
| 28 | Wellness / whole-body framing | 3 | Occasional |
| 29 | Sticky mobile call/book bar | not measurable | Could not be confirmed via retrieval; build & test |

### Verdict per pattern — adopt / avoid / ignore

#### A) STRONG patterns worth ADOPTING (evidence-backed, patient-aligned)
| Pattern | Why adopt | Best observed exemplar |
|---|---|---|
| Persistent appointment CTA + prominent phone | Universal for a reason; serves self-service and human channels | Dentologie, First Hill |
| Always-visible emergency access | Urgent patients won't navigate; matches CG triage need | Emergency-only Seattle practices; SkyView header |
| Named dentists + real photos + short philosophy | Core credibility signal | Gentry (UCSF, since 2003), First Hill (3 named) |
| Genuine attributed reviews + aggregate rating + link out | Reassurance without noise | Chicago Loop, First Hill (765+), Gentry (179) |
| Explicit "no judgment / it's okay if it's been a while" | Directly answers the anxiety hinge | Dentologie ("six months or six years"), Zen |
| "We show you what we see / never push unneeded treatment" promise | Converts the #1 distrust into a trust asset | Chicago Loop "Pinky Promise", Integrity values |
| Concrete arrival card (parking + validation + entrance + floor + transit + day-of access) | Solves Downtown friction almost no one solves | **Integrity Dental Boston** (gold standard) |
| Name transit + walking time | Car-light Downtown; near-empty competitive field | Dentologie (SLU Streetcar) |
| Membership plan + financing for the uninsured | Real path for a large uninsured segment | Chicago Loop, Smile Generation plan |
| Publish one honest bounded price (first-visit self-pay) | Beats every "we accept most insurance" competitor on trust | Integrity ("$200 without insurance") |
| Homepage restraint (curated services) | Reduces overwhelm; premium feel | Gentry ("without overwhelming the homepage"), Dentologie |
| Rich, plain-language FAQ accordion | Answers top questions in the patient's words | Dentologie (10 Qs), Integrity |
| Languages-spoken + non-discrimination + accessibility footer | Equity + compliance | Smile Generation sites, iSmile (Spanish) |
| Landmark/plain wayfinding ("corner of X, across from Y") | Human, memorable directions | Dentists of Queen Anne, Portland Modern |

#### B) COMMON-BUT-WEAK conventions (present everywhere, but done badly — adopt the intent, fix the execution)
| Weak convention | Why it's weak | Fix |
|---|---|---|
| "We accept most major insurance" (no carriers, no network status) | Vague; a documented abandonment trigger | Name networks [verify]; explain accept≠in-network; verify path |
| Emergency mentioned but buried in a service list | Not reachable in a crisis | Persistent nav + homepage action + sticky call |
| Long single-page service dump (20+ procedures) | Overwhelms; hurts scanning | Curate homepage; push depth to service pages |
| "Gentle/comfortable" as a throwaway adjective | Says nothing; anxious patients need specifics | Dedicated comfort content + "tell us your concerns" |
| New-patient "forms" link with no what-to-expect/what-to-bring | Doesn't reduce first-visit anxiety | Add checklist + step-by-step + records transfer |
| Driving directions only (no transit, no building entry) | Wrong for car-light Downtown | Add transit + entrance/floor/access |
| Promotions/discount banners | Reads as salesy; can erode trust | Use sparingly; lead with value, not urgency |
| SEO "neighborhood" doorway pages that admit "a short drive from [neighborhood]" | Feels misleading | Be honest about actual location; still serve the neighborhood via transit/parking facts |
| Request forms with CAPTCHA / long fields | Friction; accessibility risk | Short accessible form; minimal fields; clear states |

#### C) ANTI-PATTERNS to AVOID (actively damaging)
| Anti-pattern | Harm | Evidence |
|---|---|---|
| No named dentist, no real faces, generic template | Reads as illegitimate | Seattle's Capitol Hill Dentist (observed) |
| Fabricated-looking testimonials ("please enjoy the chocolates") | Destroys review trust | Same site (observed) |
| Contradictory information (hours that disagree across the page) | Signals carelessness | Same site (observed) |
| Neighborhood history filler before any patient value | Wastes the scarce first-impression seconds | SkyView Downtown page (observed) |
| Homepage that never states insurance or cost at all | Fails the #1–#2 patient jobs | 32 Pearls Downtown page (observed) |
| Autoplay audio/video, inaccessible carousels/scheduler/PDFs | Accessibility failures; abandonment | WCAG/ADA guidance (Gargle, ProSites) |
| Salesy cosmetic-only framing with no health/insurance grounding | Alienates value- and trust-driven patients | Cosmetic-led sites (observed) |
| Dense clinical jargon / English-only | Excludes LEP and low-literacy patients | CDC/HHS guidance |

#### D) IGNORE (present in the market but low patient value here — do not prioritize)
| Ignore | Why |
|---|---|
| Therapy-dog / spa gimmicks as headline differentiators | Nice-to-have; not a decision driver; can read as fluff (adopt real comfort substance instead) |
| Teledentistry front-and-center | Low first-release value for a local family practice; defer |
| Embedded month-calendar widgets on the homepage | Clutter; the booking CTA does the job |
| "Award-winning / #1 dentist" superlatives | Unverifiable puffery; patients discount it |
| Live-chat concierge bots | Operational overhead; a short form + phone suffices for P0 |

**Bottom line of the scan:** the market is saturated with the *same* conventions (appointment CTA, phone, vague insurance, service lists, "gentle care"), executed shallowly. The white space — and it is wide open even among Downtown Seattle practices — is **honest cost/insurance clarity, concrete Downtown arrival logistics, a real conservative-care/anti-over-treatment promise, and genuine anxiety accommodation.** Those four are exactly the patient-generated priorities.
## 16. Cross-domain design inspiration

Principles borrowed from other industries — **extracted as principles, not copied as surface**. Each row: the source domain, the user problem it solves there, the underlying principle, why it transfers to a dental site, how to adapt it, where it appears, its risk/limitation, and priority. The final experience must feel coherent and calm — a dental practice, not a collage of references.

| Source domain | Problem it solves there | Underlying principle | Why it transfers | How to adapt (dental) | Where on site | Risk / limitation | Priority |
|---|---|---|---|---|---|---|---|
| **Primary care / health systems (e.g., clinic portals)** | "Am I in the right place, and what do I do next?" | One primary action per screen; triage-style entry | Patients arrive with a mix of routine/urgent/anxious intents | Home offers 3 clear doors: Book, Emergency, New patient | Home, global header | Over-triage can feel cold; keep warmth | P0 |
| **Mental-health / therapy apps (e.g., calm onboarding)** | Reducing shame and overwhelm before a first step | Non-judgmental, low-pressure, human tone; "you're welcome here" | Dental anxiety mirrors therapy hesitation | "It's okay if it's been a while" + "tell us how to help" | Anxiety/comfort section, forms | Can feel patronizing if overdone | P1 |
| **Hospitality / hotels** | Arrival and wayfinding in an unfamiliar building | Concierge-grade arrival instructions; anticipate the guest's next need | Downtown towers are confusing; arrival is a real job | Arrival card: entrance, floor, parking validation, transit, day-of access | Location/arrival, confirmation | Detail bloat; keep scannable | P0 |
| **Travel (airlines/booking)** | Confidence a booking succeeded; know what to bring | Clear confirmation + prep checklist + calendar add | First-visit prep reduces no-shows and anxiety | Confirmation screen: what to bring, arrival, add-to-calendar | Booking success, New patients | Don't overload confirmation | P1 |
| **Financial services (modern banking)** | Trust with money; plain explanations of fees | Radical clarity about cost; plain-money language; no hidden terms | Cost opacity is the #1 dental walk-away | Cost-transparency statement; written estimates; explain accept≠in-network | Insurance/payment, service pages | Can't quote prices you can't stand behind | P0 |
| **Insurance (benefits explainers)** | Decoding coverage jargon | Progressive disclosure; "what this means for you" | Patients confuse accept/in-network, deductible/max | Plain explainer + verify-benefits steps + FAQ | Insurance page | Must stay accurate; [verify] specifics | P0/P1 |
| **Premium retail / DTC brands** | Feeling quality without feeling gouged | Generous whitespace, restraint, honest premium tone | "Premium but not unaffordable" is the target feel | Curated homepage; calm palette; quality photography | Global visual system | Can tip into "expensive/exclusive" — counter with inclusive copy | P1 |
| **Real estate listings** | Judging a place remotely | Rich, honest location context (map, neighborhood, transit, photos) | Patients judge convenience and legitimacy remotely | Map + neighborhood + transit + real office photos | Location/arrival, Home | Don't fake or over-stage photos | P1 |
| **Consumer tech (Apple-store-like)** | Confidence in modern competence | Clean hierarchy, obvious primary action, fast load | Signals modern, credible care to professionals | Clear type scale, one hero action, performance budget | Global | "Sterile/corporate" risk — warm it with faces/words | P1 |
| **Public services / gov digital (plain-language)** | Serving everyone, including low-literacy/LEP | Plain language, semantic structure, accessibility as baseline | Family practice must serve all backgrounds | 8th-grade copy, WCAG 2.2 AA, languages-spoken signal | Every page | Plainness ≠ dull; keep human | P0 |
| **Accessibility-focused products** | Usable by AT users | Keyboard/focus/contrast/labels first, not bolted on | Legal + ethical + real patients | Accessible forms, skip links, alt text describing clinical purpose | Every component | Overlay widgets ≠ compliance; build it in | P0 |
| **Restaurant reservation UX (e.g., time-slot pickers)** | Fast, low-friction booking | Minimal fields, show availability, instant confirmation | Booking friction loses time-poor patients | Short request/booking form; clear states | Appointment flow | Don't over-engineer a scheduler for v1 | P1 |

### How these combine into the experience goals
- **Trust:** financial-services clarity + named human credibility (health systems) + genuine reviews.
- **Calm:** mental-health tone + premium-retail restraint + gov plain-language.
- **Wayfinding:** hospitality arrival + real-estate location richness + one-primary-action (health portals).
- **Financial transparency:** banking + insurance explainer patterns.
- **Conversion:** travel/restaurant booking clarity + confirmation + prep checklist.
- **Accessibility & inclusion:** gov + accessibility-first products, everywhere, as a baseline.

**Coherence guardrail:** borrow the *principle*, render it in one consistent dental visual system (below). Never lift another organization's branding, photography, copy, or proprietary layout. If a borrowed pattern adds complexity without a clear patient need (e.g., a travel-style seat-map scheduler, a retail wishlist), **defer it.**
## 17. Recommended design direction

A single, coherent visual system whose qualities are: **trustworthy, warm, calm, modern, clinically credible, human, family-friendly, sophisticated-but-inclusive, premium-but-affordable-feeling, efficient-but-personal, locally relevant, accessible, and mobile-scannable.** Values below are **recommendations with rationale**, not mandates; the practice's real brand assets should refine them. All color pairings must be validated against WCAG 2.2 AA contrast before use.

### Color strategy
- **Foundation:** calm, healthcare-appropriate blues/teals and soft greens read as clean and trustworthy without feeling cold (designyourway.net; healthcare design guidance, accessed Aug 2026). Avoid clinical white-and-red (alarming) and avoid heavy corporate navy alone (cold).
- **Recommended palette direction (starting points, tune for brand + contrast):**
  - Primary: a calm teal/blue in the range **#1F6F78–#2A7DE1** (trust, action).
  - Secondary/warm accent: a soft, human warm tone (muted terracotta/amber **#E8A87C**-ish or warm sand) to prevent sterility and add welcome.
  - Nature/calm support: a soft sage/green **#7FB6A1**-ish for reassurance blocks.
  - Neutrals: warm greys **#F7F8F8 / #EBEEEF / #5B6668 / #26312F** for text and surfaces (warm, not blue-grey).
  - Emergency: a single restrained alert color (a warm red **#C0392B**) used **only** for the emergency action — never for marketing.
- **Contrast:** body text ≥ **4.5:1**; large text/UI ≥ **3:1**; do not rely on color alone to convey meaning (pair with icon/label).

### Typography & type scale
- **Pairing:** one humanist sans for UI/body (e.g., a friendly grotesque) + optionally one warm serif or a distinctive-but-legible display for headings, to feel human and credible rather than generic-corporate. Prioritize legibility over personality.
- **Type scale — mobile-first (author the phone value first; desktop scales up):** the scale is set at 320–390px and *enlarged* on wider screens, never shrunk down from a desktop comp. **Mobile base:** body **17px** (never below 16px for body *or* inputs — sub-16px inputs trigger iOS auto-zoom on focus); lead body 18px; fine print 14px. **Mobile heading step (~1.2):** 20 · 24 · 28 · 33 (mobile H1/hero, capped so a headline never forces sideways scroll at 320px). **Desktop enhancement (~1.25, ≥1024px):** the same roles scale up to 21 · 25 · 31 · 39 · **49 (hero)**. Full role scale across breakpoints: 14 · 16 · 18 · 21 · 25 · 31 · 39 · 49.
- **Line length** ~35–40 characters on a phone, 60–75 on desktop; **line-height** 1.5 body / 1.2–1.3 headings. Left-aligned; avoid justified text (justification breaks up badly in narrow mobile measures).

### Spacing, density & rhythm
- **Spacing scale — mobile-first (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. **On phones the working rhythm is the lower end** (16–24 section padding, 12–16 between controls) so more of the answer fits above the fold without crowding; **desktop enhances upward** (48–96 section rhythm) for premium-retail restraint. Keep **≥16px gutters** on mobile so nothing touches the screen edge, and ≥8px breathing room around every tap target. Never let generous desktop spacing push the primary action below the fold on a phone.
- **Page width:** content max **1120–1200px**; text measure capped ~680–720px; comfortable gutters (≥16px mobile, ≥24–32px desktop).
- **Density:** airy. One primary idea per section; whitespace is a trust signal.

### Photography & illustration
- **Photography:** real dentists, team, and office — warm, natural light, genuine expressions, diverse and multi-generational patients (include older adults, couples, individuals — not only young parents with toddlers). No cheesy stock "perfect white smiles pointing at teeth." Real office photos double as legitimacy and arrival aids.
- **Illustration/iconography:** simple, rounded, low-detail line icons for services/steps; light spot illustration acceptable for wayfinding/anxiety content; **avoid juvenile cartoons** (reads childish) and avoid hyper-clinical medical iconography (reads intimidating).

### Cards, surfaces, borders, shadows
- **Cards:** rounded corners **8–12px**; soft, low shadows (e.g., 0 1px 3px + 0 4px 12px at low opacity) for gentle depth; thin **1px** warm-grey borders where separation is needed. Avoid heavy drop shadows (dated) and hard edges everywhere (cold).
- **Surfaces:** mostly light warm-neutral backgrounds; use the sage/warm accent sparingly for reassurance or emergency blocks.

### Calls to action
- **Primary CTA:** solid primary-teal button, high contrast, generous padding, **≥44×44px** touch target, clear verb ("Request an appointment," "Book online"). One primary per view.
- **Secondary CTA:** outline/ghost button (e.g., "Call us," "See payment options").
- **Emergency CTA:** distinct restrained-red treatment, always visible; iconography + label (never color alone).
- **Touch-target sizing — mobile-first:** every interactive target is **≥44×44px** (WCAG 2.2 §2.5.8) with **≥8px** spacing from its neighbors — sized for a thumb first, not a mouse pointer; primary CTAs are ≥48px tall on phones with generous padding.
- **Thumb-zone placement:** on a phone the primary action lives in the lower/reachable band or a **bottom-anchored sticky bar** (the top of a tall phone is out of one-handed reach). A top-of-screen CTA is a *desktop enhancement*, not the mobile source of truth.
- **Tap-state & focus (mobile-first):** every tappable element has a visible **pressed/`:active`** state (phones have no hover) *and* a visible **`:focus-visible`** ring for keyboard/switch users; hit areas are forgiving (padding beyond the visible glyph); no action depends on hover.

### Forms
- Single-column; visible labels above fields (never placeholder-only); large tap targets; input types set correctly (tel/email/date) for mobile keyboards; inline validation with clear, kind error text; minimal required fields; explicit privacy note near submit. Every form has **loading, success, and error/recovery** states.
- **Mobile input behavior (first-class, not an afterthought):** set `inputmode` and `autocomplete` tokens alongside `type` so the right keyboard appears and autofill works — e.g. `type="tel" inputmode="tel" autocomplete="tel"`, `type="email" inputmode="email" autocomplete="email"`, `inputmode="numeric"` for numeric codes. Keep input font-size **≥16px** to prevent iOS zoom-on-focus. Place the submit button within thumb reach and never let a sticky bar cover it. **Preserve entered values on interruption** (a patient may pause to take a call) — do not clear the form on back/return.

### Reviews, dentist profiles, service navigation
- **Reviews:** static, attributed cards (name/first-initial), aggregate rating, link out; **no autoplay carousel**. 3–6 curated, values-illustrating quotes.
- **Dentist profiles:** warm portrait, name + credentials [verify], school/years [verify], one-line philosophy, plus a human detail; consistent card layout.
- **Service navigation:** dual model — a curated services overview + a small "browse by concern" list in patient language; **no complex symptom checker.**

### State design (emergency / confirmation / error / empty / loading)
- **Emergency state:** calm-urgent, high-contrast, one-tap call, ER-triage line, first-aid link. No marketing.
- **Confirmation state:** reassuring success ("You're all set — here's what happens next"), what-to-bring, arrival card link, add-to-calendar.
- **Error state:** plain-language, non-blaming, tells the user exactly how to recover, always offers the phone as a fallback.
- **Loading state:** lightweight skeletons/spinners; never leave an action ambiguous.
- **Empty state** (e.g., no online slots): don't dead-end — offer the request form and phone.

### Motion & transitions
- Subtle, fast (≤200–250ms), meaningful only; respect **prefers-reduced-motion**; **no motion that delays comprehension**, no autoplay audio/video, no parallax that impairs reading.

### Mobile actions & behavior
- Persistent, thumb-reachable **Call** and **Book/Request** actions; tap-to-call (tel:) and tap-to-map; sticky emergency access; forms and arrival details fully usable one-handed. Mobile is complete, not reduced.
- Sticky bottom actions are **safe-area-inset aware** (`env(safe-area-inset-bottom)` under `viewport-fit=cover`) on notched devices, clear of the home indicator, and never overlap content or a form's submit.

### Mobile-first operating principles
A concise, opinionated ruleset that governs the **whole build**. A majority of patients arrive on a phone — often one-handed, sometimes in pain, sometimes on a poor connection, sometimes standing on a Downtown sidewalk hunting for the building entrance. Design for that person first; desktop is the enhancement.
1. **Design the 320–390px layout first; let desktop enhance it.** The phone layout is the source of truth, never a squeezed-down desktop comp.
2. **One primary action per screen.** Choose the single most important thing and make it unmissable; everything else is visibly secondary.
3. **Put actions in the thumb zone.** Anchor primary and urgent actions to the lower reachable band or a sticky bottom bar; the top of a tall phone is out of one-handed reach.
4. **Never hide critical information behind a hamburger.** Phone, booking, emergency, hours, and address are reachable without opening a menu.
5. **Make phone, directions, and booking one-tap from anywhere.** `tel:` for calling, a maps deep link for directions, a persistent Book action — no hunting, no copy-pasting.
6. **Assume a poor connection and budget accordingly.** Ship less, defer and compress images, keep the throttled-mobile LCP ≤ 2.5s (GTH-19). Page weight is a patient-care issue, not a nicety.
7. **Assume interruption and preserve form state.** A patient may stop mid-form to take a call or check their insurance card; keep entered values and scroll position and never punish the return.
8. **Never require pinch-zoom to read.** Body and inputs ≥ 16px, AA contrast, and full reflow at 320px / 200% with no loss of content (GTH-20).
9. **Make every tap target forgiving.** ≥ 44×44px with ≥ 8px spacing, generous padding, and a visible pressed state — a nervous thumb should not miss.
10. **Treat the phone experience as complete, not reduced.** If it matters on desktop it matters on mobile; parity of *information and function* is the baseline — layout adapts, content is never stripped.

### Accessibility behavior (baseline, not add-on)
- WCAG 2.2 AA target: semantic headings/landmarks, visible focus states, logical focus order, skip-to-content link, keyboard operability for all interactions, labeled fields, alt text that describes the **clinical/wayfinding purpose** of images, no color-only meaning, and a real **accessibility statement** page. Avoid overlay "accessibility widgets" as a substitute for built-in accessibility (ProSites, Gargle, UserWay guidance, accessed Aug 2026). *Evidence: CG Repeated.*

### What could make this site feel wrong — and how to avoid it
| Failure mode | Cause | Avoid by |
|---|---|---|
| **Generic** | Template look, stock smiles, no faces | Real photos, named team, distinctive-but-legible type |
| **Untrustworthy** | Fake reviews, contradictions, no credentials | Genuine attributed reviews, verified facts, consistency |
| **Overly corporate/cold** | Navy-only palette, sterile grid, jargon | Warm accent, human copy, real people |
| **Too expensive/exclusive** | Luxury-only cues, cosmetic-only framing | Inclusive words, cost transparency, membership path |
| **Sterile/clinical** | White+red, medical iconography, dense | Calm palette, whitespace, warm imagery |
| **Juvenile** | Cartoon mascots, primary-color overload | Grown-up palette, restrained illustration |
| **Clinically intimidating** | Scary procedure imagery, jargon | Plain language, reassurance, "what to expect" |
| **Visually noisy** | Carousels, popups, promo banners, autoplay | One idea per section, no autoplay, minimal promos |
| **Hard to read** | Low contrast, tiny type, thin fonts | ≥16px body, AA contrast, real hierarchy |
| **Aggressive/sales-driven** | Urgency banners, "investment in your smile," upsell tone | Value-first copy, honest cost, no false urgency |
## 18. Information architecture

A **lean IA**: a concise primary navigation, a small set of P0 pages that complete the core jobs, and P1/P2 pages added only once the foundation works. The rule for placement: **a topic is a page** when it is a destination people seek and search for (services, insurance, location, team, new patients, emergency); **a homepage section** when it must reassure in-context during the first-impression scan (trust strip, family message, reviews teaser); **contextual content** when it only matters inside another task (comfort options within a service page, "what to bring" within new-patient flow).

### Primary navigation (keep to ~6 + emergency + booking)
`Services` · `New Patients` · `Insurance & Payment` · `Our Team` · `Location & Hours` · `Contact` — plus a persistent **Book/Request** button and a distinct **Emergency** action (and the phone number). Dental-anxiety/comfort, Reviews, and FAQ are reachable from Home and from relevant pages; they become standalone pages at P1.

### Page inventory
| Page | Patient jobs addressed | Top questions answered | Required sections | Primary CTA | Secondary CTA | Trust signals | Related pages | Local-search purpose | Content dependencies [verify] | Priority | Minimum useful version | Later enhancement |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Home** | B, C, D, F, H (first impression) | Who/where/insurance/new-patient/emergency | Hero+CTA, emergency action, trust strip, team intro, service/concern discovery, insurance message, new-patient teaser, anxiety reassurance, family message, location+arrival teaser, reviews, final CTA | Request/Book | Call · Emergency | Faces, credentials, reviews, conservative-care line | All | Rank for "[neighborhood] dentist / family dentist Seattle" | Hours, insurance, address | **P0** | Hero+CTA+emergency+team+insurance+location+book | Personalization, richer reviews |
| **Our Team (Dentists & team)** | C | Who treats me? Legit? Do they listen? | Dentist profiles, team, philosophy, office photos/tour | Request/Book | Meet the team | Credentials, license, photos, philosophy | About, New Patients | "dentist [name] Seattle", trust | Names, credentials, licenses, photos | **P0** | 1 profile/dentist + philosophy | Bios depth, video, memberships |
| **New Patients** | I, B, D, E | Accepting? What to bring/expect? Forms? Records? | Accepting-status, what-to-expect, what-to-bring checklist, forms, records transfer, insurance pointer, first-visit price [verify] | Request/Book | Complete forms | Step clarity, no-judgment line | Insurance, Anxiety, Location | "new patient dentist Seattle" | New-patient policy, forms, price | **P0** | Accepting-status + what-to-bring + book | Online forms, portal |
| **Insurance & Payment** | D | In-network? Cost? Uninsured? Verify? | Accept≠in-network explainer, networks list, verify-benefits, estimates, membership/financing, payment methods | Check my coverage | Call to verify | Named networks, transparency | New Patients, Services | "dentist takes Delta Dental Seattle" | Networks, membership, financing, methods | **P0** | Explainer + networks + uninsured path | Coverage look-up tool |
| **Location & Hours (Arrival)** | H, F | Where/park/transit/entrance/hours? | Address+map, parking+validation, transit, building entry/floor/suite/access, hours, contact | Get directions | Call | Real photos, specifics | Contact, Emergency | "dentist near [station]/downtown" | Address, parking, transit, access, hours | **P0** | Address+map+parking+transit+hours | Nav videos, live hours |
| **Services (overview)** | G | Do you do X? What fits my concern? | Curated service list, browse-by-concern, life-stage entry, emergency shortcut | Request/Book | Learn about [service] | Plain explanations | Individual services | "root canal / Invisalign Seattle" | Service list | **P0/P1** | Overview + top services | Full service pages, concern module |
| **Service pages (per procedure)** | G, C, D, J | What is it? Why? Steps? Cost? | Plain explainer, what-to-expect, cost/insurance pointer, prep/aftercare | Ask about this | Book consult | Non-pushy tone, imaging note | Insurance, Team | Long-tail service SEO | Per-service facts | **P1** | Top 6–8 services | Full catalog, media |
| **Emergency Dentistry** | F | Seen today? Call who? ER? First aid? | Call action, same-day policy, ER-triage, first-aid steps, what-to-have-ready | Call now | Directions | Clinical-sourced first aid | Location, Contact | "emergency dentist downtown Seattle" | Same-day/after-hours policy | **P0** | Call + ER line + first aid | Online urgent request |
| **Dental Anxiety & Comfort** | E | Judged? What happens? Comfort options? | No-judgment welcome, what-to-expect, comfort options [verify], "tell us your concerns" | Talk to us first | Book gently | Warm reviews, plain steps | New Patients, Team | "gentle/sedation dentist Seattle" | Comfort/sedation offerings | **P1** | No-judgment + what-to-expect + notes field | Sedation detail, video |
| **Contact / Request appointment** | H | How do I reach/book? | Request form, phone, message, hours, map | Submit request | Call | Fast response promise | Location, New Patients | Conversion | Response policy | **P0** | Short form + phone | Online scheduler |
| **Reviews** | C | Do others trust them? | Curated quotes, aggregate, links out | Read reviews | Book | Genuine attribution | Home, Team | Reputation | Review sources | **P1** | Section on Home + link out | Dedicated page, filters |
| **FAQ** | A–K | The recurring questions | Grouped FAQ accordion | Ask us | Call | Plain answers | All | Long-tail SEO | Answers [verify specifics] | **P1** | Top 12 Qs | Search, expansion |
| **Family / Life-stage care** | G, B | Kids+adults? All ages? | All-ages positioning, life-stage entries, household coordination | Care for your household | Book | Inclusive imagery | Services, Team | "family dentist Seattle" | Pediatric/scope facts | **P1** | Home section + short page | Dedicated life-stage pages |
| **Privacy / Notice of Privacy Practices** | (compliance) | How is my data handled? | Privacy policy, NPP | — | — | Compliance | Footer | Trust/compliance | Legal content | **P0** | Standard policy | — |
| **Accessibility statement** | (compliance/inclusion) | Can I use this site; how to get help? | Accessibility commitment, contact for accommodations | Contact us | — | WCAG commitment | Footer | Inclusion | Accommodation contact | **P0/P1** | Statement + contact | Ongoing audit log |

### What is a page vs. a section vs. contextual
- **Standalone pages (destinations & SEO):** Home, Our Team, New Patients, Insurance & Payment, Location & Hours, Services + service pages, Emergency, Contact, Privacy, Accessibility. (Anxiety, Reviews, FAQ, Family become pages at P1.)
- **Homepage sections (reassure in the scan):** trust strip, short team intro, insurance message, new-patient teaser, anxiety reassurance line, family message, reviews teaser, location/arrival teaser, final conversion.
- **Contextual content (inside a task):** comfort options within Anxiety/service pages, "what to bring" within New Patients, cost pointers within service pages, "when we refer out" within About.

### IA guardrails
- Keep primary nav ≤ 6 items + Book + Emergency; deep content lives one level down.
- No clever/novel navigation metaphors; use familiar labels in patient language.
- Every P0 page must be reachable in ≤ 2 taps from Home and from the footer.
- Add P1/P2 pages only when their P0 dependencies (accurate content, verified facts) exist.
## 19. Homepage blueprint

Sections in recommended vertical order. The homepage must answer, in the first scan, **who you are, where you are, whether you take my insurance, and how I book — plus an emergency door and a trust signal.** It must not become a service catalog or a wall of marketing copy. For each section: purpose · patient job · question answered · required content · message direction · CTA · trust mechanism · visual treatment · mobile behavior · accessibility · priority. All specifics that would assert facts are **[verify]** placeholders.

**Mobile-first homepage map (360×640 — build this layout first).** The homepage is a **single column** on a phone; only ~560px is visible before the first scroll (after browser chrome). What must be above the fold on a 360px-wide screen, and what collapses or defers, section by section:
- **0. Header:** *above the fold* — practice name, **tap-to-call**, and the menu/Book affordance; nav collapses into the menu but **Call/Book/Emergency never hide behind the hamburger**.
- **1. Hero:** *above the fold* — H1 + one-line proof + the **primary Request/Book CTA**; the hero image is compressed and may sit *below* the headline/CTA on a phone so the action is not pushed down. Cap the headline so it never forces sideways scroll at 320px.
- **2. Appointment + emergency actions:** on mobile these **detach into a persistent sticky bottom bar** (Call · Book · Emergency), thumb-zone and safe-area aware, reachable from every scroll position — the mobile home for the two highest-intent doors.
- **3. Trust strip:** first section after the hero on scroll; chips **wrap 2×2**; stays text-labeled, not icon-only.
- **4. Team intro:** portraits **stack** vertically; one name + one-line philosophy readable without tapping.
- **5. Insurance message:** full-width and tappable; the plain in-network line stays visible (not collapsed).
- **6. Service/concern discovery:** grid drops to **2-up then 1-up**, capped at 6–8 items (never a catalog); "browse by concern" is a wrapping chip list. **Deferrable** below higher-intent sections on a phone.
- **7. New-patient steps:** vertical numbered steps; safe to sit lower on the page.
- **8. Anxiety reassurance:** concise calm block; detail may **collapse** to a "read more" that hides nothing critical.
- **9. Family message:** one warm multi-generational image + line, full-width.
- **10. Location/arrival teaser:** surfaces **one-tap Directions + Call** inline (Downtown arrival is a phone job); the address is real tappable text, not baked into a map image.
- **11. Reviews:** static stacked cards or an accessible swipe; **no autoplay**; lower priority, lazy-loaded below the fold.
- **12. Final CTA:** big thumb-zone buttons (Request + Call).
- **13. Footer:** stacks; Emergency, Privacy/NPP, and Accessibility stay reachable.
*Rule:* nothing critical is hidden on mobile — collapsed content is always one tap open, and any richer media (P2) is deferred/lazy-loaded below the fold.

### 0. Global header (persistent)
- **Purpose/job:** orient + convert from anywhere (B/H/F). **Answers:** who/where/how-to-book/emergency.
- **Content:** logo, practice name, concise nav (Services · New Patients · Insurance & Payment · Our Team · Location & Hours · Contact), **Book/Request** button, **phone (tap-to-call)**, distinct **Emergency** link.
- **CTA:** Book/Request (primary) · Call (secondary) · Emergency.
- **Trust:** real name + phone visible = legitimacy. **Visual:** clean, light, one primary button. **Mobile:** condensed bar with sticky **Call** + **Book** + **Emergency**. **A11y:** landmark `<header>`, skip link, keyboard nav, focus states. **Priority: P0.**

### 1. Hero
- **Purpose/job:** establish trust + convert in seconds (C/H). **Answers:** who/where/why-us + book.
- **Required content:** one warm real photo (dentist/team/office), a clear headline + subhead, primary CTA, secondary Call, and a one-line proof (e.g., neighborhood + "accepting new patients" [verify]).
- **Hero message directions (pick/blend; keep placeholders):**
  1. *Trust/relationship:* **"[Neighborhood]'s dental home for your whole family — honest, gentle care that never pushes what you don't need."**
  2. *Convenience/professional:* **"Dentistry that fits your day — book online, park easily, and get back to work. In [building], steps from [Link station]."**
  3. *Reassurance/anxiety-aware:* **"It's okay if it's been a while. Calm, judgment-free dental care in [neighborhood]."**
  4. *All-ages/inclusive:* **"Care for every smile in your life — kids, adults, and everyone in between — in the heart of Downtown Seattle."**
- **CTA:** Request an appointment (primary) · Call us (secondary). **Trust:** real face + honest one-liner (no superlatives). **Visual:** generous hero, calm palette, legible large type, one action. **Mobile:** headline + one CTA above the fold; image compressed; tap-to-call near. **A11y:** real `<h1>`, descriptive alt, contrast AA. **Priority: P0.**
- **Do NOT** invent awards, years, prices, ratings, or availability — use [verify] placeholders.

### 2. Primary appointment action + emergency action (utility strip)
- **Purpose/job:** the two highest-intent doors (H/F). **Answers:** "book now" / "I have an emergency."
- **Content:** **Request/Book** (primary) and **Dental emergency? Call now** (distinct, restrained-red). **Visual:** two clear affordances; emergency uses icon+label, not color alone. **Mobile:** becomes/stays the sticky action bar. **A11y:** buttons, not ambiguous links; tel: link. **Priority: P0.**

### 3. Trust strip
- **Purpose/job:** fast credibility (C). **Answers:** "are they legit/values?"
- **Content:** 3–4 honest chips: "Accepting new patients" [verify] · "In-network with [carriers]" [verify] · "Gentle, judgment-free care" · "Same-day emergencies" [verify]. **Trust:** concrete, verifiable claims only. **Visual:** simple icon row, no clutter. **Mobile:** wraps to 2×2. **A11y:** text labels (not icon-only). **Priority: P0.**

### 4. Short dentist/team introduction
- **Purpose/job:** put a human face on care (C). **Answers:** "who will treat me?"
- **Content:** 1–2 warm portraits, name(s) + credential [verify], one-line philosophy ("we explain before we treat; we recommend only what you need"), link to Our Team. **Trust:** named, credentialed humans. **Visual:** portrait + short copy. **Mobile:** stack. **A11y:** alt describing the person/role. **Priority: P0.**

### 5. Insurance & cost message
- **Purpose/job:** answer the #1–#2 fit/cost jobs (D). **Answers:** "do you take my insurance / what if I'm uninsured?"
- **Content:** one plain line ("We're in-network with [carriers]; not sure? We'll help you check." [verify]) + "No insurance? We have options." → Insurance & Payment. **Trust:** names networks, offers help, mentions uninsured path. **Visual:** compact block, no jargon. **Mobile:** full-width, tappable. **A11y:** readable, linked. **Priority: P0.**

### 6. Service / concern discovery
- **Purpose/job:** help patients find care their way (G). **Answers:** "do you do X / what fits my concern?"
- **Content:** a **curated** set (6–8) of top services + a small "browse by concern" list in patient language (toothache, straighten, whiten, replace a tooth, kids' care) → Services. **Trust:** plain names, no dump. **Visual:** simple cards/links, restraint (not 24 items). **Mobile:** 2-col cards. **A11y:** link list semantics. **Priority: P1** (a basic services link is P0).

### 7. New-patient explanation (teaser)
- **Purpose/job:** lower the first-visit barrier (I). **Answers:** "what happens / what do I bring / accepting?"
- **Content:** 3-step "Your first visit" + "what to bring" teaser + accepting-status → New Patients. **Trust:** clarity reduces anxiety. **Visual:** 3 numbered steps. **Mobile:** vertical steps. **A11y:** ordered list. **Priority: P1.**

### 8. Dental-anxiety reassurance
- **Purpose/job:** welcome the anxious/lapsed (E). **Answers:** "will I be judged / can I go slow?"
- **Content:** "It's okay if it's been a while — no lectures, no judgment. Tell us how to make you comfortable." → Anxiety & Comfort. **Trust:** warm, specific, matches PG evidence. **Visual:** calm block, soft accent. **Mobile:** concise. **A11y:** plain language. **Priority: P1.**

### 9. Family / all-ages message
- **Purpose/job:** signal comprehensive care (G/B). **Answers:** "can the whole household come?"
- **Content:** "One dental home for every stage — kids, adults, and older adults" + inclusive imagery → Family/Life-stage. **Trust:** inclusive (not kids-only). **Visual:** one warm multi-generational image + line. **Mobile:** full-width. **A11y:** alt inclusive. **Priority: P1.**

### 10. Location, convenience, parking & transit (arrival teaser)
- **Purpose/job:** solve Downtown arrival (H). **Answers:** "where/park/transit/entrance/hours?"
- **Content:** address + map, building/entrance note, parking + validation [verify], nearest Link station/streetcar + walk time, hours, one-tap call → Location & Hours. **Trust:** concrete specifics (rare in market). **Visual:** compact card + small map. **Mobile:** one-tap directions + call. **A11y:** map has text alternative/address. **Priority: P0.**

### 11. Reviews (teaser)
- **Purpose/job:** social proof (C). **Answers:** "do others trust them?"
- **Content:** 3 curated attributed quotes (values-illustrating) + aggregate rating + link out. **Trust:** genuine, attributed, links to full profiles. **Visual:** static cards (no autoplay carousel). **Mobile:** stack/swipe (accessible). **A11y:** static, keyboard-navigable. **Priority: P1.**

### 12. Final conversion section
- **Purpose/job:** close (H). **Answers:** "okay, how do I start?"
- **Content:** restated value + **Request an appointment** + Call + hours + "new patient? start here." **Trust:** low-pressure, clear next step. **Visual:** calm CTA band. **Mobile:** big buttons. **A11y:** buttons + tel:. **Priority: P0.**

### 13. Footer
- **Content:** address, phone, hours, map link, nav, Emergency, Privacy/NPP, Accessibility statement, languages-spoken [verify], social. **Priority: P0** (with Privacy + Accessibility).

### Homepage priority summary
- **P0 (must ship for launch):** header, hero, appointment+emergency actions, trust strip, team intro, insurance message, location/arrival teaser, final CTA, footer (with Privacy + Accessibility).
- **P1:** service/concern discovery, new-patient teaser, anxiety reassurance, family message, reviews teaser.
- **P2:** any richer media, personalization, or interactive modules — deferred.

**Guardrail:** resist adding every service or generic marketing copy. If a homepage section doesn't advance one of the named patient jobs, cut it.
## 20. Page-level requirements

Detailed content outlines for each page — the concrete blocks each page must contain, its minimum useful version, and its later enhancement. This complements the IA table (which gave jobs/CTAs/priority) by specifying **what actually goes on the page.** Every fact-bearing item is **[verify]**.

### Our Team (Dentists & team) — P0
- **Blocks:** page intro (care philosophy: "we explain before we treat; we recommend only what you need"); one **dentist profile** per dentist (portrait, name + DDS/DMD [verify], school + years [verify], one-line philosophy, a human detail, license note [verify]); team/staff strip (hygienists, front desk — humanize, per Key Dental example); office photos/tour; "when we refer to specialists" note; CTA (Request/Book).
- **Minimum:** 1 profile per dentist + philosophy + Book CTA. **Enhancement:** office video tour, memberships, individual availability.

### New Patients — P0
- **Blocks:** "Accepting new patients" status [verify]; **What to expect at your first visit** (plain step-by-step, ~30–45 min [verify]); **What to bring** checklist (insurance card, photo ID, prior records/X-rays, medication list); **Forms** (online/downloadable, accessible) [verify]; **Records transfer** instructions [verify]; insurance pointer (+ "we'll help you verify"); "Will treatment happen day one?" note [verify]; no-judgment line for lapsed patients; first-visit self-pay price [verify]; CTA (Request/Book).
- **Minimum:** accepting-status + what-to-bring + what-to-expect + Book. **Enhancement:** secure online intake forms/portal.

### Insurance & Payment — P0
- **Blocks:** plain **"accepted" vs "in-network" explainer**; **networks we're in** list [verify]; **how to verify your benefits** steps + "we'll help"; **what an estimate can/can't include** + written-estimate offer; **No insurance?** membership plan + financing [verify]; **payment methods** [verify]; benefit-mechanics FAQ (deductible/annual max/coinsurance); No Surprises Act note; CTA (Check my coverage / Call).
- **Minimum:** explainer + networks + uninsured path. **Enhancement:** coverage look-up form.

### Location & Hours (Arrival) — P0
- **Blocks:** address + building name + **map** (one-tap directions); **parking** (nearest garage/lot, approx cost, validation [verify]); **transit** (nearest Link station/streetcar/bus + walk time); **building entry** (entrance, floor/suite, elevator/accessible route, day-of access step [verify]); **hours** (badged early/late/weekend [verify]); contact (tap-to-call, text [verify]); real photos of entrance/office.
- **Minimum:** address + map + parking + transit + hours. **Enhancement:** walking/driving nav videos, live "open now" status.

### Services (overview) — P0/P1
- **Blocks:** curated top services (plain names); **browse by concern** list (patient language → service pages); **life-stage** entry (kids/teens/adults/older adults); emergency shortcut; CTA.
- **Minimum:** overview + links to top services + emergency shortcut. **Enhancement:** full concern module, media.

### Service pages (per procedure) — P1
- **Structure (repeatable template):** plain "what it is" (patient word + clinical term); "why it might be recommended" (non-diagnostic); "what to expect" (typical steps/visits); comfort note; **cost & insurance pointer** (no invented prices); prep/aftercare; related services; CTA ("Ask about this treatment"/"Book a consultation").
- **Minimum:** top 6–8 services (exam/cleaning, filling, crown, root canal, extraction, implant, Invisalign, whitening). **Enhancement:** full catalog, before/after [consent + a11y], video.

### Emergency Dentistry — P0
- **Blocks:** **Call now** (tap-to-call) + after-hours instructions [verify]; same-day/how-fast policy [verify]; **"Go to the ER instead if…"** triage list; **safe first-aid** (knocked-out/broken tooth, bleeding, pain, lost filling) attributed to clinical sources; "what to have ready" list; directions/arrival link.
- **Minimum:** call + ER-triage + first aid. **Enhancement:** online urgent request with triage routing.

### Dental Anxiety & Comfort — P1
- **Blocks:** **no-judgment welcome**; **what to expect** walk-through; **comfort options** [verify] (numbing, nitrous/sedation, headphones, breaks, stop-signal policy); "tell us how to help you feel comfortable" (links to request notes field); reassurance about control/pace; warm reviews.
- **Minimum:** no-judgment + what-to-expect + notes-field invite. **Enhancement:** short calming video, sedation detail.

### Contact / Request appointment — P0
- **Blocks:** **request form** (name, phone, email, preferred time window, reason/notes, insurance optional, "additional family members" note); phone (tap-to-call); message option [verify]; hours; map; response-time promise [verify]; success/error states.
- **Minimum:** short form + phone + hours. **Enhancement:** real-time online scheduler.

### Family / Life-stage care — P1
- **Blocks:** all-ages positioning (inclusive of child-free households); life-stage entries (kids/teens/adults/older adults) with honest scope [verify pediatric/oral-surgery boundaries]; household-coordination note; CTA.
- **Minimum:** homepage section + short page. **Enhancement:** per-life-stage pages.

### Reviews — P1
- **Blocks:** curated attributed quotes (values-illustrating); aggregate rating; links to Google/Yelp/Healthgrades. **Minimum:** homepage teaser + link out. **Enhancement:** dedicated page, sourcing transparency.

### FAQ — P1
- **Blocks:** grouped accordion (Insurance & cost, New patients, Appointments & hours, Parking & arrival, Emergencies, Anxiety & comfort, Services, Family). Answers in patient language [verify specifics]. **Minimum:** top 12 Qs. **Enhancement:** search, expansion.

### Privacy / Notice of Privacy Practices — P0
- **Blocks:** privacy policy; HIPAA NPP; contact for privacy questions. **Minimum:** standard compliant policy [verify legal].

### Accessibility statement — P0/P1
- **Blocks:** accessibility commitment (WCAG 2.2 AA target); how to request accommodations (phone/email); feedback channel. **Minimum:** statement + contact. **Enhancement:** audit log, ongoing remediation notes.

### Global elements (all pages)
- **Header** (nav + Book + Call + Emergency), **footer** (address, hours, map, nav, Emergency, Privacy/NPP, Accessibility, languages-spoken [verify]), **skip link**, **sticky mobile action bar** (Call + Book + Emergency). **Priority: P0.**
## 21. Content and messaging blueprint

Draft copy the content writer can adapt. It is deliberately plain (≈8th-grade), warm, and honest. **Every bracketed [verify] item must be confirmed by the practice before publishing** (see the Claims-to-verify section). Nothing here invents credentials, insurance participation, prices, hours, or outcomes.

### Navigation labels (patient language)
`Services` · `New Patients` · `Insurance & Payment` · `Our Team` · `Location & Hours` · `Contact` · **Book/Request** (button) · **Emergency** (distinct) · phone. (Footer adds: Reviews · FAQ · Dental Anxiety & Comfort · Family Care · Privacy · Accessibility.)

### Hero message (options; keep placeholders)
- Trust: **"Honest, gentle dental care for your whole family in [neighborhood]. We recommend only what you need — never what you don't."**
- Convenience: **"Dentistry that fits your workday. Book online, park easily, and get back to your life — in [building], steps from [Link station]."**
- Reassurance: **"It's okay if it's been a while. Calm, judgment-free care for every smile."**
- Subhead example: *"[Practice name] — a dental home for kids, adults, and older adults in Downtown Seattle. Now accepting new patients. [verify]"*

### CTA labels
- Primary: **"Request an appointment"** / **"Book online"** (use whichever matches the real booking capability [verify]).
- Secondary: **"Call us — [phone]"**, **"See payment options"**, **"Meet the team"**, **"Check my coverage"**.
- Emergency: **"Dental emergency? Call now — [phone]"**.

### Emergency message
> **Dental emergency?** Call us now at **[phone]** [verify hours/after-hours]. If you have severe swelling that affects breathing or swallowing, uncontrolled bleeding, or a facial injury, **go to the nearest emergency room**. For a knocked-out tooth, handle it by the crown (not the root), keep it in milk, and try to see us within about an hour. *(Guidance adapted from Cleveland Clinic and TRICARE; this is general information, not a diagnosis.)*

### Trust statements
- **"We recommend only the treatment you actually need. We'll show you what we see on your images and explain your options — and we're glad to give you a written estimate or a second opinion."**
- **"No lectures, no judgment — whether your last visit was six months or six years ago."**
- **"We respect your time. Tell us if you have a meeting after your visit and we'll plan around it. [verify]"**

### Dentist biography template
> **Dr. [Name], [DDS/DMD]** — [role]. Dr. [Name] earned [his/her/their] dental degree at **[school]** and has cared for [neighborhood] patients for **[N] years** [verify all]. [He/She/They] believe[s] in conservative, clearly-explained care: *"[one-line philosophy in the dentist's voice]."* Outside the office, [Name] enjoys [human detail]. **[License #/verification available on request — verify.]**

### Team introduction
> **You'll know our whole team.** From the front desk to your hygienist, our team is here to make every visit calm and clear. We'll learn your name, remember your concerns, and never rush you.

### Family-practice positioning
> **One dental home for every stage of life.** [Practice name] cares for kids, teens, adults, and older adults — and for the households who coordinate care together. Whether it's your first checkup, a crown, clear aligners, or dentures, you'll see a team that knows you. *(If we refer very young children or complex surgery to a trusted specialist, we'll tell you and help you get there. [verify scope])*

### Insurance explanation
> **"Accepted" isn't the same as "in-network."** When a dentist is *in-network* with your plan, they've agreed to the plan's fees, so you usually pay less. When an office just *accepts* or *bills* your insurance, you can still owe more if they're out-of-network.
> **We're in-network with [carriers — verify].** Not sure about your plan? **Send us your details and we'll help you check before your visit.** We'll explain what your plan covers and what you can expect to pay — and we'll give you a written estimate for treatment.

### Payment & financing explanation
> **No insurance? You still have options.** Ask about our **membership plan [verify]** for discounted preventive care, and our **financing options [verify]** to spread out the cost of treatment. We accept [payment methods — verify]. Our new-patient exam is **$[amount] without insurance [verify]** — no surprises.

### New-patient guidance
> **Your first visit, made simple.**
> 1. **Request a time** online or by phone — tell us anything that would help us care for you.
> 2. **Bring:** your insurance card [verify], a photo ID, a list of medications, and any recent X-rays or records from a previous dentist.
> 3. **What happens:** a friendly welcome, a thorough exam and cleaning [verify], any needed X-rays, and a clear plan — with costs explained up front. Most first visits take about **[30–45] minutes [verify]**. Usually we examine first and plan treatment for a later visit [verify].
> *It's okay if it's been a while — we're just glad you're here.*

### Dental-anxiety language
> **Nervous about the dentist? You're not alone — and you're welcome here.** Tell us what worries you and we'll go at your pace. You can ask questions, take breaks, and stop us anytime. Ask about comfort options like numbing, **nitrous/sedation [verify]**, headphones, or bringing a friend. We won't judge you for how long it's been.

### Service-page structure (repeatable)
**[Patient term] (also called [clinical term])** → *What it is* (2–3 plain sentences) · *Why it might be recommended* (non-diagnostic) · *What to expect* (typical steps/visits/time) · *Comfort* (how we keep it easy) · *Cost & insurance* ("we'll explain your coverage and give an estimate" — no invented price) · *Related care* · **CTA:** "Ask about [service]" / "Book a consultation."

### Location & arrival instructions
> **Finding us.** We're at **[address], [building], Floor/Suite [x] [verify]** in [neighborhood]. **Transit:** [X] Line to **[station]**, about **[n]-minute walk** [verify]; the **[streetcar/bus]** stops at [stop]. **Parking:** [garage/lot name], about **$[x]** [verify] — **we validate parking [verify]**. **Getting in:** enter from **[street/door]**, take the elevator to Floor [x]; if you need help, [lobby desk/day-of access note — verify]. **Have your ID ready [verify].** Need directions? **[Get directions]** · **[Call us]**.

### Form help text
- Phone field: *"Best number to reach you — we may call to confirm."*
- Notes field: *"Anything we should know? (nervous, running late, prefer morning, bringing family, etc.)"*
- Insurance field (optional): *"Your plan (optional) — we'll help you check coverage."*
- Privacy note near submit: *"We use your details only to contact you about your care. See our Privacy Policy."*

### Error messages (plain, non-blaming, recoverable)
- *"Hmm — that didn't go through. Please check [field], or just call us at [phone] and we'll book you in."*
- *"Please add a phone number or email so we can reach you."*
- *"Our online form is having a moment. Call or text us at [phone] and we'll take care of it."*

### Confirmation messages
> **You're all set — thanks, [name]!** We've received your request and will confirm your time within **[timeframe — verify]**. Here's what to bring, how to find us, and how to reach us if anything changes. **[Add to calendar]** · **[Arrival & parking]** · **[Call us]**.

### FAQs (top set; answers [verify] specifics)
- *Are you accepting new patients?* — Yes [verify]. Here's how to start.
- *Do you take my insurance?* — We're in-network with [carriers]; send your plan and we'll check.
- *What if I don't have insurance?* — Ask about our membership plan and financing.
- *How much is a first visit?* — $[amount] without insurance; often covered by insurance [verify].
- *Where do I park / what's the nearest station?* — [garage + validation]; [Link station], [n]-min walk.
- *Do you see kids / older adults?* — Yes — we care for all ages [verify scope].
- *I'm scared of the dentist — can you help?* — Absolutely; tell us and we'll go at your pace.
- *Do you handle emergencies / same-day?* — [same-day policy]; call us now.
- *Can I book online?* — Yes [verify]; or call/text us.
- *Will you do treatment on the first visit?* — Usually we examine first and plan treatment [verify].
- *How do I transfer my records?* — [steps].
- *Do you offer sedation?* — [verify options].

### Aftercare & ongoing-care pathways
> **After your treatment.** We'll give you simple aftercare instructions and tell you exactly **when to call us** if something doesn't feel right. When it's time for your next cleaning, we'll make re-booking easy [reminders — verify]. Need your records or to update your insurance? **[Contact us].**

**Copy guardrails:** plain words, honest numbers only, no "investment in your smile" euphemisms, no false urgency, no unverified superlatives. When in doubt, describe the behavior ("we explain before we treat") rather than claim an attribute ("we're the best").
## 22. Reusable component inventory

A **minimal** component set that composes every page. The rule: build a component when content repeats or a behavior/state needs to be consistent; do **not** invent a component for one-off content. Each row: purpose · patient job · required content · variants · interaction · mobile · accessibility · pages used · priority · minimum · later enhancement.

| Component | Purpose / patient job | Required content | Variants | Interaction behavior | Mobile behavior | Accessibility behavior | Pages | Priority | Minimum | Later enhancement |
|---|---|---|---|---|---|---|---|---|---|---|
| **Global header** | Orient + convert (B/H/F) | Logo, nav, Book/Request, phone, Emergency | Transparent-over-hero / solid | Sticky on scroll; dropdown for Services | Condensed bar ≤430px; Call+Book+Emergency stay **outside** the hamburger, each ≥44px; tap-to-call `tel:`; no h-scroll at 320px | Landmark, skip link, keyboard, focus, ARIA menu | All | P0 | Nav + Book + Call + Emergency | Mega-menu, search |
| **Mobile navigation** | Reach anything one-handed | Nav links, Book, Call, Emergency | Drawer / full-screen | Open/close, focus trap, ESC | Drawer targets ≥44px in the thumb zone; focus-trapped; ESC/overlay-tap close; fully usable one-handed at 360×640; no h-scroll | Focus management, `aria-expanded`, keyboard/close | All (mobile) | P0 | Drawer with core links | Section grouping |
| **Sticky mobile action bar** | Always-available convert/urgent (H/F) | Call · Book/Request · Emergency | 2- or 3-action | Persistent; tel:/route/anchor | Fixed bottom, `env(safe-area-inset-bottom)`-aware at 390×844; targets ≥44px in the thumb zone; never covers a form's submit; visible at every scroll | Buttons (not links), labels, contrast | All (mobile) | P0 | Call + Book | Contextual 3rd action |
| **Hero** | First-impression trust + convert (C/H) | Image, H1, subhead, primary CTA, proof line | Home / page-header (compact) | Static (no autoplay) | H1 + one CTA above the fold at 360×640; image compressed/deferred; headline never sideways-scrolls at 320px; throttled LCP ≤2.5s | Real `<h1>`, alt, contrast, no motion trap | Home + page tops | P0 | Image + H1 + CTA | Video (reduced-motion aware) |
| **Trust strip** | Fast credibility (C) | 3–4 verifiable chips (icon+label) | Home / footer mini | Static | Wraps 2×2 at ≤390px; text labels stay; no h-scroll at 320px | Text labels, not icon-only | Home | P0 | 3 chips | Dynamic (live availability) |
| **Appointment CTA (button/block)** | Convert (H) | Verb label, link/anchor to form/booking | Button / full-width band | Click → form/booking; states | Full-width, ≥48px tall, in the lower/thumb-zone band at 360×640; call variant uses `tel:` | Focus, name, tel: for call variant | All | P0 | Button to form | Inline scheduler |
| **Emergency banner/action** | Urgent access (F) | "Emergency? Call now", tel:, ER note link | Nav item / homepage block / sticky | Tap-to-call; link to Emergency page | One tap from any route via header + sticky bar; `tel:` opens the dialer; icon+label; ≥44px | High contrast, icon+label, tel: | All | P0 | Nav + tap-to-call | Triage form |
| **Service card** | Discover services (G) | Icon, patient-term title, 1-line, link | Grid / list / featured | Hover/focus; link | 2-up then 1-up ≤360px; ≤8 cards; each tap area ≥44px; no h-scroll at 320px | Link semantics, focus, alt | Home, Services | P0/P1 | Title + link | Filters, imagery |
| **Browse-by-concern module** | Find care in own words (G) | Concern labels → service links | Chips / list | Link only (NOT a checker) | Chips wrap; each ≥44px with ≥8px spacing; links only (no checker); no h-scroll at 320px | List/link semantics | Home, Services | P1 | Curated list | More concerns |
| **Dentist profile** | Trust in a person (C) | Portrait, name+credential [verify], philosophy, detail | Full / compact (home) | Link to full bio | Stacks single-column; portrait + name + one-line philosophy visible without tapping; bio link ≥44px | Alt describes person/role; heading order | Team, Home | P0 | Photo + name + 1 line | Video, availability |
| **Review card** | Social proof (C) | Quote, attribution, rating, source link | Single / trio | Static; link out | Stacks (or a reduced-motion-safe swipe); **no autoplay**; keyboard and swipe both work; honors `prefers-reduced-motion` | No autoplay; keyboard; static | Home, Reviews | P1 | 3 static quotes | Source filters |
| **Insurance module** | Cost/fit clarity (D) | Accept≠in-network line, networks [verify], verify + uninsured links | Home teaser / full page block | Links; optional verify form | Full-width, tappable; tables reflow with no h-scroll at 320px; links ≥44px | Readable tables, labeled fields | Home, Insurance, New Patients | P0 | Teaser + link | Coverage look-up |
| **Family-care module** | All-ages signal (G/B) | Inclusive line + image + link | Home / page | Link | Full-width; image lazy-loaded; link ≥44px; readable at 320px | Inclusive alt | Home, Family | P1 | Line + link | Life-stage entries |
| **New-patient steps** | Lower first-visit barrier (I) | 3 steps + what-to-bring + accepting status | Numbered / accordion | Static; link to forms | Vertical `<ol>` steps readable at 360px; each link/target ≥44px; no h-scroll at 320px | Ordered list; clear headings | Home, New Patients | P1 | 3 steps + checklist | Online intake |
| **Location & arrival card** | Solve arrival (H) | Address, map, parking+validation, transit, entrance/floor/access, hours | Home teaser / full | Map + tap-to-call/route | One-tap **Directions** (maps deep link) + **Call** (`tel:`) at 360×640; real tappable text address; map image lazy-loaded/deferred | Text address alt for map; labels | Home, Location, Contact, confirmation | P0 | Address+map+parking+transit+hours | Nav videos, live hours |
| **FAQ accordion** | Answer recurring Qs (A–K) | Grouped Q/A [verify] | Grouped / flat | Expand/collapse | Full-width triggers ≥44px; `aria-expanded` toggles; nothing critical hidden (one tap opens); keyboard-operable at 360×640 | `aria-expanded`, keyboard, headings | FAQ, service pages | P1 | Top 12 Qs | Search |
| **Form field** | Capture request (H) | Label, input, help, error | Text/tel/email/date/select/textarea | Inline validation; states | Correct `type`/`inputmode`/`autocomplete` per field; inputs ≥16px (no iOS zoom); targets ≥44px; values preserved on interruption/back | Visible labels, `aria-describedby`, error assoc. | Contact, New Patients, Insurance | P0 | Labeled + validated | Autosave |
| **Loading state** | Reassure during waits | Skeleton/spinner + text | Inline / full | Shown during async | Lightweight skeleton within the throttled budget; reserves space so CLS ≤0.1; no h-scroll | `aria-busy`/live region | Any async | P0 | Spinner + text | Skeletons |
| **Success/confirmation state** | Confirm + prepare (H/I) | Success msg, what-to-bring, arrival, add-to-calendar | Inline / page | Shown post-submit | Full-width, thumb-zone next-step buttons; focus moves to heading; readable at 320px | Focus to heading; announced | Booking success | P0 | Message + next steps | Calendar/SMS |
| **Error/recovery state** | Recover gracefully | Plain error + how to fix + phone fallback | Inline / page | Shown on failure | Plain text + tappable `tel:` fallback ≥44px; focus moved and announced; visible at 360×640 | Announced, associated, focus | Any form | P0 | Message + phone | Field-level guidance |
| **Footer** | Wayfinding + compliance | Address, hours, map, nav, Emergency, Privacy/NPP, Accessibility, languages [verify], social | Standard | Links | Stacks single-column; Emergency/Privacy/Accessibility reachable; links ≥44px; no h-scroll at 320px | Landmark, contrast, labels | All | P0 | Contact + Privacy + Accessibility | Localization |

### Component guardrails
- **Do not** create a component for content that appears once (e.g., a bespoke "about the neighborhood" widget) unless it solves a real maintenance/design problem.
- Prefer **variants of one component** over new components (e.g., hero full vs. compact; service card grid vs. list).
- Every interactive component ships with its **loading, success, error, and recovery** behavior — no dead ends; the phone is always the human fallback.
- Build **mobile-complete** and **accessible** from the first version; these are not later enhancements.
## 23. P0, P1, and P2 prioritized backlog

Every recommendation classified. **P0 = patient-ready foundation** (the site is not launchable without these). **P1 = trust/clarity/conversion** improvements. **P2 = differentiation/optimization.** Where evidence is thin, priority is marked *(provisional)*.

### P0 — patient-ready foundation (launch blockers)
| # | Item | Patient job | Evidence |
|---|---|---|---|
| P0-1 | Global shell: header, footer, sticky mobile action bar (Call/Book/Emergency), skip link | H/F/C | DP Repeated |
| P0-2 | Concise primary nav in patient language | B/H | DP Repeated |
| P0-3 | Homepage hero with one honest headline + primary CTA + real image | C/H | DP/PG Repeated |
| P0-4 | Primary appointment action (request/book) reachable from everywhere | H | PR Repeated |
| P0-5 | Emergency action always visible + Emergency page (call, ER-triage, first aid) | F | CG Repeated |
| P0-6 | Trust strip (verifiable chips) | C | DP Repeated |
| P0-7 | Dentist/team page with named credentials + photos + philosophy | C | PG/DP Repeated |
| P0-8 | Insurance & Payment page: accept≠in-network explainer, networks [verify], uninsured path | D | CG/PG Repeated |
| P0-9 | Insurance/cost message on homepage | D | PG Repeated |
| P0-10 | Location & Hours (arrival) page: address, map, parking+validation, transit, entrance/floor/access, hours | H | PG/GOV Repeated |
| P0-11 | Location/arrival teaser on homepage | H | PG Repeated |
| P0-12 | New Patients page: accepting-status, what-to-bring, what-to-expect | I | PR Repeated |
| P0-13 | Contact/Request form (short, accessible, with states) | H | PR/DP Repeated |
| P0-14 | Conservative-care / cost-transparency statement (anti-over-treatment) | C/D | PG Repeated (strongest) |
| P0-15 | Mobile-complete experience (tap-to-call/map, short forms) | H | DP Repeated |
| P0-16 | WCAG 2.2 AA baseline (semantics, focus, contrast, labels, alt) | inclusion | CG Repeated |
| P0-17 | Privacy / Notice of Privacy Practices page | compliance | CG |
| P0-18 | Accurate, verified published facts (no invented claims) | trust/safety | brief mandate |
| P0-19 | Confirmation + error/recovery states for the request flow | H | DP Repeated |
| P0-20 | Basic Services overview + top service links + emergency shortcut | G | PR Common |

### P1 — trust, clarity, conversion
| # | Item | Patient job | Evidence |
|---|---|---|---|
| P1-1 | "Browse by concern" module (curated, not a checker) | G | DP Emerging |
| P1-2 | Individual service pages (top 6–8) with plain explainers | G/C/D | PR Common |
| P1-3 | Dental Anxiety & Comfort page (no-judgment, what-to-expect, comfort options [verify]) | E | PG/CG Repeated |
| P1-4 | New-patient onboarding depth (forms, records transfer, first-visit price [verify]) | I/D | PR Repeated |
| P1-5 | Family/life-stage care section + short page | G/B | PR Common |
| P1-6 | Reviews teaser + link-out (curated, attributed) | C | PG/DP Repeated |
| P1-7 | FAQ (grouped, top 12) | A–K | PR Common |
| P1-8 | Verify-benefits path + benefit-mechanics explainers | D | PG Common |
| P1-9 | Membership/financing detail for uninsured [verify] | D | PR Repeated |
| P1-10 | Languages-spoken + accessibility statement + non-discrimination | inclusion | CG/PR Common |
| P1-11 | Hours badges (early/late/weekend) [verify] | H | PG Repeated |
| P1-12 | Reminder opt-in / easy reschedule instructions [verify] | H/J | PR Common |
| P1-13 | Aftercare / ongoing-care content | J | CG Common |
| P1-14 | Cosmetic overview + "consult is fact-finding" framing | K | PR Common |
| P1-15 | Household-coordination affordance (request-form fields) | G | PR/PG Emerging |

### P2 — differentiation & optimization (only after the foundation works)
| # | Item | Patient job | Evidence |
|---|---|---|---|
| P2-1 | Full service catalog + media (video, before/after with consent + a11y) | G/K | PR Common |
| P2-2 | Real-time online scheduler / patient portal / online intake forms | H/I | PR (vendor, bias-flagged) |
| P2-3 | "When we refer to specialists" integrity note | C | PG Emerging |
| P2-4 | Per-life-stage pages (kids/teens/adults/older adults) | G | PR Common |
| P2-5 | Deeper reviews page with sources | C | DP |
| P2-6 | Nav videos ("walking in / driving in") | H | PR exemplar (Integrity) |
| P2-7 | Secondary visual polish, motion refinements | quality | DP |
| P2-8 | Feedback/referral flow | J | PR Common |
| P2-9 | Localized cost ranges for common procedures [verify heavily] | D | PR directional |
| P2-10 | Experimentation / A-B on CTAs and hero | conversion | DP |

### Over-engineering guardrails (state and apply)
- **Build one patient experience at a time**; keep each change small and reversible.
- **Prefer clear content over complex functionality** (a good insurance *page* beats a coverage widget for v1).
- **Prefer reusable components over page-specific inventions.**
- **Use familiar interaction patterns**; no clever/novel navigation.
- **Don't redesign unrelated areas** when implementing one experience.
- **Don't add a dependency for a minor visual behavior** (e.g., a carousel library for 3 reviews).
- **Don't add personalization** until content and navigation work.
- **Don't build a diagnostic symptom checker** — the evidence does not support it; use a simple browse-by-concern list.
- **Don't add motion that delays comprehension**; respect reduced-motion.
- **Use progressive enhancement**; the mobile experience is complete, not reduced.
- **Every interaction has loading, success, error, and recovery** behavior.
- **Separate verified practice facts from general educational content.**

### Explicitly DEFERRED (complexity without enough first-release value)
| Deferred item | Why defer | Revisit when |
|---|---|---|
| Diagnostic symptom checker | Safety + complexity; evidence against | Never, unless strong new evidence |
| Real-time online scheduler / patient portal | Operational maturity; v1 request form + phone suffices | After booking demand + ops ready |
| Family accounts / per-member dashboards | Premature personalization | If multi-member coordination proves painful |
| Live-chat concierge bot | Ops overhead; form+phone covers it | If volume justifies staffing |
| Teledentistry front-and-center | Low local-family first-release value | If service is actually offered/marketed |
| Auto-translating multilingual site build | Big scope; start with plain language + languages-spoken signal | After core content stabilizes |
| Before/after galleries, heavy media | Consent + accessibility + weight | With consent workflow + a11y plan |
| Published per-procedure price lists | Can't stand behind without ops commitment | If practice commits to fixed pricing |
| A/B testing & personalization engines | Needs traffic + a working baseline | Post-launch optimization phase |

*Any item above marked as depending on unverified specifics is **provisional** until the practice confirms the underlying facts.*

## 24. Sequential build plan

26 independently implementable items, ordered so the site becomes patient-ready as fast as possible. Each is small, testable, and reusable. Fact-bearing content is **[verify]**.

---
**Build Item 1: Establish the lean information architecture and page skeleton**
- **Priority:** P0
- **Patient job addressed:** Find their way to the right task (B/H)
- **User story:** As a prospective patient, I can find the page I need (book, team, insurance, location, new patient, emergency) without confusion.
- **Problem being solved:** No structure yet; users must reach any core job in ≤2 taps.
- **Page or flow:** Whole site
- **Scope:** Create routes/stubs for Home, Our Team, New Patients, Insurance & Payment, Location & Hours, Services (+ service stubs), Emergency, Contact, Privacy, Accessibility.
- **Required content:** Page titles, nav labels (patient language), URL slugs.
- **Components:** none yet (structure)
- **Design instructions:** Define the type scale, spacing scale, and color tokens from the design direction.
- **Interaction instructions:** n/a
- **Mobile behavior:** Every route renders **mobile-first** as a single column at 320–430px with **no horizontal scroll**; the temporary nav reaches each core job (Book, Team, Insurance, Location, New Patient, Emergency) in **≤2 taps one-handed**; the skip link is the first focus stop and landmarks are present on the phone. Design tokens set a **≥16px mobile body base** and a **≥44px tap-target floor** from the start, and the performance budget is defined against the **throttled mobile** profile (GTH-19), not desktop. No component logic yet — but the scaffold must already prove the phone layout, token base, and tap-reach targets that every later item builds on.
- **Accessibility requirements:** Semantic landmarks per page; unique `<title>`; skip-link target.
- **Engineering instructions:** Set up design tokens, a component library shell, and a performance budget.
- **Dependencies:** none
- **Explicitly out of scope:** Visual polish, real content
- **Acceptance criteria:** All P0 routes resolve; each reachable from a temporary nav; tokens defined.
- **Evidence supporting the item:** IA/DP Repeated
- **Expected patient outcome:** A navigable scaffold.
- **Minimum implementation:** Stub pages + tokens
- **Optional later enhancement:** CMS modeling

**What good output looks like:** A prospective patient landing on any URL meets a coherent, mobile-first scaffold. A temporary but working navigation lets them reach Home, Our Team, New Patients, Insurance & Payment, Location & Hours, Services (with service stubs), Emergency, Contact, Privacy, and Accessibility in no more than two taps. Every route resolves to its own page with a unique, descriptive browser-tab title and a patient-language nav label ("Insurance & Payment," not "Financials"). Each page renders single-column on a phone, references the defined type/spacing/color tokens rather than ad-hoc values, and exposes a skip-link plus semantic landmarks even though real content is not yet present.

*Signals of quality:*
- Every P0 route returns HTTP 200 and renders a distinct page with a unique, non-empty `<title>`.
- Primary nav uses patient vocabulary and stays at ≤6 destinations + Book + Emergency (per Section 18).
- Each page exposes `<header>`, `<main>`, and `<footer>` landmarks and a working skip-link target.
- Design tokens (type scale, spacing scale, color tokens from Section 17) are defined once and referenced, not hard-coded per page.
- Layout is mobile-first (single column at 360×640) with no horizontal scroll.
- *(Mobile)* No horizontal scroll at **320px** on any route (`scrollWidth ≤ clientWidth`), and the layout composes across the whole matrix (320/360/390/430).
- *(Mobile)* Tokens set a **≥16px** mobile body base and a **≥44×44px** tap-target floor *before* any component is built.
- *(Mobile)* Every core job is reachable in **≤2 taps one-handed** at 360×640, and the skip link is the first focus stop on a phone.

*Signs it went wrong:* dead/404 routes; one monolithic page faking sections; duplicate or empty titles; hard-coded colors/spacing; desktop-only layout; jargon nav labels; *(mobile)* a layout that only composes on desktop and overflows sideways at 320px; a body/token base below 16px; a nav that needs 3+ taps or pinch-zoom on a phone.

**Reference implementations (extract the principle — do not copy):**
- https://www.gentrydentistry.com/ — a restrained page set with dedicated destinations (Parking, New Patient) instead of one crowded page. *Adapt:* the lean page inventory and calm hierarchy. *Avoid:* copying their brand, copy, or exact nav order.
- https://www.dentistsofqueenanne.com/ — structured, predictable nav with familiar labels and landmark wayfinding. *Adapt:* the conventional, scannable IA. *Avoid:* the DSO template chrome and any unverified claims.
- https://duck.design/healthcare-website-design/ — healthcare IA guidance: ≤3-click reach to any task, mobile-first. *Adapt:* the ≤2-tap-to-core-job rule. *Avoid:* treating it as a visual template.
- https://www.zocdoc.com/blog/guides/how-to-find-a-good-dentist/ — the factors patients compare (credentials, in-network, location/hours, emergency) justify exactly which pages must exist. *Adapt:* the page-inventory rationale. *Avoid:* directory-style density.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** For each P0 route run `curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" http://localhost:3000/<route>` across home, our-team, new-patients, insurance-payment, location-hours, services, a service stub, emergency, contact, privacy, accessibility.
   - **Observe:** the HTTP status printed per route.
   - **Pass:** every route returns `200`.
   - **Fail signature:** any `404`/`500`, or a route that redirects to Home instead of rendering its own page.
2. **Step 2 —** Detect duplicate titles: `for u in <routes>; do curl -s http://localhost:3000/$u | grep -o "<title>[^<]*</title>"; done | sort | uniq -d`.
   - **Observe:** the uniq -d output.
   - **Pass:** empty output (every title unique and non-empty).
   - **Fail signature:** duplicated or empty `<title>` values.
3. **Step 3 —** Playwright per route: `expect(page.locator('main')).toHaveCount(1); expect(page.locator('header')).toHaveCount(1); expect(page.locator('footer')).toHaveCount(1); await page.keyboard.press('Tab'); expect(page.locator(':focus')).toHaveText(/skip/i)`.
   - **Observe:** landmark counts and the first focus stop.
   - **Pass:** exactly one of each landmark and the first Tab lands on a skip-link targeting `#main`.
   - **Fail signature:** missing landmarks; skip-link absent or pointing nowhere.
4. **Step 4 —** Assert tokens: `rg -n "(--color-|--space-|--font-size-)" <styles>` then `rg -n "#[0-9a-fA-F]{3,6}" <page templates>`.
   - **Observe:** token definitions vs. stray literals.
   - **Pass:** token variables defined once; no hard-coded hex in page templates.
   - **Fail signature:** inline hex/px scattered across pages.
5. **Step 5 — [manual]** In DevTools at 360×640, tap from Home to each core job (Book, Team, Insurance, Location, New Patient, Emergency).
   - **Observe:** taps required to reach each destination.
   - **Pass:** each reachable in ≤2 taps with no horizontal scroll.
   - **Fail signature:** a job needs 3+ taps, or the temporary nav is unreachable on mobile.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) — focus GTH-3 (HTML validation) and GTH-1 (axe) on three representative routes.
   - **Observe:** validator and axe output.
   - **Pass:** 0 HTML errors; 0 serious/critical axe violations.
   - **Fail signature:** unclosed landmarks; missing `lang`; duplicate `id`.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over each P0 route: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto(route); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`.
   - **Observe:** the overflow value per route at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` on every route at every viewport.
   - **Fail signature:** any route scrolls sideways at 320px (a fixed-width stub, an oversized token, or a non-fluid container).
8. **Step 8 — Mobile token base (≥16px body, ≥44px targets).** `rg -n "--font-size-base|--tap-min|--space-" <styles>` then assert the computed base: `const fs = await page.evaluate(()=>parseFloat(getComputedStyle(document.body).fontSize)); expect(fs).toBeGreaterThanOrEqual(16);`.
   - **Observe:** the base font-size token and any tap-target-floor token.
   - **Pass:** body base ≥16px and a documented ≥44px tap-target token exist in the token set.
   - **Fail signature:** a sub-16px base or no tap-target floor token — guaranteeing later iOS-zoom and small-target failures.
9. **Step 9 — [manual] Reflow at 320px / 200% (GTH-20).** On three representative routes set 320×568, then add `html{font-size:200%}`.
   - **Observe:** whether all scaffold content and the temporary nav remain present and unclipped.
   - **Pass:** no content lost, no clipping/overlap, no sideways scroll at 320px/200%.
   - **Fail signature:** the scaffold requires pinch-zoom to read, or a nav control is pushed off-screen.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds only routing, page stubs, token definitions, the component-library shell, and the performance-budget config; no real content, hero, or component logic. Flag any file changed outside routing/tokens/config.
3. Nothing from "Explicitly out of scope" was built — no visual polish, no real content.
4. No new dependency added unless it is a routing/token primitive the stack already implies; check the lockfile diff and justify any addition.
5. No unverified fact published — stubs carry placeholder labels only; output the (expected empty) `[verify]` inventory.
6. Prior build items still pass — none precede this item; record "N/A (first item)."
7. Global Test Harness passes on the changed routes.
8. **Mobile gate** — verified at **320×568, 360×640, 390×844, 430×932** (+ landscape): no horizontal scroll at 320px, every core job reachable in ≤2 taps one-handed, the token base is ≥16px with a ≥44px tap-target floor, and the throttled mobile performance budget (GTH-19) is defined and met.
9. Console free of errors and warnings on the changed routes.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The scaffold is implemented, every P0 route resolves with a unique title and semantic landmarks, tokens are defined and referenced (≥16px body base, ≥44px tap-target floor), all test steps pass with recorded evidence including the mobile matrix, the `[verify]` inventory is empty (stubs only), there are no prior items to regress, and the verdict is recorded.

---
**Build Item 2: Global shell — header, footer, and sticky mobile action bar**
- **Priority:** P0
- **Patient job addressed:** Convert/urgent from anywhere (H/F)
- **User story:** From any page and on any device, I can book, call, or reach emergency help in one tap.
- **Problem being solved:** Conversion and urgent access must be omnipresent.
- **Page or flow:** Global
- **Scope:** Header (logo, nav, Book/Request, phone, Emergency), footer (address, hours, map, nav, Emergency, Privacy/NPP, Accessibility, languages [verify]), sticky mobile bar (Call · Book · Emergency).
- **Required content:** Phone [verify], address [verify], hours [verify].
- **Components:** Global header, mobile navigation, sticky action bar, footer
- **Design instructions:** Clean, light header; one primary button; restrained-red emergency.
- **Interaction instructions:** Sticky on scroll; drawer with focus trap + ESC; tel:/route links.
- **Mobile behavior:** The two highest-intent doors live in a **fixed bottom action bar** — Call · Book · Emergency — pinned within the thumb zone and **`env(safe-area-inset-bottom)`-aware** so it clears the home indicator on notched phones and never covers page content or a form's submit. Each action is a one-tap native handoff: Call uses `tel:` (opens the dialer), Book routes to the request flow, Emergency to the emergency page — **none hidden behind the hamburger**. The condensed header keeps the practice name + tap-to-call visible at ≤430px; the nav collapses into a focus-trapped drawer that is fully operable one-handed and closes on ESC/overlay-tap. Targets are ≥44×44px with ≥8px spacing; no horizontal scroll at 320px; the bar and drawer adapt in landscape (844×390) rather than locking orientation.
- **Accessibility requirements:** `<header>`/`<footer>` landmarks, skip link, `aria-expanded`, visible focus, buttons (not ambiguous links), contrast AA.
- **Engineering instructions:** No heavy nav library; CSS-first sticky; progressive enhancement.
- **Dependencies:** Item 1
- **Explicitly out of scope:** Mega-menu, search
- **Acceptance criteria:** Call/Book/Emergency reachable in one tap on mobile; keyboard-operable drawer; footer has Privacy + Accessibility.
- **Evidence supporting the item:** DP/CG Repeated
- **Expected patient outcome:** Always one tap from action.
- **Minimum implementation:** Header + drawer + sticky Call/Book
- **Optional later enhancement:** Contextual 3rd action

**What good output looks like:** From every page and any device the patient sees a light, uncluttered header with the practice name/logo, primary nav, one primary Book/Request button, a tap-to-call phone, and a distinct restrained-red Emergency action; a footer carrying address, hours, map, nav, Emergency, Privacy/NPP, Accessibility, and a languages line; and — on mobile — a fixed bottom bar offering Call · Book · Emergency within thumb reach and clear of the home indicator. The hamburger drawer opens with a trapped, escapable focus loop, and every action works by keyboard and screen reader.

*Signals of quality:*
- On a 390×844 phone, Call, Book, and Emergency are each reachable in exactly one tap from any page via the sticky bar.
- Header is a `<header>` landmark; the nav toggle exposes `aria-expanded`; the drawer traps focus and closes on ESC and on overlay click, returning focus to the toggle.
- Emergency uses icon + text label and restrained-red, never color alone; phone links use `tel:`.
- Sticky bar is safe-area-aware (`env(safe-area-inset-bottom)`) and never overlaps content or submit buttons.
- Footer contains working Privacy/NPP and Accessibility links.
- *(Mobile)* Across 320/360/390/430 the sticky bar stays fixed to the bottom, thumb-reachable, and clear of the home indicator; no route scrolls sideways at 320px.
- *(Mobile)* Tapping the phone number opens the dialer directly (`tel:`), and Book/Emergency are one tap from any scroll position without opening the menu.

*Signs it went wrong:* calling needs two taps; the drawer leaks focus to the page behind it; Emergency conveyed by color only; the sticky bar covering a form's submit; missing footer compliance links. *(Mobile:)* Call/Book/Emergency buried inside the hamburger; the sticky bar sitting under the home indicator on a notched phone; the bar or drawer breaking in landscape; a tap target under 44px.

**Reference implementations (extract the principle — do not copy):**
- https://dentologie.com/locations/seattle/south-lake-union — persistent, low-friction booking access and a clean header. *Adapt:* omnipresent Book + phone. *Avoid:* their branding and photography.
- https://skyviewfamilydentistry.com/dentist-service-areas/dentist-downtown-seattle/ — a three-action header (Emergency/Book/Pay) proving the triad pattern. *Adapt:* always-visible Book + Call + Emergency. *Avoid:* the neighborhood-history filler found elsewhere on that page.
- https://www.emergencydentistseattle.com/downtown — a Call/Book layout built for a one-tap urgent user. *Adapt:* instant tap-to-call. *Avoid:* the emergency-only tone for a family practice.
- https://gargle.com/is-your-dental-website-ada-compliant/ — flags inaccessible menus, popups, and overlays. *Adapt:* a keyboard-operable drawer with no popup traps. *Avoid:* overlay-widget "accessibility" fixes.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Playwright at 390×844 on three routes: `const bar = page.locator('[data-testid="mobile-action-bar"]'); await expect(bar.getByRole('link', {name: /call/i})).toBeVisible(); await expect(bar.getByRole('link', {name: /book|request/i})).toBeVisible(); await expect(bar.getByRole('link', {name: /emergency/i})).toBeVisible();`
   - **Observe:** the three actions in the sticky bar.
   - **Pass:** all three present and visible on every route.
   - **Fail signature:** a missing action, or the bar absent on any page.
2. **Step 2 —** Assert `tel:` on the call action: `expect(await bar.getByRole('link', {name: /call/i}).getAttribute('href')).toMatch(/^tel:/)`, and `rg -n 'href="tel:' <shell>` shows the number is wrapped `[verify]` in content.
   - **Observe:** the href scheme and content placeholder.
   - **Pass:** call action uses `tel:`; the printed number is a `[verify]` placeholder until confirmed.
   - **Fail signature:** a `#` or JS-only handler; a hard-coded unverified number.
3. **Step 3 —** Drawer keyboard trap: open the drawer via keyboard, Tab repeatedly and record focus; press ESC.
   - **Observe:** focus order and `aria-expanded`.
   - **Pass:** focus cycles only within the drawer; ESC closes it and returns focus to the toggle; `aria-expanded` flips true→false.
   - **Fail signature:** Tab escapes to background content; ESC does nothing; focus lost after close.
4. **Step 4 —** Emergency is not color-only: `expect(page.getByRole('link', {name: /emergency/i})).toContainText(/emergency/i)` and confirm an icon plus label; compute contrast of the emergency label and UI edge.
   - **Observe:** label text, icon, and contrast ratios.
   - **Pass:** text label present; label ≥4.5:1, UI/icon boundary ≥3:1.
   - **Fail signature:** a red dot/label with no text; contrast below threshold.
5. **Step 5 —** Safe-area + overlap: `rg -n "safe-area-inset-bottom" <styles>`; screenshot at 390×844 with a form focused.
   - **Observe:** the CSS token and the screenshot.
   - **Pass:** bar respects the inset and does not cover content or submit controls.
   - **Fail signature:** bar overlaps the home indicator or a button.
6. **Step 6 —** Footer compliance: Playwright click Privacy and Accessibility footer links and assert each destination returns 200 with a matching heading.
   - **Observe:** navigation result.
   - **Pass:** both links resolve to their pages.
   - **Fail signature:** broken or missing footer links.
7. **Step 7 —** Run the **Global Test Harness** (Section 25c) on Home + one interior route (GTH-1 axe, GTH-6 touch targets ≥44×44 at 360×640, GTH-9 console).
   - **Observe:** axe, target sizes, console.
   - **Pass:** 0 serious/critical axe issues; all sticky actions ≥44×44; console clean.
   - **Fail signature:** tap target <44px; axe name/role violation on the toggle.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and the sticky bar stays `position:fixed` at the bottom.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Thumb-zone + safe-area (GTH-15 / GTH-16).** At 390×844 measure each sticky action's vertical centre and the bar's `padding-bottom`.
   - **Observe:** action Y-centres versus viewport height and the inset padding value.
   - **Pass:** all three actions sit in the lower/thumb-reachable band and the bar carries a non-zero `env(safe-area-inset-bottom)` padding.
   - **Fail signature:** actions in the top half, or zero inset padding leaving them under the home indicator.
10. **Step 10 — Orientation + reduced motion (GTH-21 / GTH-22).** Load at landscape 844×390 and with `prefers-reduced-motion: reduce`.
   - **Observe:** bar/drawer usability in landscape and any drawer animation.
   - **Pass:** Call/Book/Emergency remain reachable in landscape; the drawer open/close respects reduced motion.
   - **Fail signature:** an orientation lock, content clipped in landscape, or motion that ignores the setting.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the global header, footer, mobile nav, and sticky action-bar components (plus their styles); no page-body content. Flag any page-level change.
3. Nothing from "Explicitly out of scope" was built — no mega-menu, no site search.
4. No new dependency added — this item authorizes none (CSS-first sticky, no heavy nav library); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (phone, address, hours, languages shown as placeholders).
6. Prior build items still pass — re-run Item 1's route/landmark checks; the shell must not break routing.
7. Global Test Harness passes on the changed routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape 844×390): no horizontal scroll at 320px, Call/Book/Emergency thumb-reachable and one-tap from any scroll position (not hidden behind the hamburger), the sticky bar safe-area-aware, touch targets ≥44×44px, `tel:` opens the dialer, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The global shell is implemented; Call/Book/Emergency are one tap on mobile; the drawer is keyboard-operable with a working focus trap; the footer carries Privacy/NPP and Accessibility; all test steps pass with evidence; the `[verify]` inventory (phone/address/hours/languages) is recorded; Item 1 still passes; and the verdict is recorded. Mobile: the 320/360/390/430 + landscape matrix is verified — the sticky Call/Book/Emergency bar stays thumb-reachable and safe-area-aware with no horizontal scroll.

---
**Build Item 3: Homepage hero with honest headline and primary CTA**
- **Priority:** P0
- **Patient job addressed:** Trust + convert in seconds (C/H)
- **User story:** Landing on the homepage, I immediately grasp who this is, where they are, and how to book.
- **Problem being solved:** First-impression bounce on generic/faceless heroes.
- **Page or flow:** Home
- **Scope:** One hero: real image, H1, subhead, primary CTA, secondary Call, one honest proof line.
- **Required content:** Headline (from options), neighborhood [verify], "accepting new patients" [verify], real photo.
- **Components:** Hero, appointment CTA
- **Design instructions:** Generous, calm, one action; large legible type; warm real image (no stock smiles).
- **Interaction instructions:** Static (no autoplay); CTA → request flow.
- **Mobile behavior:** On a 360px-wide screen the **H1 and the single primary Book/Request button are above the fold**, with tap-to-call (`tel:`) immediately adjacent; the hero image is a compressed, responsive asset that may sit *below* the headline/CTA so the action is never pushed down, and it is prioritized only enough to keep the **throttled-mobile LCP ≤2.5s** (GTH-19). The headline wraps and is capped so it never forces sideways scroll at 320px. The primary CTA sits in the thumb-reachable band (or hands off to the sticky bar); nothing autoplays or slides; text reflows at 200%/320px with no loss (GTH-20).
- **Accessibility requirements:** Real `<h1>`, descriptive alt, AA contrast, no motion trap.
- **Engineering instructions:** Optimize hero image (responsive, lazy below fold); LCP budget.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Video, carousels, awards
- **Acceptance criteria:** LCP within budget; H1 present; CTA reaches request flow; no invented claims.
- **Evidence supporting the item:** DP/PG Repeated
- **Expected patient outcome:** Instant orientation + a clear action.
- **Minimum implementation:** Image + H1 + CTA + Call
- **Optional later enhancement:** Reduced-motion-aware video

**What good output looks like:** The homepage opens on a single, calm hero: one real interior or team photograph (no stock "perfect smile"), a plain-language H1 that says who this is and where, a short subhead, one primary Book/Request button, a secondary tap-to-call, and one honest proof line. On a phone the headline and the primary button sit above the fold with tap-to-call nearby; nothing autoplays, nothing slides. A first-time visitor grasps in a second or two that this is a family dental practice in their neighborhood and how to take the next step.

*Signals of quality:*
- Exactly one `<h1>` that names the practice type and neighborhood (neighborhood is a `[verify]` placeholder until confirmed).
- Exactly one primary button above the fold at 390×844; a secondary Call link; no carousel and no autoplay media.
- Hero image is a real interior/team photo with descriptive, purpose-bearing alt text.
- LCP for the hero is within the performance budget on mobile.
- Any fact-bearing phrase ("accepting new patients," neighborhood) is a visible `[verify]` placeholder, not an asserted claim.
- *(Mobile)* At 320/360/390/430 the H1 + one primary CTA are above the fold with tap-to-call adjacent, and no route scrolls sideways at 320px.
- *(Mobile)* Tapping the phone number opens the dialer (`tel:`); the hero image never delays the throttled-mobile LCP past 2.5s.

*Signs it went wrong:* a rotating carousel; two competing primary buttons; a generic stock smile; an H1 that is a slogan with no who/where; unverified claims presented as fact. *(Mobile:)* the primary CTA pushed below the fold by an oversized hero image; a headline that forces sideways scroll at 320px; a hero image that blows the mobile LCP budget.

**Reference implementations (extract the principle — do not copy):**
- https://www.gentrydentistry.com/ — homepage restraint with a named human and one clear action, "without overwhelming the homepage." *Adapt:* one calm hero, one action. *Avoid:* their imagery and copy.
- https://www.designyourway.net/blog/healthcare-website-design-trust/ — credibility is judged in ~50ms on clarity, whitespace, and human language. *Adapt:* an immediate, legible first impression. *Avoid:* decorative flourishes that delay comprehension.
- https://www.sprypt.com/blog/visual-elements-that-build-trust-on-clinic-websites — real staff/office photography as a trust signal. *Adapt:* a genuine photo over stock. *Avoid:* staged or unrepresentative images.
- https://32pearls.com/your-trusted-downtown-seattle-dentist-for-family-cosmetic-care/ — an anti-pattern: a hero that never states value, insurance, or a clear action. *Adapt:* nothing. *Avoid:* exactly this — vague headlines and service dumping above the fold.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Playwright: `expect(page.locator('h1')).toHaveCount(1)` and print its text.
   - **Observe:** number of H1s and the H1 string.
   - **Pass:** exactly one H1 that names practice type + neighborhood (neighborhood may be a `[verify]` token).
   - **Fail signature:** zero or multiple H1s; a sloganeering H1 with no who/where.
2. **Step 2 —** One primary CTA above the fold: at 390×844, `const cta = page.getByRole('link', {name: /request|book/i}); expect(await cta.count()).toBe(1); const box = await cta.first().boundingBox(); expect(box.y).toBeLessThan(844)`.
   - **Observe:** primary CTA count and its Y position.
   - **Pass:** exactly one primary CTA, fully above 844px; a separate Call link present.
   - **Fail signature:** two primary buttons; CTA below the fold.
3. **Step 3 —** No carousel/autoplay: `rg -in "carousel|swiper|slick|autoplay" <home template/styles>` and Playwright `expect(page.locator('video[autoplay]')).toHaveCount(0)`.
   - **Observe:** matches and autoplay elements.
   - **Pass:** no carousel library and no autoplaying media.
   - **Fail signature:** a slider component or `<video autoplay>` in the hero.
4. **Step 4 —** Hero image alt: `expect(await page.locator('img').first().getAttribute('alt')).toMatch(/.{15,}/)`.
   - **Observe:** the alt text.
   - **Pass:** descriptive alt naming the real subject (interior/team), not empty or "image".
   - **Fail signature:** missing, empty, or filename-style alt.
5. **Step 5 —** LCP budget: run **GTH-2** Lighthouse mobile on `/`.
   - **Observe:** the LCP value and performance score.
   - **Pass:** LCP ≤ 2.5s and Performance ≥ the budget in Section 25c.
   - **Fail signature:** an unoptimized full-size hero pushing LCP past budget.
6. **Step 6 —** Content-integrity scan: `rg -n "accepting new patients|Belltown|South Lake Union|First Hill|Denny|downtown" <home template>` and confirm each fact-bearing hit sits inside a `[verify]` marker.
   - **Observe:** fact-bearing phrases.
   - **Pass:** every such phrase is a `[verify]` placeholder or omitted.
   - **Fail signature:** an asserted neighborhood or "accepting new patients" with no `[verify]`.
7. **Step 7 —** Reduced motion: set `prefers-reduced-motion: reduce` and load `/`.
   - **Observe:** hero animation behavior.
   - **Pass:** no motion, or motion fully suppressed; no layout jump.
   - **Fail signature:** animation persists; content shifts.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and one primary CTA sits above the fold at 360×640.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Thumb-zone primary CTA (GTH-15).** At 390×844 measure the primary CTA's vertical centre: `const box = await page.getByRole('link',{{name:/request|book/i}}).first().boundingBox();`
   - **Observe:** the CTA Y-centre versus viewport height, and whether tap-to-call is adjacent.
   - **Pass:** the CTA is thumb-reachable (lower band) or clearly handed off to the sticky bar, with a `tel:` Call nearby.
   - **Fail signature:** the sole primary action pinned to the very top out of one-handed reach with no bottom affordance.
10. **Step 10 — Reflow & text resize at 320px / 200% (GTH-20).** On `/` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Home hero and appointment-CTA component; no changes to other homepage sections or global shell. Flag any out-of-hero edit.
3. Nothing from "Explicitly out of scope" was built — no video, no carousel, no awards.
4. No new dependency added — this item authorizes none (no slider/animation library); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (neighborhood, "accepting new patients," proof line).
6. Prior build items still pass — re-run Item 2 (CTA reaches the request flow; sticky bar unaffected).
7. Global Test Harness passes on `/`.
8. Console free of errors and warnings on `/`.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape): no horizontal scroll at 320px, the H1 + one primary CTA are above the fold with tap-to-call adjacent, the CTA is thumb-reachable, touch targets ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The hero is implemented with one H1, one primary CTA above the fold, a real captioned image, LCP within budget, and every fact-bearing phrase as a `[verify]` placeholder; all test steps pass with evidence; Item 2's CTA wiring still works; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified with the primary CTA above the fold, thumb-reachable, and no horizontal scroll at 320px.

---
**Build Item 4: Trust strip and conservative-care statement**
- **Priority:** P0
- **Patient job addressed:** Fast credibility; anti-over-treatment (C/D)
- **User story:** I quickly see honest signals that this practice won't over-treat or overcharge.
- **Problem being solved:** The #1 patient-generated distrust (over-treatment) and cost fear.
- **Page or flow:** Home (+ About)
- **Scope:** Trust chips (verifiable) + a plain conservative-care/cost-transparency statement.
- **Required content:** "Accepting new patients" [verify], "In-network with [carriers]" [verify], "Gentle, judgment-free care", "Same-day emergencies" [verify]; statement copy.
- **Components:** Trust strip, content block
- **Design instructions:** Simple icon+label row; calm.
- **Interaction instructions:** Static; statement links to About.
- **Mobile behavior:** The trust chips **wrap to 2×2** at ≤390px and stay text-labeled (never icon-only); the conservative-care / cost-transparency statement is a full-width block that **reflows at 200%/320px with no loss** (GTH-20) and is readable without pinch-zoom. Nothing overflows sideways at 320px; the block reassures within the first scroll but never displaces the hero's primary action above it.
- **Accessibility requirements:** Text labels (not icon-only); readable.
- **Engineering instructions:** Content-driven chips (easy to edit/verify).
- **Dependencies:** Items 1–3
- **Explicitly out of scope:** Unverified superlatives, awards
- **Acceptance criteria:** Every chip maps to a verified fact; statement present on Home + About.
- **Evidence supporting the item:** PG Repeated (strongest)
- **Expected patient outcome:** Reassurance the practice is honest.
- **Minimum implementation:** 3 chips + statement
- **Optional later enhancement:** Live availability chip

**What good output looks like:** Just below the hero, a simple row of three to four text-labelled chips states verifiable reassurances (e.g. "Accepting new patients," "In-network with [carriers]," "Judgment-free care," "Same-day emergencies") and, nearby on both Home and About, a short plain-language conservative-care/cost-transparency statement: we recommend only what you need, we show you what we see, we give written estimates, and second opinions are welcome. Nothing shouts; there are no superlatives or awards. An anxious, over-treatment-wary patient reads it and feels this practice is honest.

*Signals of quality:*
- Chips are text + icon (never icon-only) and each maps to a single verifiable fact; fact-bearing chips are `[verify]` until confirmed.
- The conservative-care statement appears on both Home and About with identical substance.
- Tone is calm and specific; no "award-winning," "best," "#1," or "top dentist" language.
- Chips wrap cleanly to 2×2 on a narrow phone.
- All chip and statement text meets 4.5:1 contrast.
- *(Mobile)* Chips render as a 2×2 grid at 320/360/390 with visible text labels and no horizontal scroll at 320px.
- *(Mobile)* The conservative-care statement stays fully readable at 200% zoom / 320px with no clipping (GTH-20).

*Signs it went wrong:* icon-only chips a screen reader can't name; a chip asserting a carrier or "same-day" with no `[verify]`; marketing superlatives; the statement on Home but missing from About. *(Mobile:)* chips forced into a single sideways-scrolling row at 320px; the statement clipped or requiring pinch-zoom to read.

**Reference implementations (extract the principle — do not copy):**
- https://chicagoloopdentistry.com/ — the "Pinky Promise" (never push unneeded treatment, show imaging, transparent pricing, respect your time). *Adapt:* a concrete conservative-care promise. *Avoid:* copying their exact wording/brand.
- https://integritydentalboston.com/ — values framed around honesty and no surprises. *Adapt:* the transparency posture. *Avoid:* implying prices you cannot stand behind.
- https://www.silbermandentalgroup.com/blog/second-opinion-dentist/ — a practice openly inviting second opinions. *Adapt:* "second opinions welcome." *Avoid:* defensive or legalistic phrasing.
- https://www.reddit.com/r/Seattle/comments/1c7ocjp/trustworthy_dentist_recs/ — the strongest patient signal: distrust of over-treatment; people prize a dentist who is thorough but doesn't over-prescribe. *Adapt:* answer this fear directly. *Avoid:* any salesy tone that reactivates it.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Chips are labelled: Playwright `for (const chip of await page.locator('[data-testid="trust-chip"]').all()) { expect((await chip.innerText()).trim().length).toBeGreaterThan(1); }`.
   - **Observe:** each chip's visible text.
   - **Pass:** every chip has a real text label (not icon-only).
   - **Fail signature:** a chip with only an icon/`aria-label` gap.
2. **Step 2 —** Each fact-bearing chip is verified or placeholdered: `rg -n "In-network|Delta|Premera|Regence|UnitedHealth|same-day|accepting new patients" <trust-strip>` and confirm a `[verify]` wrap.
   - **Observe:** fact-bearing chip text.
   - **Pass:** each maps to a verified fact or shows `[verify]`.
   - **Fail signature:** an unverified carrier or "same-day" chip published as fact.
3. **Step 3 —** No superlatives: `rg -in "award|best|#1|number one|top(-| )dentist|voted" <home template> <about template>`.
   - **Observe:** matches.
   - **Pass:** no matches (no unverifiable puffery).
   - **Fail signature:** any superlative claim present.
4. **Step 4 —** Statement on both pages: `curl -s http://localhost:3000/ | rg -i "second opinions welcome|only what you need"` and the same on `/about` (or the About section).
   - **Observe:** presence of the statement on Home and About.
   - **Pass:** the conservative-care statement appears on both.
   - **Fail signature:** present on one page only.
5. **Step 5 —** Wrap at narrow width: at 360×640, screenshot the strip.
   - **Observe:** chip layout.
   - **Pass:** chips wrap to 2×2 without overflow or clipping.
   - **Fail signature:** chips overflow horizontally or truncate.
6. **Step 6 —** Contrast + axe: **GTH-5** on chip text/background token pair and **GTH-1** axe on `/`.
   - **Observe:** contrast ratios and axe output.
   - **Pass:** chip and statement text ≥4.5:1; 0 serious/critical axe issues.
   - **Fail signature:** low-contrast chip text; axe name/role violation.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and the chips render 2×2 (not a sideways row).
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Reflow & text resize at 320px / 200% (GTH-20).** On `/` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the trust-strip component and the conservative-care content block on Home and About; no hero or nav changes. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no unverified superlatives, no awards.
4. No new dependency added — this item authorizes none (content-driven chips); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (carriers, "same-day," "accepting new patients").
6. Prior build items still pass — re-run Item 3 (hero H1/CTA unchanged; the strip sits below it, not over it).
7. Global Test Harness passes on `/` and `/about`.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, chips wrap 2×2 with text labels, touch targets ≥44×44px, the conservative-care statement reflows at 200%/320px with no loss, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The trust strip and conservative-care statement are implemented with text-labelled chips (each a verified fact or `[verify]`), the statement present on Home and About, no superlatives, contrast passing; all test steps pass with evidence; Item 3 still passes; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — chips wrap 2×2 with no horizontal scroll and the statement reflows at 200%/320px.

---
**Build Item 5: Dentist & team page with named credentials and photos**
- **Priority:** P0
- **Patient job addressed:** Know who will treat me (C)
- **User story:** I can see the dentists' names, credentials, and approach before I commit.
- **Problem being solved:** Faceless templates read as illegitimate.
- **Page or flow:** Our Team (+ homepage team teaser)
- **Scope:** One dentist profile each + team strip + philosophy + office photos.
- **Required content:** Names, DDS/DMD [verify], school/years [verify], license [verify], portraits, philosophy line.
- **Components:** Dentist profile, review card (optional)
- **Design instructions:** Consistent warm profile cards; real photos.
- **Interaction instructions:** Home teaser links to full page.
- **Mobile behavior:** Dentist profiles **stack single-column**; each card shows the portrait, name + credential [verify], and the one-line philosophy **without requiring a tap**. Portraits are responsive and lazy-loaded below the fold to protect the throttled-mobile budget; the 'meet the team' / full-bio links are **≥44×44px** with ≥8px spacing. No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20); the layout holds in landscape (GTH-21).
- **Accessibility requirements:** Alt describes person/role; heading order.
- **Engineering instructions:** Reusable profile component with variants (full/compact).
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Video bios, memberships (P2)
- **Acceptance criteria:** Each dentist has name+credential+photo+philosophy; nothing unverified published.
- **Evidence supporting the item:** PG/DP Repeated
- **Expected patient outcome:** Trust in real, credentialed humans.
- **Minimum implementation:** 1 profile per dentist
- **Optional later enhancement:** Video, availability

**What good output looks like:** The Our Team page shows each dentist as a real, warm portrait beside their name, credential (DDS/DMD), a one-line care philosophy, and a human detail, in a consistent card layout; a short team strip and a couple of genuine office photos ground it in a real place; and the homepage carries a compact team teaser that links here. A patient deciding whether to trust these people can see exactly who will treat them before committing. Every credential, school, year, and license number is a `[verify]` placeholder until the practice confirms it.

*Signals of quality:*
- Each dentist card has name + credential + real photo + one-line philosophy.
- Photo `alt` describes the person and role ("Dr. [name], general dentist"), not "headshot.jpg."
- Heading order is logical (page `<h1>`, dentist names as `<h2>`/`<h3>`).
- Credentials, school/years, and license numbers appear only as `[verify]` until confirmed.
- The homepage team teaser links to the full page; cards stack cleanly on mobile.
- *(Mobile)* Profiles stack one-per-row at 320/360/390 with portrait + name + one-line philosophy visible before any tap.
- *(Mobile)* Bio/team links are ≥44×44px and portraits are lazy-loaded so the page stays within the throttled-mobile budget.

*Signs it went wrong:* stock faces or no faces; a published license number that was never verified; inconsistent card layouts; alt text that is a filename; a teaser that links nowhere. *(Mobile:)* profiles crammed into a sideways-scrolling row at 320px; bio links under 44px; full-size portraits blowing the mobile weight budget.

**Reference implementations (extract the principle — do not copy):**
- https://www.gentrydentistry.com/ — a named dentist with real credentials and a calm, credible bio. *Adapt:* name + credential + photo + philosophy. *Avoid:* copying their bio text or portraits.
- https://book.firsthilldentalseattle.com/ — multiple named dentists presented plainly. *Adapt:* consistent multi-dentist cards. *Avoid:* unverified claims.
- https://www.keydentalwestend.ca/ — whole-team humanization that reads as a real place. *Adapt:* team strip + office photos as legitimacy. *Avoid:* over-staged imagery.
- https://seattlescapitolhilldentist.com/ — an anti-pattern: no named dentist, faceless template. *Adapt:* nothing. *Avoid:* exactly this — anonymity that reads as illegitimate.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Each profile is complete: Playwright over `[data-testid="dentist-profile"]` asserts each contains a name, a credential string, an `<img>`, and a philosophy line.
   - **Observe:** the four required parts per card.
   - **Pass:** every dentist card has all four.
   - **Fail signature:** a card missing a photo, credential, or philosophy.
2. **Step 2 —** Alt describes person/role: `for (const img of await page.locator('[data-testid="dentist-profile"] img').all()) { expect(await img.getAttribute('alt')).toMatch(/dr\.?\s|dentist|hygienist|team/i); }`.
   - **Observe:** each portrait's alt.
   - **Pass:** alt names the person and role.
   - **Fail signature:** empty alt or filename-style alt.
3. **Step 3 —** Heading order: extract headings and confirm one `<h1>` then dentist names at the next level with no skipped ranks (`axe` "heading-order" clean).
   - **Observe:** heading outline.
   - **Pass:** logical, unskipped heading order.
   - **Fail signature:** dentist names as `<h4>` under an `<h2>` with no `<h3>`.
4. **Step 4 —** No unverified credentials published: `rg -n "DDS|DMD|License|Lic\.?\s*#|graduated|University|residency" <team template>` and confirm each is inside a `[verify]` marker.
   - **Observe:** credential strings.
   - **Pass:** every credential/license/school is `[verify]` until confirmed.
   - **Fail signature:** a concrete license number or school asserted as fact.
5. **Step 5 —** Homepage teaser links here: from `/`, click the team teaser and assert it lands on the team route with a matching heading.
   - **Observe:** navigation target.
   - **Pass:** teaser links to the full Team page.
   - **Fail signature:** dead teaser or wrong destination.
6. **Step 6 — [manual]** At 360×640, view the team page.
   - **Observe:** card layout.
   - **Pass:** profiles stack single-column, images sized, no overflow.
   - **Fail signature:** cramped multi-column cards or clipped photos.
7. **Step 7 —** Run the **Global Test Harness** (Section 25c) on the Team route (GTH-1 axe, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** image without alt; invalid markup.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/our-team`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/our-team'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/our-team` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and profiles stack single-column.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Touch-target size & spacing (GTH-14).** At 360×640 on `/our-team` measure the bio/team links and any profile controls: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.
10. **Step 10 — Reflow & text resize at 320px / 200% (GTH-20).** On `/our-team` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Our Team page, the dentist-profile component, and the homepage team teaser; no unrelated pages. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no video bios, no memberships (those are P2).
4. No new dependency added — this item authorizes none (a reusable profile component); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (names, DDS/DMD, school/years, license).
6. Prior build items still pass — re-run Item 2 (global shell intact) and Item 3 (homepage hero, now with a team teaser below it).
7. Global Test Harness passes on the Team route.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape): no horizontal scroll at 320px, profiles stack single-column with name+credential+photo visible without tapping, touch targets ≥44×44px, portraits lazy-loaded, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The team page and reusable profile component are implemented; each dentist shows name + credential + photo + philosophy with role-describing alt and logical headings; all credential facts are `[verify]`; the homepage teaser links through; all test steps pass with evidence; Items 2–3 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 + landscape matrix is verified — profiles stack single-column with ≥44px links and no horizontal scroll.

---
**Build Item 6: Appointment request flow (form + states)**
- **Priority:** P0
- **Patient job addressed:** Get in without phone tag (H)
- **User story:** I can request an appointment in under two minutes on my phone, and know it worked.
- **Problem being solved:** Phone-only booking and silent form failures cause abandonment.
- **Page or flow:** Contact / Request (linked from every CTA)
- **Scope:** Short form (name, phone, email, preferred window, reason/notes, insurance optional, additional family members) + confirmation + error/recovery.
- **Required content:** Field labels, help text, response-time promise [verify], privacy note.
- **Components:** Form field, appointment CTA, success state, error state, loading state
- **Design instructions:** Single column; visible labels; big targets; kind errors.
- **Interaction instructions:** Inline validation; on success show what-to-bring + arrival + add-to-calendar; on failure show phone fallback.
- **Mobile behavior:** The request form is a **single column** with the submit button in the **thumb zone**, never covered by the sticky action bar. Every field declares the mobile-correct keyboard — `type="tel" inputmode="tel" autocomplete="tel"` for phone, `type="email" inputmode="email" autocomplete="email"`, `type="date"` for the preferred window — and all inputs render **≥16px** so focus never triggers iOS zoom. Entered values **survive interruption** (a patient may pause to take a call). Success and error states are readable and announced at 360×640, with a tappable `tel:` fallback on error. Targets ≥44×44px; no horizontal scroll at 320px.
- **Accessibility requirements:** Labels, `aria-describedby`, error association, focus to success heading, announced states.
- **Engineering instructions:** Server-side validation; spam protection without CAPTCHA friction (honeypot/token); no PII in logs.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Real-time scheduler, portal (P2)
- **Acceptance criteria:** Submit success shows next steps; forced error shows recovery + phone; keyboard/AT complete.
- **Evidence supporting the item:** PR/DP Repeated; PG (channel choice)
- **Expected patient outcome:** A confirmed request with clear next steps.
- **Minimum implementation:** Form + success + error + phone fallback
- **Optional later enhancement:** Online scheduler

**What good output looks like:** A patient on a phone reaches a short, single-column request form — name, phone, email, preferred time window, reason/notes, optional insurance, and an optional "additional family members" note — with visible labels above each field and large tap targets. Submitting shows a clear success state that confirms the request, tells them what to bring, how to arrive, and offers add-to-calendar; a failed submit shows a kind, plain error and the phone number as a human fallback. It takes under two minutes, works entirely by keyboard and screen reader, and never dead-ends.

*Signals of quality:*
- Every field has a visible, programmatically associated `<label>`; errors are tied to fields via `aria-describedby`.
- Correct mobile input types (`tel`, `email`, `date`/window select); all targets ≥44×44px.
- On success, focus moves to the success heading and the state is announced; next steps (what to bring, arrival, add-to-calendar) are shown.
- On failure, a non-blaming message explains recovery and shows a `tel:` fallback.
- Spam protection is a honeypot/token, not a CAPTCHA; response-time promise is `[verify]`.
- *(Mobile)* The phone field opens the number pad and email the email keyboard (`inputmode`/`type`), and no input is below 16px so focus never zooms.
- *(Mobile)* The submit button is thumb-reachable and never hidden behind the sticky bar; entered values persist on back/return.
- *(Mobile)* On error, a tappable `tel:` fallback appears so a stuck patient can still call in one tap.

*Signs it went wrong:* placeholder-only labels; a silent failure; a CAPTCHA wall; focus left on a dead submit button; a success screen with no next steps. *(Mobile:)* a phone field that triggers the full alphabetic keyboard; sub-16px inputs that zoom on focus; the sticky bar covering the submit button; the form wiping entered values when the patient returns from a call.

**Reference implementations (extract the principle — do not copy):**
- https://www.southlakeuniondentistoffice.com/about-us/request-appointment/ — an honest request-not-instant-book pattern ("some appointments aren't online; we'll call you") with an "I have an emergency" checkbox. *Adapt:* request + callback honesty. *Avoid:* their form length/branding.
- https://dentologie.com/locations/seattle/south-lake-union — a sub-60-second request flow. *Adapt:* minimal fields, fast completion. *Avoid:* copying their scheduler.
- https://www.zendentalcenterseattle.com/ — a purpose-based request form that routes intent. *Adapt:* a reason/notes field. *Avoid:* promo-heavy framing.
- https://gargle.com/is-your-dental-website-ada-compliant/ — flags inaccessible schedulers, CAPTCHAs, and PDFs. *Adapt:* a fully accessible form with no CAPTCHA friction. *Avoid:* third-party scheduler widgets that fail AT.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Labels associated: Playwright — for each `input,select,textarea`, read its `id` and assert `page.locator('label[for="' + id + '"]').count()` equals 1.
   - **Observe:** label-for pairing per field.
   - **Pass:** every field has one associated visible label.
   - **Fail signature:** placeholder-only fields; unlabeled inputs.
2. **Step 2 —** Input types: assert phone field `type="tel"`, email `type="email"`, date/window uses `date`/select.
   - **Observe:** the `type` attributes.
   - **Pass:** mobile-appropriate types set.
   - **Fail signature:** everything `type="text"`.
3. **Step 3 —** Success path: fill valid data, submit, then `expect(page.locator('[role="status"], [data-testid="success"]')).toBeVisible()`; assert focus is on the success heading and next-steps content (what to bring / arrival / add-to-calendar) is present.
   - **Observe:** success state, focus target, next-steps content.
   - **Pass:** success shown, focus moved, next steps present.
   - **Fail signature:** no confirmation; focus stuck on the form.
4. **Step 4 —** Error/recovery: force a server error (or invalid state), submit, and assert a plain error message plus a `tel:` fallback appears and is announced (`role="alert"`).
   - **Observe:** the error state and phone fallback.
   - **Pass:** kind error + phone fallback, announced to AT.
   - **Fail signature:** silent failure; generic "error" with no recovery.
5. **Step 5 —** Keyboard-only completion (GTH-4): complete the request using only the keyboard with visible focus throughout.
   - **Observe:** the keyboard traversal path.
   - **Pass:** the form can be completed and submitted by keyboard; focus is always visible.
   - **Fail signature:** a control the keyboard can't reach; invisible focus.
6. **Step 6 —** No CAPTCHA; honeypot present: `rg -in "recaptcha|hcaptcha|captcha" <request flow>` returns nothing; assert a visually hidden honeypot field exists.
   - **Observe:** anti-spam approach.
   - **Pass:** no CAPTCHA; honeypot/token used.
   - **Fail signature:** a CAPTCHA widget in the flow.
7. **Step 7 —** Touch targets + axe (GTH-6, GTH-1) at 360×640 and 390×844.
   - **Observe:** target sizes and axe output.
   - **Pass:** all controls ≥44×44; 0 serious/critical axe issues.
   - **Fail signature:** small radio/checkbox targets; unlabeled control flagged by axe.
8. **Step 8 — Mobile keyboard & input correctness (GTH-18).** On the form assert per-field attributes and font-size: `await expect(page.locator('input[name=phone]')).toHaveAttribute('type','tel'); await expect(page.locator('input[name=phone]')).toHaveAttribute('inputmode',/tel|numeric/); await expect(page.locator('input[name=phone]')).toHaveAttribute('autocomplete','tel'); await expect(page.locator('input[name=email]')).toHaveAttribute('type','email');` then check every input renders ≥16px.
   - **Observe:** the type/inputmode/autocomplete of each field and its computed font-size.
   - **Pass:** each field summons the correct keyboard and every input is ≥16px (no iOS zoom).
   - **Fail signature:** a `type=text` phone field, a missing `autocomplete`, or a sub-16px input.
9. **Step 9 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/contact`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/contact'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/contact` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and the submit button is not covered by the sticky bar at 390×844.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
10. **Step 10 — Thumb-zone submit + `tel:` fallback (GTH-15 / GTH-17).** At 390×844 measure the submit button's position, then force a submit error.
   - **Observe:** the submit button Y-position and whether an error exposes a `tel:` link.
   - **Pass:** submit sits in the lower/thumb-reachable band clear of the sticky bar; a forced error shows a tappable `tel:` fallback.
   - **Fail signature:** submit pinned high or hidden behind the sticky bar; no phone fallback on error.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the request flow (form, field, success, error, loading) and the CTA wiring into it; no scheduler/portal. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no real-time scheduler, no patient portal (P2).
4. No new dependency added unless it is a minimal, accessible form/validation helper the item implies; check the lockfile diff and justify.
5. No unverified fact published — output the `[verify]` inventory (response-time promise, any hours referenced).
6. Prior build items still pass — re-run Item 2 (every CTA points here) and Item 3 (hero CTA reaches the flow).
7. Global Test Harness passes on the request route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, every field summons the right keyboard (`type`/`inputmode`/`autocomplete`) at ≥16px inputs, the submit is thumb-reachable and never covered by the sticky bar, entered values survive interruption, a `tel:` fallback appears on error, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The request flow is implemented with labeled fields, correct input types, and working loading/success/error states; success shows next steps and moves focus; failure shows a phone fallback; the form completes by keyboard with no CAPTCHA; all test steps pass with evidence; Items 2–3 CTAs still reach it; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — correct mobile keyboards at ≥16px, a thumb-reachable submit, and a `tel:` fallback on error.

---
**Build Item 7: Location & arrival page (parking, transit, building entry)**
- **Priority:** P0
- **Patient job addressed:** Arrive without stress (H)
- **User story:** I know exactly where to park (and if it's validated), which station is nearest, and which door/floor to use.
- **Problem being solved:** Downtown tower wayfinding + parking dread; almost no competitor solves it.
- **Page or flow:** Location & Hours (+ homepage teaser)
- **Scope:** Address+map, parking+validation [verify], nearest Link station/streetcar/bus + walk time, entrance/floor/suite/accessible route + day-of access [verify], hours, tap-to-call.
- **Required content:** Verified logistics.
- **Components:** Location & arrival card
- **Design instructions:** Compact, scannable card + small map.
- **Interaction instructions:** One-tap directions + call.
- **Mobile behavior:** This is a page patients open **one-handed on a Downtown sidewalk**, so the arrival essentials — address, **one-tap Directions** (maps deep link) and **one-tap Call** (`tel:`) — are **above the fold on a 360px screen**. The address is **real tappable text**, not baked into the map image; the map is lazy-loaded/deferred so it never delays the throttled-mobile budget. Parking, transit + walk time, and building-entry/floor details collapse into scannable blocks that hide nothing critical. Targets ≥44×44px; no horizontal scroll at 320px; content reflows at 200%/320px (GTH-20); usable in landscape (GTH-21).
- **Accessibility requirements:** Text address alternative to map; labeled links.
- **Engineering instructions:** Static map with text fallback; avoid heavy embeds.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Nav videos (P2)
- **Acceptance criteria:** Parking, nearest transit, entrance/floor, and hours all present and verified; one-tap directions works.
- **Evidence supporting the item:** PG/GOV Repeated; PR exemplar
- **Expected patient outcome:** Confident, low-stress arrival.
- **Minimum implementation:** Address+map+parking+transit+hours
- **Optional later enhancement:** Walking/driving videos, live hours

**What good output looks like:** A compact, scannable arrival card answers the Downtown questions almost no competitor solves: the street address and building, where to park and whether parking is validated, the nearest Link light-rail station (and streetcar/bus) with an honest walking time, which entrance/floor/suite to use and any day-of access step, the hours, and one-tap "Get directions" and "Call" actions. A small static map sits alongside a text address. A patient reads it and arrives calm and on time, by transit or car. Every logistic fact is a `[verify]` placeholder until confirmed.

*Signals of quality:*
- Address is present as selectable text (not only inside a map image/embed).
- Parking + validation, nearest transit + walk time, and entrance/floor/suite each appear and are `[verify]` until confirmed.
- "Get directions" and "Call" are one-tap on mobile (`maps:`/`geo:`/https maps URL and `tel:`).
- The map is a lightweight static image with a text fallback, not a heavy interactive embed.
- Hours are present and `[verify]`.
- *(Mobile)* At 360×640 the address, one-tap Directions, and one-tap Call are above the fold; tapping Directions opens a maps app and the number opens the dialer (`tel:`).
- *(Mobile)* The address is real selectable text with a maps link (not only a map image), and the map is deferred so it never blows the mobile weight budget.

*Signs it went wrong:* a map with no text address; driving directions only, no transit; a heavy iframe blowing the performance budget; logistics asserted without `[verify]`. *(Mobile:)* the address is plain text that cannot be tapped for directions; directions/phone locked inside a heavy map embed; parking/transit forced into a sideways-scrolling table at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://integritydentalboston.com/ — the gold standard: garage entrance, validation, day-of QR, floor, concierge, ID, and nav detail. *Adapt:* concrete, concierge-grade arrival. *Avoid:* detail bloat — keep it scannable.
- https://dentologie.com/locations/seattle/south-lake-union — a dedicated parking + transit block naming the SLU Streetcar. *Adapt:* transit + walk time for a car-light Downtown. *Avoid:* their imagery.
- https://www.gentrydentistry.com/ — a dedicated Parking page treating arrival as a real job. *Adapt:* giving arrival its own space. *Avoid:* copying layout.
- https://www.soundtransit.org/ride-with-us/parking/parking-locations — official confirmation there is no downtown park-and-ride; transit is the default. *Adapt:* honest transit-first framing. *Avoid:* implying easy parking that doesn't exist.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Text address present: `curl -s http://localhost:3000/location-hours | rg -i "seattle, wa|suite|floor"` and Playwright asserts the address is real text, not alt-only.
   - **Observe:** the address in the DOM text.
   - **Pass:** selectable text address present outside the map.
   - **Fail signature:** address only inside a map image/iframe.
2. **Step 2 —** Required blocks present: assert the card contains parking, transit, entrance/floor, and hours sections (by heading or testid).
   - **Observe:** the four logistics blocks.
   - **Pass:** all four present.
   - **Fail signature:** transit or entrance/floor missing (the common competitor gap).
3. **Step 3 —** Logistics facts are `[verify]`: `rg -n "Link|streetcar|garage|validat|entrance|floor|suite|min walk|open " <location template>` and confirm each fact-bearing hit is `[verify]` until confirmed.
   - **Observe:** the logistics phrases.
   - **Pass:** every fact is `[verify]` or omitted.
   - **Fail signature:** an asserted station, walk time, or parking price.
4. **Step 4 —** One-tap actions: assert "Get directions" is an `https://maps` / `geo:` link and "Call" is a `tel:` link; both are ≥44×44 at 390×844.
   - **Observe:** the action hrefs and sizes.
   - **Pass:** both one-tap and adequately sized.
   - **Fail signature:** a JS-only directions button; small targets.
5. **Step 5 —** Lightweight map: `rg -in "iframe|google.com/maps/embed" <location template>` and run **GTH-2** Lighthouse on the route.
   - **Observe:** embed usage and the performance budget.
   - **Pass:** static map (or no heavy embed); route within budget.
   - **Fail signature:** a full interactive embed pushing the page past budget.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the Location route (GTH-1 axe, GTH-3 HTML, GTH-7 JS-disabled — address/phone still reachable).
   - **Observe:** harness output.
   - **Pass:** clean; address and phone usable with JS off.
   - **Fail signature:** map-dependent content that vanishes without JS.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/location-hours`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/location-hours'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/location-hours` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Native one-tap handoffs (GTH-17).** On `/location-hours` assert a `tel:` link and a maps deep link both exist, are ≥44px, and are above the fold at 360×640: `await expect(page.locator('a[href^="tel:"]').first()).toBeVisible(); expect(await page.locator('a[href*="maps."], a[href^="geo:"], a[href*="google.com/maps"]').count()).toBeGreaterThan(0);`
   - **Observe:** the presence, size, and position of the `tel:` link and the maps link.
   - **Pass:** tapping the number opens the dialer and tapping Directions opens a maps app; both targets ≥44×44px above the fold at 360×640.
   - **Fail signature:** a plain-text phone or address that cannot be actioned, or the handoffs below the fold on a phone.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/location-hours` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Location & Hours page and the location-&-arrival card component; no homepage teaser yet (that is Item 12). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no navigation videos (P2).
4. No new dependency added — this item authorizes none (static map, no map SDK); flag any map library in the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (address, parking/validation, transit + walk time, entrance/floor/suite, hours, day-of access).
6. Prior build items still pass — re-run Item 2 (footer address/map link) and Item 6 (Call fallback unaffected).
7. Global Test Harness passes on the Location route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape): no horizontal scroll at 320px, the address + one-tap Directions (maps) + one-tap Call (`tel:`) are above the fold and thumb-reachable, touch targets ≥44×44px, the map is deferred, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The arrival card is implemented with a text address, parking + validation, nearest transit + walk time, entrance/floor/suite, and hours (all `[verify]`), one-tap directions and call, and a lightweight map with a text fallback; all test steps pass with evidence; Items 2 and 6 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 + landscape matrix is verified — one-tap Directions and Call above the fold, a real tappable address, and no horizontal scroll.

---
**Build Item 8: Insurance & Payment page (accept≠in-network + uninsured path)**
- **Priority:** P0
- **Patient job addressed:** Avoid surprise bills (D)
- **User story:** I understand whether you're in-network for my plan and what to do if I'm uninsured.
- **Problem being solved:** "Accepts" vs "in-network" confusion; the top walk-away.
- **Page or flow:** Insurance & Payment (+ homepage message)
- **Scope:** Plain explainer, networks list [verify], verify-benefits steps, estimate offer, membership/financing [verify], payment methods [verify], benefit-mechanics FAQ, No Surprises Act note.
- **Required content:** Verified financial facts.
- **Components:** Insurance module, FAQ accordion, form field (verify form optional)
- **Design instructions:** No jargon; readable tables.
- **Interaction instructions:** Links to verify path; optional "check my coverage" form.
- **Mobile behavior:** The accept≠in-network explainer and networks list read as a **single column**; any data tables **reflow to no horizontal scroll at 320px** (stacked rows or a horizontally-contained, labeled table — never a sideways-scrolling page). Links (verify-benefits, uninsured path) are **≥44×44px**; the plain in-network line stays visible, not collapsed. Content reflows at 200%/320px (GTH-20) and is readable without pinch-zoom. If a verify-benefits field is present it uses the correct input mode at ≥16px (GTH-18).
- **Accessibility requirements:** Table semantics; labeled fields.
- **Engineering instructions:** Content-managed network list for easy updates.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Real-time eligibility check (P2)
- **Acceptance criteria:** Explainer present; networks listed [verify]; uninsured path present; no invented prices.
- **Evidence supporting the item:** CG/PG Repeated
- **Expected patient outcome:** Confidence about coverage and cost.
- **Minimum implementation:** Explainer + networks + uninsured path
- **Optional later enhancement:** Coverage look-up tool

**What good output looks like:** The Insurance & Payment page does the one thing no competitor does: it explains, in plain words, the difference between "accepting" a plan and being "in-network," names the specific plans the practice participates with, tells the patient exactly how to verify their own benefits, and gives an uninsured patient a real path (membership/financing) — plus a short benefit-mechanics FAQ and a No Surprises Act note. Tables are readable on a phone; there is no jargon and no invented price. A confused, bill-averse patient leaves knowing whether they're covered and what to do next.

*Signals of quality:*
- A plain "accepted ≠ in-network" explainer is present and readable at ~8th-grade level.
- The participating-networks list is present and `[verify]`; no price is asserted without `[verify]`.
- A "how to verify your benefits" step list and an uninsured path (membership/financing) are present.
- Tables use proper `<th scope>`; any "check my coverage" form fields are labeled.
- A No Surprises Act / balance-billing note is included.
- *(Mobile)* Insurance tables reflow with no horizontal scroll at 320px; the accept≠in-network line and uninsured path stay readable without pinch-zoom.
- *(Mobile)* Verify-benefits and uninsured-path links are ≥44×44px and tappable at 360×640.

*Signs it went wrong:* "we accept most major insurance" with no carriers or network status; an invented dollar figure; an inaccessible table; a jargon wall; an exclusionary tone. *(Mobile:)* a wide insurance table forcing the whole page to scroll sideways at 320px; links under 44px; the explainer requiring pinch-zoom.

**Reference implementations (extract the principle — do not copy):**
- https://book.firsthilldentalseattle.com/ — names carriers (Delta/Premera/Regence/UHC) and offers a verify-benefits step. *Adapt:* name networks + verify path. *Avoid:* copying their exact list — ours is `[verify]`.
- https://oceanbreezeprosthodontics.com/blog/in-network-out-of-network-dentist/ — a clean "accepts ≠ in-network" explainer. *Adapt:* the plain distinction. *Avoid:* blog padding.
- https://coveredusa.org/en/glossary/in-network-vs-out-of-network-coinsurance — coinsurance, balance billing, No Surprises Act, out-of-pocket max in plain terms. *Adapt:* the No Surprises Act note and OOP language. *Avoid:* over-legalistic phrasing.
- https://www.ismilefamily.com/ — a named carrier list plus an insurance look-up and inclusive framing. *Adapt:* look-up + inclusivity. *Avoid:* overstating coverage; keep it `[verify]`.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Explainer present: `curl -s http://localhost:3000/insurance-payment | rg -i "in-network|accepted"` and confirm both terms are defined and distinguished.
   - **Observe:** the accept-vs-in-network explainer text.
   - **Pass:** the distinction is stated in plain language.
   - **Fail signature:** only "we accept most insurance," no distinction.
2. **Step 2 —** Networks + no invented prices: `rg -n "Delta|Premera|Regence|UnitedHealth|Aetna|Cigna|\\$[0-9]" <insurance template>` and confirm every carrier and dollar figure sits inside `[verify]`.
   - **Observe:** carrier names and any prices.
   - **Pass:** all are `[verify]` or omitted.
   - **Fail signature:** an asserted carrier or price with no `[verify]`.
3. **Step 3 —** Uninsured path + verify steps: assert a membership/financing block and a numbered "verify your benefits" list are present.
   - **Observe:** the uninsured path and verify steps.
   - **Pass:** both present.
   - **Fail signature:** insurance-only content with no uninsured route.
4. **Step 4 —** Table semantics: Playwright asserts every data table has `<th scope>` headers and a caption/heading.
   - **Observe:** table markup.
   - **Pass:** headered, captioned tables.
   - **Fail signature:** a `<div>` grid or headerless table.
5. **Step 5 —** No Surprises Act note: `rg -i "no surprises act|balance billing|out-of-network" <insurance template>`.
   - **Observe:** the compliance note.
   - **Pass:** present.
   - **Fail signature:** absent.
6. **Step 6 —** Readability [manual/tooled]: run a readability check (e.g. `npx text-readability` or an 8th-grade heuristic) on the explainer copy.
   - **Observe:** the grade level.
   - **Pass:** ≤ 8th-grade reading level.
   - **Fail signature:** dense insurance jargon above grade 10.
7. **Step 7 —** Run the **Global Test Harness** (Section 25c) on the Insurance route (GTH-1 axe on tables/forms, GTH-5 contrast, GTH-3 HTML).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** unlabeled verify-form field; low-contrast table text.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/insurance-payment`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/insurance-payment'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/insurance-payment` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and every data table stays contained (no page-level sideways scroll).
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Touch-target size & spacing (GTH-14).** At 360×640 on `/insurance-payment` measure the verify-benefits and uninsured-path links: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.
10. **Step 10 — Reflow & text resize at 320px / 200% (GTH-20).** On `/insurance-payment` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Insurance & Payment page, the insurance module, and the FAQ accordion used here; membership/financing depth is Item 20. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no real-time eligibility check (P2).
4. No new dependency added — this item authorizes none (content-managed list); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (participating networks, membership/financing, payment methods, any price).
6. Prior build items still pass — re-run Item 1 (route resolves) and Item 5 (no team-page regressions from shared components).
7. Global Test Harness passes on the Insurance route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px (tables reflow/contained), the accept≠in-network explainer and uninsured path are readable without pinch-zoom, links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The Insurance & Payment page is implemented with a plain accept-vs-in-network explainer, a `[verify]` networks list, verify-benefits steps, an uninsured path, accessible tables, and a No Surprises Act note, with no invented prices; all test steps pass with evidence; prior items still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — insurance tables reflow with no horizontal scroll and links are ≥44px.

---
**Build Item 9: Emergency pathway (page + persistent action)**
- **Priority:** P0
- **Patient job addressed:** Get urgent help fast, safely (F)
- **User story:** In pain, I can call the right number instantly and know whether to go to the ER.
- **Problem being solved:** Buried emergency contact; unsafe uncertainty.
- **Page or flow:** Emergency (+ global emergency action)
- **Scope:** Tap-to-call + after-hours [verify], same-day policy [verify], ER-triage list, attributed first-aid steps, "what to have ready".
- **Required content:** Verified policy + clinical-sourced first aid.
- **Components:** Emergency banner/action, content blocks
- **Design instructions:** Calm-urgent, high contrast, one obvious call action.
- **Interaction instructions:** tel: link; symptom items end in an action, never a diagnosis.
- **Mobile behavior:** The emergency **Call is reachable in one tap from any route** via the sticky bar and again at the top of the page — a large thumb-zone `tel:` target that opens the dialer instantly; the sticky/prominent call is **safe-area-aware** so it clears the home indicator. The ER-triage list and attributed first-aid steps are **readable at 320px without pinch-zoom** (a panicking patient will not zoom). Nothing autoplays; motion is suppressed under reduced-motion (GTH-22). Targets ≥44×44px; no horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Icon+label; plain language; contrast.
- **Engineering instructions:** Cite clinical sources; keep static/fast.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Symptom checker/triage AI
- **Acceptance criteria:** Emergency reachable in one tap globally; ER-triage + first aid present; nothing diagnostic.
- **Evidence supporting the item:** CG Repeated
- **Expected patient outcome:** Fast routing to the right help.
- **Minimum implementation:** Call + ER line + first aid
- **Optional later enhancement:** Online urgent request

**What good output looks like:** From anywhere on the site, a person in pain reaches an Emergency action in one tap that places a call. The Emergency page is calm-urgent and high-contrast: one obvious call action, the same-day/after-hours policy, a short "when to go to the ER instead" triage list, clinically sourced first-aid steps (each ending in an *action*, never a diagnosis), and a "what to have ready" note. Nothing on it tries to diagnose. A frightened patient is routed to the right help fast and safely.

*Signals of quality:*
- The emergency action is reachable in one tap from every page and uses `tel:`.
- An ER-triage list (uncontrolled bleeding, facial swelling/trauma, severe pain) tells the patient when to go to the ER.
- First-aid steps are attributed to a clinical source and each ends in an action.
- Same-day and after-hours policy are present and `[verify]`.
- There is no symptom checker or triage AI; contrast is high and the call target is ≥44×44.
- *(Mobile)* From three different routes the emergency Call is reachable in exactly one tap and opens the dialer (`tel:`) at 320/360/390/430.
- *(Mobile)* First-aid and ER-triage steps are legible at 320px with no pinch-zoom and no sideways scroll.

*Signs it went wrong:* an emergency link buried in a service list; a symptom that ends in a diagnosis; unsourced first aid; a low-contrast call button; a hidden phone number. *(Mobile:)* the emergency number is plain text or needs two taps; first-aid steps clipped or requiring pinch-zoom; a call target under 44px.

**Reference implementations (extract the principle — do not copy):**
- https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do — call the dentist first; ER for facial fracture/uncontrolled bleeding; knocked-out-tooth first aid (<1 hr, milk). *Adapt:* the triage split and first-aid actions, cited. *Avoid:* paraphrasing into medical advice beyond the source.
- https://newsroom.tricare.mil/News/TRICARE-News/Article/4308160/ — ERs don't do fillings/crowns; a clear "not an emergency" list. *Adapt:* the "ER vs dentist" clarity. *Avoid:* military-specific framing.
- https://www.emergencydentistseattle.com/downtown — a one-tap Call/Book layout for an urgent user. *Adapt:* instant call priority. *Avoid:* emergency-only positioning.
- https://skyviewfamilydentistry.com/dentist-service-areas/dentist-downtown-seattle/ — a header that surfaces Emergency. *Adapt:* always-visible emergency access. *Avoid:* neighborhood filler.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** One-tap from anywhere: Playwright at 390×844 on Home, Insurance, and a service stub — click the global Emergency action and assert one interaction reaches a `tel:` link or the Emergency page's call.
   - **Observe:** taps to a call action.
   - **Pass:** emergency call reachable in one tap on every route.
   - **Fail signature:** two taps; emergency only in a menu.
2. **Step 2 —** ER-triage list present: `curl -s http://localhost:3000/emergency | rg -i "emergency room|ER|uncontrolled bleeding|swelling|call 911"`.
   - **Observe:** the triage list.
   - **Pass:** a clear "when to go to the ER" list is present.
   - **Fail signature:** no ER guidance.
3. **Step 3 —** First aid is sourced and action-ending: assert first-aid steps cite a clinical source (Cleveland Clinic/TRICARE) and `rg -in "you (have|may have|probably have)|diagnos" <emergency template>` returns nothing.
   - **Observe:** citations and any diagnostic language.
   - **Pass:** steps are attributed and end in actions, not diagnoses.
   - **Fail signature:** unsourced advice or a "you have an abscess" style statement.
4. **Step 4 —** No symptom checker: `rg -in "symptom checker|triage (bot|ai)|assessment tool" <emergency flow>`.
   - **Observe:** matches.
   - **Pass:** none.
   - **Fail signature:** an interactive triage/diagnosis widget.
5. **Step 5 —** Policy is `[verify]`: `rg -n "same-day|after-hours|after hours" <emergency template>` and confirm each policy statement is `[verify]`.
   - **Observe:** policy phrases.
   - **Pass:** same-day/after-hours are `[verify]` until confirmed.
   - **Fail signature:** an asserted after-hours number/policy.
6. **Step 6 —** Contrast + target (GTH-5, GTH-6): compute contrast of the emergency call control and measure its size at 360×640.
   - **Observe:** contrast ratio and size.
   - **Pass:** label ≥4.5:1, UI ≥3:1, target ≥44×44.
   - **Fail signature:** low-contrast red button; small tap target.
7. **Step 7 —** Run the **Global Test Harness** (Section 25c) on the Emergency route (GTH-1 axe, GTH-7 JS-disabled — call still works, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean; call works with JS off.
   - **Fail signature:** JS-only call handler.
8. **Step 8 — One-tap emergency Call from any route (GTH-17 / GTH-15).** From Home, one interior page, and `/emergency`, assert the emergency call is one tap and thumb-reachable: `const call = page.getByRole('link',{name:/emergency|call/i}).filter({has: page.locator('[href^="tel:"]')}); expect(await call.first().getAttribute('href')).toMatch(/^tel:/);` and measure its size/position.
   - **Observe:** the number of taps to reach the emergency call, its href scheme, and its size/position at 390×844.
   - **Pass:** reachable in one tap from all three routes, `tel:` opens the dialer, target ≥44×44px in the thumb/reach band.
   - **Fail signature:** a plain-text number, a two-tap path, or a call target under 44px.
9. **Step 9 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/emergency`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/emergency'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/emergency` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
10. **Step 10 — Reduced motion + reflow (GTH-22 / GTH-20).** Load `/emergency` with `prefers-reduced-motion: reduce`, then at 320×568 apply `html{font-size:200%}`.
   - **Observe:** any animation and whether first-aid/ER-triage content remains legible and complete.
   - **Pass:** no non-essential motion; all triage/first-aid steps readable at 320px/200% with no clipping or sideways scroll.
   - **Fail signature:** animation that ignores the setting; first-aid steps clipped or overflowing at 320px/200%.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Emergency page, the emergency banner/action, and its wiring into the global shell; no unrelated content. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no symptom checker / triage AI.
4. No new dependency added — this item authorizes none (static, fast); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (after-hours number, same-day policy).
6. Prior build items still pass — re-run Item 2 (the sticky Emergency action) and confirm the global shell still routes here.
7. Global Test Harness passes on the Emergency route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: the emergency Call is one tap from any route (`tel:`, ≥44px, thumb-zone, safe-area-aware), no horizontal scroll at 320px, first-aid/ER-triage readable without pinch-zoom, reduced motion honored, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The emergency pathway is implemented with a one-tap global call, an ER-triage list, clinically sourced action-ending first aid, and `[verify]` policy, with no diagnostic tooling; all test steps pass with evidence; Item 2's sticky emergency action still works; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — a one-tap emergency `tel:` from any route and first-aid legible at 320px with no pinch-zoom.

---
**Build Item 10: New Patients page (accepting, what-to-bring, what-to-expect)**
- **Priority:** P0
- **Patient job addressed:** Start confidently (I)
- **User story:** As a new patient, I know I can join, what to bring, and what the first visit is like.
- **Problem being solved:** First-visit uncertainty raises anxiety and no-shows.
- **Page or flow:** New Patients (+ homepage teaser)
- **Scope:** Accepting-status [verify], what-to-bring checklist, what-to-expect steps [verify], forms link [verify], records transfer [verify], insurance pointer, no-judgment line, first-visit price [verify].
- **Required content:** Verified new-patient facts.
- **Components:** New-patient steps, form field, insurance module (pointer)
- **Design instructions:** Numbered steps; scannable.
- **Interaction instructions:** Links to forms + request flow.
- **Mobile behavior:** 'What to expect' is a **vertical `<ol>`** and the 'what to bring' checklist stacks single-column, each readable at 360×640 without a tap; links to forms/request are **≥44×44px**. Content reflows at 200%/320px (GTH-20); no horizontal scroll at 320px; layout holds in landscape (GTH-21). Any long section collapses progressively but hides nothing critical — the accepting-status stays visible.
- **Accessibility requirements:** Ordered list; clear headings.
- **Engineering instructions:** Accessible downloadable/online forms [verify].
- **Dependencies:** Items 1–2, 6, 8
- **Explicitly out of scope:** Online intake portal (P2)
- **Acceptance criteria:** Accepting-status, what-to-bring, and what-to-expect all present and verified.
- **Evidence supporting the item:** PR Repeated
- **Expected patient outcome:** A prepared, calmer first visit.
- **Minimum implementation:** Accepting + checklist + steps
- **Optional later enhancement:** Secure online intake

**What good output looks like:** A new patient lands on a page that answers "can I join, what do I bring, and what will the first visit be like?" It states accepting-status, gives a scannable what-to-bring checklist (ID, insurance card, records/med list), lays out the first visit as numbered what-to-expect steps, links to any forms and a records-transfer note, points to the Insurance page, carries a warm no-judgment line, and — if the practice commits — a first-visit self-pay price. It links straight into the request flow. A nervous newcomer arrives prepared and calmer. Every fact is `[verify]`.

*Signals of quality:*
- Accepting-status, what-to-bring, and what-to-expect are all present; facts are `[verify]`.
- What-to-bring is a real list; what-to-expect is an ordered list with clear headings.
- A no-judgment line is present; forms links are accessible (labeled, not a bare PDF trap).
- The page links to the request flow (Item 6) and the Insurance page (Item 8).
- Any first-visit price is a `[verify]` placeholder, never invented.
- *(Mobile)* The what-to-expect steps render as a single-column ordered list at 320/360/390 with the accepting-status visible without scrolling far; no sideways scroll at 320px.
- *(Mobile)* Links to forms and the request flow are ≥44×44px and thumb-reachable.

*Signs it went wrong:* a "forms" link with no what-to-expect/what-to-bring; an invented price; an inaccessible PDF as the only path; no accepting-status. *(Mobile:)* the checklist forced into a sideways-scrolling row at 320px; form links under 44px; accepting-status hidden behind a collapsed section.

**Reference implementations (extract the principle — do not copy):**
- https://portlandor.dental/new-patients/ — model new-patient copy: all ages, verify-first, costs up front, financing. *Adapt:* the structure and honesty. *Avoid:* copying their exact figures.
- https://www.drparrella.com/blog/your-first-dental-appointment-what-to-bring-and-expect — a concrete what-to-bring/what-to-expect list (card/ID/records/meds; exam + cleaning + X-rays; ~30–45 min). *Adapt:* the checklist. *Avoid:* stating times/prices as ours without `[verify]`.
- https://www.smilegeneration.com/blog/ask-a-dentist/first-visit-dentist-appointment/ — e-check-in, exam, oral-cancer screening, financial coordinator. *Adapt:* the step sequence. *Avoid:* DSO-specific claims.
- https://anooshafifidds.com/new-patients/ — anxiety-aware, all-ages new-patient content. *Adapt:* the welcoming, no-judgment tone. *Avoid:* their branding.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Required blocks: `curl -s http://localhost:3000/new-patients | rg -i "accepting|what to bring|what to expect"`.
   - **Observe:** the three required sections.
   - **Pass:** accepting-status, what-to-bring, and what-to-expect all present.
   - **Fail signature:** a forms link with no prep content.
2. **Step 2 —** List semantics: Playwright asserts what-to-bring is a `<ul>` and what-to-expect is an `<ol>` with headings.
   - **Observe:** list markup.
   - **Pass:** proper list elements with clear headings.
   - **Fail signature:** steps as run-on paragraphs.
3. **Step 3 —** No invented facts: `rg -n "\\$[0-9]|~?[0-9]+ ?min|accepting new patients" <new-patients template>` and confirm each is `[verify]`.
   - **Observe:** prices/durations/status.
   - **Pass:** all `[verify]` or omitted.
   - **Fail signature:** an asserted price/duration/status.
4. **Step 4 —** Cross-links work: click the request-flow CTA and the Insurance pointer; assert both resolve (200) to Items 6 and 8.
   - **Observe:** link destinations.
   - **Pass:** both cross-links resolve.
   - **Fail signature:** dead or wrong links.
5. **Step 5 —** No-judgment line: `rg -i "no judgment|judgment-free|it'?s okay|been a while|welcome" <new-patients template>`.
   - **Observe:** the reassurance line.
   - **Pass:** present.
   - **Fail signature:** clinical/cold tone only.
6. **Step 6 —** Forms accessibility: if a forms link exists, assert it has a descriptive label and, if PDF, an accessible/online alternative is offered.
   - **Observe:** the forms link.
   - **Pass:** labeled link with an accessible path.
   - **Fail signature:** a bare "click here" PDF with no alternative.
7. **Step 7 —** Run the **Global Test Harness** (Section 25c) on the New Patients route (GTH-1 axe, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** unlabeled link; invalid list nesting.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/new-patients`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/new-patients'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/new-patients` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and the steps render as a single-column `<ol>`.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Touch-target size & spacing (GTH-14).** At 360×640 on `/new-patients` measure the form and request links: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.
10. **Step 10 — Reflow & text resize at 320px / 200% (GTH-20).** On `/new-patients` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the New Patients page, the new-patient-steps component, and pointers to Items 6/8; no online intake portal. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no online intake portal (P2).
4. No new dependency added — this item authorizes none; check the lockfile diff (flag any PDF/form SDK).
5. No unverified fact published — output the `[verify]` inventory (accepting-status, what-to-expect steps, forms, records transfer, first-visit price).
6. Prior build items still pass — re-run Item 6 (request flow) and Item 8 (insurance pointer target).
7. Global Test Harness passes on the New Patients route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape): no horizontal scroll at 320px, what-to-expect is a single-column ordered list with accepting-status visible, links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The New Patients page is implemented with accepting-status, a what-to-bring checklist, ordered what-to-expect steps, a no-judgment line, accessible forms links, and cross-links to the request and insurance pages — all facts `[verify]`; all test steps pass with evidence; Items 6 and 8 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 + landscape matrix is verified — a single-column ordered what-to-expect, ≥44px links, and no horizontal scroll.

---
**Build Item 11: Services overview + top service links + concern shortcuts**
- **Priority:** P0/P1
- **Patient job addressed:** Find care their way (G)
- **User story:** I can quickly see whether you do what I need — by name or by my concern.
- **Problem being solved:** Service dumps overwhelm; patients think in concerns.
- **Page or flow:** Services (+ homepage discovery)
- **Scope:** Curated top services + browse-by-concern list + life-stage entry + emergency shortcut.
- **Required content:** Service list [verify offerings].
- **Components:** Service card, browse-by-concern module
- **Design instructions:** Restraint (6–8 on home); plain names.
- **Interaction instructions:** Links only (no checker).
- **Mobile behavior:** The service grid drops to **2-up then 1-up at ≤360px** and is capped at **6–8 cards** (never a catalog); the browse-by-concern list renders as **wrapping chips**, each **≥44×44px with ≥8px spacing** and a plain link (no symptom checker). The emergency shortcut is one tap. No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Link/list semantics; focus.
- **Engineering instructions:** Content-managed service list.
- **Dependencies:** Items 1–2
- **Explicitly out of scope:** Symptom checker, full catalog (P1/P2)
- **Acceptance criteria:** Overview + top links + emergency shortcut + concern list present.
- **Evidence supporting the item:** PR Common; DP Emerging
- **Expected patient outcome:** Fast service discovery.
- **Minimum implementation:** Overview + links
- **Optional later enhancement:** Full concern module

**What good output looks like:** The Services area lets a patient find care their own way: a curated overview of the top six-to-eight services in plain names, a small "browse by concern" list in patient language ("chipped tooth," "tooth pain," "straighten my teeth"), a life-stage entry, and an emergency shortcut. It links — it never tries to diagnose. The homepage shows restraint (a handful of services, not a 20-item dump). Someone who thinks in symptoms and someone who thinks in procedure names both find their path in a couple of taps.

*Signals of quality:*
- The homepage shows a curated set (≈6–8), not a full catalog dump.
- A browse-by-concern module maps patient-language concerns to service links (links only, not a checker).
- An emergency shortcut and a life-stage entry are present.
- Cards and concern chips use list/link semantics and visible focus.
- The offered-services list is `[verify]` (nothing listed that isn't offered).
- *(Mobile)* At 320/360 the grid is 1–2 columns with ≤8 cards and the concern chips wrap without a sideways scroll; each chip/card tap area is ≥44×44px.
- *(Mobile)* The emergency shortcut is reachable in one tap and every concern item is a plain link, not a checker.

*Signs it went wrong:* a 20+ procedure wall on the homepage; a "symptom checker" interaction; concern labels that don't link anywhere; services listed that the practice doesn't offer. *(Mobile:)* a dense multi-column grid or catalog forcing sideways scroll at 320px; concern chips under 44px or acting like a diagnostic checker.

**Reference implementations (extract the principle — do not copy):**
- https://www.gentrydentistry.com/ — homepage restraint, "without overwhelming the homepage." *Adapt:* curate the homepage; push depth to service pages. *Avoid:* copying their service set.
- https://dentologie.com/locations/seattle/south-lake-union — a curated, scannable service presentation. *Adapt:* concise service cards. *Avoid:* their branding.
- https://32pearls.com/your-trusted-downtown-seattle-dentist-for-family-cosmetic-care/ — an anti-pattern: a long single-page service dump. *Adapt:* nothing. *Avoid:* exactly this overwhelm.
- https://delmain.co/blog/best-dental-websites/ — cross-checked convention that curated service discovery outperforms dumps. *Adapt:* the curation principle. *Avoid:* treating it as a layout to copy.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Homepage restraint: Playwright counts service cards on `/`: `expect(await page.locator('[data-testid="service-card"]').count()).toBeLessThanOrEqual(8)`.
   - **Observe:** homepage service-card count.
   - **Pass:** ≤8 curated services on Home.
   - **Fail signature:** a long dump of every procedure.
2. **Step 2 —** Browse-by-concern is links-only: assert concern items are anchors to service routes and `rg -in "symptom checker|diagnos|assessment tool" <services flow>` returns nothing.
   - **Observe:** concern module markup and any checker logic.
   - **Pass:** concerns are plain links; no checker.
   - **Fail signature:** an interactive diagnostic widget.
3. **Step 3 —** Emergency shortcut + life-stage entry present on Services: `curl -s http://localhost:3000/services | rg -i "emergency|family|all ages|children|adults"`.
   - **Observe:** the two entries.
   - **Pass:** both present.
   - **Fail signature:** missing emergency shortcut.
4. **Step 4 —** Links resolve: click each top service link and the concern links; assert 200 for each target (stubs acceptable pre–Item 15).
   - **Observe:** link destinations.
   - **Pass:** every service/concern link resolves.
   - **Fail signature:** dead links.
5. **Step 5 —** Offered list is `[verify]`: `rg -n "Invisalign|implant|root canal|whitening|crown|extraction|veneer" <services template>` and confirm the offered set is `[verify]` until confirmed.
   - **Observe:** listed services.
   - **Pass:** service offerings are `[verify]`.
   - **Fail signature:** a service asserted as offered without confirmation.
6. **Step 6 —** Mobile layout + axe (GTH-1, GTH-6): at 360×640 confirm 2-column cards and wrapping chips; run axe.
   - **Observe:** layout and axe output.
   - **Pass:** cards/chips wrap cleanly; 0 serious/critical axe issues.
   - **Fail signature:** overflow; list/link roles missing.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/services`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/services'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/services` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and the grid is 1–2 columns with ≤8 cards (no sideways row).
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Touch-target size & spacing (GTH-14).** At 360×640 on `/services` measure the service cards and concern chips: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/services` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the Services overview, service-card, and browse-by-concern components and the homepage discovery block; no individual service-page bodies (Item 15). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no symptom checker, no full catalog (P1/P2).
4. No new dependency added — this item authorizes none; check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (which services are offered).
6. Prior build items still pass — re-run Item 3 (homepage restraint preserved) and Item 9 (emergency shortcut routes correctly).
7. Global Test Harness passes on `/` and the Services route.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the grid is 1–2 columns capped at 6–8 cards, concern chips wrap with ≥44×44px targets and ≥8px spacing, the emergency shortcut is one tap, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The Services overview, curated homepage set, browse-by-concern list (links only), life-stage entry, and emergency shortcut are implemented with the offered list `[verify]`; all test steps pass with evidence; Items 3 and 9 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — a 1–2 column capped grid, wrapping ≥44px concern chips, and no horizontal scroll.

---
**Build Item 12: Homepage insurance + location teasers wired to their pages**
- **Priority:** P0
- **Patient job addressed:** Answer fit/cost/arrival in the scan (D/H)
- **User story:** On the homepage I already see whether you take my insurance and where you are.
- **Problem being solved:** Top questions must not be buried.
- **Page or flow:** Home
- **Scope:** Compact insurance message + arrival teaser linking to full pages.
- **Required content:** Networks line [verify], address + nearest transit + parking snippet [verify].
- **Components:** Insurance module (teaser), location & arrival card (teaser)
- **Design instructions:** Two compact blocks; no jargon.
- **Interaction instructions:** Link to full pages; tap-to-call/map.
- **Mobile behavior:** The two teasers are **full-width and tappable** at 360×640: the insurance teaser shows the plain in-network line and links to Insurance & Payment; the arrival teaser surfaces **one-tap Directions** (maps deep link) + **one-tap Call** (`tel:`) alongside the address/transit snippet and links to Location & Hours. Both link-out targets are **≥44×44px**; no horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Readable; labeled links.
- **Engineering instructions:** Reuse Items 7–8 components.
- **Dependencies:** Items 7, 8
- **Explicitly out of scope:** Full page content
- **Acceptance criteria:** Homepage shows insurance + arrival essentials linking out.
- **Evidence supporting the item:** PG Repeated
- **Expected patient outcome:** Immediate fit/cost/arrival confidence.
- **Minimum implementation:** Two teasers
- **Optional later enhancement:** Live "open now"

**What good output looks like:** During the homepage scan, a patient already sees the two answers that decide most visits: a compact insurance message ("In-network with [carriers] — here's how to check your plan") and an arrival teaser (address + nearest transit + parking snippet with tap-to-call/map), each linking to its full page. These are lightweight reuses of the Item 7 and Item 8 components — not duplicated content. Fit, cost, and arrival are answered before the patient has to click.

*Signals of quality:*
- The homepage shows a short insurance line and an arrival snippet, both linking to Insurance and Location.
- Both teasers reuse the insurance-module and location-&-arrival-card components (teaser variants), not re-authored markup.
- Tap-to-call and tap-to-map work from the arrival teaser on mobile.
- The networks line and arrival facts are `[verify]`.
- Blocks are full-width and tappable on a phone.
- *(Mobile)* On the homepage at 360×640 the arrival teaser offers one-tap Directions (maps) and one-tap Call (`tel:`); both teasers link out with ≥44×44px targets.
- *(Mobile)* No route scrolls sideways at 320px and the in-network line is readable without pinch-zoom.

*Signs it went wrong:* duplicated/foreked content that will drift from the full pages; a teaser that doesn't link out; asserted networks with no `[verify]`; broken tap-to-call. *(Mobile:)* the arrival teaser shows a plain-text address that can't be tapped for directions; teaser links under 44px; the teasers forcing sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://dentologie.com/locations/seattle/south-lake-union — surfacing parking/transit prominently. *Adapt:* an arrival snippet high on the page. *Avoid:* their imagery.
- https://www.ismilefamily.com/ — insurance surfaced early and inclusively. *Adapt:* an upfront insurance line + verify pointer. *Avoid:* overstating coverage; keep it `[verify]`.
- https://www.reddit.com/r/Seattle/comments/1c7ocjp/trustworthy_dentist_recs/ — patients name parking and "in-network Delta" as choose/reject factors. *Adapt:* answer both in the scan. *Avoid:* burying them below the fold.
- https://book.firsthilldentalseattle.com/ — carriers surfaced plainly near the top. *Adapt:* a concise carriers line. *Avoid:* copying their exact list.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Both teasers present on Home: `curl -s http://localhost:3000/ | rg -i "in-network|insurance"` and `rg -i "parking|transit|directions|Link"`.
   - **Observe:** the two teaser blocks.
   - **Pass:** an insurance teaser and an arrival teaser both appear on Home.
   - **Fail signature:** one or both missing.
2. **Step 2 —** Teasers link out: Playwright clicks each teaser's link and asserts it lands on the Insurance (Item 8) and Location (Item 7) routes.
   - **Observe:** link destinations.
   - **Pass:** both link to their full pages.
   - **Fail signature:** dead teaser or self-link.
3. **Step 3 —** Component reuse (no fork): confirm the teasers render the same components as Items 7–8 (e.g. shared testids/component name), not copy-pasted markup.
   - **Observe:** component identity in the DOM/source.
   - **Pass:** teaser variants of the existing components are used.
   - **Fail signature:** a separate hard-coded block duplicating content.
4. **Step 4 —** Tap-to-call/map: assert the arrival teaser exposes a `tel:` and a maps link, each ≥44×44 at 390×844.
   - **Observe:** action hrefs and sizes.
   - **Pass:** both one-tap and adequately sized.
   - **Fail signature:** missing call/map action.
5. **Step 5 —** Content-integrity: `rg -n "In-network|Delta|Premera|Regence|garage|Link|min walk" <home template>` and confirm each fact is `[verify]`.
   - **Observe:** fact-bearing phrases.
   - **Pass:** all `[verify]` or omitted.
   - **Fail signature:** an asserted carrier or transit fact.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on `/` (GTH-1 axe, GTH-2 Lighthouse — teasers must not blow the budget, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean; budget held.
   - **Fail signature:** a heavy re-embedded map on Home.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Native one-tap handoffs (GTH-17).** On `/` assert a `tel:` link and a maps deep link both exist, are ≥44px, and are present: `await expect(page.locator('a[href^="tel:"]').first()).toBeVisible(); expect(await page.locator('a[href*="maps."], a[href^="geo:"], a[href*="google.com/maps"]').count()).toBeGreaterThan(0);`
   - **Observe:** the presence, size, and position of the `tel:` link and the maps link.
   - **Pass:** tapping the number opens the dialer and tapping Directions opens a maps app; both targets ≥44×44px.
   - **Fail signature:** a plain-text phone or address that cannot be actioned, or the handoffs below the fold on a phone.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff touches only the homepage, adding teaser variants of the insurance and location components; no changes to the full Insurance/Location pages. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no full-page content duplicated onto Home.
4. No new dependency added — this item authorizes none (reuse of Items 7–8 components); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (networks line, address/transit/parking snippet).
6. Prior build items still pass — re-run Item 7 and Item 8 (the full pages and their components remain correct after adding teaser variants).
7. Global Test Harness passes on `/`.
8. Console free of errors and warnings on `/`.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the arrival teaser gives one-tap Directions (maps) + Call (`tel:`), both teasers link out with ≥44×44px targets, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The homepage insurance and arrival teasers are implemented as reused component variants that link to the full pages, with tap-to-call/map working and all facts `[verify]`; all test steps pass with evidence; Items 7 and 8 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — one-tap Directions and Call on the arrival teaser and no horizontal scroll.

---
**Build Item 13: Accessibility baseline pass (WCAG 2.2 AA) + Accessibility statement**
- **Priority:** P0
- **Patient job addressed:** Use the site with assistive tech; inclusion (all)
- **User story:** As an AT user, I can complete every task independently.
- **Problem being solved:** Inaccessible schedulers/forms/carousels cause abandonment and legal risk.
- **Page or flow:** Global + Accessibility page
- **Scope:** Audit + fix semantics, focus order, contrast, labels, alt text, skip link; publish accessibility statement.
- **Required content:** Statement + accommodation contact.
- **Components:** All (audit) + accessibility statement page
- **Design instructions:** Visible focus; AA contrast tokens.
- **Interaction instructions:** Keyboard operability everywhere; no color-only meaning.
- **Mobile behavior:** The WCAG 2.2 AA pass is validated on **mobile**, not only desktop: **touch target size** §2.5.8 (≥44×44px, GTH-14), **orientation** §1.3.4 (works portrait *and* landscape, GTH-21), and **reflow** §1.4.10 + **text resize** §1.4.4 at 320px/200% with no loss (GTH-20). Every P0 primary task completes by touch and by keyboard/AT at **360×640 and 390×844**, and the accessibility statement page itself is mobile-complete. Run the **Mobile Suite (GTH-12–GTH-22)** across all P0 routes.
- **Accessibility requirements:** WCAG 2.2 AA conformance for P0 pages.
- **Engineering instructions:** Automated + manual keyboard/screen-reader testing; no overlay widget as a substitute.
- **Dependencies:** Items 2–12
- **Explicitly out of scope:** Ongoing audit log (P2)
- **Acceptance criteria:** P0 pages pass keyboard + screen-reader task tests; statement published.
- **Evidence supporting the item:** CG Repeated
- **Expected patient outcome:** Everyone can book, read, and contact.
- **Minimum implementation:** AA pass on P0 + statement
- **Optional later enhancement:** Continuous audits

**What good output looks like:** Every P0 page can be completed by someone using only a keyboard or a screen reader. Focus is always visible and logically ordered; all controls have correct names, roles, and states; contrast meets AA; images carry purpose-describing alt text; nothing conveys meaning by color alone; motion respects `prefers-reduced-motion`; and a real Accessibility statement page is published with a contact for accommodations. Accessibility is built in — there is no overlay "accessibility widget" standing in for real conformance.

*Signals of quality:*
- axe-core reports 0 serious/critical violations on every P0 route.
- Each P0 page's primary task (book, read insurance, call emergency, find location) is completable by keyboard with visible focus.
- Interactive controls expose correct name/role/state to a screen reader; skip-link works.
- Contrast ≥4.5:1 (text) and ≥3:1 (large text/UI); no color-only meaning.
- An Accessibility statement page exists with an accommodation contact; no overlay widget is used.
- *(Mobile)* Every P0 primary task completes by touch at 360×640 and 390×844 with targets ≥44×44px and visible focus.
- *(Mobile)* Each P0 route passes orientation (§1.3.4) and reflow/resize (§1.4.10/§1.4.4) at 320px/200% with no horizontal scroll and no lost content.

*Signs it went wrong:* an overlay widget substituting for fixes; a keyboard trap in the drawer or form; invisible focus; a scheduler/PDF/carousel that fails AT. *(Mobile:)* a control under 44px, an orientation lock, or content lost at 320px/200% on any P0 route; focus invisible on a touch-then-keyboard path.

**Reference implementations (extract the principle — do not copy):**
- https://blog.prosites.com/making-your-dental-website-accessible/ — WCAG 2.2 AA and ADA Title III duties for private practices. *Adapt:* the AA target and page-task testing. *Avoid:* treating compliance as a checklist of plugins.
- https://gargle.com/is-your-dental-website-ada-compliant/ — the risky features (schedulers, PDFs, carousels, popups) and "alt text should describe clinical purpose." *Adapt:* purpose-bearing alt; avoid risky widgets. *Avoid:* their product pitch.
- https://userway.org/blog/dental-websites-accessibility/ — corroborates WCAG/ADA duties. *Adapt:* the conformance targets. *Avoid:* the overlay-as-fix implication — build accessibility in.
- https://www.queenannefamilydental.com/ — a real site relying on a text-resize widget. *Adapt:* nothing. *Avoid:* the overlay-widget-as-compliance pattern.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** axe on all P0 routes: run `@axe-core/playwright` against Home, Team, New Patients, Insurance, Location, Services, Emergency, Contact, Privacy, Accessibility.
   - **Observe:** violation lists per route.
   - **Pass:** 0 serious/critical violations on every P0 route.
   - **Fail signature:** repeated name/role/contrast violations.
2. **Step 2 —** Keyboard task completion (GTH-4): complete each page's primary task by keyboard only.
   - **Observe:** the keyboard path and focus visibility.
   - **Pass:** each primary task completes; focus visible at every stop.
   - **Fail signature:** a trap or an unreachable control.
3. **Step 3 —** Name/role/state: for the nav toggle, form fields, accordion, and emergency action, assert accessible name and correct role/state via `getByRole` and `aria-*`.
   - **Observe:** the accessibility tree for key controls.
   - **Pass:** each control has a correct name/role/state.
   - **Fail signature:** an icon button with no name; `aria-expanded` never set.
4. **Step 4 —** No overlay widget: `rg -in "userway|accessibe|audioeye|equalweb|accessiiti|overlay widget" <codebase>`.
   - **Observe:** matches.
   - **Pass:** none.
   - **Fail signature:** an overlay script injected as a "fix."
5. **Step 5 —** Contrast + reduced motion (GTH-5): compute contrast on token pairs and load with `prefers-reduced-motion: reduce`.
   - **Observe:** ratios and motion behavior.
   - **Pass:** AA contrast; motion suppressed under reduced-motion.
   - **Fail signature:** low-contrast tokens; animations that persist.
6. **Step 6 —** Statement published: assert the Accessibility page exists (200), states a WCAG 2.2 AA commitment, and gives an accommodation contact.
   - **Observe:** the statement page.
   - **Pass:** present with contact.
   - **Fail signature:** missing page or no contact.
7. **Step 7 —** HTML validity (GTH-3) on all P0 routes.
   - **Observe:** validator output.
   - **Pass:** 0 errors (duplicate ids, bad ARIA, unclosed tags).
   - **Fail signature:** invalid ARIA references.
8. **Step 8 — Mobile Suite across all P0 routes (GTH-12–GTH-22).** Run the Mobile Suite against every P0 route and record a per-viewport results table.
   - **Observe:** the per-check results (no-h-scroll, targets, thumb-zone, safe-area, tel:/maps, input modes, reflow, orientation, reduced motion) per route.
   - **Pass:** every P0 route passes GTH-12–GTH-22, evidenced by a per-viewport results table.
   - **Fail signature:** any P0 route failing a mobile check (sideways scroll, sub-44px target, orientation lock, or reflow loss).
9. **Step 9 — WCAG 2.2 mobile success criteria (GTH-14 / GTH-20 / GTH-21).** On all P0 routes assert §2.5.8 target size, §1.4.10 reflow + §1.4.4 resize at 320px/200%, and §1.3.4 orientation.
   - **Observe:** target sizes, reflow/resize behavior, and portrait/landscape function per route.
   - **Pass:** §2.5.8, §1.4.10, §1.4.4, and §1.3.4 all pass on every P0 route.
   - **Fail signature:** a target under 44px, content lost at 320px/200%, or an orientation-locked route.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff makes accessibility fixes across P0 components and adds the Accessibility statement page; it must not redesign features or change content beyond a11y corrections. Flag any behavioral/content change.
3. Nothing from "Explicitly out of scope" was built — no ongoing audit-log tooling (P2); no overlay widget.
4. No new dependency added except a dev-only a11y test runner (e.g. `@axe-core/playwright`); check the lockfile diff and confirm it is devDependencies only.
5. No unverified fact published — output the `[verify]` inventory (accommodation contact details).
6. Prior build items still pass — re-run Items 2, 6, 8, 9 keyboard/AT flows (drawer, form, tables, emergency) after fixes.
7. Global Test Harness passes on all P0 routes.
8. Console free of errors and warnings on all P0 routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape) on **all P0 routes**: the Mobile Suite (GTH-12–GTH-22) is green — no horizontal scroll at 320px, targets ≥44×44px (§2.5.8), reflow/resize at 320px/200% (§1.4.10/§1.4.4), orientation independence (§1.3.4), and every P0 primary task completes by touch and keyboard.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** All P0 pages pass axe with 0 serious/critical issues and are keyboard/screen-reader operable with visible focus, AA contrast, and reduced-motion support; the Accessibility statement is published with a contact; no overlay widget is used; all test steps pass with evidence; Items 2/6/8/9 still pass their AT flows; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the Mobile Suite (GTH-12–GTH-22) is verified green on all P0 routes — targets ≥44px, reflow/resize, orientation, and touch+keyboard task completion.

---
**Build Item 14: Verified-facts + Privacy/NPP publication gate**
- **Priority:** P0
- **Patient job addressed:** Trust accurate info; data safety (compliance)
- **User story:** Everything I read is true, and I understand how my data is handled.
- **Problem being solved:** Unverified claims and missing privacy content are trust/legal risks.
- **Page or flow:** Global + Privacy/NPP page
- **Scope:** Replace every [verify] placeholder with confirmed facts or remove it; publish Privacy + HIPAA NPP.
- **Required content:** Verified facts; legal privacy content [verify].
- **Components:** Content review + privacy page
- **Design instructions:** n/a
- **Interaction instructions:** n/a
- **Mobile behavior:** The Privacy Policy and HIPAA NPP **reflow at 320px/200% with no horizontal scroll** (GTH-20) and are readable without pinch-zoom on a phone; footer links to Privacy/NPP are **≥44×44px**. The `[verify]` sweep and no-invented-facts checks are unchanged and run against the mobile-rendered output as well as desktop.
- **Accessibility requirements:** Structured, readable policy.
- **Engineering instructions:** A publish checklist that blocks launch on any remaining [verify].
- **Dependencies:** Items 3–12
- **Explicitly out of scope:** Marketing claims not verifiable
- **Acceptance criteria:** No [verify] placeholder remains live; Privacy + NPP published.
- **Evidence supporting the item:** brief mandate; CG
- **Expected patient outcome:** Accurate, trustworthy information.
- **Minimum implementation:** Verification sweep + privacy pages
- **Optional later enhancement:** Change log

**What good output looks like:** Before anything ships, a publication gate proves the site tells the truth and handles data lawfully. Every `[verify]` placeholder has been replaced with a practice-confirmed fact or removed — none remain live. The Privacy Policy and HIPAA Notice of Privacy Practices are published and linked in the footer, along with a Notice of Non-Discrimination / language-access note. The policies are structured and readable. A CI check blocks the build if any `[verify]` remains. A patient can trust that every published statement is real.

*Signals of quality:*
- A repository/build scan finds zero live `[verify]` placeholders in shipped output.
- Privacy Policy and HIPAA NPP pages exist, are linked from the footer, and are readable/structured.
- A Notice of Non-Discrimination / language-access note is present.
- A CI/publish check fails the build on any remaining `[verify]`.
- Nothing unverifiable was "softened" instead of removed.
- *(Mobile)* Privacy and NPP are fully readable at 320px/200% with no sideways scroll; footer compliance links are ≥44×44px and tappable.
- *(Mobile)* The `[verify]` sweep returns zero on the mobile-rendered pages as well as desktop.

*Signs it went wrong:* a stray `[verify]` in production; a claim softened rather than verified or removed; missing Privacy/NPP; an unstructured wall-of-text policy. *(Mobile:)* a policy that needs pinch-zoom or scrolls sideways at 320px; footer Privacy/Accessibility links under 44px.

**Reference implementations (extract the principle — do not copy):**
- https://www.portlandmoderndentistry.com/ — a footer carrying non-discrimination and accessibility notices. *Adapt:* the compliance-footer pattern. *Avoid:* copying their policy text.
- https://www.dentistsofqueenanne.com/ — a non-discrimination footer on a real practice site. *Adapt:* the placement and presence. *Avoid:* DSO-specific language.
- https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html — plain-language guidance for readable policies. *Adapt:* structure long policies with headings and short sentences. *Avoid:* legalese that defeats comprehension.
- The publication-gate mechanism itself: *No strong exemplar observed in the research sample* — implement it as a CI/build check independent of any cited site.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** No live `[verify]`: `rg -n "\[verify\]" <built output / rendered routes>`.
   - **Observe:** any remaining placeholders in shipped content.
   - **Pass:** zero matches in production output.
   - **Fail signature:** a `[verify]` visible on any page.
2. **Step 2 —** CI gate exists and fails on `[verify]`: inspect the CI config and run it against a seeded `[verify]`.
   - **Observe:** the gate's behavior.
   - **Pass:** the build fails when a `[verify]` is present.
   - **Fail signature:** the gate is absent or non-blocking.
3. **Step 3 —** Privacy + NPP published: assert both routes return 200 and are linked in the footer.
   - **Observe:** the two policy pages and footer links.
   - **Pass:** both exist and are linked.
   - **Fail signature:** a missing or unlinked policy.
4. **Step 4 —** Non-discrimination/language-access note: `rg -i "non-discrimination|nondiscrimination|language assistance|does not discriminate" <footer/policy>`.
   - **Observe:** the note.
   - **Pass:** present.
   - **Fail signature:** absent.
5. **Step 5 —** Softening check [manual]: diff the removed `[verify]` items against the verification list (Section 27) and confirm each was verified or removed, not reworded to imply an unconfirmed fact.
   - **Observe:** each resolved placeholder.
   - **Pass:** every one is verified or removed.
   - **Fail signature:** a vague claim replacing a `[verify]` (e.g. "most plans").
6. **Step 6 —** Policy structure + HTML validity (GTH-3): assert headings/landmarks on policy pages and run the validator.
   - **Observe:** policy structure and validity.
   - **Pass:** structured, valid policy pages.
   - **Fail signature:** one giant unstructured block; invalid markup.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/privacy`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/privacy'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/privacy` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Reflow & text resize at 320px / 200% (GTH-20).** On `/privacy` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff replaces/removes `[verify]` content site-wide, adds Privacy/NPP pages, and adds the CI gate; it must not add new features or claims. Flag any feature change.
3. Nothing from "Explicitly out of scope" was built — no unverifiable marketing claims introduced.
4. No new dependency added except a dev-only string-scanning/CI step if needed; check the lockfile diff.
5. No unverified fact published — this item's core output IS the empty `[verify]` inventory; produce it and confirm it is zero.
6. Prior build items still pass — re-run content-integrity checks for Items 3–12 (each former `[verify]` is now verified or removed) and re-verify their routes render.
7. Global Test Harness passes on all changed routes including the new policy pages.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: Privacy/NPP reflow at 320px/200% with no horizontal scroll, footer compliance links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** All `[verify]` placeholders are verified or removed with zero remaining live, Privacy/NPP and a non-discrimination note are published and linked, a CI gate blocks any future `[verify]`, and policies are structured and valid; all test steps pass with evidence; Items 3–12 content-integrity checks still pass; the (now empty) `[verify]` inventory is recorded; and the verdict is recorded.

--- LAUNCH LINE: Items 1–14 make the site patient-ready (P0). Items below are P1/P2. Mobile: the 320/360/390/430 matrix is verified — Privacy/NPP reflow with no horizontal scroll and compliance links are ≥44px. ---

**Build Item 15: Individual service pages (top 6–8) with plain explainers**
- **Priority:** P1
- **Patient job addressed:** Understand a treatment (G/C/D)
- **User story:** I can understand a procedure in plain words without being sold to.
- **Problem being solved:** Jargon and upsell fear.
- **Page or flow:** Service pages
- **Scope:** Repeatable template (what/why/what-to-expect/comfort/cost pointer/related/CTA) for exam-cleaning, filling, crown, root canal, extraction, implant, Invisalign, whitening.
- **Required content:** Per-service facts [verify offerings].
- **Components:** Service page template, FAQ accordion, appointment CTA
- **Design instructions:** Scannable; patient term first.
- **Interaction instructions:** CTA "Ask about this"/"Book consult".
- **Mobile behavior:** Each service page is a **scannable single column** with a **sticky 'Ask about this' / 'Book a consultation' CTA in the thumb zone**, `env(safe-area-inset-bottom)`-aware so it never covers the page's own content or the home indicator; images are deferred; the patient-term-first explainer reflows at 200%/320px (GTH-20). No horizontal scroll at 320px; targets ≥44×44px.
- **Accessibility requirements:** Headings, plain language ≤8th grade.
- **Engineering instructions:** One template, content-driven.
- **Dependencies:** Item 11
- **Explicitly out of scope:** Full catalog, media (P2)
- **Acceptance criteria:** 6–8 pages live using one template; no invented prices; non-diagnostic.
- **Evidence supporting the item:** PR Common
- **Expected patient outcome:** Informed, unpressured understanding.
- **Minimum implementation:** 6 core pages
- **Optional later enhancement:** Full catalog + media

**What good output looks like:** Each of the top six-to-eight services has its own page built from one repeatable template: what it is and why it's done, what to expect, comfort options, a cost/insurance pointer, related services, and a clear "Ask about this / Book a consult" CTA — all in plain, ≤8th-grade language with the patient term first. Nothing is diagnostic and nothing is sold hard. A patient researching a crown or a root canal understands it without fear or jargon. Prices and offerings are `[verify]`.

*Signals of quality:*
- 6–8 service pages exist, all rendered from a single content-driven template.
- Each page has what/why, what-to-expect, comfort, cost pointer, related links, and a CTA.
- Reading level is ≤8th grade; the patient-friendly term leads, clinical term follows.
- No diagnostic language; no invented prices (cost is a pointer, prices `[verify]`).
- A sticky CTA is present on mobile; headings are logical.
- *(Mobile)* The sticky consult CTA stays in the thumb zone and safe-area-clear across the 6–8 pages at 360×640; no page scrolls sideways at 320px.
- *(Mobile)* Every service page reflows at 200%/320px with the explainer intact and images deferred to protect the mobile budget.

*Signs it went wrong:* bespoke one-off pages instead of one template; jargon-first copy; an asserted price; "you have/you need" diagnostic phrasing; upsell tone. *(Mobile:)* the sticky CTA covering the page's own content or the home indicator; a service page scrolling sideways at 320px; heavy images blowing the mobile budget.

**Reference implementations (extract the principle — do not copy):**
- https://www.gentrydentistry.com/ — calm, non-pushy service tone. *Adapt:* plain, unpressured explainers. *Avoid:* copying their copy.
- https://www.safeandhealthylife.com/complete-guide-cosmetic-dentistry-smile-makeover/ — health-first framing; a consult is fact-finding, not a commitment. *Adapt:* the non-sales stance. *Avoid:* aspirational-only language.
- https://www.prospersmilestudio.com/broken-tooth-is-it-an-emergency-or-not/ — a plain "what to expect / what to do" explainer that ends in an action. *Adapt:* action-ending, non-diagnostic structure. *Avoid:* implying self-diagnosis.
- https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html — plain-language and readability standards. *Adapt:* ≤8th-grade sentences, whole numbers. *Avoid:* clinical density.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** 6–8 pages from one template: list the service routes and confirm each renders the shared service-page component.
   - **Observe:** the service routes and their component.
   - **Pass:** 6–8 pages, all from one template.
   - **Fail signature:** fewer than 6, or bespoke per-page markup.
2. **Step 2 —** Required sections: for each page assert what/why, what-to-expect, comfort, cost pointer, related, and CTA are present (by heading/testid).
   - **Observe:** the section set per page.
   - **Pass:** all sections present on every page.
   - **Fail signature:** a page missing what-to-expect or the cost pointer.
3. **Step 3 —** No invented prices; cost is a pointer: `rg -n "\\$[0-9]" <service templates>` and confirm any figure is `[verify]`, with a link to the Insurance page.
   - **Observe:** price figures.
   - **Pass:** no asserted prices; cost points to Insurance.
   - **Fail signature:** a hard-coded procedure price.
4. **Step 4 —** Non-diagnostic: `rg -in "you (have|need|likely have)|we can tell you have|diagnos" <service templates>`.
   - **Observe:** diagnostic phrasing.
   - **Pass:** none.
   - **Fail signature:** self-diagnosis language.
5. **Step 5 —** Readability: run a readability check on two sample pages.
   - **Observe:** grade level.
   - **Pass:** ≤ 8th grade; patient term precedes clinical term.
   - **Fail signature:** jargon-first copy above grade 10.
6. **Step 6 —** Sticky CTA + axe (GTH-1) at 390×844 on two pages.
   - **Observe:** CTA behavior and axe output.
   - **Pass:** sticky CTA reachable; 0 serious/critical axe issues.
   - **Fail signature:** CTA scrolled off with no persistent path; heading-order violation.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/services/root-canal`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/services/root-canal'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/services/root-canal` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport across the shared template.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Sticky consult CTA — thumb-zone + safe-area (GTH-15 / GTH-16).** At 390×844 assert the sticky CTA is fixed near the bottom, in the thumb-reachable band, with a non-zero `env(safe-area-inset-bottom)` padding, and does not cover page content.
   - **Observe:** the sticky CTA position, inset padding, and any overlap with content.
   - **Pass:** CTA fixed-bottom in the thumb zone, safe-area-aware, never overlapping the page content or the home indicator.
   - **Fail signature:** a CTA pinned to the top, flush to the edge (no inset), or covering the page copy.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/services/root-canal` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the service-page template and 6–8 content pages plus their FAQ blocks; no full catalog, no media. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no full catalog, no media galleries (P2).
4. No new dependency added — this item authorizes none (one content-driven template); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (per-service offerings, any cost figure).
6. Prior build items still pass — re-run Item 11 (service links now resolve to real pages) and Item 6 (the "Ask about this" CTA reaches the request flow).
7. Global Test Harness passes on the changed service routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the sticky consult CTA is thumb-reachable and safe-area-aware without covering content, images deferred, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met on the shared template.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** 6–8 service pages are implemented from one plain-language, non-diagnostic template with all required sections, cost as a pointer (no invented prices), a sticky CTA, and logical headings; all test steps pass with evidence; Items 11 and 6 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — a thumb-zone safe-area-aware sticky consult CTA and no horizontal scroll across the service template.

---
**Build Item 16: Dental Anxiety & Comfort page + request notes field**
- **Priority:** P1
- **Patient job addressed:** Feel safe enough to book (E)
- **User story:** As an anxious/lapsed patient, I feel welcomed and in control before I even call.
- **Problem being solved:** Shame/judgment fear drives abandonment.
- **Page or flow:** Dental Anxiety & Comfort (+ request notes field)
- **Scope:** No-judgment welcome, what-to-expect, comfort options [verify], "tell us how to help" tied to the request form's notes field.
- **Required content:** Comfort offerings [verify].
- **Components:** Content blocks, form field (notes), review card
- **Design instructions:** Calm palette, warm imagery.
- **Interaction instructions:** Notes field invites concerns; no forced disclosure.
- **Mobile behavior:** Calm, concise, single column; the **notes textarea** ("tell us how to make you comfortable") renders at **≥16px** with a sensible mobile keyboard and **preserves what's typed** if the patient is interrupted; a `tel:` option is reachable so an anxious patient can call instead. **No autoplay**; motion is suppressed under reduced-motion (GTH-22). No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20); targets ≥44×44px.
- **Accessibility requirements:** Plain language; calm (no autoplay).
- **Engineering instructions:** Ensure notes flow to the practice with the request.
- **Dependencies:** Item 6
- **Explicitly out of scope:** Sedation promises unverified
- **Acceptance criteria:** No-judgment + what-to-expect + notes field present; comfort claims verified.
- **Evidence supporting the item:** PG/CG Repeated
- **Expected patient outcome:** Courage to book; a heads-up to the team.
- **Minimum implementation:** Page + notes field
- **Optional later enhancement:** Calming video

**What good output looks like:** An anxious or long-lapsed patient reaches a warm, calm page that says, in plain words, "it's okay if it's been a while — you're welcome here," walks them through what the first visit is like, describes real comfort options, and invites them to tell the team how to help via a notes field wired into the request form. No autoplay, no clinical coldness, no forced disclosure. The patient feels enough control and welcome to book — and the team gets a heads-up in the request. Comfort/sedation claims are `[verify]`.

*Signals of quality:*
- A genuine no-judgment welcome and a plain what-to-expect are present.
- A notes field on the request form (Item 6) invites concerns and flows to the practice with the request.
- Comfort options are described; any sedation claim is `[verify]` (regulated).
- The page is calm — no autoplay media; tap-to-call is present.
- Copy is plain-language and non-patronizing.
- *(Mobile)* The notes textarea is ≥16px (no iOS zoom), keyboard-appropriate, and retains input on interruption; a `tel:` option is one tap away.
- *(Mobile)* Nothing autoplays and motion is suppressed under `prefers-reduced-motion`; the page reads calmly at 320px with no sideways scroll.

*Signs it went wrong:* "gentle" as a throwaway adjective with no substance; an autoplay video; a required "describe your anxiety" field; sedation promised without `[verify]`. *(Mobile:)* a sub-16px notes field that zooms on focus; autoplaying media on a page meant to calm; the notes cleared when the patient returns; content requiring pinch-zoom.

**Reference implementations (extract the principle — do not copy):**
- https://dentologie.com/locations/seattle/south-lake-union — "six months or six years" no-judgment framing. *Adapt:* the welcoming, shame-free tone. *Avoid:* copying their wording.
- https://www.zendentalcenterseattle.com/ — "free of stress, anxiety or judgment." *Adapt:* an explicit no-judgment stance. *Avoid:* promo-heavy surroundings.
- https://www.yourdentista.com/i-havent-been-to-the-dentist-in-years-and-im-scared/ — reassurance content for the lapsed, frightened patient. *Adapt:* directly answering the shame hinge. *Avoid:* clinical lecturing.
- https://www.healthline.com/health/anxiety/dental-anxiety — evidence-based coping: communicate, explain steps, distraction, agreed stop-signals. *Adapt:* "tell us how to help" + explained steps. *Avoid:* stating sedation specifics as ours without `[verify]`.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** No-judgment + what-to-expect present: `curl -s http://localhost:3000/dental-anxiety | rg -i "no judgment|it'?s okay|been a while|what to expect|welcome"`.
   - **Observe:** the reassurance and steps.
   - **Pass:** both present in warm, plain language.
   - **Fail signature:** only a "gentle care" adjective, no substance.
2. **Step 2 —** Notes field wired: on the request form, assert an optional notes/concerns field exists and its value is included in the submitted payload (intercept the request in Playwright).
   - **Observe:** the field and the submit payload.
   - **Pass:** notes are optional and reach the practice with the request.
   - **Fail signature:** no notes field, or notes dropped on submit.
3. **Step 3 —** No forced disclosure: assert the notes field is not `required`.
   - **Observe:** the field's required attribute.
   - **Pass:** optional.
   - **Fail signature:** a mandatory "describe your anxiety" field.
4. **Step 4 —** Comfort/sedation `[verify]`: `rg -in "sedation|nitrous|IV|oral sedation|headphones|blanket|comfort" <anxiety template>` and confirm each offering is `[verify]`.
   - **Observe:** comfort/sedation claims.
   - **Pass:** each is `[verify]` until confirmed.
   - **Fail signature:** an asserted sedation offering.
5. **Step 5 —** Calm/reduced motion: `rg -in "autoplay" <anxiety template>` returns nothing; load under `prefers-reduced-motion: reduce`.
   - **Observe:** media and motion.
   - **Pass:** no autoplay; motion suppressed.
   - **Fail signature:** an autoplaying calming video.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the Anxiety route (GTH-1 axe, GTH-5 contrast on the calm palette, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean; calm palette still ≥4.5:1.
   - **Fail signature:** low-contrast pastel text.
7. **Step 7 — Notes field input correctness (GTH-18).** Assert the notes textarea renders ≥16px and carries sensible mobile input attributes: `const fs = await page.locator('textarea[name=notes]').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)); expect(fs).toBeGreaterThanOrEqual(16);`
   - **Observe:** the textarea computed font-size and its input attributes.
   - **Pass:** the notes textarea is ≥16px (no focus zoom) with an appropriate mobile keyboard.
   - **Fail signature:** a sub-16px textarea that zooms on focus.
8. **Step 8 — Reduced motion + no autoplay (GTH-22).** Load with `prefers-reduced-motion: reduce`: `await page.emulateMedia({reducedMotion:'reduce'});` and `expect(page.locator('video[autoplay], [data-autoplay]')).toHaveCount(0)`.
   - **Observe:** any autoplaying media and animation under the reduced-motion setting.
   - **Pass:** no autoplay and no non-essential motion on this calming page.
   - **Fail signature:** autoplaying media or animation that ignores the setting.
9. **Step 9 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/anxiety-comfort`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/anxiety-comfort'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/anxiety-comfort` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the Dental Anxiety & Comfort page and a notes field on the existing request form; it must not restructure the form's other fields or states. Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no unverified sedation promises.
4. No new dependency added — this item authorizes none; check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (comfort amenities, sedation offerings).
6. Prior build items still pass — re-run Item 6 (request flow success/error still work with the added notes field).
7. Global Test Harness passes on the Anxiety route and the request route.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the notes textarea is ≥16px with the right keyboard and preserves input, a `tel:` option is reachable, no autoplay/reduced-motion respected, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The anxiety/comfort page is implemented with a genuine no-judgment welcome, plain what-to-expect, `[verify]` comfort options, and an optional notes field wired into the request (reaching the practice), with no autoplay and calm AA contrast; all test steps pass with evidence; Item 6 still passes; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — a ≥16px notes field that preserves input, no autoplay, reduced motion honored, and no horizontal scroll.

---
**Build Item 17: Family & life-stage care section/page**
- **Priority:** P1
- **Patient job addressed:** Comprehensive, all-ages care (G/B)
- **User story:** I can tell this practice serves my whole household across ages.
- **Problem being solved:** "Family" mis-read as kids-only; child-free households excluded.
- **Page or flow:** Home section + Family page
- **Scope:** Inclusive all-ages positioning, life-stage entries, honest scope [verify], household-coordination note.
- **Required content:** Scope facts [verify pediatric/oral-surgery].
- **Components:** Family-care module, service links
- **Design instructions:** Multi-generational imagery (not just toddlers).
- **Interaction instructions:** Links to relevant service pages.
- **Mobile behavior:** Full-width, single column; the multi-generational image is **lazy-loaded** to protect the throttled-mobile budget; life-stage entries and the household-coordination note are readable at 360×640 with **≥44×44px** links to services. No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20); layout holds in landscape (GTH-21).
- **Accessibility requirements:** Inclusive alt text.
- **Engineering instructions:** Reuse service cards.
- **Dependencies:** Items 11, 15
- **Explicitly out of scope:** Per-life-stage pages (P2)
- **Acceptance criteria:** Inclusive positioning + honest scope + coordination note present.
- **Evidence supporting the item:** PR Common; PG Emerging
- **Expected patient outcome:** Households see one dental home.
- **Minimum implementation:** Home section + short page
- **Optional later enhancement:** Life-stage pages

**What good output looks like:** A short homepage section and a Family page make clear this practice serves a whole household across every life stage — children, teens, adults, couples, single professionals, and older adults — not just toddlers. It states honestly what is done in-house vs. referred (e.g. very young pediatric care or oral surgery), notes that a household can coordinate care in one place, and uses multi-generational imagery and inclusive alt text. A child-free professional and a parent of three both see themselves. Scope facts are `[verify]`.

*Signals of quality:*
- Positioning is explicitly all-ages and inclusive (not children-only).
- Honest scope is stated, with in-house vs. referred as `[verify]`.
- A household-coordination note is present; links go to relevant service pages (reusing service cards).
- Imagery/alt text is multi-generational and inclusive.
- Copy does not assume every visitor has children.
- *(Mobile)* At 320/360 the family section is full-width and readable with the image deferred; links to services/life-stage entries are ≥44×44px.
- *(Mobile)* No sideways scroll at 320px and the inclusive copy reflows at 200% with no clipping.

*Signs it went wrong:* toddler-only imagery; "for the whole family" that implies kids-only; asserting pediatric/oral-surgery scope without `[verify]`; excluding child-free households. *(Mobile:)* a full-bleed image blowing the mobile budget or pushing content off-screen; links under 44px; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://www.newmouth.com/dentistry/family/ — family dentistry defined as comprehensive care across all life stages. *Adapt:* the all-ages, one-record framing. *Avoid:* generic definitional filler.
- https://www.onetreefamilydentistry.com/from-children-to-grandparents-how-a-family-dentist-supports-all-ages — from children to grandparents. *Adapt:* the multi-generational span. *Avoid:* their branding.
- https://32pearls.com/capitol-hills-trusted-family-dentist-for-all-ages/ — an all-ages family framing. *Adapt:* the inclusive positioning. *Avoid:* the thin-content SEO tendency of that site.
- https://www.keydentalwestend.ca/ — humanized whole-team, all-ages presentation. *Adapt:* inclusive imagery cues. *Avoid:* over-staged photography.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Inclusive positioning: `curl -s http://localhost:3000/family | rg -i "all ages|every age|children.*adults|adults.*children|whole household"`.
   - **Observe:** the positioning copy.
   - **Pass:** explicitly all-ages and inclusive of adults/child-free households.
   - **Fail signature:** kids-only framing.
2. **Step 2 —** Honest scope `[verify]`: `rg -in "pediatric|children under|oral surgery|wisdom|refer" <family template>` and confirm scope claims are `[verify]`.
   - **Observe:** scope statements.
   - **Pass:** in-house vs. referred is `[verify]`.
   - **Fail signature:** asserting a scope the practice hasn't confirmed.
3. **Step 3 —** Coordination note + links: assert a household-coordination line and links to service pages (reusing service cards) that resolve.
   - **Observe:** the note and links.
   - **Pass:** both present; links resolve.
   - **Fail signature:** no coordination note; dead links.
4. **Step 4 —** Inclusive alt text: assert imagery alt names varied ages/roles, not only children.
   - **Observe:** image alt text.
   - **Pass:** multi-generational, inclusive alt.
   - **Fail signature:** "kids at the dentist" only.
5. **Step 5 —** No child-only assumption: `rg -in "your kids|your children" <family template> <home template>` and confirm the copy also addresses adults/individuals.
   - **Observe:** audience assumptions in copy.
   - **Pass:** copy does not assume children.
   - **Fail signature:** every sentence presumes a parent.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the Family route and `/` section (GTH-1 axe, GTH-3 HTML).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** image without alt; invalid markup.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/family`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/family'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/family` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Touch-target size & spacing (GTH-14).** At 360×640 on `/family` measure the life-stage and services links: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/family` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the Family homepage section and Family page, reusing service cards; no per-life-stage pages (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no dedicated per-life-stage pages.
4. No new dependency added — this item authorizes none (reuse of service cards); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (pediatric/oral-surgery scope, in-house vs. referred).
6. Prior build items still pass — re-run Item 11 and Item 15 (service cards/pages the family links point to).
7. Global Test Harness passes on the Family route and homepage section.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932 (+ landscape): no horizontal scroll at 320px, full-width readable copy with the image deferred, links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The family/life-stage section and page are implemented with inclusive all-ages positioning, honest `[verify]` scope, a coordination note, multi-generational imagery/alt, and reused service links; all test steps pass with evidence; Items 11 and 15 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 + landscape matrix is verified — full-width family content with a deferred image, ≥44px links, and no horizontal scroll.

---
**Build Item 18: Reviews teaser + link-out**
- **Priority:** P1
- **Patient job addressed:** Social proof (C)
- **User story:** I can read a few genuine reviews and check the full profiles.
- **Problem being solved:** Review overload/fakes vs. reassurance.
- **Page or flow:** Home teaser (+ Reviews page later)
- **Scope:** 3–6 curated attributed quotes (values-illustrating), aggregate rating, links to Google/Yelp/Healthgrades.
- **Required content:** Real reviews [verify sourcing/consent].
- **Components:** Review card
- **Design instructions:** Static cards; no autoplay carousel.
- **Interaction instructions:** Link out to profiles.
- **Mobile behavior:** Review cards **stack** (or use a reduced-motion-safe, non-autoplay swipe); **`prefers-reduced-motion` is honored** (GTH-22) and there is **no autoplay carousel**; both keyboard and swipe work at 360×640. Attribution and the profile link-outs are **≥44×44px**. No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Keyboard-navigable; static.
- **Engineering instructions:** Avoid heavy third-party widgets; prefer curated static + link.
- **Dependencies:** Item 3
- **Explicitly out of scope:** Filtering, dedicated page (P2)
- **Acceptance criteria:** Genuine attributed quotes + rating + working links; no fabricated content.
- **Evidence supporting the item:** PG/DP Repeated
- **Expected patient outcome:** Trust via real social proof.
- **Minimum implementation:** 3 quotes + link out
- **Optional later enhancement:** Reviews page

**What good output looks like:** A homepage teaser shows three to six genuine, attributed review quotes chosen to illustrate the practice's values (conservative care, gentleness, honesty), an aggregate rating, and links out to the full Google/Yelp/Healthgrades profiles. The cards are static — no autoplay carousel — and fully keyboard-navigable. A patient gets reassurance without noise, and can verify on the source platforms. Every quote is real, consented, and dated; the rating is `[verify]`.

*Signals of quality:*
- 3–6 attributed quotes (name or first initial) that illustrate values, plus an aggregate rating.
- Working link-outs to Google/Yelp/Healthgrades profiles.
- Static cards — no autoplay carousel; keyboard-navigable and screen-reader friendly.
- Quotes are genuine and consented; rating and sourcing are `[verify]`.
- No fabricated or edited-to-mislead testimonials.
- *(Mobile)* Cards stack or swipe without autoplay; under `prefers-reduced-motion` no motion runs; each profile link-out is ≥44×44px.
- *(Mobile)* No sideways scroll at 320px and reviews are both keyboard- and touch-navigable.

*Signs it went wrong:* an autoplay carousel; invented or generic testimonials; a broken/absent link-out; an unverified aggregate rating stated as fact. *(Mobile:)* an auto-advancing carousel that ignores reduced-motion; a swipe with no keyboard fallback; link-outs under 44px; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://chicagoloopdentistry.com/ — genuine embedded reviews that reinforce trust. *Adapt:* values-illustrating quotes. *Avoid:* copying their content.
- https://book.firsthilldentalseattle.com/ — anti-upsell reviews that answer the over-treatment fear. *Adapt:* quotes that speak to conservative care. *Avoid:* cherry-picking misleadingly.
- https://www.gentrydentistry.com/ — a credible, restrained review presentation with link-out. *Adapt:* static cards + profile links. *Avoid:* heavy third-party widgets.
- https://seattlescapitolhilldentist.com/ — an anti-pattern: fabricated-looking testimonials. *Adapt:* nothing. *Avoid:* exactly this — anything that reads as fake destroys review trust.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** 3–6 attributed quotes + rating: Playwright counts review cards (3–6) and asserts each has an attribution and an aggregate rating is shown.
   - **Observe:** card count, attributions, rating.
   - **Pass:** 3–6 attributed quotes with an aggregate rating.
   - **Fail signature:** unattributed or too many/few quotes.
2. **Step 2 —** Link-outs resolve: click each profile link and assert it targets a real Google/Yelp/Healthgrades URL (200 or valid external host).
   - **Observe:** the link destinations.
   - **Pass:** working profile links.
   - **Fail signature:** dead or missing link-out.
3. **Step 3 —** No autoplay carousel: `rg -in "carousel|swiper|slick|autoplay" <reviews component>` and Playwright confirms cards are statically present (no rotating interval).
   - **Observe:** carousel usage.
   - **Pass:** static cards only.
   - **Fail signature:** an auto-rotating testimonial slider.
4. **Step 4 —** Sourcing/consent `[verify]`: assert quotes and rating carry a `[verify]` sourcing/consent marker until confirmed.
   - **Observe:** the sourcing markers.
   - **Pass:** quotes and rating are `[verify]` (genuine, consented, dated).
   - **Fail signature:** an unverified rating asserted as fact.
5. **Step 5 —** Keyboard + reduced motion (GTH-4): Tab through the cards and links; load under reduced motion.
   - **Observe:** keyboard traversal and motion.
   - **Pass:** all cards/links reachable; no motion.
   - **Fail signature:** a swipe-only control; motion under reduced-motion.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on `/` (GTH-1 axe, GTH-2 Lighthouse — no heavy review widget, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean; budget held.
   - **Fail signature:** a third-party review script blowing the budget.
7. **Step 7 — Reduced motion + no autoplay (GTH-22).** `await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/');` then `expect(page.locator('[data-autoplay], video[autoplay]')).toHaveCount(0)` and confirm no auto-advance.
   - **Observe:** any autoplay/auto-advance and animation under the reduced-motion setting.
   - **Pass:** no autoplay carousel; motion suppressed under the setting; cards remain keyboard- and swipe-navigable.
   - **Fail signature:** a carousel that still auto-advances, or a swipe-only widget with no keyboard path.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Touch-target size & spacing (GTH-14).** At 360×640 on `/` measure the review attribution and profile link-outs: `for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select').all()) { const b = await el.boundingBox(); if(!b) continue; expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); }`
   - **Observe:** the bounding box of each interactive target and the spacing between neighbors.
   - **Pass:** every visible target ≥44×44 CSS px with ≥8px spacing (WCAG 2.2 §2.5.8).
   - **Fail signature:** an icon-only or close-set control under 44px.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the review-card component and a homepage teaser; no dedicated Reviews page or filtering (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no filtering, no dedicated Reviews page.
4. No new dependency added — this item authorizes none (curated static cards, no widget); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (quote sourcing/consent, aggregate rating, review date).
6. Prior build items still pass — re-run Item 3 (homepage layout/LCP still within budget with the teaser added).
7. Global Test Harness passes on `/`.
8. Console free of errors and warnings on `/`.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, no autoplay and reduced motion honored, review cards keyboard- and touch-navigable, link-outs ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The reviews teaser is implemented with 3–6 genuine attributed quotes, an aggregate rating, and working profile link-outs as static keyboard-navigable cards, with sourcing/consent/rating all `[verify]`; all test steps pass with evidence; Item 3 still passes; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — no autoplay, reduced motion honored, ≥44px link-outs, and no horizontal scroll.

---
**Build Item 19: FAQ (grouped, top 12)**
- **Priority:** P1
- **Patient job addressed:** Self-serve the recurring questions (A–K)
- **User story:** I can find quick answers to the common questions in plain language.
- **Problem being solved:** Repeated questions clog phones and stall decisions.
- **Page or flow:** FAQ (+ FAQ blocks on service/insurance pages)
- **Scope:** Grouped accordion (insurance/cost, new patients, appointments/hours, parking/arrival, emergencies, anxiety, services, family).
- **Required content:** Answers [verify specifics].
- **Components:** FAQ accordion
- **Design instructions:** Grouped, scannable.
- **Interaction instructions:** Expand/collapse.
- **Mobile behavior:** Full-width accordion; each trigger is a **`button` ≥44×44px** with a toggling `aria-expanded`; **nothing critical is hidden** — a collapsed answer is one tap open and never buries an essential fact. Keyboard- and touch-operable at 360×640. No horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** `aria-expanded`, keyboard, headings.
- **Engineering instructions:** Content-managed Q/A.
- **Dependencies:** Items 8, 10, 7
- **Explicitly out of scope:** FAQ search (P2)
- **Acceptance criteria:** Top 12 answered; keyboard-operable; specifics verified.
- **Evidence supporting the item:** PR Common
- **Expected patient outcome:** Faster answers, fewer calls.
- **Minimum implementation:** 12 Qs
- **Optional later enhancement:** Search

**What good output looks like:** A grouped FAQ answers the top dozen recurring questions in the patient's own words, organized by theme — insurance/cost, new patients, appointments/hours, parking/arrival, emergencies, anxiety, services, family. It's an accessible accordion: each question is a real button that expands its answer, works by keyboard, and exposes state to a screen reader. A patient self-serves the common questions instead of calling. Answers with specifics are `[verify]`.

*Signals of quality:*
- At least 12 questions, grouped by theme, in plain language.
- Accordion items are buttons exposing `aria-expanded`; keyboard operable; headings structure the groups.
- Full-width, tappable rows on mobile.
- Fact-bearing answers (hours, prices, policies) are `[verify]`.
- Content links to the relevant deep pages (Insurance, New Patients, Location, Emergency).
- *(Mobile)* Accordion triggers are ≥44×44px full-width buttons that toggle `aria-expanded`; answers open on one tap with no critical info hidden.
- *(Mobile)* No sideways scroll at 320px and the FAQ is fully keyboard-operable on a phone.

*Signs it went wrong:* fewer than 12 or ungrouped questions; a `<div>` accordion with no `aria-expanded`; keyboard-inoperable toggles; asserted specifics with no `[verify]`. *(Mobile:)* tiny accordion triggers under 44px; an answer that hides a critical fact behind a collapse; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://dentologie.com/locations/seattle/south-lake-union — a rich ~10-question FAQ in patient language. *Adapt:* the grouped, plain-language Q&A. *Avoid:* copying their questions verbatim.
- https://integritydentalboston.com/ — a thorough FAQ covering arrival, cost, and policy. *Adapt:* coverage of logistics/cost questions. *Avoid:* their specifics as ours.
- https://www.tiganidentistry.com/blog/common-questions-about-dental-insurance-coverage-explained — plain answers to DPPO/DHMO, annual max, deductible. *Adapt:* the insurance-mechanics Q&A. *Avoid:* blog padding.
- https://coveredusa.org/en/glossary/in-network-vs-out-of-network-coinsurance — plain definitions for coverage questions. *Adapt:* accurate, plain answers. *Avoid:* legalese.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** ≥12 grouped questions: Playwright counts FAQ items (≥12) and asserts group headings exist.
   - **Observe:** question count and grouping.
   - **Pass:** ≥12 questions in themed groups.
   - **Fail signature:** a flat list under a dozen.
2. **Step 2 —** Accordion semantics: assert each trigger is a `<button>` with `aria-expanded` that toggles true/false on activation.
   - **Observe:** trigger role and state.
   - **Pass:** buttons with correct `aria-expanded`.
   - **Fail signature:** clickable `<div>` with no state.
3. **Step 3 —** Keyboard operable (GTH-4): expand/collapse each item with Enter/Space; focus visible.
   - **Observe:** keyboard behavior.
   - **Pass:** all items operable by keyboard; focus visible.
   - **Fail signature:** mouse-only toggles.
4. **Step 4 —** Specifics `[verify]`: `rg -n "\\$[0-9]|open |hours|same-day|Delta|Premera" <faq content>` and confirm each fact-bearing answer is `[verify]`.
   - **Observe:** fact-bearing answers.
   - **Pass:** all specifics `[verify]`.
   - **Fail signature:** an asserted price/hour/policy.
5. **Step 5 —** Deep links: assert FAQ answers link to Insurance, New Patients, Location, and Emergency where relevant, and links resolve.
   - **Observe:** internal links.
   - **Pass:** relevant deep links present and resolving.
   - **Fail signature:** dead-end answers.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the FAQ route (GTH-1 axe on the accordion, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** ARIA state mismatch flagged by axe.
7. **Step 7 — Accordion triggers — size + `aria-expanded` (GTH-14).** At 360×640 assert each FAQ trigger is a `button` ≥44×44px whose `aria-expanded` toggles: `for (const t of await page.getByRole('button',{expanded:false}).all()){ const b=await t.boundingBox(); expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44); await t.click(); }`
   - **Observe:** each trigger's role, size, and the `aria-expanded` state before/after tap.
   - **Pass:** every trigger is a ≥44×44px button toggling `aria-expanded`, opening its answer on one tap.
   - **Fail signature:** a non-button trigger, a sub-44px target, or a collapse hiding a critical fact.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/faq`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/faq'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/faq` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/faq` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the FAQ page and reuses the FAQ-accordion component; no FAQ search (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no FAQ search.
4. No new dependency added — this item authorizes none (content-managed Q&A, existing accordion); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (any hours/prices/policies in answers).
6. Prior build items still pass — re-run Items 7, 8, 10 (the pages the FAQ links into and mirrors).
7. Global Test Harness passes on the FAQ route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, accordion triggers are ≥44×44px buttons toggling `aria-expanded` with nothing critical hidden, keyboard-operable, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** A grouped FAQ of ≥12 plain-language questions is implemented as an accessible, keyboard-operable accordion with correct `aria-expanded`, relevant deep links, and all specifics `[verify]`; all test steps pass with evidence; Items 7/8/10 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — ≥44px accordion buttons with toggling aria-expanded, nothing critical hidden, and no horizontal scroll.

---
**Build Item 20: Membership/financing + verify-benefits detail**
- **Priority:** P1
- **Patient job addressed:** A real path for the uninsured/cost-anxious (D)
- **User story:** Without insurance, I can see how to afford care; with insurance, I can verify coverage.
- **Problem being solved:** Cost is the top skip-reason.
- **Page or flow:** Insurance & Payment (expansion)
- **Scope:** Membership plan detail [verify], financing [verify], verify-benefits steps, benefit-mechanics explainers, first-visit price [verify].
- **Required content:** Verified financial specifics.
- **Components:** Insurance module, FAQ accordion
- **Design instructions:** Plain-money language.
- **Interaction instructions:** "We'll help you check" CTA.
- **Mobile behavior:** Membership/financing and benefit-mechanics **money tables reflow to no horizontal scroll at 320px** (GTH-13/GTH-20); any verify-benefits field uses the correct input mode at **≥16px** (GTH-18); the 'we'll help you check' CTA and links are **≥44×44px**. Plain-money language is readable without pinch-zoom; content reflows at 200%/320px.
- **Accessibility requirements:** Labeled, readable tables.
- **Engineering instructions:** Content-managed for updates.
- **Dependencies:** Item 8
- **Explicitly out of scope:** Real-time eligibility (P2)
- **Acceptance criteria:** Uninsured path + verify steps present; all numbers verified.
- **Evidence supporting the item:** PR Repeated; PG Common
- **Expected patient outcome:** Affordable, predictable path to care.
- **Minimum implementation:** Membership/financing + verify steps
- **Optional later enhancement:** Coverage look-up

**What good output looks like:** The Insurance page grows a real financial path for the cost-anxious: an in-house membership plan detail (for the uninsured), financing options, a clear step-by-step "verify your benefits" flow, plain explainers of how benefits work (deductible, annual maximum, coinsurance), and — if the practice commits — a first-visit self-pay price. Money language is plain and whole-number; tables are readable and labeled. An uninsured patient sees a concrete way to afford care; an insured one learns how to check coverage. Every number is `[verify]`.

*Signals of quality:*
- Membership and financing details are present and `[verify]`; no invented terms/APR.
- A numbered "verify your benefits" flow and benefit-mechanics explainers (deductible/annual max/coinsurance) are present.
- Any first-visit price is `[verify]`; money is plain and whole-number.
- Tables are labeled with `<th scope>` and readable on mobile.
- A "we'll help you check" CTA is present.
- *(Mobile)* Money tables (deductible/annual-max/coinsurance, membership, financing) reflow with no horizontal scroll at 320px and stay readable without pinch-zoom.
- *(Mobile)* Any verify-benefits field is ≥16px with the right keyboard, and the 'we'll help you check' CTA is ≥44×44px.

*Signs it went wrong:* an invented membership price or APR; jargon-heavy benefit explanations; an inaccessible table; a number stated without `[verify]`. *(Mobile:)* a wide financing/benefits table forcing sideways scroll at 320px; a sub-16px verify field that zooms on focus; a CTA under 44px.

**Reference implementations (extract the principle — do not copy):**
- https://chicagoloopdentistry.com/ — a membership plan positioned for the uninsured. *Adapt:* a real uninsured path. *Avoid:* copying their prices.
- https://www.portlandmoderndentistry.com/ — a financial ladder (insurance + membership + 0% financing). *Adapt:* the layered options framing. *Avoid:* their specific terms.
- https://www.tiganidentistry.com/blog/common-questions-about-dental-insurance-coverage-explained — plain explainers of DPPO/DHMO, annual max, deductible. *Adapt:* the benefit-mechanics copy. *Avoid:* blog padding.
- https://www.dentalplans.com/learning/how-to-pay-for-dental-work-without-insurance/ — cash-cost ranges and savings-plan concepts. *Adapt:* the "how to pay without insurance" structure. *Avoid:* national numbers as ours — localize and `[verify]`.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Uninsured path + verify steps present: `curl -s http://localhost:3000/insurance-payment | rg -i "membership|financing|verify your benefits"`.
   - **Observe:** the membership/financing and verify blocks.
   - **Pass:** both present.
   - **Fail signature:** insurance-only content.
2. **Step 2 —** No invented numbers: `rg -n "\\$[0-9]|[0-9]+%\s*APR|[0-9]+% coinsurance|annual max" <insurance/membership template>` and confirm each is `[verify]`.
   - **Observe:** prices, APR, percentages.
   - **Pass:** every number `[verify]` or omitted.
   - **Fail signature:** an asserted membership price or APR.
3. **Step 3 —** Benefit mechanics explained: assert plain explainers for deductible, annual maximum, and coinsurance exist.
   - **Observe:** the explainer content.
   - **Pass:** all three explained in plain language.
   - **Fail signature:** undefined jargon.
4. **Step 4 —** Table semantics: assert data tables use `<th scope>` and captions/headings; readable at 360×640.
   - **Observe:** table markup and mobile layout.
   - **Pass:** headered, captioned, readable tables.
   - **Fail signature:** headerless or overflowing tables.
5. **Step 5 —** Readability [manual/tooled]: run a readability check on the money copy.
   - **Observe:** grade level and number style.
   - **Pass:** ≤8th grade; whole numbers.
   - **Fail signature:** dense finance jargon.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the Insurance route (GTH-1 axe on tables/CTA, GTH-5 contrast, GTH-3 HTML).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** low-contrast table text; unlabeled CTA.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/insurance-payment`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/insurance-payment'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/insurance-payment` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport and every money table stays contained (no page-level sideways scroll).
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Verify-benefits field + ≥16px (GTH-18).** If a verify-benefits field is present, assert its input mode and font-size: `const f=page.locator('input[name=member-id], input[name=carrier]').first(); const fs=await f.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)); expect(fs).toBeGreaterThanOrEqual(16);` and confirm a sensible `inputmode`/`autocomplete`.
   - **Observe:** the verify-benefits field font-size and input attributes (or absence of any field).
   - **Pass:** any verify field is ≥16px with an appropriate keyboard; the CTA/links are ≥44×44px.
   - **Fail signature:** a sub-16px verify field that zooms on focus, or a CTA under 44px.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/insurance-payment` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff expands the Insurance page's membership/financing and verify content and reuses the insurance module/FAQ; no real-time eligibility (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no real-time eligibility check.
4. No new dependency added — this item authorizes none (content-managed); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (membership terms, financing/APR, first-visit price).
6. Prior build items still pass — re-run Item 8 (the base Insurance page and its explainer remain correct after expansion).
7. Global Test Harness passes on the Insurance route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px (money tables reflow/contained), any verify-benefits field is ≥16px with the right keyboard, CTA/links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The Insurance page's membership/financing detail, verify-benefits flow, and benefit-mechanics explainers are implemented with labeled readable tables and plain money language, all numbers `[verify]`; all test steps pass with evidence; Item 8 still passes; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — money tables reflow with no horizontal scroll and any verify field is ≥16px with the right keyboard.

---
**Build Item 21: Hours badges + reschedule/reminder affordances**
- **Priority:** P1
- **Patient job addressed:** Fit care into a work life (H/J)
- **User story:** I can see early/late/weekend options and easily change an appointment.
- **Problem being solved:** Time-poor patients; no-shows.
- **Page or flow:** Home/Contact/Location
- **Scope:** Badge early/late/weekend hours [verify]; reschedule/cancel instructions; reminder opt-in [verify].
- **Required content:** Verified hours + policy.
- **Components:** Content blocks, form field (opt-in)
- **Design instructions:** Clear badges.
- **Interaction instructions:** Opt-in toggle; instructions.
- **Mobile behavior:** Hours (with early/late/weekend badges) are **above the fold on a 360px screen**; the reminder **opt-in toggle** is **≥44×44px** with an associated `<label>`, and the reschedule instructions are one tap away. Badges wrap and stay readable at 320px; no horizontal scroll; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Readable; labeled toggle.
- **Engineering instructions:** Reminder integration [verify vendor].
- **Dependencies:** Items 6, 7
- **Explicitly out of scope:** Full self-reschedule (P2)
- **Acceptance criteria:** Hours badged + reschedule instructions present.
- **Evidence supporting the item:** PG Repeated
- **Expected patient outcome:** Easier fit and fewer missed visits.
- **Minimum implementation:** Badges + instructions
- **Optional later enhancement:** Self-service reschedule

**What good output looks like:** A time-poor professional can see at a glance whether the practice offers early, evening, or weekend appointments — shown as clear hours badges — and can easily find how to reschedule or cancel, plus an optional appointment-reminder opt-in. Hours are prominent on Home, Contact, and Location. A patient fits care around work and is less likely to no-show. Hours, policy, and any reminder vendor are `[verify]`.

*Signals of quality:*
- Early/late/weekend availability is shown as clear badges (each `[verify]`).
- Reschedule/cancel instructions are present and findable.
- An optional reminder opt-in has a properly labeled toggle.
- Hours are prominent and readable on mobile.
- No hours or policy is asserted without `[verify]`.
- *(Mobile)* Hours + badges are visible before scrolling at 360×640; the reminder opt-in toggle is ≥44×44px with an associated label.
- *(Mobile)* Badges wrap and stay legible at 320px with no sideways scroll.

*Signs it went wrong:* invented hours; a reminder toggle with no label; reschedule instructions buried or absent; hours that disagree across pages. *(Mobile:)* hours pushed below the fold on a phone; a reminder toggle under 44px or with no associated label; badges overflowing sideways at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://book.firsthilldentalseattle.com/ — early hours surfaced as a differentiator. *Adapt:* badge genuine early/late hours. *Avoid:* copying their schedule.
- https://www.keydentalwestend.ca/ — Saturday hours highlighted. *Adapt:* weekend availability badge. *Avoid:* their branding.
- https://www.yelp.com/topic/seattle-dentist-recommendations — patients specifically prize 7am and weekend hours. *Adapt:* make those hours obvious. *Avoid:* overstating availability.
- https://www.certifyhealth.com/blog/challenges-faced-by-dentists-impacting-dental-patient-experience/ — no-shows (~24%) and reminders (vendor, bias-flagged). *Adapt:* an opt-in reminder affordance. *Avoid:* treating the stat as neutral demand evidence.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Hours badges present + `[verify]`: `curl -s http://localhost:3000/ | rg -i "early|evening|weekend|saturday|hours"` and confirm each badge is `[verify]`.
   - **Observe:** the hours badges.
   - **Pass:** badges present and `[verify]`.
   - **Fail signature:** asserted hours; no badges.
2. **Step 2 —** Hours consistency: extract the hours block from Home, Contact, and Location and compare.
   - **Observe:** the hours across pages.
   - **Pass:** identical (single source of truth).
   - **Fail signature:** contradictory hours across pages.
3. **Step 3 —** Reschedule/cancel instructions: `rg -i "reschedule|cancel|change your appointment" <contact/location templates>`.
   - **Observe:** the instructions.
   - **Pass:** present and findable.
   - **Fail signature:** absent.
4. **Step 4 —** Reminder opt-in labeled: assert the opt-in is a labeled toggle/checkbox with an associated `<label>`; the reminder vendor is `[verify]`.
   - **Observe:** the toggle and its label.
   - **Pass:** labeled, optional; vendor `[verify]`.
   - **Fail signature:** an unlabeled switch; a hard-coded vendor.
5. **Step 5 —** Prominent on mobile: at 360×640 confirm hours are visible without deep scrolling.
   - **Observe:** hours placement.
   - **Pass:** prominent and readable.
   - **Fail signature:** hours hidden far down.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the changed routes (GTH-1 axe on the toggle, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** unlabeled toggle flagged by axe.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/location-hours`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/location-hours'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/location-hours` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport with the hours + badges visible above the fold at 360×640.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Reminder opt-in toggle — size + label (GTH-14 / GTH-18).** Assert the toggle is ≥44×44px and has an associated label: `const t=page.getByRole('checkbox',{name:/reminder/i}); const b=await t.boundingBox(); expect(Math.min(b.width,b.height)).toBeGreaterThanOrEqual(44);` and confirm a `<label for>` or wrapping label.
   - **Observe:** the toggle bounding box and its label association.
   - **Pass:** the opt-in toggle is ≥44×44px with a programmatically associated label.
   - **Fail signature:** a sub-44px toggle or a toggle with no associated label.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/location-hours` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds hours badges, reschedule instructions, and a reminder opt-in to Home/Contact/Location; no self-service reschedule (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no full self-reschedule flow.
4. No new dependency added — a reminder vendor SDK is `[verify]` and must NOT be added here; flag any such addition in the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (hours, reschedule policy, reminder vendor).
6. Prior build items still pass — re-run Item 6 (request flow) and Item 7 (Location hours) for the shared hours data.
7. Global Test Harness passes on the changed routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, hours + badges above the fold at 360×640, the reminder opt-in toggle ≥44×44px with a label, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** Hours badges, reschedule/cancel instructions, and a labeled optional reminder opt-in are implemented and consistent across pages, all facts `[verify]` and no reminder SDK added; all test steps pass with evidence; Items 6 and 7 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — hours+badges above the fold, a ≥44px labeled reminder toggle, and no horizontal scroll.

---
**Build Item 22: Languages-spoken + non-discrimination signals**
- **Priority:** P1
- **Patient job addressed:** Inclusion/access (LEP) (all)
- **User story:** I can tell whether someone here speaks my language and that I'm welcome.
- **Problem being solved:** LEP access barriers in a diverse Downtown.
- **Page or flow:** Footer + Contact + About
- **Scope:** "Languages spoken" [verify] + non-discrimination note; plain-language pass.
- **Required content:** Languages [verify].
- **Components:** Footer, content block
- **Design instructions:** Simple, honest signal.
- **Interaction instructions:** n/a
- **Mobile behavior:** The languages-spoken and non-discrimination signals are **visible in the stacked footer at 360×640** (not dropped or truncated), `<html lang>` is set, and the plain-language copy (≤8th grade) is readable without pinch-zoom. Footer links are **≥44×44px**; no horizontal scroll at 320px; content reflows at 200%/320px (GTH-20).
- **Accessibility requirements:** Translate-friendly semantic markup; plain language.
- **Engineering instructions:** `lang` attributes; clean structure for machine translation.
- **Dependencies:** Item 13
- **Explicitly out of scope:** Full multilingual build (P2)
- **Acceptance criteria:** Languages-spoken + non-discrimination present; content ≤8th grade.
- **Evidence supporting the item:** GOV/CG/PR Common
- **Expected patient outcome:** More patients feel served.
- **Minimum implementation:** Signal + plain language
- **Optional later enhancement:** Translated pages

**What good output looks like:** A patient can tell whether someone here speaks their language and that they're welcome regardless of background: a plain "Languages spoken" signal (footer + Contact + About) and a short non-discrimination note, with the whole site written in plain, translate-friendly language. Markup uses correct `lang` attributes and clean structure so machine translation works. A limited-English patient feels served rather than lost. Languages and interpreter support are `[verify]`.

*Signals of quality:*
- A "Languages spoken" signal appears in the footer and on Contact/About; it is `[verify]`.
- A non-discrimination / language-access note is present.
- The document has a correct `lang` attribute; any non-English snippet is marked with its own `lang`.
- Copy passes a ≤8th-grade plain-language check and is translate-friendly (semantic, no text-in-image).
- No English-only assumptions in the copy.
- *(Mobile)* At 360×640 the languages-spoken and non-discrimination note are present in the stacked footer with `<html lang>` set.
- *(Mobile)* Footer links are ≥44×44px and the plain-language copy reflows at 200%/320px with no sideways scroll.

*Signs it went wrong:* a languages claim with no `[verify]`; missing `lang` attribute; text baked into images; jargon that defeats translation; no non-discrimination note. *(Mobile:)* the inclusion signals dropped or truncated on a phone; footer links under 44px; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://www.ismilefamily.com/ — "Spanish speaking services at all locations," the strongest observed language signal. *Adapt:* a clear, honest languages signal. *Avoid:* claiming languages the practice doesn't have.
- https://www.portlandmoderndentistry.com/ — languages-spoken + non-discrimination in the footer. *Adapt:* the compliance-footer placement. *Avoid:* copying their exact wording.
- https://www.dentistsofqueenanne.com/ — an explicit "LANGUAGE SPOKEN" label. *Adapt:* the labeled signal. *Avoid:* DSO chrome.
- https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html — plain-language standards that aid comprehension and translation. *Adapt:* short sentences, whole numbers, semantic markup. *Avoid:* dense jargon.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Languages signal present + `[verify]`: `curl -s http://localhost:3000/ | rg -i "languages spoken|se habla|interpreter"` and confirm the footer/Contact/About carry it as `[verify]`.
   - **Observe:** the languages signal.
   - **Pass:** present in footer + Contact/About, `[verify]`.
   - **Fail signature:** absent or asserted without `[verify]`.
2. **Step 2 —** Non-discrimination note: `rg -i "non-discrimination|does not discriminate|language assistance"`.
   - **Observe:** the note.
   - **Pass:** present.
   - **Fail signature:** absent.
3. **Step 3 —** `lang` attributes: assert `<html lang="en">` and that any non-English phrase carries its own `lang`.
   - **Observe:** the lang attributes.
   - **Pass:** document and foreign snippets correctly marked.
   - **Fail signature:** missing/incorrect `lang`.
4. **Step 4 —** Translate-friendly: `rg -in "background-image:.*text|<img[^>]*alt=\"\"" <templates>` heuristic and confirm meaningful text is not baked into images.
   - **Observe:** text-in-image usage.
   - **Pass:** meaningful text is real text.
   - **Fail signature:** signage rendered as images with empty alt.
5. **Step 5 —** Plain-language pass: run a readability check on key pages.
   - **Observe:** grade level.
   - **Pass:** ≤8th grade sitewide on core pages.
   - **Fail signature:** copy above grade 10.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on Home + Contact (GTH-1 axe including `html-has-lang`, GTH-3 HTML).
   - **Observe:** harness output.
   - **Pass:** clean; `html-has-lang` passes.
   - **Fail signature:** axe `html-has-lang` or `valid-lang` violation.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport with the languages + non-discrimination signals visible in the stacked footer.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Reflow & text resize at 320px / 200% (GTH-20).** On `/` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds the languages signal and non-discrimination note to footer/Contact/About and applies a plain-language pass; no full multilingual build (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no translated page set.
4. No new dependency added — this item authorizes none (semantic markup, `lang` attrs); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (languages spoken, interpreter arrangements).
6. Prior build items still pass — re-run Item 2 (footer) and Item 13 (accessibility baseline, including `lang`).
7. Global Test Harness passes on the changed routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, languages-spoken + non-discrimination signals visible in the stacked footer, `<html lang>` set, footer links ≥44×44px, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** A `[verify]` languages-spoken signal and a non-discrimination note are implemented in the footer/Contact/About with correct `lang` attributes and translate-friendly plain-language copy; all test steps pass with evidence; Items 2 and 13 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — inclusion signals visible in the stacked footer, `<html lang>` set, and no horizontal scroll.

---
**Build Item 23: Cosmetic overview with "consult is fact-finding" framing**
- **Priority:** P1/P2
- **Patient job addressed:** Explore electively without pressure (K)
- **User story:** I can explore cosmetic options and book a no-pressure consult.
- **Problem being solved:** Hard-sell fear.
- **Page or flow:** Services (cosmetic overview)
- **Scope:** Neutral overview (whitening/aligners/veneers), process/commitment/maintenance, "a consult is fact-finding, not a commitment", health-first note.
- **Required content:** Offerings [verify].
- **Components:** Service card, appointment CTA
- **Design instructions:** Calm, non-salesy.
- **Interaction instructions:** "Book a consultation" CTA.
- **Mobile behavior:** Scannable single column at 360×640; the **'Book a consultation' CTA is ≥44×44px in the thumb zone**; no pressure banners or countdowns crowd the screen; images are deferred. Content reflows at 200%/320px (GTH-20); no horizontal scroll at 320px.
- **Accessibility requirements:** Alt describes clinical purpose (any before/after later).
- **Engineering instructions:** Reuse service template.
- **Dependencies:** Item 15
- **Explicitly out of scope:** Before/after galleries (P2, needs consent + a11y)
- **Acceptance criteria:** Neutral overview + consult framing present; no pressure language.
- **Evidence supporting the item:** PR Common
- **Expected patient outcome:** Low-pressure exploration.
- **Minimum implementation:** Overview + consult CTA
- **Optional later enhancement:** Consented before/after

**What good output looks like:** A calm, neutral cosmetic overview lets a patient explore whitening, clear aligners, and veneers — with plain notes on process, commitment, and maintenance — framed by one honest idea: *a consultation is fact-finding, not a commitment*, and health comes first. No hard sell, no false urgency, no aspirational-only gloss. Someone curious about their smile can book a no-pressure consult without feeling judged or pushed. Offerings are `[verify]`.

*Signals of quality:*
- A neutral overview of the cosmetic options with process/commitment/maintenance notes.
- Explicit "a consult is fact-finding, not a commitment" and a health-first note.
- A "Book a consultation" CTA reusing the service template.
- No pressure/urgency language; alt text describes clinical purpose.
- Offerings are `[verify]`; no before/after galleries (deferred pending consent + a11y).
- *(Mobile)* The consult CTA is thumb-reachable and ≥44×44px; no pressure/urgency banners appear at any width.
- *(Mobile)* Content reflows at 200%/320px with no sideways scroll and images are deferred to protect the mobile budget.

*Signs it went wrong:* urgency banners ("limited time," "book today"); aspirational-only copy with no health grounding; before/after images added prematurely; offerings asserted without `[verify]`. *(Mobile:)* a pushy sticky promo banner crowding the thumb zone; a consult CTA under 44px; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://www.safeandhealthylife.com/complete-guide-cosmetic-dentistry-smile-makeover/ — health-first framing; a consult is fact-finding. *Adapt:* that exact framing. *Avoid:* aspirational-only tone.
- https://arasudentalcare.com/blog/cosmetic-dentistry-consultation/ — a low-pressure consult described as goals/exam/options/Q&A. *Adapt:* the calm consult expectations. *Avoid:* sales language.
- https://www.gentrydentistry.com/ — calm, premium, non-salesy tone. *Adapt:* restrained cosmetic presentation. *Avoid:* copying their copy.
- Cosmetic-led salesy sites (Section 15C, anti-patterns) — *Adapt:* nothing. *Avoid:* the hard-sell, health-detached framing they model.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Neutral overview present: `curl -s http://localhost:3000/services/cosmetic | rg -i "whitening|aligners|veneers"` with process/commitment/maintenance notes.
   - **Observe:** the option overview.
   - **Pass:** neutral overview with the three note types.
   - **Fail signature:** a sales pitch with no process/maintenance detail.
2. **Step 2 —** Consult framing present: `rg -i "fact-finding|not a commitment|no pressure|health(-| )first"`.
   - **Observe:** the framing lines.
   - **Pass:** consult-is-fact-finding and health-first both present.
   - **Fail signature:** missing framing.
3. **Step 3 —** No pressure language: `rg -in "limited time|act now|today only|don'?t wait|hurry|last chance|special offer" <cosmetic template>`.
   - **Observe:** urgency phrases.
   - **Pass:** none.
   - **Fail signature:** any urgency/pressure copy.
4. **Step 4 —** No premature before/after: `rg -in "before(-| )after|before-and-after" <cosmetic template>` and confirm no such gallery is present.
   - **Observe:** gallery presence.
   - **Pass:** none (deferred to P2 with consent + a11y).
   - **Fail signature:** a before/after gallery shipped here.
5. **Step 5 —** Alt describes purpose + `[verify]` offerings: assert image alt describes clinical purpose and offerings are `[verify]`.
   - **Observe:** alt text and offering claims.
   - **Pass:** purposeful alt; offerings `[verify]`.
   - **Fail signature:** decorative-only alt; asserted offerings.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the cosmetic route (GTH-1 axe, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** heading-order or alt violations.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/services/cosmetic`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/services/cosmetic'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/services/cosmetic` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Thumb-zone primary CTA (GTH-15).** At 390×844 on `/services/cosmetic` measure the primary CTA: `const box = await page.getByRole('link',{name:/consult|book/i}).first().boundingBox(); const vh = page.viewportSize().height; expect(box.y + box.height/2).toBeGreaterThan(vh*0.5);`
   - **Observe:** the CTA vertical centre versus viewport height and whether any pressure banner crowds it.
   - **Pass:** the primary CTA sits in the lower/thumb-reachable band (or a bottom sticky) with no pressure banner overlapping it.
   - **Fail signature:** the CTA pinned to the top out of one-handed reach, or a promo banner crowding the thumb zone.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/services/cosmetic` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds a cosmetic overview reusing the service template; no before/after galleries (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no before/after galleries (they need consent + a11y).
4. No new dependency added — this item authorizes none (reuse of service template); check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (which cosmetic services are offered).
6. Prior build items still pass — re-run Item 15 (the shared service template) and Item 6 ("Book a consultation" reaches the request flow).
7. Global Test Harness passes on the cosmetic route.
8. Console free of errors and warnings on the changed route.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the 'Book a consultation' CTA is ≥44×44px in the thumb zone, no pressure banners, images deferred, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** The cosmetic overview is implemented with neutral options, consult-is-fact-finding and health-first framing, no pressure language, no premature before/after, purposeful alt, and `[verify]` offerings; all test steps pass with evidence; Items 15 and 6 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — a thumb-zone ≥44px consult CTA, no pressure banners, and no horizontal scroll.

---
**Build Item 24: Aftercare & ongoing-care content**
- **Priority:** P1/P2
- **Patient job addressed:** Manage care after treatment (J)
- **User story:** After a procedure I know how to care for it and when to call.
- **Problem being solved:** Missing post-visit guidance.
- **Page or flow:** Service pages + a short aftercare/ongoing-care area
- **Scope:** Aftercare notes, "call us if…", re-book prompt, records/update-info instructions.
- **Required content:** Aftercare content [verify clinical review].
- **Components:** Content blocks, appointment CTA
- **Design instructions:** Reassuring, plain.
- **Interaction instructions:** Re-book CTA.
- **Mobile behavior:** Aftercare and the 'call us if…' list are **readable at 320px without pinch-zoom** and reflow at 200% (GTH-20); the **re-book CTA sits in the thumb zone** with a `tel:` option reachable so a worried patient can call in one tap. No horizontal scroll at 320px; targets ≥44×44px.
- **Accessibility requirements:** Plain language.
- **Engineering instructions:** Attach to relevant service pages.
- **Dependencies:** Item 15
- **Explicitly out of scope:** Full patient portal (P2)
- **Acceptance criteria:** Aftercare + "when to call" + re-book present.
- **Evidence supporting the item:** CG/PR Common
- **Expected patient outcome:** Safer recovery, easier return.
- **Minimum implementation:** Aftercare + re-book
- **Optional later enhancement:** Portal

**What good output looks like:** After a procedure, a patient finds reassuring, plain aftercare guidance attached to the relevant service pages — how to care for the area, a clear "call us if…" list of warning signs, a prompt to re-book or update their records, and how to reach the practice. It's non-diagnostic and clinically reviewed. Someone recovering knows what's normal, when to call, and how to come back. Aftercare content is `[verify]` pending clinical review.

*Signals of quality:*
- Aftercare notes are attached to relevant service pages.
- A "call us if…" warning-signs list is present and ends in an action (call), never a diagnosis.
- A re-book CTA (reusing the appointment CTA) and records/update-info instructions are present.
- Content is plain-language and `[verify]` pending clinical review.
- Nothing self-diagnoses.
- *(Mobile)* The 'call us if…' list is legible at 320px and the re-book CTA is thumb-reachable with a `tel:` option one tap away.
- *(Mobile)* Content reflows at 200%/320px with no sideways scroll.

*Signs it went wrong:* generic advice with no "when to call"; diagnostic phrasing; a re-book CTA that dead-ends; aftercare published without clinical review. *(Mobile:)* aftercare steps clipped or needing pinch-zoom; a re-book CTA out of thumb reach; no phone option for a worried patient; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do — clinically grounded "what to do / when it's urgent" guidance. *Adapt:* the action-ending, sourced approach. *Avoid:* going beyond the source into diagnosis.
- https://www.myspecialtydentist.com/specialties/oral-surgery/guides/dental-emergency-guide — post-procedure/urgent guidance structure. *Adapt:* the "when to call" list. *Avoid:* stating specifics as ours without clinical review.
- https://www.prospersmilestudio.com/broken-tooth-is-it-an-emergency-or-not/ — a plain what-to-do explainer ending in an action. *Adapt:* action-ending aftercare. *Avoid:* implying self-diagnosis.
- The travel/confirmation prep pattern (Section 16) — *Adapt:* a calm "here's what happens next / when to call / re-book" flow. *Avoid:* overloading the patient with detail.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Aftercare attached to service pages: assert aftercare + "call us if…" blocks render on at least the relevant service routes.
   - **Observe:** the aftercare blocks.
   - **Pass:** present on relevant service pages.
   - **Fail signature:** an orphan aftercare page with no service linkage.
2. **Step 2 —** "When to call" ends in an action: `rg -in "call (us|the office|your dentist)|contact us" <aftercare content>` present; `rg -in "you (have|probably have)|diagnos" <aftercare content>` returns nothing.
   - **Observe:** action vs. diagnostic phrasing.
   - **Pass:** warning signs end in "call us," not a diagnosis.
   - **Fail signature:** "this means you have…" phrasing.
3. **Step 3 —** Re-book CTA reaches request flow: click the re-book CTA and assert it lands on the request flow (Item 6).
   - **Observe:** the CTA destination.
   - **Pass:** re-book reaches the request flow.
   - **Fail signature:** a dead re-book button.
4. **Step 4 —** Records/update-info instructions present: `rg -i "update your (info|records)|transfer records|patient records"`.
   - **Observe:** the instructions.
   - **Pass:** present.
   - **Fail signature:** absent.
5. **Step 5 —** Clinical-review `[verify]`: assert aftercare content carries a `[verify] clinical review` marker until sign-off.
   - **Observe:** the marker.
   - **Pass:** aftercare is `[verify]` pending clinical review.
   - **Fail signature:** unreviewed clinical advice published as fact.
6. **Step 6 —** Run the **Global Test Harness** (Section 25c) on the affected service routes (GTH-1 axe, GTH-3 HTML, GTH-9 console).
   - **Observe:** harness output.
   - **Pass:** clean.
   - **Fail signature:** heading/list violations.
7. **Step 7 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/aftercare`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/aftercare'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/aftercare` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).
8. **Step 8 — Thumb-zone re-book + `tel:` (GTH-15 / GTH-17).** At 390×844 measure the re-book CTA position and assert a `tel:` option: `const box=await page.getByRole('link',{name:/book|re-?book|schedule/i}).first().boundingBox(); const vh=page.viewportSize().height; expect(box.y+box.height/2).toBeGreaterThan(vh*0.5); await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();`
   - **Observe:** the re-book CTA vertical position and the presence of a `tel:` option.
   - **Pass:** the re-book CTA is in the thumb-reachable band and a `tel:` call option is present.
   - **Fail signature:** a re-book CTA out of thumb reach, or no phone option for a worried patient.
9. **Step 9 — Reflow & text resize at 320px / 200% (GTH-20).** On `/aftercare` set 320×568, then `await page.addStyleTag({content:'html{font-size:200%}'})`.
   - **Observe:** whether all content and controls remain present, unclipped, and free of two-dimensional scrolling.
   - **Pass:** no content or function lost at 320px or 200% (WCAG 1.4.10 / 1.4.4); no overlap or clipping.
   - **Fail signature:** content cut off, overlapping text, or a control pushed off-screen; the page needs pinch-zoom to read.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff attaches aftercare/ongoing-care blocks to service pages and adds a re-book CTA; no patient portal (P2). Flag anything else.
3. Nothing from "Explicitly out of scope" was built — no patient portal.
4. No new dependency added — this item authorizes none; check the lockfile diff.
5. No unverified fact published — output the `[verify]` inventory (aftercare content pending clinical review).
6. Prior build items still pass — re-run Item 15 (service pages) and Item 6 (re-book CTA target).
7. Global Test Harness passes on the affected service routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: no horizontal scroll at 320px, the 'call us if…' list readable without pinch-zoom, a thumb-zone re-book CTA with a `tel:` option, and the throttled mobile Lighthouse budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) is met.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** Aftercare and ongoing-care content is implemented on relevant service pages with an action-ending "call us if…" list, a working re-book CTA, records/update instructions, and a `[verify]` clinical-review gate, all non-diagnostic; all test steps pass with evidence; Items 15 and 6 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — legible aftercare at 320px, a thumb-zone re-book CTA with a `tel:` option, and no horizontal scroll.

---
**Build Item 25: Performance, SEO & local-search foundation**
- **Priority:** P1
- **Patient job addressed:** Be found + fast (0/1)
- **User story:** I can find the practice by neighborhood/service and the site loads fast on my phone.
- **Problem being solved:** Slow/undiscoverable sites lose patients before Stage 1.
- **Page or flow:** Global
- **Scope:** Core Web Vitals budget, image optimization, semantic headings, local business schema, neighborhood/service page titles, Google Business Profile alignment [verify].
- **Required content:** Verified NAP (name/address/phone).
- **Components:** All
- **Design instructions:** Lightweight assets.
- **Interaction instructions:** n/a
- **Mobile behavior:** Fast is the point: the site meets the **throttled-mobile budget** (Moto-G-class, 4× CPU, slow-4G) — **LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1, Perf ≥90** (GTH-19) — on mid-tier phones, because a patient in pain on a poor connection cannot wait. Images are responsive/lazy-loaded, fonts subset, and JS minimal; no horizontal scroll at 320px; the NAP and local-business schema render identically on mobile.
- **Accessibility requirements:** Semantics aid SEO + a11y.
- **Engineering instructions:** LocalBusiness/Dentist schema; sitemap; no render-blocking bloat.
- **Dependencies:** Items 1–12
- **Explicitly out of scope:** Paid ads, blog content strategy (P2)
- **Acceptance criteria:** CWV within budget on mobile; local schema valid; NAP consistent.
- **Evidence supporting the item:** DP Common
- **Expected patient outcome:** Found faster; fewer bounces.
- **Minimum implementation:** CWV + schema + titles
- **Optional later enhancement:** Content/SEO program

**What good output looks like:** The site loads fast on a mid-tier phone and is findable by neighborhood and service. Core Web Vitals sit within budget, images are optimized, headings are semantic, valid LocalBusiness/Dentist structured data describes the practice, page titles target neighborhood/service queries, and the site's name/address/phone match the Google Business Profile. A patient searching "family dentist [neighborhood]" finds the practice and it opens quickly without layout jank. NAP and GBP alignment are `[verify]`.

*Signals of quality:*
- Core Web Vitals (LCP, CLS, TBT/INP) are within the Section 25c budget on mobile.
- Valid `LocalBusiness`/`Dentist` JSON-LD is present and passes structured-data validation.
- Titles/headings target neighborhood + service; a sitemap exists; no render-blocking bloat.
- Images are responsive/optimized; layout shift is minimal.
- NAP is consistent site-wide and `[verify]` against the GBP.
- *(Mobile)* The throttled-mobile Lighthouse run meets LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1, Perf ≥90 on the key routes (GTH-19).
- *(Mobile)* Images are deferred and the transferred weight stays within budget on slow-4G; no route scrolls sideways at 320px.

*Signs it went wrong:* an unoptimized hero blowing LCP; invalid or missing schema; inconsistent NAP; a heavy third-party script tanking performance. *(Mobile:)* an unoptimized hero or blocking script blowing LCP/TBT on throttled mobile; layout shift (CLS) from late images/fonts; sideways scroll at 320px.

**Reference implementations (extract the principle — do not copy):**
- https://duck.design/healthcare-website-design/ — mobile-first (>60% mobile), lightweight, ≤3-click nav. *Adapt:* the performance-first, mobile posture. *Avoid:* treating it as a visual template.
- https://www.designyourway.net/blog/healthcare-website-design-trust/ — credibility judged in ~50ms; speed and clarity build trust. *Adapt:* fast first paint as a trust lever. *Avoid:* decorative weight.
- https://delmain.co/blog/best-dental-websites/ — cross-checked conventions of strong dental sites (speed, clear titles). *Adapt:* the discoverability conventions. *Avoid:* copying layouts.
- The local-search/schema mechanism itself: *No strong exemplar observed in the research sample* — implement valid LocalBusiness/Dentist JSON-LD to spec, independent of any cited site.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** CWV budget: run **GTH-2** Lighthouse mobile on Home + two key routes.
   - **Observe:** LCP, CLS, TBT, Performance score.
   - **Pass:** all within the Section 25c budget (LCP ≤2.5s, CLS ≤0.1).
   - **Fail signature:** LCP/CLS over budget on any route.
2. **Step 2 —** Valid schema: extract JSON-LD and validate `LocalBusiness`/`Dentist` (e.g. schema validator / `structured-data-testing-tool`).
   - **Observe:** the parsed structured data.
   - **Pass:** valid schema with required fields; NAP present.
   - **Fail signature:** malformed JSON-LD or missing type.
3. **Step 3 —** NAP consistency: `rg -n "<phone>|<address>" <templates>` (or the NAP partial) and confirm one consistent, `[verify]` NAP source.
   - **Observe:** name/address/phone across the site.
   - **Pass:** consistent and `[verify]` against the GBP.
   - **Fail signature:** divergent phone/address strings.
4. **Step 4 —** Titles + sitemap: assert neighborhood/service-targeted `<title>`s and that `/sitemap.xml` returns 200 and lists P0 routes.
   - **Observe:** titles and sitemap.
   - **Pass:** targeted titles; valid sitemap.
   - **Fail signature:** generic titles; missing sitemap.
5. **Step 5 —** No render-blocking bloat: check for large blocking scripts/fonts in the Lighthouse report.
   - **Observe:** render-blocking resources.
   - **Pass:** none material; assets optimized.
   - **Fail signature:** a heavy blocking bundle.
6. **Step 6 —** CLS/regression (GTH-8, GTH-11): confirm CLS budget and re-run prior route checks after optimization.
   - **Observe:** CLS and prior-item checks.
   - **Pass:** CLS ≤0.1; no regressions.
   - **Fail signature:** layout shift from lazy images; a broken prior route.
7. **Step 7 — Throttled-mobile Lighthouse budget (GTH-19).** Run the mobile preset (Moto-G-class, 4× CPU, slow-4G) on `/` and the key routes: `npx lighthouse http://localhost:3000/ --form-factor=mobile --throttling-method=simulate --preset=perf --quiet`.
   - **Observe:** the LCP, TBT, CLS, Speed Index, Performance score, and transferred weight per route.
   - **Pass:** Performance ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1, and weight within budget on every key route.
   - **Fail signature:** an unoptimized asset or blocking script pushing LCP/TBT over budget on throttled mobile.
8. **Step 8 — Mobile matrix + no horizontal scroll (GTH-12 / GTH-13).** Loop the Mobile Suite viewports over `/`: `for (const vp of MOBILE) { await page.setViewportSize(vp); await page.goto('/'); const of = await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth); expect(of).toBeLessThanOrEqual(0); }`
   - **Observe:** the overflow value on `/` at 320×568, 360×640, 390×844, 430×932.
   - **Pass:** `scrollWidth ≤ clientWidth` at every viewport.
   - **Fail signature:** any width scrolls sideways at 320px (a fixed-width element, an unwrapped table, or an oversized image).

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step.
2. Scope discipline — the diff adds performance/SEO/schema/sitemap config and image optimization across pages; no paid-ads or blog strategy (P2), no visual redesign. Flag any content/feature change.
3. Nothing from "Explicitly out of scope" was built — no ad campaigns, no blog content program.
4. No new dependency added except a build-time optimizer/schema helper if strictly needed; check the lockfile diff and justify.
5. No unverified fact published — output the `[verify]` inventory (NAP, GBP alignment).
6. Prior build items still pass — re-run Items 3 (hero LCP) and 13 (semantic structure still valid after optimization).
7. Global Test Harness passes on the changed routes.
8. Console free of errors and warnings on the changed routes.
9. **Mobile gate** — verified at 320×568, 360×640, 390×844, 430×932: the throttled-mobile budget (GTH-19) holds on the key routes (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1), images are deferred within the weight budget, the NAP/schema render identically on mobile, and there is no horizontal scroll at 320px.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed.

**Definition of done:** Core Web Vitals are within budget, valid LocalBusiness/Dentist schema and a sitemap are in place, titles target neighborhood/service, and NAP is consistent and `[verify]`; all test steps pass with evidence; Items 3 and 13 still pass; the `[verify]` inventory is recorded; and the verdict is recorded. Mobile: the 320/360/390/430 matrix is verified — the throttled-mobile budget (LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1, Perf ≥90) holds with no horizontal scroll.

---
**Build Item 26: Pre-launch quality & content-verification gate**
- **Priority:** P0 (final gate)
- **Patient job addressed:** Accurate, safe, complete experience (all)
- **User story:** As any patient, everything works, is accessible, and is true.
- **Problem being solved:** Shipping unverified or broken experiences.
- **Page or flow:** Whole site
- **Scope:** Run the modification checklist; verify all [verify] items; test forms' states; keyboard/AT pass; mobile pass; confirm emergency + arrival + insurance content.
- **Required content:** All verified.
- **Components:** All
- **Design instructions:** n/a
- **Interaction instructions:** Test every state (loading/success/error/recovery).
- **Mobile behavior:** The launch gate is a **whole-site mobile pass**: the **Mobile Suite (GTH-12–GTH-22) is green on all P0 routes**, and the **3 core journeys (book, find/arrive, emergency) complete at 320×568, 360×640, 390×844, and 430×932** one-handed, plus a landscape check. No horizontal scroll at 320px anywhere; the `[verify]` sweep is zero; the throttled-mobile budget holds site-wide.
- **Accessibility requirements:** WCAG 2.2 AA on P0 confirmed.
- **Engineering instructions:** Launch blocked on any failed acceptance criterion or remaining placeholder.
- **Dependencies:** Items 1–25
- **Explicitly out of scope:** Post-launch optimization
- **Acceptance criteria:** Checklist 100% pass; zero live [verify]; core journeys complete on mobile + AT.
- **Evidence supporting the item:** brief mandate
- **Expected patient outcome:** A trustworthy, working first release.
- **Minimum implementation:** Full gate pass
- **Optional later enhancement:** Ongoing QA cadence

**What good output looks like:** The final gate proves the whole site is accurate, accessible, working, and complete before launch. The modification checklist (Section 26) passes 100%; zero `[verify]` placeholders remain live; every form state (loading/success/error/recovery) works; P0 pages pass keyboard and screen-reader task tests; the site completes core journeys on mobile at 360×640 and 390×844; and emergency, arrival, and insurance content are confirmed present and correct. Nothing ships unverified or broken. This item is a gate, not a feature: it either lets the release through or blocks it with a specific list.

*Signals of quality:*
- The Section 26 checklist passes 100% with recorded evidence.
- Zero live `[verify]` placeholders anywhere in shipped output.
- Core journeys (request an appointment, find location/arrival, reach emergency) complete end-to-end on mobile and with assistive tech.
- All form states are exercised and pass.
- Lighthouse budgets and axe pass on all P0 routes; console is clean.
- *(Mobile)* All three core journeys complete one-handed at 320/360/390/430 (+ landscape) with the Mobile Suite green on every P0 route.
- *(Mobile)* No P0 route scrolls sideways at 320px and the throttled-mobile budget holds site-wide.

*Signs it went wrong:* a remaining `[verify]`; a failing acceptance criterion waved through; a journey that breaks at 360px; a form state left untested. *(Mobile:)* a core journey that breaks at 320px or in landscape; a P0 route with sideways scroll or a sub-44px target; the mobile budget missed on any P0 route.

**Reference implementations (extract the principle — do not copy):**
- https://integritydentalboston.com/ — a completeness benchmark for arrival + insurance + honesty to check the built site against. *Adapt:* use it as a "did we cover arrival/cost honestly?" yardstick. *Avoid:* copying content.
- https://blog.prosites.com/making-your-dental-website-accessible/ — the WCAG 2.2 AA / ADA bar the gate must confirm. *Adapt:* the conformance target. *Avoid:* plugin-only "compliance."
- https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html — the plain-language bar for the final content review. *Adapt:* the readability check. *Avoid:* jargon slipping through.
- The launch-gate mechanism itself: *No strong exemplar observed in the research sample* — implement it as an executable pre-launch harness across all prior items.

**Test criteria (LLM-executable, PR-verifiable):**
1. **Step 1 —** Checklist 100%: execute each Section 26 row's single most-important check (its Test column) and tally.
   - **Observe:** per-row pass/fail.
   - **Pass:** every row passes.
   - **Fail signature:** any row failing its Test check.
2. **Step 2 —** Zero live `[verify]`: `rg -n "\[verify\]" <built output / all rendered routes>`.
   - **Observe:** placeholder matches.
   - **Pass:** zero.
   - **Fail signature:** any `[verify]` in production.
3. **Step 3 —** Core journeys end-to-end: Playwright completes (a) request an appointment, (b) find location + get directions/call, (c) reach the emergency call — at 360×640 and 390×844.
   - **Observe:** each journey's completion.
   - **Pass:** all three complete on both viewports.
   - **Fail signature:** a journey that breaks or dead-ends on mobile.
4. **Step 4 —** All form states: exercise loading, success, error, and recovery on the request and any verify form.
   - **Observe:** each state.
   - **Pass:** all states render and recover correctly.
   - **Fail signature:** a silent failure or missing recovery.
5. **Step 5 —** Keyboard/AT on P0: run **GTH-4** and **GTH-1** across all P0 routes.
   - **Observe:** keyboard completion and axe output.
   - **Pass:** every P0 primary task completes by keyboard; 0 serious/critical axe issues.
   - **Fail signature:** a trap; an axe violation.
6. **Step 6 —** Budgets + console: run **GTH-2** and **GTH-9** on all P0 routes.
   - **Observe:** Lighthouse budgets and console.
   - **Pass:** budgets met; console clean.
   - **Fail signature:** an over-budget route; a console error.
7. **Step 7 —** Full regression (GTH-11): re-run the test criteria of Items 1–25.
   - **Observe:** prior-item results.
   - **Pass:** all prior items still pass.
   - **Fail signature:** any regressed item.
8. **Step 8 — Whole-site Mobile Suite (GTH-12–GTH-22).** Run the full Mobile Suite on every P0 route and record a per-route, per-viewport results table.
   - **Observe:** the Mobile Suite results per P0 route (no-h-scroll, targets, thumb-zone, safe-area, tel:/maps, input modes, budget, reflow, orientation, reduced motion).
   - **Pass:** the Mobile Suite is green on every P0 route.
   - **Fail signature:** any P0 route failing any Mobile Suite check.
9. **Step 9 — Three core journeys across the matrix.** Complete book, find/arrive, and emergency one-handed at 320×568, 360×640, 390×844, 430×932, and once in landscape 844×390.
   - **Observe:** whether each journey completes without regripping, pinch-zoom, or sideways scroll at each viewport.
   - **Pass:** all three journeys complete one-handed at every viewport with the Mobile Suite green.
   - **Fail signature:** a journey that breaks, needs pinch-zoom, or scrolls sideways at any viewport.

**PR completion gate:**
1. All test steps pass — produce the pass/fail table with observed evidence per step (this is the master table for the release).
2. Scope discipline — this item changes no features; it only gates. Any code change here must be a targeted fix for a failing check, logged with the failing item it repairs. Flag any speculative change.
3. Nothing from "Explicitly out of scope" was built — no post-launch optimization work folded in.
4. No new dependency added except a dev-only test/CI runner if strictly needed; check the lockfile diff.
5. No unverified fact published — this item's output IS the confirmed-empty `[verify]` inventory across the whole site.
6. Prior build items still pass — Items 1–25 all pass their regression checks; name any that failed and were fixed.
7. Global Test Harness passes on every changed and P0 route.
8. Console free of errors and warnings across all P0 routes.
9. **Mobile gate (launch decision)** — the Mobile Suite (GTH-12–GTH-22) is green on **all P0 routes**, the 3 core journeys (book, find/arrive, emergency) complete one-handed at 320×568, 360×640, 390×844, 430×932 (+ landscape), no horizontal scroll at 320px anywhere, and the throttled-mobile budget (Perf ≥90, LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1) holds site-wide. Any mobile failure blocks launch.
10. **Verdict:** READY TO MERGE / CHANGES REQUIRED, with specific blocking failures listed — this is the launch decision.

**Definition of done:** The pre-launch gate is executed across the whole site: the Section 26 checklist passes 100%, zero `[verify]` remain, all form states and core mobile/AT journeys pass, budgets and axe pass on all P0 routes, and Items 1–25 pass regression; the master pass/fail table and empty `[verify]` inventory are recorded; and the final launch verdict is recorded. Mobile: the whole-site launch gate is verified — the Mobile Suite is green on all P0 routes and the 3 core journeys complete one-handed at 320/360/390/430 (+ landscape).

## 25. How to run each build item with an LLM

Every build item in Section 24 is written to form a **closeable loop**: an LLM coding agent can implement it, run its test criteria against a real pull request, and reach an unambiguous merge decision. This section gives the reusable machinery for doing that — two copy-paste prompt templates, one global test harness the items reference by name, and a sequencing rule. Fill the slots from any Section 24 item; do not paraphrase the item's constraints away.

**Core rule for the whole section:** an LLM must **never** declare a build item done on the basis of "I implemented it." Done is declared **only** on executed test evidence — a per-step pass/fail table with observed artifacts. Implementation without a green, evidenced test run is *Changes Required* by definition.

---

### (a) Implementation prompt template (copy-paste)

> **Role:** You are an LLM coding agent implementing exactly one build item against this repository's pull request. Stay strictly within scope. Never invent facts; every fact-bearing value that is not confirmed must ship as a visible `[verify]` placeholder or be omitted.
>
> **Build item:** `<paste the Build Item number + title>`
>
> **Scope (only touch this):** `<paste "Scope" + "Page or flow">`
>
> **Required content:** `<paste "Required content" — keep every [verify] marker intact>`
>
> **Design instructions:** `<paste "Design instructions">`
> **Interaction instructions:** `<paste "Interaction instructions">`
> **Mobile behavior:** `<paste "Mobile behavior">`
> **Accessibility requirements:** `<paste "Accessibility requirements">`
> **Engineering instructions:** `<paste "Engineering instructions">`
>
> **Explicitly out of scope (do NOT build):** `<paste "Explicitly out of scope">`
> **Dependencies (assume these exist; do not rebuild):** `<paste "Dependencies">`
>
> **Acceptance criteria:** `<paste "Acceptance criteria">`
> **What good output looks like:** `<paste the "What good output looks like" block, including Signals of quality and Signs it went wrong>`
> **Reference implementations (extract the principle — do not copy):** `<paste the reference URLs + adapt/avoid notes>`
> **Test criteria to run:** `<paste the numbered Test criteria block verbatim>`
>
> **Instructions:**
> 0. **Build the phone experience FIRST.** Implement and verify the 320–390px layout before adding any desktop enhancement: one primary action placed in the thumb zone (bottom-anchored where sensible), native `tel:`/maps handoffs, correct input modes (`type`/`inputmode`/`autocomplete`, inputs ≥ 16px), safe-area-aware sticky actions, and zero horizontal scroll at 320px. Desktop is the scale-up, never the source layout that mobile is squeezed from.
> 1. Implement the item within the stated scope only. Do not redesign unrelated areas. Do not add a dependency unless this item explicitly authorizes it.
> 2. Keep every unverified fact as a `[verify]` placeholder. Do not soften an unverified claim into vague language.
> 3. After implementing, **run every step in "Test criteria" and the Global Test Harness (Section 25c) — including the Mobile Suite (GTH-12–GTH-22) — against the changed route(s).**
> 4. Produce a **pass/fail table** with one row per test step: Step · what you ran · observed artifact/value · Pass or Fail · fail signature if failed.
> 5. Run the item's **PR completion gate** (all steps, including the mobile gate) and report each result, including the per-viewport results table.
> 6. Do **not** claim done. Instead output the verification package defined in template (b) and stop. If any step fails, fix within scope and re-run before producing the final table.

---

### (b) Verification prompt template (copy-paste)

> **Role:** You are verifying a pull request that claims to complete one build item. You did not necessarily write it. Trust nothing that is not backed by an executed test artifact. "It looks implemented" is not evidence.
>
> **Build item:** `<paste number + title>`
> **Its Test criteria:** `<paste the numbered Test criteria block>`
> **Its PR completion gate + Explicitly-out-of-scope + Dependencies + authorized dependencies:** `<paste those fields>`
>
> **Run everything and return EXACTLY these six outputs, in order:**
> 1. **Per-step pass/fail table** — one row per Test-criteria step and per Global-Test-Harness check, each with: the command/action you ran, the **observed** artifact/selector/value/output, Pass or Fail, and the fail signature for any failure. Empty "observed" cells are treated as Fail.
> 2. **PR completion gate results** — the ordered PR-completion-gate checklist for this item (including the mobile gate), each marked pass/fail with evidence (scope-conformance, out-of-scope respected, dependency/lockfile check, regression items named, harness, console, mobile viewports).
> 3. **Outstanding `[verify]` inventory** — the exact list of `[verify]` placeholders still present in the changed output (from `rg -n "\[verify\]"`), or "none."
> 4. **Files changed + scope-conformance judgment** — the list of files in the diff, each judged in-scope or out-of-scope for this item; flag any file changed outside the item's stated scope.
> 5. **Per-viewport results table** — one row per Mobile Suite viewport (**320×568, 360×640, 390×844, 430×932, and landscape 844×390**); columns: no-horizontal-scroll · primary action thumb-reachable · touch targets ≥ 44×44px · `tel:`/maps handoffs · input-mode & ≥ 16px inputs · mobile LCP · TBT — each cell showing the **observed** value and Pass/Fail. Empty cells are treated as Fail.
> 6. **Final verdict** — `READY TO MERGE` or `CHANGES REQUIRED`, with every blocking failure listed explicitly and tied to the step/gate that failed. A READY TO MERGE verdict requires every per-viewport row green.
>
> **You must not** output a verdict of READY TO MERGE unless outputs 1, 2, and 5 are fully green with observed evidence. Declaring done on the basis of "I implemented it," without executed test evidence, is prohibited.

---

### (c) Global test harness (runs on every item)

These checks apply to **every** build item; Section 24 items reference them by name (e.g. "Run the Global Test Harness (Section 25c)") instead of repeating them. Point each at the item's changed route(s). Commands are baseline and stack-agnostic — adapt the URL/paths; keep the thresholds. Assume a dev server at `http://localhost:3000`.

- **GTH-1 — axe-core scan (accessibility).** `npx @axe-core/cli http://localhost:3000/<route> --exit` (or `@axe-core/playwright` in a test). **Pass:** 0 violations of impact `serious` or `critical` on the changed route. **Fail signature:** repeated name/role, label, or contrast violations.
- **GTH-2 — Lighthouse budget (performance).** `npx lhci autorun --collect.url=http://localhost:3000/<route>` (mobile). **Budget/Pass:** Performance ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms, Accessibility ≥ 100. **Fail signature:** an unoptimized asset or blocking script over budget.
- **GTH-3 — HTML validation.** `npx html-validate dist/<route>.html` or the Nu Html Checker (`vnu`). **Pass:** 0 errors (no duplicate `id`, no unclosed tags, no invalid ARIA references). **Fail signature:** malformed markup or bad ARIA.
- **GTH-4 — keyboard-only primary task.** With no mouse, Tab/Shift-Tab/Enter/Space through the page's primary task to completion. **Pass:** the primary task completes and focus is visible at every stop. **Fail signature:** a keyboard trap, an unreachable control, or invisible focus.
- **GTH-5 — contrast.** Compute the contrast ratio for each text/background and UI token pair used on the route. **Pass:** ≥ 4.5:1 for body text, ≥ 3:1 for large text (≥ 24px / 19px bold) and UI/graphical boundaries. **Fail signature:** a token pair below threshold.
- **GTH-6 — touch-target size.** Measure interactive targets at 360×640 and 390×844. **Pass:** every target ≥ 44×44px with adequate spacing. **Fail signature:** small radio/checkbox/icon-button targets.
- **GTH-7 — JS-disabled / graceful degradation.** Load the route with JavaScript disabled. **Pass:** core content, the phone number, and emergency access are still present and usable. **Fail signature:** a blank page or JS-only call/booking.
- **GTH-8 — cumulative layout shift.** Measure CLS during load and interaction (Lighthouse or a `PerformanceObserver` snippet). **Pass:** CLS ≤ 0.1. **Fail signature:** late-loading images/fonts shoving content.
- **GTH-9 — console clean.** Capture console output on load and during the primary interaction. **Pass:** no errors and no warnings on the changed route. **Fail signature:** a runtime error or a framework warning.
- **GTH-10 — no invented facts.** `rg -n "in-network|accepts?|\$[0-9]|same-day|open (mon|tue|wed|thu|fri|sat|sun|early|late|weekend)|DDS|DMD|licen[sc]e|Delta|Premera|Regence|parking|validat|Link|streetcar|min walk" <changed files>` and confirm every fact-bearing match is wrapped in a visible `[verify]` placeholder or omitted. **Pass:** no unwrapped fact-bearing claim. **Fail signature:** an asserted carrier, price, hour, credential, or logistic.
- **GTH-11 — prior items still pass.** Re-run the Test criteria of the items this item names in its regression check. **Pass:** all named prior items still pass. **Fail signature:** a previously green item now failing.

#### Mobile Suite (GTH-12–GTH-22) — the phone is the primary target

The site is designed phone-first: a majority of patients arrive on a phone, often one-handed, sometimes in pain, sometimes on a poor connection, sometimes on a Downtown sidewalk hunting for a building entrance. These checks make the phone experience *complete, not reduced.* Items reference the whole set as **"Run the Mobile Suite (GTH-12–GTH-22)."** GTH-12/GTH-14/GTH-19 extend the earlier baselines (GTH-6 touch targets, GTH-2 Lighthouse) to the full mobile matrix. Assume a dev server at `http://localhost:3000` and `URL` = the item's changed route.

- **GTH-12 — Standard mobile viewport matrix.** The reusable device set every item is verified at: **320×568** (smallest supported), **360×640** (common Android), **390×844** (common iPhone), **430×932** (large phone), plus **844×390 landscape** where the item names a landscape check. Baseline Playwright fixture other checks reuse:
  ```js
  const MOBILE = [
    { name: 'small-320',   width: 320, height: 568 },
    { name: 'android-360', width: 360, height: 640 },
    { name: 'iphone-390',  width: 390, height: 844 },
    { name: 'large-430',   width: 430, height: 932 },
    { name: 'landscape',   width: 844, height: 390 },
  ];
  for (const vp of MOBILE) {
    test(`${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(URL);
      /* item-specific assertions go here */
    });
  }
  ```
  **Pass:** the route renders its complete mobile experience at every size — nothing clipped, no lost function, one primary action visible. **Fail signature:** a layout that only composes at one width, or content that disappears below 360px.
- **GTH-13 — No horizontal scroll at 320px.** At 320×568 (and every matrix width) the document must not scroll sideways.
  ```js
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(URL);
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  ```
  **Pass:** `scrollWidth ≤ clientWidth` at 320px. **Fail signature:** a fixed-width element, an unwrapped table, or an oversized image forcing a sideways scrollbar.
- **GTH-14 — Touch-target size & spacing (WCAG 2.2 §2.5.8).** Extends GTH-6 across the whole matrix and adds spacing.
  ```js
  for (const el of await page.locator('a, button, [role=button], input:not([type=hidden]), select, summary, label[for]').all()) {
    const b = await el.boundingBox(); if (!b) continue;
    expect(Math.min(b.width, b.height)).toBeGreaterThanOrEqual(44);
  }
  ```
  Then confirm ≥ 8px clear space between adjacent targets. **Pass:** every visible interactive target ≥ 44×44 CSS px with ≥ 8px separation. **Fail signature:** icon-only buttons or close-set links under 44px.
- **GTH-15 — Thumb-zone primary action.** The one primary action per screen sits in the reachable lower band (or a bottom-anchored sticky bar), because the top of a tall phone is out of one-handed reach.
  ```js
  const box = await page.getByRole('button', { name: PRIMARY }).first().boundingBox();
  const vh = page.viewportSize().height;
  expect(box.y + box.height / 2).toBeGreaterThan(vh * 0.5); // lower half = thumb-reachable
  ```
  For a sticky bar, also assert `position: fixed` anchored to the bottom. **Pass:** primary action reachable one-handed without regripping. **Fail signature:** the sole primary CTA pinned to the top with no bottom affordance.
- **GTH-16 — Safe-area insets (notched devices).** Anything bottom- or top-anchored must respect `env(safe-area-inset-*)` under `<meta name="viewport" ... viewport-fit=cover>`.
  ```js
  const bar = page.locator('[data-testid=sticky-action-bar]');
  const pb = await bar.evaluate(el => getComputedStyle(el).paddingBottom);
  expect(parseFloat(pb)).toBeGreaterThan(0); // inset honored, not flush to the edge
  ```
  **[manual]** At 390×844 with a simulated home indicator, confirm the bar's content clears it and never overlaps the last actionable element. **Pass:** inset honored. **Fail signature:** zero inset padding, or content hidden under the indicator.
- **GTH-17 — Native one-tap handoffs.** Phone numbers are `tel:` links; the address/directions use a maps deep link.
  ```js
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  expect(await page.locator('a[href*="maps."], a[href^="geo:"], a[href*="google.com/maps"]').count())
    .toBeGreaterThan(0); // where the item shows an address
  ```
  **Pass:** tapping the number opens the dialer; tapping directions opens a maps app. **Fail signature:** a plain-text phone or address that cannot be actioned.
- **GTH-18 — Mobile keyboard & input correctness.** Every field declares the right `type`/`inputmode`/`autocomplete`, and inputs render ≥ 16px to prevent iOS focus-zoom.
  ```js
  await expect(page.locator('input[name=phone]')).toHaveAttribute('type', 'tel');
  await expect(page.locator('input[name=phone]')).toHaveAttribute('inputmode', /tel|numeric/);
  await expect(page.locator('input[name=phone]')).toHaveAttribute('autocomplete', 'tel');
  await expect(page.locator('input[name=email]')).toHaveAttribute('type', 'email');
  for (const f of await page.locator('input, select, textarea').all()) {
    const fs = await f.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(fs).toBeGreaterThanOrEqual(16);
  }
  ```
  **Pass:** each field summons the correct keyboard and no field triggers iOS zoom on focus. **Fail signature:** a `type=text` phone field, a missing `autocomplete`, or sub-16px inputs.
- **GTH-19 — Mobile Lighthouse budget under throttling.** The explicit throttled profile for GTH-2: Lighthouse **mobile preset** (Moto-G-class device, 4× CPU slowdown, simulated slow-4G).
  ```
  npx lighthouse http://localhost:3000/<route> \
    --form-factor=mobile --screenEmulation.mobile \
    --throttling-method=simulate --preset=perf --quiet --chrome-flags="--headless"
  ```
  **Budget/Pass:** Performance ≥ 90, **LCP ≤ 2.5s**, **TBT ≤ 200ms**, **CLS ≤ 0.1**, Speed Index ≤ 3.4s, and the route's transferred weight within the item's stated budget. **Fail signature:** an unoptimized hero image or a blocking script that blows LCP/TBT on throttled mobile.
- **GTH-20 — Reflow & text resize (WCAG 2.2 §1.4.10 / §1.4.4).** At 320 CSS px (≈ 400% zoom of 1280) and at 200% text zoom, all content and function remain with no two-dimensional scrolling (data tables/maps excepted).
  ```js
  await page.setViewportSize({ width: 320, height: 568 });        // 1.4.10 reflow (see GTH-13)
  await page.addStyleTag({ content: 'html{font-size:200% !important}' }); // 1.4.4 text resize
  // assert key content still visible and not clipped or overlapping
  ```
  **Pass:** no loss of content or function; no clipping or overlap at 200%. **Fail signature:** content cut off, overlapping text, or a control pushed off-screen.
- **GTH-21 — Orientation independence (WCAG 2.2 §1.3.4).** The route works in portrait and landscape; nothing is locked to one orientation.
  ```js
  await page.setViewportSize({ width: 844, height: 390 }); // landscape phone
  await page.goto(URL);
  // primary content + primary action still present and usable
  ```
  **Pass:** full function in landscape (sticky bar adapts, content reflows, no "please rotate" wall). **Fail signature:** an orientation lock or portrait-only content.
- **GTH-22 — Reduced motion on mobile.** With `prefers-reduced-motion: reduce`, non-essential motion/auto-advance is disabled.
  ```js
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL);
  // assert no autoplay/looping animation and only minimal transitions
  ```
  **Pass:** motion suppressed under the setting. **Fail signature:** a carousel that still auto-advances, or parallax that still animates.

---

### (d) Sequencing note

**Run one build item per session: implement it, verify it with template (b), record the verdict, then move on.** Do not batch multiple items into one PR — the loop only stays closeable if each item is implemented, tested, and merged (or fixed) on its own before the next begins.

## 26. First-pass website modification checklist

Concrete, directly usable actions for a design + dev team. Effort: **S** ≤ ~½ day · **M** ~1–3 days · **L** ~1+ week. Every fact-bearing item depends on practice verification (see next section).

| # | Exact change | Priority | Patient job | Page / component | Content to add/revise | Visual instruction | Interaction | Mobile requirement | Accessibility | Acceptance criterion | Effort | Dependency | Test |
|---|---|---|---|---|---|---|---|---|---|---|---|---|------|
| 1 | Add a persistent header with Book/Request, tap-to-call phone, and a distinct Emergency link | P0 | H/F | Global header | Practice name, phone [verify] | Light header, one primary button, restrained-red Emergency | Sticky on scroll | Sticky bottom Call/Book/Emergency bar, safe-area aware; each ≥44px; no h-scroll at 320px | Landmark, skip link, focus, tel: | Call/Book/Emergency reachable in one tap on mobile | M | — | `@390×844` Playwright: `getByRole('link',{name:/call/i})` has `href^="tel:"` and is reachable in **1 tap**; axe 0 serious/critical · @320×568: `scrollWidth ≤ clientWidth` (GTH-13) |
| 2 | Build the homepage hero with one honest headline + primary CTA + real image | P0 | C/H | Hero | Headline (option), neighborhood, "accepting new patients" [verify] | Calm, generous, one action, warm real photo | Static, CTA → request flow | Headline + one CTA above the fold at 360×640; hero image compressed/deferred | Real `<h1>`, alt, AA contrast | LCP within budget; no invented claims | M | 1 | `GTH-2` Lighthouse mobile on `/`: LCP ≤2.5s **and** `locator('h1').count()===1` · @360×640: H1 + primary CTA visible in the first viewport before scroll |
| 3 | Add a trust strip of 3–4 verifiable chips | P0 | C | Trust strip | "Accepting new patients", "In-network with [carriers]", "Judgment-free care", "Same-day emergencies" [verify] | Icon+label row | Static | Chips wrap 2×2 at ≤390px; text labels kept; no h-scroll at 320px | Text labels, not icon-only | Every chip maps to a verified fact | S | 2 | `rg -i "award\|best\|#1\|top dentist"` on Home+About → **0 matches**; every chip has a visible text label · @320×568: chips stay 2×2, no h-scroll (GTH-13) |
| 4 | Publish a conservative-care / cost-transparency statement | P0 | C/D | Home + About block | "We recommend only what you need… we'll show you what we see… written estimates… second opinions welcome" | Calm content block | Links to About | Full-width block; reflows at 320px/200% with no pinch-zoom (GTH-20) | Plain language | Statement live on Home + About | S | 2 | `curl /` and `/about` → `rg -i "second opinions welcome"` present on **both** · @320×568: statement fully readable, no h-scroll |
| 5 | Create the Our Team page with named credentials + photos + philosophy | P0 | C | Dentist profile | Names, DDS/DMD, school/years, license, portraits, philosophy [verify] | Consistent warm cards | Home teaser → full page | Profiles stack at 360×640; portrait+name+one line visible without tap; bio link ≥44px | Alt describes person/role | Each dentist: name+credential+photo+philosophy | M | 1 | each `[data-testid=dentist-profile]` has name+credential+`img[alt]`+philosophy; DDS/DMD/license all wrapped `[verify]` · @360×640: profiles single-column; tap targets ≥44px (GTH-14) |
| 6 | Build the short appointment request form with success/error/loading states | P0 | H | Request flow | Name, phone, email, time window, reason/notes, insurance optional, family note | Single column, big targets | Inline validation; success shows next steps; error shows phone fallback | Correct `type`/`inputmode`/`autocomplete`; inputs ≥16px (no iOS zoom); targets ≥44px; state preserved on interruption | Labels, error association, focus to success, announced states | Success + forced-error both handled; AT-complete | M | 1 | submit valid → `role=status` success **and** focus moved; force error → `role=alert` **and** `tel:` fallback shown · @390×844: `input[name=phone]` is type=tel/inputmode=tel/autocomplete=tel at ≥16px (GTH-18) |
| 7 | Create the Location & arrival card (parking+validation, transit, entrance/floor/access, hours) | P0 | H | Location & arrival card | Address, garage+validation, nearest Link/streetcar+walk time, entrance/floor, hours [verify] | Compact card + small map | One-tap directions + call | One-tap Directions (maps deep link) + Call (`tel:`) at 360×640; real text address; map deferred | Text address alt for map | Parking, transit, entrance, hours present + verified | M | 1 | `curl /location-hours` shows a **text address outside the map** and parking+transit+entrance+hours all present · @360×640: a `tel:` link **and** a maps link, both ≥44px (GTH-17) |
| 8 | Build the Insurance & Payment page (accept≠in-network + networks + uninsured path) | P0 | D | Insurance module | Explainer, networks [verify], verify steps, estimate offer, membership/financing [verify] | Readable tables, no jargon | Links to verify path | Insurance tables reflow, no h-scroll at 320px; links ≥44px | Table semantics, labeled fields | Explainer + networks + uninsured path live; no invented prices | M | 1 | page defines **accept≠in-network**; every `$`-price wrapped `[verify]`; data tables use `th[scope]` · @320×568: tables reflow, `scrollWidth ≤ clientWidth` (GTH-13) |
| 9 | Add homepage insurance + arrival teasers linking to full pages | P0 | D/H | Insurance/location teasers | Networks line + address/transit/parking snippet [verify] | Two compact blocks | Link out; tap-to-call/map | Teasers full-width; one-tap call/map at 360×640; no h-scroll at 320px | Readable, labeled | Homepage shows insurance + arrival essentials | S | 7,8 | Playwright: insurance and arrival teasers link out to `/insurance-payment` and `/location-hours` (both **200**) · @360×640: insurance + arrival teasers tappable, links ≥44px |
| 10 | Build the Emergency page + persistent emergency action (call, ER-triage, first aid) | P0 | F | Emergency banner/page | Tap-to-call + after-hours [verify], same-day policy [verify], ER list, attributed first aid | Calm-urgent, high contrast | tel:; each symptom ends in an action | Emergency reachable in 1 tap via sticky bar at 390×844; `tel:` dialer; large target | Icon+label, plain language | Emergency one-tap globally; ER-triage + first aid present; non-diagnostic | M | 1 | from 3 routes the emergency call is reachable in **1 tap** (`tel:`); scan for diagnosis phrasing → **0**; no symptom checker · @390×844: emergency `tel:` reachable in 1 tap from 3 routes (GTH-17) |
| 11 | Create the New Patients page (accepting, what-to-bring, what-to-expect) | P0 | I | New-patient steps | Accepting-status, checklist, steps, forms, records, first-visit price [verify] | Numbered steps | Links to forms + request | What-to-expect is a vertical `<ol>` at 360×640; links/targets ≥44px | Ordered list, headings | Accepting + checklist + steps present + verified | M | 6,8 | `curl /new-patients` → accepting + what-to-bring + what-to-expect all present; what-to-expect is an `<ol>` · @360×640: steps single-column, no h-scroll (GTH-13) |
| 12 | Add Services overview + top service links + browse-by-concern + emergency shortcut | P0/P1 | G | Service card / concern module | Curated services [verify], concern list, life-stage entry | Restraint (6–8), plain names | Links only (no checker) | Service grid 2-up→1-up ≤360px; ≤8 cards; concern chips wrap ≥44px; no h-scroll | Link/list semantics | Overview + top links + concern list + emergency shortcut | M | 1 | Home `service-card` count **≤8**; concern items are plain links (no checker); emergency shortcut present · @360×640: card grid ≤8, chips wrap, targets ≥44px (GTH-14) |
| 13 | Run WCAG 2.2 AA baseline pass + publish Accessibility statement | P0 | inclusion | Global + Accessibility page | Statement + accommodation contact | Visible focus, AA contrast | Keyboard operability everywhere | Every P0 primary task completes by touch at 360×640 & 390×844; targets ≥44px | Semantics, labels, alt, no color-only | P0 pages pass keyboard + screen-reader tasks; statement live | L | 1–12 | `@axe-core` on **all P0 routes** → 0 serious/critical **and** each primary task completes by keyboard · Mobile Suite (GTH-12–GTH-22) on all P0 routes: no h-scroll, ≥44px, thumb-zone CTA |
| 14 | Publish Privacy + HIPAA NPP; run the verified-facts sweep | P0 | compliance/trust | Privacy page + all | Legal privacy content [verify]; replace/remove all [verify] | n/a | n/a | Privacy/NPP reflows at 320px/200%, no h-scroll (GTH-20) | Structured policy | No live [verify]; Privacy + NPP published | M | 3–12 | `rg -n "\[verify\]"` across built output → **0**; `/privacy` and NPP return 200 and are footer-linked · @320×568: policy readable, `scrollWidth ≤ clientWidth` |
| 15 | Build 6–8 service pages from one plain-language template | P1 | G/C/D | Service page template | what/why/expect/comfort/cost pointer/CTA [verify] | Scannable, patient term first | CTA "Ask about this" | Sticky 'Ask about this' CTA in the thumb zone at 390×844, safe-area aware | Headings, ≤8th grade | 6–8 pages live; non-diagnostic; no invented prices | L | 12 | 6–8 service routes render **one template**; every `$`-price wrapped `[verify]`; diagnosis scan → 0 · @390×844: sticky CTA fixed-bottom, safe-area inset honored (GTH-15/16) |
| 16 | Create the Dental Anxiety & Comfort page + wire the request notes field | P1 | E | Anxiety content + notes field | No-judgment, what-to-expect, comfort options [verify] | Calm palette, warm imagery | Notes field invites concerns | Notes field + `tel:` reachable at 360×640; textarea ≥16px; no autoplay | Plain, no autoplay | No-judgment + what-to-expect + notes field; comfort claims verified | M | 6 | notes field is **optional** and appears in the submit payload; autoplay scan on the page → 0 · @360×640: notes textarea ≥16px, `tel:` present; reduced-motion honored (GTH-22) |
| 17 | Add Family & life-stage section/page (inclusive, honest scope) | P1 | G/B | Family-care module | All-ages positioning, life-stage entries, scope [verify], coordination note | Multi-generational imagery | Links to services | Full-width; multi-generational image lazy-loaded; readable at 320px | Inclusive alt | Inclusive positioning + honest scope + coordination note | M | 12,15 | `curl /family` → all-ages inclusive copy; scope claims wrapped `[verify]`; alt text is multi-generational · @320×568: family section readable, no h-scroll |
| 18 | Add Reviews teaser (curated, attributed) + link-out | P1 | C | Review card | 3–6 real quotes, rating, profile links [verify] | Static cards, no autoplay | Link out | Cards stack (reduced-motion-safe swipe); no autoplay; keyboard at 360×640 | Keyboard, static | Genuine attributed quotes + rating + working links | S | 2 | 3–6 attributed quotes present; carousel/autoplay scan → 0; each profile link-out resolves · @360×640: no autoplay (GTH-22); each card keyboard/tap reachable |
| 19 | Build grouped FAQ (top 12) | P1 | A–K | FAQ accordion | Grouped Q/A [verify] | Grouped, scannable | Expand/collapse | Accordion triggers ≥44px full-width; `aria-expanded`; keyboard at 360×640; nothing critical hidden | `aria-expanded`, keyboard | Top 12 answered; keyboard-operable | M | 8,11,7 | **≥12** grouped questions; each trigger is a `button` with toggling `aria-expanded`; keyboard-operable · @360×640: triggers ≥44px, toggling `aria-expanded` (GTH-14) |
| 20 | Expand Insurance page: membership/financing + verify-benefits + mechanics | P1 | D | Insurance module/FAQ | Membership [verify], financing [verify], verify steps, deductible/max explainer, first-visit price [verify] | Plain-money language | "We'll help you check" CTA | Insurance/mechanics tables reflow, no h-scroll at 320px; inputs ≥16px | Labeled tables | Uninsured path + verify steps present; numbers verified | M | 8 | every `$`-price / APR wrapped `[verify]`; deductible/annual-max/coinsurance each explained in plain language · @320×568: tables reflow (GTH-13); verify-benefits inputs ≥16px |
| 21 | Add hours badges + reschedule/reminder affordances | P1 | H/J | Hours block, opt-in | Early/late/weekend badges [verify], reschedule instructions, reminder opt-in [verify] | Clear badges | Opt-in toggle | Hours above the fold at 360×640; reminder opt-in toggle ≥44px with label | Labeled toggle | Hours badged + reschedule instructions present | S | 6,7 | hours identical across Home/Contact/Location; reminder opt-in has an associated `<label>`; hours wrapped `[verify]` · @360×640: hours visible before scroll; opt-in toggle ≥44px |
| 22 | Add languages-spoken + non-discrimination signals; plain-language pass | P1 | inclusion | Footer/About | Languages [verify] + non-discrimination note | Simple honest signal | n/a | Footer language/non-discrimination signals visible & stacked at 360×640; `<html lang>` set | `lang` attrs, translate-friendly, ≤8th grade | Signals present; content ≤8th grade | M | 13 | `<html lang>` set and axe `html-has-lang` passes; languages-spoken **and** non-discrimination note present · @360×640: signals present in the stacked footer; no h-scroll |
| 23 | Add cosmetic overview with "consult is fact-finding" framing | P1/P2 | K | Service card/overview | Neutral options, process/upkeep, consult framing, health-first note [verify] | Calm, non-salesy | "Book a consultation" | Scannable single column at 360×640; 'Book a consultation' CTA ≥44px in the thumb zone | Alt describes purpose | Overview + consult framing; no pressure language | M | 15 | pressure-language scan ("limited time", "act now") → **0**; "fact-finding" consult framing present; no before/after gallery · @360×640: no pressure banners; consult CTA ≥44px |
| 24 | Add aftercare & "when to call" content + re-book prompt | P1/P2 | J | Content blocks | Aftercare, "call us if…", records/update info [verify clinical review] | Reassuring, plain | Re-book CTA | Aftercare reflows at 320px; 're-book' CTA in the thumb zone; `tel:` present | Plain language | Aftercare + when-to-call + re-book present | M | 15 | "call us if…" list present and diagnosis scan → 0; re-book CTA reaches the request flow · @360×640: 'call us if…' list readable; re-book CTA ≥44px |
| 25 | Set performance/SEO/local-search foundation | P1 | discovery | Global | Verified NAP; local business schema; neighborhood/service titles | Lightweight assets | n/a | Throttled-mobile LCP ≤2.5s / TBT ≤200ms on mid-tier phones (GTH-19) | Semantics aid SEO+a11y | CWV within budget; valid local schema; consistent NAP | M | 1–12 | `GTH-2` within budget on `/`; `LocalBusiness`/`Dentist` JSON-LD validates; NAP consistent site-wide · @mobile preset: GTH-19 LCP ≤2.5s, TBT ≤200ms, CLS ≤0.1 |
| 26 | Run pre-launch quality + content-verification gate | P0 | all | Whole site | All verified; all states tested | n/a | Test loading/success/error/recovery | 3 core journeys complete at 320×568, 360×640, 390×844 & 430×932; Mobile Suite green | WCAG 2.2 AA on P0 confirmed | Checklist 100% pass; zero live [verify]; journeys complete on mobile + AT | M | 1–25 | `rg -n "\[verify\]"` whole site → **0**; 3 core journeys complete at 360×640 **and** 390×844; axe clean on all P0 · Mobile Suite (GTH-12–GTH-22) green on all P0 routes |

**Illustrative concrete action (as requested):** *"Add a compact Location & arrival section above the final homepage CTA. Include the street address, building name/entrance, floor or suite, nearest Link light-rail station and streetcar/bus with walking time, parking options and validation status, and a link to full directions. On mobile, make 'Get directions' and 'Call the practice' one-tap actions."* — this is checklist item 9 (+7). **Avoid** vague tickets like "improve trust" or "make it modern"; every item above names an exact change and an acceptance test.
## 27. Claims requiring practice verification

Nothing in the categories below may be published as website copy until the practice confirms it. This list is the launch gate referenced in Build Items 14 and 26. Treat every item as **[verify]** until signed off by the practice. Where a fact cannot be verified, **remove the claim** rather than soften it.

### Credentials & legitimacy
- Each dentist's full name, degree (DDS/DMD), dental school, and graduation/experience years.
- Active state license number(s) and status (Washington dental board lookup).
- Board certifications, residencies, or advanced training claimed.
- Professional memberships (e.g., ADA, WSDA, AGD) — only if current.
- Team members' roles/titles as displayed.

### Insurance & network status
- Exact list of plans the practice is **in-network / participating** with (e.g., Delta Dental of WA, Premera, Regence, UnitedHealthcare) — and the plan types (PPO/DHMO).
- Whether the practice bills out-of-network plans and how patient responsibility differs.
- Whether Medicaid/Apple Health or state programs are accepted (or explicitly not).
- Any "preferred provider" designations.

### Pricing, membership & financing
- New-patient exam self-pay price (if a fixed number is to be published).
- Any published procedure prices or ranges (strongly discouraged unless committed).
- In-house membership plan existence, coverage, and cost.
- Financing options (CareCredit, in-house, third-party), terms, and APR claims.
- Accepted payment methods.

### Availability, hours & scheduling
- Exact business hours, including any early/evening/weekend/lunch availability.
- New-patient acceptance status (currently accepting?).
- Same-day / emergency availability policy and after-hours contact.
- Online booking capability (real-time booking vs. request-and-callback).
- Reschedule/cancel policy; appointment reminder system.
- Typical new-patient visit length and whether treatment happens at visit one.

### Emergency & clinical services
- Emergency/same-day policy and the correct after-hours number/instructions.
- Which services are provided **in-house** vs. **referred out** (e.g., very young pediatric care, oral surgery/wisdom teeth, endodontics, implants, orthodontics).
- Full accurate services list (no service listed that isn't offered).
- Technologies claimed (CEREC/same-day crowns, iTero, 3D imaging, digital X-rays, laser).

### Anxiety, comfort & sedation
- Comfort amenities actually offered (headphones, blankets, TV, etc.).
- Sedation/analgesia offered and by whom (nitrous, oral, IV) — regulated claims.
- Any "stop-signal"/pause policy before it's stated as a promise.

### Accessibility & languages
- Physical-suite accessibility (step-free route, accessible restroom, elevator).
- Languages spoken by staff / interpreter arrangements.
- Accessibility accommodations available on request.

### Location & arrival
- Exact address, building name, entrance, floor/suite.
- Parking specifics: garage/lot names, approximate cost, and **validation** availability.
- Nearest Link light-rail station, streetcar/bus stop, and honest walking times.
- Day-of building-access requirements (QR code, lobby check-in, ID).
- Accessible route from transit/parking to the suite.

### Reputation & content
- Reviews/testimonials: genuine, with consent to reproduce; ratings accurate as of a date.
- Any awards, "top dentist," rankings, or "years of experience" claims.
- Before/after photos: patient consent + accurate representation.
- Outcome claims of any kind (avoid unless clinically substantiated).

### Legal & compliance
- Privacy Policy and HIPAA Notice of Privacy Practices content.
- Notice of Non-Discrimination / language-access notice as applicable.
- SMS/text consent language for the request form.

**Rule of thumb:** if a sentence would make a patient act (book, drive over, expect a price, expect a service), and it isn't verified, it doesn't ship.
## 28. Open questions

Questions whose answers would materially change or sharpen the build. Grouped by type. Several are practice-facts (route to verification); others are research/decision questions the team should resolve early.

### About the practice (blocking content decisions)
1. **Exact location and building** — which neighborhood/tower, floor/suite, and what is the real arrival experience (parking validation, transit, day-of access)? The whole Downtown differentiation depends on this.
2. **In-network networks** — which specific plans, so the site can name them (the single biggest trust/differentiation lever)?
3. **Booking reality** — real-time online booking, or request-and-callback? This decides whether Build Item 6 is a form or a scheduler integration.
4. **New-patient acceptance & first-visit price** — are they accepting, and will they commit to publishing a self-pay exam price (Integrity-style) to out-trust competitors?
5. **Service scope & referrals** — what is done in-house vs. referred (young children, oral surgery, implants, ortho, endo)? Needed for honest family/service content.
6. **Sedation/comfort offerings** — what can be truthfully promised for anxious patients?
7. **Hours** — any early/evening/weekend/lunch availability to badge?
8. **Languages spoken / interpreter support** — what inclusive signal is true?
9. **Emergency policy** — same-day capacity and the correct after-hours instructions.
10. **Membership/financing** — is there an in-house plan; which financing partners; terms?

### Research/decision questions (not fully resolved by this study)
11. **Channel preference in *this* patient mix** — vendor data claims a strong online-booking preference, but it's bias-flagged; the practice's own call/online split should be measured rather than assumed before investing in a scheduler.
12. **How much cosmetic emphasis** is right without tipping into a "too expensive/salesy" feel for the broad family audience? (Evidence says lead with health/trust; cosmetic as a calm secondary.)
13. **Neighborhood targeting** — should the site build honest per-neighborhood arrival/transit content (Belltown, SLU, First Hill, etc.) rather than SEO "doorway" pages? (Recommended: honest transit/parking facts per neighborhood, not fake "located in X.")
14. **Review sourcing/consent** — which platforms and which quotes can be reproduced with consent and remain current?
15. **Measurement plan** — which post-launch signals (request completion rate, call volume, no-show rate, mobile bounce, accessibility issues reported) will decide P2 priorities?

### Evidence gaps and limitations to close
16. **Sample shortfall** — this scan examined ~15 practice homepages in depth and ~21 more at snippet level (≈37 total), short of the ~100 target; a larger, systematic audit (including live mobile/sticky-bar behavior, which page retrieval couldn't confirm) would tighten the frequency table.
17. **Localized cost data** — national cash-cost ranges must be replaced with verified local numbers before any pricing appears.
18. **Demographic precision** — neighborhood figures came from secondary census aggregators; confirm with primary Census/ACS data if precise targeting is needed.
19. **Accessibility conformance** — the site must be tested with real assistive technology; this report specifies the target (WCAG 2.2 AA) but cannot certify conformance of an unbuilt site.
20. **LEP depth** — whether to invest beyond a "languages spoken" signal into translated content depends on the practice's actual patient languages and volume.
## 29. Source appendix

**Access date:** all sources accessed during this research on/around **30 August 2026** unless otherwise noted. **Type key:** PG = patient-generated · PR = practice/vendor/marketing · CG = clinical/professional guidance · DP = design precedent/research · GOV = government/official · DIR = directory/aggregator · JOURN = journalism. Each entry names the specific conclusion the source supports in this report. Practice-marketing sources are **never** treated as patient evidence.

### A. Dental practice websites examined (pattern scan — PR)
*Weighted to Downtown Seattle, then comparison markets. "In depth" = full-page retrieval; others observed at snippet/listing level.*

**Seattle-area (in depth):**
1. https://32pearls.com/your-trusted-downtown-seattle-dentist-for-family-cosmetic-care/ — Downtown Seattle SEO page; long service dump; no insurance/team/logistics → anti-pattern (thin trust).
2. https://skyviewfamilydentistry.com/dentist-service-areas/dentist-downtown-seattle/ — 3-action header (Emergency/Book/Pay); neighborhood-history filler before value; driving directions only → common-but-weak.
3. https://book.firsthilldentalseattle.com/ — Names carriers (Delta/Premera/Regence/UHC), verify-benefits offer, early hours, comfort amenities, anti-upsell reviews → strong patterns.
4. https://dentologie.com/locations/seattle/south-lake-union — Dedicated parking+transit block, <60s booking, no-judgment copy, provider hours, 10-Q FAQ → model example.
5. https://www.queenannefamilydental.com/ — Accessibility text-resize widget, structured nav, anxiety-friendly reviews, privacy link, CAPTCHA friction.
6. https://www.zendentalcenterseattle.com/ — "Free of stress, anxiety or judgment," all-ages, emergency emphasis, CareCredit, purpose-based request form, promo-heavy.
7. https://seattlescapitolhilldentist.com/ — No named dentist, fake-looking testimonials, contradictory hours → anti-pattern.
8. https://3rdandcolumbiadental.com/dentist-in-pioneer-square/ — SEO "doorway" page ("short drive from Pioneer Square"); decent popular-links nav; thin logistics.
9. https://www.dentistsofqueenanne.com/ — Smile Generation DSO template; "LANGUAGE SPOKEN"+"INSURANCE" labels; landmark wayfinding; membership+financing; anxiety reviews; non-discrimination footer.

**Comparison markets (in depth):**
10. https://chicagoloopdentistry.com/ — "Pinky Promise" (never push unneeded treatment, show imaging, transparent pricing, respect time); membership for uninsured; embedded reviews → strong trust patterns.
11. https://www.gentrydentistry.com/ — Homepage restraint ("without overwhelming"), named UCSF dentist, dedicated Parking + New Patient pages, calm premium tone.
12. https://integritydentalboston.com/ — Gold-standard arrival (garage entrance, validation, day-of QR, floor, concierge, ID, nav videos) + published first-visit price ($200 uninsured) + honest plan exclusion.
13. https://www.keydentalwestend.ca/ — Wheelchair-accessibility statement, whole-team humanization, transit note, Saturday hours.
14. https://www.portlandmoderndentistry.com/ — Financial ladder (insurance+membership+financing 0%); language-spoken + non-discrimination + accessibility footer; emergency emphasis; landmark wayfinding.
15. https://www.ismilefamily.com/ — "Spanish speaking services at all locations"; Medicaid + long named carrier list; insurance look-up; family framing → inclusive insurance/language exemplar.
16. https://portlandor.dental/new-patients/ — Model new-patient copy (all ages, verify-first, costs up front, financing).

**Additional practice sites (snippet/listing level — PR):**
17. https://www.southlakeuniondentistoffice.com/about-us/request-appointment/ — Request-not-instant-book pattern ("some appts not online; we'll call you"); "I have an emergency" checkbox.
18. https://www.smilegeneration.com/dentist/wa/seattle/377-south-lake-union-dentist-office/ — "Accepting new patients"; DSO listing.
19. https://www.smilegeneration.com/dentist/wa/seattle/661-dentists-of-queen-anne/ — DSO listing.
20. https://www.smilegeneration.com/dentist/or/portland/320-portland-modern-dentistry/ — DSO listing.
21. https://www.emergencydentistseattle.com/downtown — Emergency-only practice; "Call/Book, directions from Downtown," same-day.
22. https://www.acidentistry.com/emergency-dentistry/ — Downtown emergency dentist; same-day urgent care.
23. https://dentistdowntownseattle.com/emergency-dentist/ — Emergency dentist; "Open on Saturdays."
24. https://emergencydental.com/seattle/ + /appointments/ — Same-day emergency network.
25. https://anooshafifidds.com/new-patients/ — Capitol Hill; anxiety-aware, all-ages new-patient content.
26. https://www.firsthilldentalcenter.com/ + /services/ — First Hill family practice; emergencies; services list.
27. https://32pearls.com/capitol-hills-trusted-family-dentist-for-all-ages/ — All-ages family framing.
28. https://www.devonshiredental.net/ — Downtown Boston; cost-forward title; standard hours.
29. https://www.archstreetdental.com/ — Boston; "for everyone"; cosmetic/implant.
30. https://www.bostondental.com/book/ — Boston; "self care starts here"; book-online forward.
31. https://www.dentalpartnersofboston.com/appointment/ — Boston; online scheduling; new+returning.
32. https://cosmodentalsf.com/ — SF Union Square; "158 reviews"; New Patients/Reviews nav.
33. https://www.downtowndentistsf.com/ — SF Union Square; named dentist; Pay Now/Book Online.
34. https://dentalstudiosf.com/about-us-1/modern-dentistry/ — SF; "like the Apple Store" premium-tech positioning.
35. https://digitaldentalpractice.net/ — SF Financial District; caters to "Downtown professionals," same-day emergency.
36. https://www.downtown-dental.com/locations/loop/ — Chicago Loop location page.
37. https://www.lpsdental.com/ — Chicago Loop; dual "Book Now/Book Consult"; "skill and judgement."
38. https://www.luxsmilesnyc.com/ — NYC; "award-winning"; Pay Now/Book Online; Special Offers.
39. https://www.newyorkdentaloffice.com/ — NYC; Patient Education, Smile Gallery, Reviews nav.
40. https://www.oraldentalstudio.com/lp/new-patients/ — Manhattan; "We Do Not Accept Medicaid/HMO/State Insurance" (honest but exclusionary).
41. https://vancouverdentist.com/ + /dentist-downtown-vancouver/ — Vancouver; "Make the most of your CDCP benefits" (gov insurance forward).
42. https://stadium-dental.com/ + /vancouver-downtown-dental-clinic/ — Vancouver; "Emergency & CDCP Welcome"; children's dentistry; conscious sedation.
43. https://www.dentistsofqueenanne.com/payment/dental-insurance/ + /about-us/request-appointment/ — Insurance + request subpages.
44. https://www.queenannefamilydental.com/p/dentist-Queen-Anne-Seattle-Financial-and-Insurance-p46006.asp — "Preferred providers with Delta Dental and Regence" (names carriers on financial page).
45. https://www.portlandmoderndentistry.com/about-us/dentist-appointment/ — Appointment subpage.
46. https://booking.dentologie.com/our-locations/seattle/south-lake-union — Dentologie booking listing.

### B. Practice-generated educational/blog sources (PR — used for "what practices do," bias-flagged)
47. https://oceanbreezeprosthodontics.com/blog/in-network-out-of-network-dentist/ — "Accepts" ≠ "in-network."
48. https://www.tiganidentistry.com/blog/common-questions-about-dental-insurance-coverage-explained — DPPO/DHMO, annual max, deductible.
49. https://www.mazzdental.com/blog/1489716-understanding-dental-insurance-terminology — Insurance terminology.
50. https://www.drparrella.com/blog/your-first-dental-appointment-what-to-bring-and-expect + /checklist-for-new-patients — First-visit: bring card/ID/records/meds; exam+cleaning+X-rays; ~30–45 min.
51. https://www.drdentaldesignstudio.com/post/essential-new-patient-forms-for-a-stress-free-visit — New-patient forms.
52. https://www.smilegeneration.com/blog/ask-a-dentist/first-visit-dentist-appointment/ — E-check-in, exam, oral cancer screening, financial coordinator.
53. https://sunbit.com/knowledge-center/dental/dental-tips/first-dental-visit-guide/ — First-visit guide + financing.
54. https://www.newmouth.com/dentistry/family/ — Family dentistry = all life stages; most dentists are general.
55. https://www.dentalateliers.com/articles/what-is-family-dentist-guide-en — Family dentist definition.
56. https://www.onetreefamilydentistry.com/from-children-to-grandparents-how-a-family-dentist-supports-all-ages — All-ages care.
57. https://www.smileavenuefamilydentistry.com/family-dentist-benefits/ — Family dentistry benefits.
58. https://firstdentalassociates.com/family-dentistry-explained-why-its-essential-for-all-ages/ — Family dentistry all ages.
59. https://www.safeandhealthylife.com/complete-guide-cosmetic-dentistry-smile-makeover/ — Health-first before cosmetic; consult = fact-finding.
60. https://arasudentalcare.com/blog/cosmetic-dentistry-consultation/ + https://www.silverstatesmiles.com/blog/what-to-expect-at-a-cosmetic-dentistry-consultation + https://www.palmdesertdentist.com/cosmetic-dentistry-consultation-guide/ — Cosmetic consult = goals/exam/options/Q&A/financing, low-pressure.
61. https://glistendentalstudio.com/complete-guide-to-cosmetic-dentistry/ — Cosmetic overview.
62. https://www.silbermandentalgroup.com/blog/second-opinion-dentist/ — Practices themselves flag over-treatment; advise second opinions.
63. https://bellesmilesdental.com/do-dentist-try-to-rip-you-off.html — Acknowledges over-treatment distrust.
64. https://thecomfortdentistry.com/how-to-contest-a-dentist-bill-that-overcharges-you.html — How patients dispute overcharges.
65. https://www.prospersmilestudio.com/broken-tooth-is-it-an-emergency-or-not/ + https://www.myspecialtydentist.com/specialties/oral-surgery/guides/dental-emergency-guide — Broken-tooth/emergency triage (corroborates clinical).
66. https://www.yourdentista.com/i-havent-been-to-the-dentist-in-years-and-im-scared/ — Anxiety/lapsed-patient reassurance content.
67. https://aspendentalplan.com/ + https://www.prnewswire.com/news-releases/aspen-dental-launches-accessible-membership-plan-... — Membership plan for uninsured; large uninsured population (vendor/PR, directional).
68. https://www.dentalplans.com/learning/how-to-pay-for-dental-work-without-insurance/ — Cash-cost ranges + savings plans (must localize).
69. https://www.goodrx.com/conditions/dental-care/manage-dental-costs-without-insurance + /dental-savings-plans — Managing costs without insurance.

### C. Patient-generated sources (PG — needs, vocabulary, praise/abandon)
70. https://www.reddit.com/r/Seattle/comments/1c7ocjp/trustworthy_dentist_recs/ — Over-treatment distrust; conservative care, respected financial timeline, remembered name, referred out, parking, in-network Delta = choose/reject factors.
71. https://www.reddit.com/r/Seattle/comments/181edmn/dentist_recommendations/ — Pain relief + trust; "willing to drive for the right provider."
72. https://www.reddit.com/r/askdentists/comments/19fd9bf/is_my_dentist_trying_to_upsell_me/ — Perceived upsell; second-opinion confirmed; deductible confusion; nuance that crowns-after-RCT are standard (communication gap).
73. https://www.reddit.com/r/askdentists/comments/11nzvex/do_dentists_ever_recommend_unnecessary_treatments/ — Over-treatment discussion.
74. https://www.reddit.com/r/Anxiety/comments/162ntik/i_have_major_dentist_anxiety_and_im_so_embarrassed/ — Shame/judgment as the anxiety hinge; scolding triggers panic; comfort tools; tell-team-in-advance.
75. https://www.reddit.com/r/Advice/comments/tfrpmy/havent_been_to_a_dentist_in_years_terrified_and/ — Lapsed-patient terror/shame.
76. https://www.redditmedia.com/r/askdentists/comments/1k1jvh1/havent_seen_a_dentist_in_20_years_just_made_an/ — 20-year gap; anxiety re-entry.
77. https://www.redditmedia.com/r/selfimprovement/comments/1d2g0q8/for_people_who_are_afraid_of_going_to_the_dentist/ — Fear-of-dentist coping.
78. https://www.reddit.com/r/personalfinance/comments/ut0jmc/surprise_dentist_bill_what_can_be_done/ — Surprise dental bill.
79. https://www.reddit.com/r/legaladvice/comments/15olr7h/dentist_charged_me_more_than_the_price_insurance/ — Charged more than quoted; billing distrust.
80. https://www.yelp.com/topic/seattle-dentist-recommendations — Values: 7am hours, gentle with fearful patients, "call first re insurance," weekend hours, downtown Medical Dental Building; pricey→switch.
81. https://www.yelp.com/search?find_desc=downtown+dentist&find_loc=Seattle%2C+WA — Downtown Seattle dentist listings.
82. https://www.yelp.com/search?find_desc=worst+dentists&find_loc=Seattle%2C+WA + /find_desc=dentists&find_loc=Pioneer+Square — Negative-signal scanning.
83. https://www.yelp.com/topic/seattle-have-you-ever-been-overcharged-by-a-business — Overcharging distrust (general).

### D. Clinical/professional guidance (CG)
84. https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do — Call dentist first; ER for facial fracture/uncontrolled bleeding; knocked-out-tooth first aid (<1 hr, milk).
85. https://my.clevelandclinic.org/health/diseases/22594-dentophobia-fear-of-dentists — ~36% fear, ~12% extreme; specific triggers (needles, drill, gag, embarrassment, control loss).
86. https://newsroom.tricare.mil/News/TRICARE-News/Article/4308160/... — Call dentist first; ERs don't do fillings/crowns; not-emergency list.
87. https://www.healthline.com/health/anxiety/dental-anxiety — ~36% anxiety; coping: communicate, explain steps, distraction, sedation.
88. https://psychcentral.com/anxiety/dental-anxiety + https://www.medicalnewstoday.com/articles/dentist-phobia + https://www.wikihow.com/Calm-Your-Nerves-at-the-Dentist — Corroborate anxiety causes/coping.
89. https://www.medanta.org/patient-education-blog/dental-emergencies-... — Emergency first-aid (corroboration).

### E. Insurance / cost (CG/PR/GOV)
90. https://www.deltadentalwa.com/knowledge-center/In-Network-Care-Benefits + https://www.deltadentalwa.com/ — In-network = contracted discounted fees; patient pays less (regional carrier).
91. https://coveredusa.org/en/glossary/in-network-vs-out-of-network-coinsurance — Coinsurance, balance billing, No Surprises Act, OOP max.
92. https://www.premera.com/wa/provider/find-a-doctor/... + /dental-resources/ — Regional carrier provider/network context.
93. https://app.leg.wa.gov/wac/default.aspx?cite=284-43-5960 — WA network-adequacy regulation context (GOV).
94. https://birdeye.com/blog/dental-complaints/ — Top complaints: cost/sticker shock, wait, lack of info (PR).
95. https://www.certifyhealth.com/blog/challenges-faced-by-dentists-impacting-dental-patient-experience/ — No-shows ~24%, communication gaps, financial friction (PR).
96. https://www.teero.com/blog/dental-billing-complaints + https://www.finmkt.io/blog-posts/how-to-turn-around-your-dental-practice-complaints — Billing complaints; how to resolve (PR).
97. https://www.consumerreports.org/dental-oral-care/read-this-before-your-next-trip-to-the-dentist-a5054427914/ — Overtreatment exists; get second opinions (JOURN; access limited this run — directional).

### F. Scheduling behavior (PR vendor — BIAS-FLAGGED)
98. https://www.dentaleconomics.com/practice/marketing/article/55338690/... — Claims online scheduling preference; phone vs online time (vendor).
99. https://www.solutionreach.com/blog/why-some-patients-prefer-an-online-scheduling-option — 43% search after hours; boomers would use too (vendor).
100. https://www.resonateapp.com/resources/dental-patient-appointment-booking-statistics + https://www.heallist.com/resources/blog/5-eye-opening-statistics-about-online-bookings/ + https://mendelsites.com/do-patients-prefer-calling-or-online-booking/ — Online-booking statistics (vendor; treat as "commonly observed," not fact).

### G. Accessibility / health literacy / language access (CG/GOV)
101. https://blog.prosites.com/making-your-dental-website-accessible/ — WCAG 2.2 AA; ADA Title III applies to private practices.
102. https://gargle.com/is-your-dental-website-ada-compliant/ — Risky features (schedulers, PDFs, carousels, popups); alt text should describe clinical purpose.
103. https://userway.org/blog/dental-websites-accessibility/ + https://adascanner.org/blog/ada-compliance-dental-practice-websites + https://ratedwithai.com/blog/dental-practice-ada-compliance-2026 — Corroborate WCAG/ADA duties (note: avoid overlay-as-substitute).
104. https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html + /guidance-standards.html — Plain language; Clear Communication Index; readability (GOV).
105. https://www.chcs.org/resource/improving-written-communication-to-promote-health-literacy/ — Sentences ~15–20 words; whole numbers; 12pt+; dark-on-light; short lists.
106. https://curogram.com/blog/best-practices/patient-engagement/health-literacy-patient-communication + https://readabilitycheck.com/patient-information-readability/ — Plain-language patient communication.
107. https://www.hhs.gov/civil-rights/for-individuals/.../limited-english-proficiency/index.html — LEP language-access obligations (GOV).
108. https://thefulcrum.us/governance-legislation/language-barriers-in-healthcare — Seattle/WA language barriers; few bilingual providers.
109. https://certifiedlanguages.com/blog/how-seattle-childrens-hospital-improved-language-access/ — Language-access success (regional).

### H. Design precedent / research (DP)
110. https://www.designyourway.net/blog/healthcare-website-design-trust/ — Credibility judged in ~50ms; clarity/whitespace/human language/soft blues-greens.
111. https://www.sprypt.com/blog/visual-elements-that-build-trust-on-clinic-websites — Visual trust signals (real staff, credentials).
112. https://duck.design/healthcare-website-design/ + https://spreadsimple.com/blog/healthcare-website-design-best-practices-... + https://www.g-co.agency/insights/healthcare-web-design-trends-... — Mobile-first (>60% mobile), real photos, 3-click nav, no autoplay.
113. https://delmain.co/blog/best-dental-websites/ + https://www.digitalfloss.com/best-dental-website-designs + https://www.sitebuilderreport.com/inspiration/dentist-websites + https://mysocialpractice.com/2025/11/dental-website-design/ + https://www.orbix.studio/blogs/dental-website-examples — "Best dental website" roundups; cross-checked design conventions.

### I. Local geography / demographics / transit (GOV/DIR)
114. https://www.point2homes.com/US/Neighborhood/WA/Seattle/Belltown-Demographics.html + /South-Lake-Union-Demographics.html — Belltown ~60% aged 25–44, ~¾ non-family households; SLU young/renter (secondary aggregator — directional).
115. https://bestneighborhood.org/demographics-in-south-lake-union-seattle-wa/ + https://censuseasy.com/neighborhood/wa/seattle/south-lake-union — SLU young, professional, renter-heavy (secondary).
116. https://www.seattle.gov/planning-and-community-development/population-and-demographics/neighborhood-snapshots — Official neighborhood demographics (GOV).
117. https://www.soundtransit.org/ride-with-us/parking/parking-locations — No downtown park-and-ride; transit-served (GOV).
118. https://www.seattle.gov/transportation/getting-around/transit/streetcar/south-lake-union-line + https://transitapp.com/en/region/seattle/seattle-streetcar/light-rail-slu — SLU Streetcar (GOV/DIR).
119. https://seeingwashington.com/seattle-light-rail-guide/ — Link 1 Line downtown stations (Westlake, Symphony/University St, Pioneer Square, Intl Dist).
120. https://en.parkopedia.com/parking/south_lake_union_seattle/ — Paid garages/lots; scarce/costly downtown parking (DIR).
121. https://www.seattle.gov/iandraffairs/LA — Seattle Language Access Program (GOV).
122. https://www.ichs.com/locations/international-district-medical-and-dental-clinic — Community medical/dental clinic; multilingual, lower-income access (PR/community).

### J. Directories / "choosing a dentist" (DIR/PR)
123. https://www.zocdoc.com/blog/guides/how-to-find-a-good-dentist/ — Comparison factors: credentials, in-network, location/hours, communication, cleanliness, emergency.
124. https://dentistdecoded.com/articles/how-to-choose-right-dentist/ — Verify license; in-network saves; communication.
125. https://www.zocdoc.com/dentists/downtown-seattle-wa-220080pm + /capitol-hill-seattle-wa-220131pm + /seattle-219852pm + /...premera-blue-cross + /manhattan-26605pm + /dentists — Local dentist directory listings/insurance filters (DIR).
126. https://www.healthgrades.com/dentistry-general-directory — Dentist directory (DIR).
127. https://www.deltadental.com/member/find-a-dentist/washington/seattle-dentists/ — Carrier find-a-dentist (network context).
128. https://www.practo.com/seattle/dentist/pioneer-square + /clinics/dental-clinics/pioneer-square — Pioneer Square dentist listings (DIR).
129. https://bestdoc.com/blog/patients/zocdoc-vs-healthgrades/ — Directory comparison (DIR).
130. https://www.dentaltown.com/channel/post/21076/what-do-patients-most-complain-about-in-google-reviews — Practitioner-forum discussion of common review complaints (PR).

*Note on counts: 171 distinct URLs were touched during research (≈85 dental-practice sites and ≈86 other sources). Some appendix lines group closely-related URLs (e.g., a practice's homepage + subpage, or several corroborating vendor-statistics pages) under one numbered entry for readability; all grouped URLs are listed explicitly. The pattern-scan frequency table counts only the 15 practice homepages examined in depth, as stated in that section.*
