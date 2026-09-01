# Changelog

All notable project-level changes are documented here. Content pages retain their own `updated` date.

## Unreleased

### 2026-09-01 editorial pass

#### Changed

- Moved the English My Story chapter from Part IV into Part II so bilingual source paths and public routes align, removed the content-check exception, and preserved the former URL with a canonical noindex redirect.
- Rebuilt the bilingual Week 1 lesson as a full “Finish the First Week” practice chapter, connecting baseline evidence, capacity-aware action, delayed retesting, transfer, weekly review, and the transition into daily systems.
- Rebuilt the bilingual miscellaneous chapter as “Echoes,” a coherent literary bridge from narrative review to recovery that separates injury, responsibility, luck, tools, and the next choice; reordered Part II and repaired its handover links.
- Connected the bilingual 90-Day Cycle Map and action chapter to Evidence Chain, Rhythm Ledger, and Learning State, clarifying which record owns each part of a long-term review.
- Clarified the bilingual Weekly Review handover protocol so Evidence Chain, Rhythm Ledger, Learning State, and 90-Day Cycle records each keep a distinct job without duplicated notes.
- Replaced the stale homepage-wide product verification date with per-entry verification guidance, keeping the biezou reference date aligned with its attribution record.
- Added a bounded bilingual homepage reference to biezou.com as an external AI relay service, with attribution, terms/privacy caveats, and browser coverage for the outbound link.
- Connected the shared Evidence Chain template to all eight bilingual foundation and AI-English chapters, so every skill path can continue from practice to delayed retention and transfer.
- Updated the bilingual Prologue contract to route readers through the current Toolkit Overview, Evidence Chain, and Rhythm Ledger before the 90-day cycle, with browser coverage for the handoffs.
- Reworked the bilingual Afterword into a fuller literary close that echoes the opening question, names the real weight of failure, and returns readers to evidence, rhythm, and practical next steps.
- Expanded the bilingual Reader's Guide with a four-stage reading arc and explicit outputs, connecting input, real-life practice, evidence, rhythm, and the 90-day cycle.
- Added return-visit routes to the bilingual Reader's Guide for the Toolkit Overview, Evidence Chain, and Rhythm Ledger, with browser coverage for choosing and resuming the right worksheet.
- Added a bilingual Evidence Chain template for baseline, immediate performance, delayed retention, transfer, evidence boundaries, and next-step decisions; linked it from the glossary, toolkit, and Evidence chapter.
- Corrected twelve bilingual pages that carried a future `updated` date and added a guard preventing publication metadata from moving ahead of the current day.
- Added a bilingual Toolkit Overview that routes readers to one appropriate worksheet by problem, connects the templates into a complete loop, and documents evidence and privacy boundaries.
- Added a standalone bilingual Rhythm Ledger template, linked it from the chapter and glossary, and protected the copy-ready handoff with browser coverage.
- Added Rhythm, Variation, Compounding, Minimum Contract, and Rhythm Ledger to the bilingual glossary, with browser coverage for the new chapter's handoffs.
- Added the bilingual Rhythm chapter as a bridge between the daily system and the 90-day plan, covering repetition, feedback, interruption recovery, and sustainable compounding.
- Switched the Hu & Nation citation from the intermittently timing-out Wellington repository page to its verified Crossref metadata record, keeping the source link stable for scheduled audits without implying full-text redistribution.
- Switched the Hu & Nation citation from the slow ScholarSpace resolver to the verified Wellington Open Access record after the scheduled runner exposed repeated repository timeouts.
- Marked two dead Wayback snapshots as unavailable and removed their 404 links while preserving the local historical text and attribution boundary.
- Replaced the slow Hu & Nation DOI resolver with its verified ScholarSpace record so the vocabulary citation remains open and the scheduled link audit avoids a false timeout.
- Limited the dedicated catalog probes to source Markdown under `docs/threads` so generated VitePress HTML cannot append quotes or tags to URLs and create false 404 reports.
- Tuned the scheduled link audit for VitePress clean URLs and anti-bot catalog/project sites: local links are excluded from Lychee, critical Douban and project entry points use dedicated curl probes, and 404/5xx failures remain strict.
- Enabled cancellation of superseded Pages deployments so a rapid sequence of commits cannot let an older build publish after a newer one.
- Added a `build-revision` meta marker to every VitePress page and made Pages health checks verify that public content belongs to the current commit, with local and CI regression coverage.
- Restored the bilingual reading handoff from Evidence to AI Development and Resource-layer Business before the 90-Day Action Plan, with browser coverage for both links.
- Replaced mixed-language `Source (中文)` labels across the English reading, listening, speaking, writing, and archive pages, synchronized their edition dates, and added a stale-text guard.
- Upgraded the official GitHub Actions used by CI, Pages, artifact upload, issue reporting, and scheduled link checks to their current Node.js 24-compatible major releases.
- Synchronized the Prologue edition dates after the English copy-edit pass so both language editions report the same manuscript version.
- Localised residual Chinese prose in the English Prologue and Reading chapter while retaining original WeChat account names as explicitly marked proper names.
- Strengthened the Pages health check from “any title” to path-specific expected titles for both locales and the Evidence chapter.
- Aligned the Pages health-check article URLs with VitePress clean URLs after the first online probe correctly exposed a trailing-slash 404.
- Fixed the Pages health check's `pipefail` false negative by using a here-string for title validation after successful HTTP responses.
- Added post-deployment HTTP checks for the bilingual home pages and Evidence chapter, and documented the required GitHub Actions Pages source so a successful build cannot silently publish a 404 site.
- Completed the Part III chapter-end handoff by connecting the resource-layer business chapter from Evidence to Author Projects and Practice, so the methods-to-reality path no longer stops at the final technical chapter.
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
