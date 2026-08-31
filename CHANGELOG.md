# Changelog

All notable project-level changes are documented here. Content pages retain their own `updated` date.

## Unreleased

### 2026-09-01 editorial pass

#### Changed

- Closed the evidence handoff across CEFR self-checks, narrative review, AI learning, attention, and artifact delivery; chapter-end links now follow the reading path from assisted practice to delayed retest and transfer.
- Corrected two vocabulary-research DOI citations after Crossref verification, updated the attribution register, and added stale guards for the superseded identifiers.
- Added stale-string guards for the removed Zhihu URLs and documented the rule that access-restricted or one-time-signed pages cannot serve as primary evidence.
- Removed three unstable Zhihu direct links returning access-restricted responses; retained the relevant personal context in the manuscript and routed readers to stable local chapters instead.
- Added the bilingual Evidence chapter as the methodological bridge from AI-assisted learning and artifacts to delayed retention, transfer, human gates, and honest life evidence.
- Reordered the bilingual book navigation so the Reader's Guide and Prologue form the first continuous reading path before templates and topical chapters, with a regression test protecting that editorial order.
- Synchronized the bilingual home-page edition dates with the 2026-09-01 reader-guide pass, extended `updated` parity checks to both home pages, and added a smoke test for the new reading entry point.
- Added the bilingual Reader's Guide as an operational preface, separating the prologue's literary contract from practical entry routes, evidence traces, and interruption recovery.
- Added reverse navigation coverage for the Reader's Guide and a content gate requiring matching `updated` dates across Chinese and English counterparts.
- Added Daily System terms to the bilingual glossary and aligned a listening resource introduction with the guide's task-first recommendation policy.
- Reworked legacy listening recommendations so resource fit, personal preference, and learning effect are stated as separate, testable claims.
- Added matching bilingual overviews to the CEFR and Vocabulary foundation pages so readers can see the baseline-to-retest path before entering the detail.
- Connected all ten technical word lists to the bilingual Vocabulary chapter and home reading path with task-fit, version, source, and delayed-transfer boundaries.
- Localised the English VitePress reading chrome, footer, update labels, and author metadata, with desktop/mobile regression coverage.
- Hardened navigation checks to validate bilingual entry fields, duplicate links, and source-file existence before generating summaries.
- Rechecked the resource-layer chapter's official and external links on 2026-09-01, refreshed its product-positioning language, and separated homepage facts from contract and acceptance claims.
- Removed the unused `黑人问号.jpg` asset after removing its legacy reference, so the public asset directory no longer carries that outdated stereotype.
- Added a private-session asset guard across `.gitignore`, VitePress, maintenance guidance, and Playwright so local credentials cannot be published accidentally.
- Replaced a generic English image alt with a contextual description and taught content checks to reject common placeholder alt text.
- Corrected the CEFR attribution entry and added a check that explicit local paths in `ATTRIBUTIONS.md` still exist.
- Removed 21 unreferenced legacy illustrations and screenshots, refreshed the current asset register, and added orphan-asset detection to content checks.
- Added runtime image-load coverage for representative Chinese and English pages, checking descriptive alt text, completion, and non-zero natural dimensions.
- Translated the remaining English-page image alt text and added a check for Chinese characters in English image descriptions.
- Added the bilingual Narrative and Evidence chapter to connect personal stories, hindsight, responsibility, and transferable principles to the existing case-review and writing tools.
- Made route smoke coverage derive directly from navigation sources and real H1 headings, removing duplicated manual route lists and reducing future coverage drift.
- Aligned the remaining bilingual subsection structures and enabled heading-shape parity checks that ignore fenced examples.
- Clarified stale AI source-date wording as “last checked” and “verify before use” without claiming a new external verification.
- Aligned the three AI product attribution dates with the existing 2026-08-24 chapter source records.
- Added a tracked-system-file guard that rejects `.DS_Store`, `Thumbs.db`, and `desktop.ini` without touching local ignored files.
- Replaced the unstable Douban cover hotlink with a text-only reference-book link and updated the attribution register.
- Standardised the remaining English personal-story pen-name variant as “Li Pu” and added a stale-string guard.
- Added reverse navigation coverage checks so every public Markdown page must be discoverable from the bilingual navigation source.
- Linked the Narrative and Evidence chapter back from My Story and Decision-Making so reflection can return to a concrete choice.

### 2026-08-31 manuscript pass

#### Added

- Added the bilingual Recovery, Decision-Making, Relationships, and Attention chapters.
- Added the bilingual Life Practice Toolkit with reusable worksheets for decisions, attention, relationships, and recovery.
- Added the bilingual Listening Resource Audit card for choosing, testing, and retiring volatile listening materials.
- Added the bilingual Reading Evidence Card for source checks, claim maps, inference boundaries, and delayed transfer.
- Added the bilingual Speaking Evidence Card for recordings, listener feedback, interaction repair, and safe transfer.
- Added the bilingual Writing Evidence Card for drafts, layered revision, AI disclosure, reader feedback, and delivery.
- Added the bilingual 90-Day Cycle Map to connect skill evidence, weekly questions, phase gates, recovery, and final delivery.
- Added the bilingual Glossary of Terms and Methods to make the book's evidence vocabulary and chapter paths easier to navigate.
- Extended the README mirror rule to include the new `reference/` section in repository links.
- Strengthened the AI learning chapter with unaided/assisted/delayed comparisons, failure handover checks, and an explicit “speed debt” warning.
- Clarified the project-disclosure page with status labels, item-level dates, and a reader verification order.
- Expanded the AI Project Scorecard and resource-layer chapter with independent-performance evidence, test conditions, ownership, and release gates.
- Connected the English-with-AI entry page to all four skill evidence cards, delayed retesting, and the 90-day cycle.
- Added a confidence-and-reversibility check to the decision chapter so uncertainty changes action size rather than producing false precision.
- Updated the AI Learning Log Template to capture three comparison conditions, confidence, rework, and handover ownership.
- Connected attention, recovery, and relationship chapters directly to their corresponding Life Practice Toolkit sheets and the 90-Day Cycle Map.
- Added the bilingual Artifact Brief and Delivery Card so learning outputs can be scoped, reviewed, handed over, and rolled back.
- Upgraded the bilingual English Diagnostic Template with condition tracking, raw/delayed samples, evidence-card links, and a 90-day next-variable handoff.
- Upgraded the bilingual Weekly Review Template into a weekly evidence dashboard with constraints, error causes, recovery, and state handoff.
- Upgraded the bilingual Learning State Template into a versioned cross-session source of truth with evidence inventory, boundaries, handover, and review dates.

#### Changed

- Made `人生进阶指南` / `Life Level-up Guide` the primary book identity while retaining the lifelong-learning subtitle.
- Refined the personal story in both languages for accuracy, privacy, health boundaries, and a calmer literary voice.
- Reframed the listening resource catalogue around task fit, evidence, access, copyright, and a seven-day review cycle.
- Reframed reading resources around task fit, source versions, evidence boundaries, and parallel-text transfer.
- Reframed speaking practice around intelligibility, repair strategies, listener evidence, and safer real-world interaction.
- Reframed writing practice around task fit, four revision passes, source checks, and auditable delivery.
- Connected the 90-day action chapter to one cross-skill evidence chain and explicit phase gates.
- Added chapter-release gates and external-link/date guidance to the maintenance guide and pull-request template.
- Excluded Playwright-generated reports from Markdown lint so failure diagnostics cannot be mistaken for book content.
- Reworked the Week 1 sleep-and-stress lesson as an evidence-bounded language exercise, removing unsupported medical claims and adding safer source boundaries.
- Refined the entrepreneurship chapter with explicit evidence levels, personal-estimate disclosure, five reality gates, and links to the decision and project scorecards.
- Clarified the book's reading arc in the prologue, homepage map, and afterword so readers can move from a real problem to evidence cards, a 90-day cycle, and recovery when plans break.
- Reworked the historical miscellaneous notes to shorten an external quotation, remove a stereotyped image, reduce graphic school-violence detail, and label training and personal outcomes as non-general evidence.
- Refined the personal story with a narrative-boundary note, less third-party mind-reading, safer content guidance, and a more conditional statement about AI in real life.
- Added book-structure navigation and browser smoke coverage for the new pages.
- Added page-level historical, privacy, health, and safety notes to all four archived posts and their English translations, with browser coverage for each route.
- Added the bilingual Daily System chapter to bridge the book's methods and templates with minimum viable days, capacity budgets, boundaries, interruption recovery, and a seven-day practice.
- Rechecked the official `token.love` and `ku0.com` homepages, clarified current capability wording and contract boundaries, and aligned project-page attribution dates.
- Connected the AI Case Review Template to the AI chapters, project disclosure pages, and bilingual glossary so public narratives have a visible evidence path.
- Repaired the main reading arc so Miscellaneous Notes lead to Week 1, Daily System, and the 90-Day Plan, while the Afterword returns readers to the beginning.
- Standardised the English pen-name spelling as “Li Pu” across the homepage and prologue.

### Added

- VitePress static site with bilingual navigation, local search, page metadata, sitemap, and legacy hash-route migration.
- Learning-state, weekly-review, and English-diagnostic templates.
- CEFR can-do goals and 7-day, 30-day, and 12-week plans.
- Full English counterparts for entrepreneurship, archives, and word lists.
- Dual licensing, attribution register, contribution, conduct, security, and support policies.
- CI checks, scheduled link validation, image-metadata checks, and Playwright smoke tests.

### Changed

- Replaced learning-pyramid percentages, learning-style matching, fixed vocabulary-coverage claims, and fixed review intervals with evidence-aware guidance.
- Reframed AI chapters around tasks and portable state instead of a preferred provider.
- Moved affiliated products to a disclosure page and removed unnecessary public contact details.

### Removed

- Docsify runtime and unpinned CDN dependencies.
- Public references to unverified third-party and child photographs, private messages, medical records, and QR-code contact images.
