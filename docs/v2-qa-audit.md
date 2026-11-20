# Pocket Date V2 — QA audit and release gates

Baseline: `main` at the start of the V2 branch. This is a source-level audit; browser/device execution has **not** been performed.

## Findings by severity

| Priority | Finding | Evidence | Proposed resolution |
| --- | --- | --- | --- |
| P0 release gate | Manual browser/device QA not completed | `docs/phase-5-4-qa.md` | Do not merge as production-ready until device matrix passes |
| P1 | Flowers charged on entering dates; abandoning forfeits cost | Existing phase 5.4 QA known issues | Decide refund/cancellation UX, then test |
| P1 | RPS daily reward and main save use separate persistence | Existing phase 5.4 QA known issues | Test partial key resets and plan versioned migration |
| P1 | Several generations of theme overrides coexist | `src/style.css` | Introduce isolated V2 stylesheet and progressively remove legacy declarations |
| P2 | Large base64 JPEG embedded in application source | `src/OtomeGame.jsx` | Extract into a static asset; measure bundle before/after |
| P2 | Unit tests do not replace browser E2E | `package.json`, phase 5.4 QA | Add Playwright or equivalent smoke flows |
| P2 | Care due-state refresh is minute-based | Existing phase 5.4 QA known issues | Verify acceptable timing with product requirements |

## V2 design direction — Moonlit Letter

A complete change from dark teal sticker-journal to an editorial romance visual novel: parchment background, wine-colored interactive accents, rose/lilac highlights, serif headlines, restrained depth, and quiet dialogue surfaces. The character and authored content remain unchanged.

Palette: background `#FFF9F4`, surface `#FFFDFB`, ink `#382A3B`, muted `#756776`, accent `#873C60`, blush `#F8EAF0`.

The new theme lives in `src/v2-theme.css` and loads after `style.css`, allowing a safe rollback. This is a first-pass UI foundation, not a fully verified screen-by-screen redesign.

## Required validation

1. Run `npm install && npm test && npm run build`.
2. Complete the existing `docs/phase-5-4-qa.md` manual matrix on 320, 375, 420px and desktop, Chrome and Safari.
3. Validate every tab, date entry/exit, story chapter, Care, settings, Kai profile, dialogs, and RPS.
4. Test keyboard-only navigation, focus visibility, 200% zoom, reduced motion, and screen reader labels.
5. Validate contrast of the new theme, including inline-style components not covered by the theme layer.
6. Verify saved-game backward compatibility, corrupt storage, blocked storage, and refresh during date completion.
7. Perform a 15–30 minute playtest for pacing and clarity.

**Status:** Design foundation implemented; automated and manual validation pending. Do not merge without verification.
