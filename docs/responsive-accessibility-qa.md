# Responsive and accessibility QA

## Implemented in this pass

- Remove rectangular backgrounds/borders from transparent home portraits, profile portrait and chibi pop-ups; use drop shadows that follow alpha silhouettes.
- Restrict desktop portrait sizing to the main portrait class, preventing global image sizing from enlarging chibi stickers.
- Home character is keyboard focusable (Enter/Space) and has an accessible name.
- Story dialogue advance is keyboard focusable (Enter/Space).
- Visible focus indicators for interactive controls.
- Mobile viewport uses dynamic viewport height, safe-area bottom padding, and larger tab touch targets.
- Reduced-motion preference disables portrait/chibi animation.

## Manual verification needed before merge

1. Test at 320, 375, 390, 768, 1024, 1440 CSS pixels and in landscape; check overflow and navigation.
2. Inspect transparent alpha on dark and light backgrounds; ensure no rectangular artifact remains in the source assets.
3. Keyboard-only: Tab to Kai, press Enter/Space; Tab to Stories, open a chapter, advance with Enter/Space, close.
4. Test VoiceOver/NVDA narration and reading order, especially the story overlay and tab navigation.
5. Check reduced-motion settings and contrast, including small text and color-only indicators.
6. Verify tap and chibi animation behavior on touch screens and desktop.

## Known follow-ups

- Story/date overlays need complete dialog focus trapping and focus restoration.
- Story/date cards currently use clickable divs and should become semantic buttons.
- Color contrast of tiny secondary labels requires a dedicated pass.
- A real device/browser QA run and production build are not yet verified.
