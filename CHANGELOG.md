# IronSwan — changelog

This records user outcomes and release status. The [roadmap](ROADMAP.md) describes future work. A merged PR is not automatically a published release.

## Unreleased — v1.1: A reliable web book

**Already merged into main (25 November 2026)**

- Readers get more dependable Markdown rendering, correct ordered lists and safer links ([PR #1](https://github.com/jkosem/IronSwan/pull/1)).
- The contents page no longer downloads all chapter text; reading progress and styles are more efficient ([PR #2](https://github.com/jkosem/IronSwan/pull/2)).
- Automated regression and performance checks reduce the risk of breaking working books ([PR #1](https://github.com/jkosem/IronSwan/pull/1), [PR #3](https://github.com/jkosem/IronSwan/pull/3)).

**Pending owner acceptance — [PR #4](https://github.com/jkosem/IronSwan/pull/4)**

- Improved reading accessibility, more stable chapter loading and a smaller cover image.
- User-centred versioned roadmap, project memory alignment and trackable owner acceptance testing.

The PR reports 14 passing tests and lab improvements; owner browser acceptance and required CI must be completed before release. No release date or tag is claimed here.

## Historical v1.0 — A working web book

The original README identified the existing working template as v1: chapter pages rendered Markdown, with a cover and initial reading design. The 20 October 2026 commit [7a4a577](https://github.com/jkosem/IronSwan/commit/7a4a5775b6c09ba446e24a8bd9c7bdd1553d93ac) is the verified base of the first November PR and the candidate historical baseline. Its browser behavior and tag status remain to be verified before formalizing a v1.0 release.
