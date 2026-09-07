# AGENTS.md

## Stack

- **Astro v7** (static output) + **Tailwind v4** (`@tailwindcss/vite`) + **Vue 3** (`@astrojs/vue`)
- Node ≥ 22.12.0

## Commands

```bash
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```

No test/lint/typecheck commands configured yet.

## Environment variables

Required in `.env` (see `.env.example`):

- `GETRESPONSE_API_KEY` — GetResponse API key for fetching newsletter subscriber count at build time
- `YOUTUBE_API_KEY` — YouTube Data API v3 key for fetching channel subscriber count at build time

If either key is missing, fallback values from `src/config.ts` are used — the build never fails.

## Project structure

- `src/pages/` — Astro file-based routing
- `src/components/` — Astro `.astro` components + Vue `.vue` components
- `src/layouts/BaseLayout.astro` — shared HTML shell (imports global.css, runs IntersectionObserver for `.reveal` animations)
- `src/config.ts` — centralized site config (`hero` content, `stats` fallbacks)
- `src/lib/fetch-stats.ts` — build-time API calls (GetResponse contacts, YouTube subscribers) with graceful fallback
- `src/content/ateliers/` — markdown content collection
- `src/content.config.ts` — content collection schema (glob loader, NOT `src/content/config.ts`)
- `src/assets/` — local images imported for Astro Image optimization (e.g. `logo.png`)
- `public/fonts/` — custom font files (`Pronell.otf`, `Aveton.otf`) referenced via `@font-face` in global.css

## Sharp / global libvips

`sharp` is a direct dependency (Astro 7 no longer bundles it) and an npm `override` forces `^0.35.4` for all transitive deps (`ipx` via `@netlify/images` still pins `0.34.x`). Reason: sharp 0.34's install script detects Homebrew's global libvips (`pkg-config --modversion vips-cpp`) and attempts a source build that fails. If this ever resurfaces, either remove the global vips (`brew uninstall vips`) or set `SHARP_IGNORE_GLOBAL_LIBVIPS=1`.

## Key conventions

### Content collections (Astro v7)

Content config is `src/content.config.ts` (not `src/content/config.ts`). Uses the `glob` loader:

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
```

Atelier frontmatter schema: `title`, `tag`, `description`, `image` (remote URL string), `order` (number).

### Site config (`src/config.ts`)

All hardcoded site content lives here — hero surtitle/title/text, stat labels and fallback values. Edit this file instead of components when changing copy.

### Dynamic stats (build time)

`src/lib/fetch-stats.ts` fetches live data at build time:
- **GetResponse**: `GET /v3/contacts?perPage=1&fields=contactId` → reads `totalcount` response header
- **YouTube**: `GET /v3/channels?part=statistics&forHandle=catherinelapsy` → reads `subscriberCount`

Since the site is static, stats update only on rebuild. Set up a cron/CI rebuild schedule for fresh numbers.

### Images — always use Astro `<Image>`

All images must use `import { Image } from "astro:assets"` with `format="webp"`:

- **Local images**: Import from `src/assets/`, pass to `<Image src={importedImage} format="webp" />`
- **Remote images (Cloudinary)**: Use `<Image src={url} width={W} height={H} format="webp" />` — `width`/`height` are required for remote URLs
- **Vue components**: Cannot use `<Image>` directly. Compute the optimized URL in the Astro parent with `getImage()` and pass it as a prop

Remote image domains are configured in `astro.config.mjs` → `image.remotePatterns`.

### Tailwind v4 theme

Custom colors, fonts, and animations are defined in `src/styles/global.css` via `@theme {}`. Key custom tokens:

- Colors: `brand`, `brand-dark`, `coral`, `gold`, `ink`, `ink-light`, `ink-faint`, `neutral`, `border`, `surface`, `surface-2`
- Fonts: `font-poppins`, `font-pronell`, `font-aveton`
- Animations: `animate-fade-up`, `animate-fade-in`, `animate-float`, etc.

### Custom CSS classes

Defined in `global.css` — used throughout components:
- `.reveal` / `.reveal.visible` — IntersectionObserver scroll animations (`.reveal-d1`, `.reveal-d2`, `.reveal-d3` for stagger)
- `.grain` — subtle noise texture overlay
- `.dot-pattern` — CSS radial-gradient dot grid
- `.card-lift` — hover card elevation effect
- `.nav-blur` — backdrop-filter blur for sticky nav
- `.nav-underline` — animated underline on hover
- `.btn-shine` — shine sweep effect on hover

### Vue components

Interactive components (mobile menu toggle, form state) use Vue (`client:load`). Static content uses Astro components.

## Required assets before deployment

- `src/assets/logo.png` — site logo (replace placeholder)
- `public/fonts/Pronell.otf` — custom heading font
- `public/fonts/Aveton.otf` — custom subheading font
