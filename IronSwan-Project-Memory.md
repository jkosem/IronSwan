# Iron Swan — project memory

Baseline verified: 26 November 2026. Product roadmap and acceptance process approved by the owner on 26 November 2026. Living reference; check live GitHub status before acting. Owner preferences, historical facts and proposed future work are distinguished below.

## 1. Purpose and scope

Iron Swan (repository name: IronSwan) is a deliberately minimalist, MIT-licensed, open-source web-book publishing template and an experiment in AI-assisted design and coding by a designer, not a software developer.

Repository: https://github.com/jkosem/IronSwan

The goal is to make attractive, readable web books that authors can adapt and host on their own ordinary web server. Simplicity is a feature, not a temporary limitation.

**Iron Swan is the software, not the book.** Cold Forest is a separate book that uses Iron Swan, and a real-world test case for the template. The repository includes a Cold Forest theme. Book-specific editorial decisions, marketing and distribution belong in the separate Cold Forest project. Do not make the reusable software dependent on one publication's needs without explicit approval.

## 2. Standing design and development constraints

- Keep plain, portable HTML, CSS, JavaScript and Markdown; flat files, no runtime dependencies, no required build step, no framework or database unless explicitly approved.
- Preserve the existing visual design and both themes unless changes are explicitly requested. The themes use a common `css/theme.css` entry point. Prioritize typography, reading comfort, responsive behavior, accessibility and speed over feature quantity.
- Treat the owner as a designer who can judge real browser behavior, not someone who should have to run developer tooling to review routine changes.
- Prefer as few cohesive, reviewable pull requests as practical, rather than many tiny PRs. Provide accessible preview links or before/after comparisons and concrete manual acceptance checks. Explain changes and rationale concisely in plain language.
- Verify repository state and existing work before making changes. Preserve protections; use a branch and PR, run tests and review changes, and do not merge without explicit approval. Distinguish measured evidence, static analysis, reported results and untested assumptions.
- Avoid redoing completed work. Before each new phase, check main, open PRs, this roadmap and README; after changes, record the decision, status, evidence and next step in the living reference.

- Follow [ROADMAP.md](ROADMAP.md) as the source of truth for user-centred version milestones. Prioritize simplicity, elegance, independence, design quality, performance, accessibility, testability and longevity. The owner is product owner, design director and final acceptance tester; AI handles implementation, technical architecture, review, automated tests and documentation.
- Every PR requiring owner review must contain an AI-generated, change-specific, unchecked GitHub acceptance checklist in its description, with preview links, concrete actions and expected observable outcomes. Keep technical results separate. Record failures and untested items; fix them or obtain explicit owner acceptance of exceptions before merge. Never pre-tick owner tests or substitute green CI for owner acceptance. Prefer one cohesive PR per release. Use the [PR template](.github/pull_request_template.md).
- Keep [CHANGELOG.md](CHANGELOG.md) accurate; do not declare a release until approved and published/tagged. Preserve the historical v1.0 baseline and use v1.1 onward for user outcomes.

- Preserve the README's original informal, candid, self-deprecating writing style and the designer's voice. Keep current instructions accurate and approachable; do not turn the public README into corporate product documentation. Archive superseded wording under dated/versioned README snapshots rather than deleting it. Keep historical text verbatim and distinguish historical instructions from current ones. Dates identify snapshots, not necessarily original authorship dates.

## 3. Current architecture and test baseline

- `index.html`: cover and table of contents; chapter pages `chapter-01.html` etc. load matching `markdown/chapter-01.md` files. `js/chapter.js` detects chapter ID from filename. To add a chapter today, create matching Markdown and HTML files and add metadata in `js/config.js`.
- `js/toc-generator.js` uses configured titles without downloading chapters. Keep configuration and Markdown headings synchronized until a better approach is approved.
- CSS is split into layout, typography, colors, theme entry point and `ironswan-theme.css` / `coldforest-theme.css`.
- Markdown parser deliberately supports a subset (not complete CommonMark). Raw HTML escaped, unsafe URL schemes rejected; deeply nested lists and complex inline nesting remain unsupported. Do not imply arbitrary untrusted Markdown is comprehensively audited.
- Scroll progress uses a transform and cached page dimensions. Browser HTTP caching replaces ineffective cross-page in-memory prefetch.
- `node --test tests/*.test.mjs` runs dependency-free tests; 14 tests reported passing in PR #4. GitHub Actions workflow `.github/workflows/tests.yml` runs regression and performance tests. Prior project conversation reports main protection requiring passing tests; protection settings were not independently inspected in this review.
- README performance budgets: gzip-compressed first-party CSS and JavaScript 10 KiB each per page, excluding fonts/images. Mobile Lighthouse 95+, LCP below 1.5 s (aspirational), CLS below 0.1 are targets, not established production measurements.

## 4. Verified development history

| Work | Status as of 26 Nov 2026 | Source |
|---|---|---|
| Original Claude 3.7 architectural specification | Existed in April 2025; actual document not recovered | First substantive commit 0d8cc57, 8 Apr 2025, https://github.com/jkosem/IronSwan/commit/0d8cc57; README development history |
| Initial working template, cover and reading pages | Implemented | Repository main |
| Filename-based chapter IDs and theme architecture | Implemented | README, main |
| Markdown security, ordered lists, regression tests, prefetch removal | PR #1 merged 25 Nov 2026 | https://github.com/jkosem/IronSwan/pull/1 |
| CSS/JS optimization, no-fetch TOC, scroll progress, performance budgets | PR #2 merged 25 Nov 2026 | https://github.com/jkosem/IronSwan/pull/2 |
| GitHub Actions testing | PR #3 merged 25 Nov 2026 | https://github.com/jkosem/IronSwan/pull/3 |
| Reading accessibility, chapter loading stability, cover compression | PR #4 merged 26 Nov 2026, owner checklist complete | https://github.com/jkosem/IronSwan/pull/4 |

PR #4 reports 14 passing tests, five cold mobile lab runs on chapter 2 with CLS 0 versus 0.205 baseline (same fallback-font lab setup), zero automated WCAG violations in the tested cover/chapter in both themes, and cover JPEG reduced from 215,857 to 47,632 bytes. These are PR-reported results, not independently rerun in this review. Safari and assistive technology require manual review.

## 5. Recovered historical roadmap (superseded by the approved product roadmap)

Historical source: https://github.com/jkosem/IronSwan/blob/9c486423b3f4af04d264ab04d7a1f7f979cfeca5/README.md#roadmap

Current source of truth: [ROADMAP.md](ROADMAP.md). The historical list below is retained for context.

- [ ] Avoid manually editing `config.js` with chapter titles; make listing automatic.
- [x] Automatically detect chapter IDs from filenames.
- [x] Add baseline automated Markdown regression tests.
- [ ] Expand tests to browser navigation, accessibility and CSS (some progress in PRs #2 and #4, not complete).
- [ ] Explore interaction that genuinely improves reading in a browser.
- [ ] Improve the front-end design.

The README notes an earlier Claude-assisted spec and three restarts in the development process. It argues for a refined spec before implementation. At the time of the historical search, the main-branch tree had no separate plan/spec document; the April 2025 initial implementation tree did not include one either. Project file search and Dropbox searches for IronSwan / Iron Swan returned no matches. Original Claude chats, local editor files and unconnected services were not searched. Historical commit messages were checked, not every historical file revision.

## 6. Approved continuation (implementation and release approval still pending)

The [product roadmap](ROADMAP.md) defines v1.0 (historical working baseline), v1.1 (reliability), v1.2 (authoring), v1.3 (reading experience), v1.4 (book identity), v1.5 (independent publishing), and v2.0 (maturity). Dates are intentionally unspecified. The original v1.0 baseline is [7a4a577](https://github.com/jkosem/IronSwan/commit/7a4a5775b6c09ba446e24a8bd9c7bdd1553d93ac) (20 October 2026). No existing release tags or GitHub Releases were found on 26 November.

The v1.1 release commit is [c23065a](https://github.com/jkosem/IronSwan/commit/c23065a0fd0d81942cef14b9cb9d911b432c1cf1). The owner completed the [PR #4](https://github.com/jkosem/IronSwan/pull/4) checklist and [GitHub Actions](https://github.com/jkosem/IronSwan/actions/runs/45890601434) passed on main. A fresh checkout passed all 14 tests. Tag publication is pending. Next decision is the owner's review of the proposed v1.2 authoring workflow.

For v1.2, preserve no-fetch TOC behavior and evaluate authoring simplification before committing to any particular metadata architecture. For later releases, use real reading and publishing tasks; preserve both themes and portable flat files. Scope and acceptance criteria are maintained in ROADMAP.md, not duplicated here.

## 7. Operating instruction for future Iron Swan project chats

Read this reference, ROADMAP.md, CHANGELOG.md and README.md and check the current repository/PR state before proposing IronSwan work. Treat the architecture constraints and owner preferences as standing context. Distinguish historical roadmap from recommendations. Reuse prior decisions instead of restarting. If the work changes a decision, status or next step, provide a concise update to this reference. Never assume an open PR has merged, a test has run, or a proposal has been approved. Ask only for decisions that require the owner's judgment; give direct browser-test instructions rather than developer-oriented chores.
