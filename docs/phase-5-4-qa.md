# Phase 5.4 — Pocket Date regression QA

## Automated checks
Run `npm test` and `npm run build` before merging. Both must pass. This PR adds Node's built-in test runner (no extra dependency) for XP, all RPS outcomes, daily eligibility and six authored chapters.

## Manual browser matrix (not yet executed)
Test at 320px, 375px, 420px and desktop; Chrome and Safari if available. Repeat with keyboard only, reloads and storage blocked.

| Area | Steps | Expected |
| --- | --- | --- |
| Fresh save | Clear Pocket Date storage and reload | Starts level 1, 0 XP/affection, 30 flowers, no memories |
| Existing save | Load a v1 save with level, XP, flowers, memories | Values remain and unlocks persist |
| Corrupt save | Invalid JSON / malformed fields | Safe defaults, no crash |
| Tap Kai | Tap rapidly, then wait 30 seconds | Animation/dialogue every tap, limited XP/affection rewards |
| Dates | Complete all choices in four dates | Closing beat appears; XP/flowers/affection once per completion |
| Free progression | Start with 0 flowers, complete Morning Jog | Player can earn flowers without passive waiting |
| Levels | Earn XP across one or more thresholds | Correct carryover and flowers; level 10 shows MAX |
| Stories | Open all unlocked chapters and finish | Full dialogue for 1–6, expressions present, no preview-only chapter |
| Memories | Collect each date choice, reload | Scrapbook persists unique IDs and progress |
| RPS | Try all moves, rematches, win/loss/tie | Correct result and reactions, no cost |
| RPS daily | Play twice, reload, simulate next local day | Exactly one +3-flower bonus per day |
| Care opt-in | Enable, edit, disable, reload | Settings persisted when enabled; cleared when disabled |
| Care snooze | Snooze and leave page open | Due state updates when snooze expires |
| Care privacy | Use cycle support | Cycle details never persisted to localStorage |
| Responsive | Test all modals and tabs at 320–420px | No clipped actions or horizontal overflow |
| Accessibility | Tab/Enter/Space through screens | Visible focus, operable controls, understandable labels |
| Browser lifecycle | Switch tabs, background, refresh during date | No unexpected duplicate reward or broken overlay |

## Known issues / follow-up
- Dates charge flowers on entry; closing a date before completion forfeits the cost. Confirm intended UX or implement cancellation/refund.
- Date rewards are repeatable; balance the free-date loop with actual playtest data.
- Daily RPS rewards are stored separately from the main save. Clearing only one storage key can cause a mismatched state; a future save migration could consolidate claims.
- Care due-state updates once per minute; confirm expected timing tolerance.
- No automated end-to-end browser tests or physical-device tests are included yet. Do not mark the manual matrix as passed until executed.

## Acceptance gate
- All automated tests pass.
- Production build passes.
- Manual matrix completed and blockers resolved.
- One 15–30 minute playtest validates pacing and motivation to return.
