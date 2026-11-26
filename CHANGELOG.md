# IronSwan — changelog

This records user outcomes and release status. The [roadmap](ROADMAP.md) describes future work. A merged PR is not automatically a published release.

## In review — v1.3 · A better way to read

Continue reading returns to the paragraph at the top of the reading view in the same browser. Choosing a chapter from the contents starts at its opening. Owner acceptance is pending.

## v1.2 — An easy book to create

Accepted and merged on 26 November 2026 at [9d8fb27](https://github.com/jkosem/IronSwan/commit/9d8fb27c64f5d985ea9574c017c9dbe6ec3f12e9). All seven owner checks are complete in [PR #8](https://github.com/jkosem/IronSwan/pull/8). [Regression and performance tests](https://github.com/jkosem/IronSwan/actions/runs/45892848153) passed on main. Release tag and GitHub Release publication are pending.

Authors set the byline and ordered chapter list in `book.txt`. One shared reader opens new Markdown chapters. Chapter titles and numbering follow the list, and editing a title or order preserves bookmarks.

## v1.1 — A reliable web book

**Already merged into main (25 November 2026)**

- Readers get more dependable Markdown rendering, correct ordered lists and safer links ([PR #1](https://github.com/jkosem/IronSwan/pull/1)).
- The contents page no longer downloads all chapter text; reading progress and styles are more efficient ([PR #2](https://github.com/jkosem/IronSwan/pull/2)).
- Automated regression and performance checks reduce the risk of breaking working books ([PR #1](https://github.com/jkosem/IronSwan/pull/1), [PR #3](https://github.com/jkosem/IronSwan/pull/3)).

**Merged 26 November 2026 — [PR #4](https://github.com/jkosem/IronSwan/pull/4)**

- Improved reading accessibility, more stable chapter loading and a smaller cover image.
- User-centred versioned roadmap, project memory alignment and trackable owner acceptance testing. The README keeps its informal voice and archives earlier wording verbatim under dated snapshots.

The owner checklist is complete. The v1.1 release commit is [c23065a](https://github.com/jkosem/IronSwan/commit/c23065a0fd0d81942cef14b9cb9d911b432c1cf1). [GitHub Actions](https://github.com/jkosem/IronSwan/actions/runs/45890601434) passed on main and all 14 tests passed on a fresh checkout. Tag and GitHub Release publication are pending.

## Historical v1.0 — A working web book

The original README identified the existing working template as v1: chapter pages rendered Markdown, with a cover and initial reading design. The historical baseline is [7a4a577](https://github.com/jkosem/IronSwan/commit/7a4a5775b6c09ba446e24a8bd9c7bdd1553d93ac), 20 October 2026, the last main revision before the November work and the base of PR #1. The original README calls it v1. No historical tag or GitHub Release was found.

A local Chromium check on both exact revisions loaded the cover image and five contents links, opened Introduction, followed Next to Character Development and returned to the contents. External fonts were disabled for this check.
