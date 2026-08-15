# Super Tooth Dentistry — Project Docs

Reference documentation for the Super Tooth Dentistry website rebuild and related business decisions. This repo is the source of truth for locked decisions — chat history is not.

## Structure

```
docs/
├── supertooth-priority-dimensions.md    Segments, business objectives, motivation type, backlog
├── supertooth-build-principles.md       Architecture, workflow, UX, testing, approval principles
├── supertooth-ux-flow.md                Homepage structure, booking architecture, color/type/spacing
├── supertooth-navigation-requirements.md Navigation patterns (desktop + mobile)
├── supertooth-decision-framework.md     Standing framework for how build decisions get made
└── supertooth-webflow-build-spec.md     Consolidated build spec + live Webflow build status
```

## Suggested future structure

As the Tab32 service-layer integration gets built, consider adding:
```
service-layer/       Tab32 API integration code
```
Keeping the spec and the code that implements it in the same repo avoids drift between the two.

## How to use this repo

Every locked decision lives in these files with its reasoning, not just the choice. Before starting new work, check whether it's already been decided here. When a new decision is made, update the relevant file — don't let chat be the only record.
