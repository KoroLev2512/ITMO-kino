# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ITMO KINO: a cinema-tickets site for a student film screening at ITMO. It's a Create React App (react-scripts 5) SPA in TypeScript with SCSS modules, Redux Toolkit + RTK Query, and React Router v7. UI text and content are in Russian.

- Production: https://itmokino.ru (backend API: `https://api.itmokino.ru/`)
- Vercel landing deployment: https://itmokino.vercel.app/
- Repo: `git@github.com:KoroLev2512/ITMO-kino.git`. The git root is this directory, not the parent `itmokino/` folder.

## Commands

```bash
npm install
npm start          # CRA dev server on :3000 AND json-server mock API on :3001 (db.json)
npm run server     # json-server only (127.0.0.1:3001, watches db.json)
npm run build      # CRA build; the postbuild hook then prerenders with react-snap
npm test           # Jest via react-scripts (watch mode)
npm test -- src/path/to/file.test.tsx   # single test file
npm test -- -t "test name"              # single test by name
```

- No test files exist yet.
- Linting is the CRA built-in ESLint (`react-app` config). It runs during `start`/`build`, and there is no separate lint script.
- `build:prod`/`build:dev` call `webpack`, but there is no webpack config in the repo. Treat them as dead scripts and use `npm run build`.

## Build / deploy specifics

- `postbuild` runs `scripts/react-snap-postbuild.js`, which prerenders routes with react-snap (Puppeteer). It is skipped when `VERCEL` is set or `SKIP_REACT_SNAP=1`, because Chromium is unavailable on Vercel.
- react-snap's bundled Chromium 78 can't parse the bundle (optional chaining fails with `SyntaxError: Unexpected token '.'`). The script therefore points Puppeteer at a system Chrome through `PUPPETEER_EXECUTABLE_PATH`, auto-detecting common install paths. If no Chrome is found, it skips prerendering instead of failing.
- react-snap waits for the `REACT_SNAP_RENDERED` document event (configured in `package.json` under `reactSnap`). `App.tsx` dispatches it in a `useEffect`. Keep this dispatch when you refactor `App`.
- `build/` is committed to the working tree but gitignored.
- `jenkins/frontend-ci.groovy` is a self-hosted pipeline: Node 22.14.0 via nvm, `npm run build`, then pm2 runs `npm run server`.

## Architecture

Feature-sliced-style layout under `src/`:

- `app/styles/`: global SCSS (variables, colors, mixins) and the `cinema_icons` icon font. Imported once in `index.tsx`.
- `pages/`: route-level components. Routes are defined in `App.tsx` with `createBrowserRouter`:
  - `/` → `HomePage`, which renders the `widgets/Landing` landing page. `MovieList` is currently commented out.
  - `/movie/:id` → `MoviePage`. It is gated by a client-side password check hardcoded in the component, then lists sessions.
  - `/movie/:movieId/sessions/:sessionId` → `SessionPage`: hall scheme and seat selection (`widgets/SeatsSelect`).
  - `/movie/:movieId/registration/` → `RegistrationPage`: registration without seat selection.
  - `/503` → `ServiceUnavailablePage`. `MoviePage` and `SessionPage` also render it when their RTK Query request errors (backend down). Both it and the 404 `NotFoundPage` are thin wrappers over `widgets/ErrorScreen`: the status code with the glasses mascot as its middle digit, a title with an `<em>` peach accent, and action buttons.
  - `/demo/hall` → `DemoHallPage`: a public demo of the hall linked from the landing. It needs no backend: every seat is shown as free. It renders `SeatSelect` with `readOnly`, so seats show a pointer cursor and a "Ряд N, место M" hover tooltip and never touch the `order` store. A seat click opens `RegistrationModal`, which links to the itmo.events pages for each session (`shared/config/sessions.ts`, also used by the landing). "Я уже зарегистрировался" sets `localStorage['itmokino:registered']`, after which the modal stops appearing. Real booking is for cashiers only. On phones (≤650px) the map uses `SeatSelect variant="scroll"` inside `HallScroller`, which scrolls horizontally and draws its own draggable scrollbar, because iOS hides native ones. "Повернуть горизонтально" opens `LandscapeHall`, a full-screen view rotated 90° with CSS, because Screen Orientation lock is unsupported on iOS. The view un-rotates when the phone is physically in landscape. It sizes seats from `--hall-w`/`--hall-h` via `variant="landscape"`, and the registration modal renders inside it so it rotates too.
- `widgets/`: composite UI (Header, Landing, MovieList, SeatsSelect, SessionTime, Title).
- `shared/`: `api/` (RTK Query), `slices/` (Redux slices), `store/`, `types/`, `ui/` (Table, Text, Title primitives), `icons/`.

Every folder exposes its public API through an `index.ts` barrel. Import from the folder, not from inner files.

### Data layer

- `shared/api/rtkApi.ts` holds a single `createApi` with `baseUrl` hardcoded to `https://api.itmokino.ru/`. To develop against the local json-server, switch to the commented `http://localhost:3001/` line. There is no env-var config.
- Endpoints are added per domain with `rtkApi.injectEndpoints` (`movie.ts`, `session.ts`, `order.ts`). The backend uses json-server query conventions: `_embed=sessions`, `_expand=seat&_expand=movie`, `id_like=`. Any real backend must keep that shape.
- Data model (see `db.json`): `movies` → `sessions` (`movieId`, `seatId`) → `seats` records (`{id, buy_seats: [{row, seat}]}`). Booking is a `PATCH seats/:id` that replaces the whole `buy_seats` array.
- Client state: the `order` slice holds the currently selected seats (`addSeat`/`deleteSeat`/`clearOrder`, with seats matched by `row`+`seat`), plus a `movies` slice.

### SEO

The Vercel build skips react-snap, so the served HTML is an empty shell. Anything crawlers and link previews (Telegram, VK) must see therefore lives statically in `public/index.html`: description, canonical, Open Graph/Twitter tags, JSON-LD (Organization, WebSite, ScreeningEvent) and a `<noscript>` text fallback.

- The site origin comes from `REACT_APP_SITE_URL` in `.env`, which CRA substitutes into `index.html` as `%REACT_APP_SITE_URL%`. `public/robots.txt` and `public/sitemap.xml` are static and hardcode the same origin, so update all three if the domain changes. `itmokino.ru` did not respond as of 2026-11-05, which is why the origin is the Vercel URL.
- Per-route overrides go through `shared/ui/Seo` and are attached to routes in `App.tsx`. It sets only `<title>` and `robots`, so tags are not duplicated next to the static ones. The password-gated `/movie/...` pages and the 404 page are `noindex`.
- The share image is `public/og-image.jpg` (1200×630).
- `shared/ui/Title` renders `h1` by default; pass `as="h2"`/`"h3"` for section titles. Keep a single `h1` per page.
