# Pocket Date

Pocket Date is a React interactive dating-game prototype.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Import the GitHub repository `axeligato/Pocket-date` in Vercel.
2. Choose **Vite** as the framework preset (or let Vercel detect it).
3. Use `npm run build` for the build command and `dist` for the output directory.
4. Deploy after merging the setup pull request into `main`.

The original application is preserved in `src/OtomeGame.jsx`. The root `index.html` is now Vite's entry HTML; `src/main.jsx` mounts the React app.
