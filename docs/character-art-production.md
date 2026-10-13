# Character art production checklist

The current WebP portraits and chibis are cropped from earlier sheets and may contain opaque backgrounds. The sticker frames in the UI are temporary and do **not** make the images transparent.

## Replacement asset contract

- Portraits: `public/assets/characters/main/{expression}.webp` — neutral, happy, laughing, flirty, curious, surprised, nervous, concerned, sad, angry.
- Chibis: `public/assets/characters/chibi/{expression}.webp` — neutral, happy, excited, focused, confused, embarrassed, pouty, sleepy, in-love, sad.
- Export each character as a separate RGBA image with a **genuinely transparent** background. Verify alpha on a checkerboard, including hair edges.
- Keep the character consistent: hairstyle, facial features, clothing, lighting, line weight and scale. Avoid embedded labels, panels and neighboring characters.
- Target portrait source ~1024×1536 and chibi source ~768×768, then export web-optimized WebP variants. Keep file size reasonable for mobile loading.
- Chibi cutouts: add a consistent white die-cut contour (about 8–12px at 768px), with transparent pixels beyond it. Keep transparent padding so animated stickers do not clip.
- Main portraits: clean transparent silhouette; no permanent rectangular frame in the image.
- Maintain the exact existing filenames, so replacement assets require no code changes.

## Acceptance test

1. Open every file over light and dark checkerboard backgrounds; no solid rectangles, halos, captions or accidental crop edges.
2. Check expressions at mobile sizes (portrait ~295px high, chibi ~90–140px wide).
3. Verify portrait swaps and chibi animations in Home, story reader, profile and dates.
4. Once transparent art is in place, remove temporary white rectangular framing from the UI and switch to CSS drop shadows for true die-cut stickers.
