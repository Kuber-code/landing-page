# Aga Architect — Landing Page (Astro 5)

Statyczny landing page architektki, zbudowany na **Astro 5** z naciskiem na clean code i best practices: Content Collections, i18n routing, View Transitions, w pełni typowane komponenty, design tokens w CSS variables.

W prawym dolnym rogu znajdziesz panel **Tweaks** pozwalający na żywo zmieniać paletę, fonty, układ Hero, siatkę portfolio, gęstość, dark mode i więcej. Stan jest persystowany w `localStorage`.

---

## 🚀 Szybki start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # buduje do ./dist
npm run preview      # serwuje build lokalnie
```

Dodatkowe skrypty:

```bash
npm run lint         # ESLint
npm run lint:fix     # ESLint + autofix
npm run format       # Prettier write
npm run format:check # Prettier check
npm run storybook    # Storybook na http://localhost:6006
```

---

## 📁 Struktura projektu

```
src/
├── components/
│   ├── ui/           # Atomy: Button, Link, Tag, Eyebrow, PlaceholderMedia
│   ├── layout/       # Nav, Footer, AvailableBadge
│   ├── sections/     # Hero, Specializations, Projects, About, CTA
│   ├── projects/     # ProjectCard, ProjectFilters
│   └── tweaks/       # TweaksPanel (UI + protokół)
├── content/
│   └── projects/     # 8 plików .md (Content Collection, schemat w content.config.ts)
├── i18n/             # UI strings (EN/PL), helpery, headline variants
├── layouts/          # BaseLayout
├── lib/
│   ├── tweaks/       # TweaksController + persistencja + wiring
│   ├── behaviors.ts  # reveal, cursor follower, nav scroll, counters, badge cycler
│   ├── projects.ts   # getProjects, localize (Content Collection ↔ widoki UI)
│   └── utils.ts      # pad, clamp
├── pages/
│   ├── [locale]/
│   │   ├── index.astro            # /en, /pl
│   │   └── projects/[slug].astro  # /en/projects/mokotow, /pl/projects/mokotow, …
├── styles/
│   ├── global.css    # entry — importuje pozostałe
│   ├── tokens.css    # design tokens (--bg, --fg, …)
│   ├── themes.css    # palety, accenty, fonty, dark mode
│   ├── base.css      # reset + typografia + container
│   ├── imagery.css   # warianty placeholderów (placeholder/mono/paper)
│   ├── projects.css  # warianty siatki projektów (cols2/masonry/editorial/list)
│   └── tweaks.css    # styling panelu
└── types/            # Locale, TweakState, …
```

`/` przekierowuje do `/en` (redirects w `astro.config.mjs`).

---

## 🎛️ Panel Tweaks

Sterowane przez data-atrybuty na `<html>`. Wszystkie warianty są CSS-only — JS tylko ustawia atrybut i zapisuje w localStorage.

| Tweak              | Atrybut HTML            | Wartości |
|--------------------|-------------------------|----------|
| Paleta             | `data-theme`            | stone, cool, cream, sage |
| Accent             | `data-accent`           | sand, terracotta, sage, navy |
| Font nagłówków     | `data-hfont`            | cormorant, playfair, fraunces, ebgaramond |
| Font body          | `data-bfont`            | dm, inter, plex, sohne |
| Hero layout        | `data-hero`             | split, fullbleed, typo, editorial |
| Siatka portfolio   | `data-grid`             | cols2, masonry, editorial, list |
| Density            | `data-density`          | loose, medium, dense |
| Image style        | `data-images`           | placeholder, mono, paper |
| Headline copy      | `data-headline`         | default, spaces, briefs |
| Headline size      | `--h1-scale`            | 0.6 – 1.6 |
| Dark mode          | `data-dark`             | on / off |
| Available badge    | `data-eyebrow`          | on / off |
| Reveal on scroll   | `data-reveal`           | on / off |
| Język              | trasa `/en` lub `/pl`   | — |

**Anti-FOUC**: w `BaseLayout.astro` jest inline'owy `<script is:inline>` ustawiający atrybuty z `localStorage` jeszcze przed paintem.

---

## 🌐 i18n

Astro native i18n routing (`astro.config.mjs`):

- `prefixDefaultLocale: true` — wszystkie strony pod `/en/...` lub `/pl/...`
- UI strings w `src/i18n/ui.ts` (silnie typowane)
- Projekty w Content Collection mają pola `name.{en,pl}` i `description.{en,pl}`
- Helper `localize(entry, locale)` spłaszcza projekt do wybranej wersji językowej
- Toggle języka w panelu Tweaks zmienia trasę (`swapLocale(pathname, 'pl')`)

Dodanie nowego języka: dopisz kod do `LOCALES` w `src/types/locale.ts`, dodaj klucze do `UI` i `HEADLINES`, uzupełnij `name` i `description` w plikach `.md`.

---

## 🧩 Dodawanie projektu

Stwórz nowy plik `src/content/projects/<slug>.md` ze schematem zgodnym z `src/content.config.ts`:

```yaml
---
order: 9
cat: Residential
year: 2025
location: Warsaw, PL
role: Lead architect
type: Private home
area: 200 m²
status: In progress
team: Solo
name:
  en: New Project
  pl: Nowy projekt
description:
  en:
    - First paragraph in English.
    - Second paragraph.
  pl:
    - Pierwszy akapit po polsku.
    - Drugi akapit.
---
```

Trasy `/en/projects/<slug>` i `/pl/projects/<slug>` zostaną wygenerowane automatycznie przy buildzie.

---

## 🎨 View Transitions

`<ClientRouter />` w `BaseLayout.astro` daje SPA-like przejścia. Karta projektu i strona detalu współdzielą `transition:name` na tytule i media — tytuł animuje się płynnie przy klikaniu w kartę.

---

## 🧪 Testowalność

- Logika biznesowa siedzi w `src/lib/` jako pure functions — łatwa do testowania w Vitest.
- Komponenty `.astro` są thin presentation: dane przychodzą via props z poziomu strony.
- Storybook (`npm run storybook`) zawiera przykładowe stories dla atomów UI (HTML-based, bo Astro nie ma oficjalnego Storybook frameworka).

---

## 📦 Stack

- **Astro 5** (`output: 'static'`)
- TypeScript strict mode
- CSS Variables + scoped `<style>` w komponentach
- Brak frameworków UI (zero JS dla większości strony)
- Vanilla TS dla panelu Tweaks (zero kosztu hydration)
- Prettier + ESLint + Storybook 8

---

## 🚢 Deployment

`output: 'static'` — buduje do `dist/` i można hostować gdziekolwiek (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, własny serwer Nginx).

Jeśli chcesz SSR, zamień adapter w `astro.config.mjs`:

```js
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  // ...
});
```

---

## 📝 Licencja

Prototype. Użyj jak chcesz.
