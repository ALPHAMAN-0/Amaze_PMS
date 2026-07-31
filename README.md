# Amaze PMS — Premium Rebuild

A ground-up redesign of [amazepms.com](https://www.amazepms.com) — Amaze Property
Management Solutions, a fully in-house facility-management company from Hyderabad —
rebuilt as a premium, animation-rich marketing site. Built as a hiring assignment;
the business facts are real, the design system ("Quiet Precision") and all copy,
graphics, and code are original.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + hand-written CSS layer (tokens, keyframes, glass utilities) |
| Micro-interactions | Motion (Framer Motion) 12 |
| Scroll scenes | GSAP 3.15 + ScrollTrigger + DrawSVG |
| Smooth scroll | Lenis |
| Fonts | Bricolage Grotesque · Instrument Sans · Instrument Serif · IBM Plex Mono (via `next/font`) |

No photo assets and no icon library — every graphic (layered skyline, blueprint
tower, service orbit, dot-matrix India map, 17-icon line set) is hand-built
SVG/CSS in `src/components/graphics/`.

## Getting Started

Prerequisites: Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build       # static export to ./out
npx serve out       # preview the export locally
npm run lint        # eslint
```

## Deployment

Pushes to `main` build a static export (`output: "export"` in
[next.config.ts](next.config.ts)) and deploy it to GitHub Pages via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). `basePath`/`assetPrefix`
are derived automatically from `GITHUB_REPOSITORY` at build time, so the same config
works locally (served at `/`) and on Pages (served at `/<repo-name>/`).

One-time setup: repo **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

## Highlights

- **Pinned stats scene** — a blueprint tower draws itself stroke-by-stroke while
  all four counters scrub *with* the scroll (scroll back and they wind down).
- **Horizontal services rail** — the section pins and seven glass cards scrub
  sideways with counter-parallaxed icons, a gradient progress rail, and a
  `01 / 07` mono readout. Below `lg` the pin is dropped for a native
  scroll-snap carousel.
- **Contact form state machine** — a hand-rolled `useReducer` (no form library)
  with Indian-mobile regex validation, on-blur + on-submit passes, animated
  error rows, an invalid-submit shake, and an SVG check-draw success state.
- **LCP-safe hero** — the headline is server-rendered and enters via CSS
  keyframes, so the largest paint never waits for hydration.

## Architecture

```
src/
├── app/                  routes (Server Components), globals.css, sitemap, robots
├── components/
│   ├── providers/        SmoothScrollProvider — one Lenis instance on GSAP's ticker
│   ├── layout/           Header (scroll-aware glass), MobileNav, Footer
│   ├── sections/         home/ services/ about/ contact/ — one component per section
│   ├── ui/               Reveal, GlassCard, SectionHeading, MagneticButton,
│   │                     Marquee, BackToTop
│   └── graphics/         all hand-built SVG components + icon set
├── lib/                  data.ts (all typed content), animations.ts, gsap.ts, hooks/
└── types/                content interfaces
```

Decisions worth noting:

- **Server-first**: every `page.tsx`/`layout.tsx` is a Server Component;
  `'use client'` is confined to animation leaves, so per-route JS stays lean.
  The two GSAP scenes are code-split with `next/dynamic` (SSR stays on).
- **Data-driven**: all copy lives in `src/lib/data.ts` behind typed interfaces
  (`satisfies` keeps literals narrow) — components render whatever they're fed.
- **One motion language**: a shared easing (`cubic-bezier(0.22, 1, 0.36, 1)`),
  duration, and stagger vocabulary in `lib/animations.ts` + CSS custom
  properties, so Framer, GSAP, and CSS animations all feel like one system.
- **Lenis + ScrollTrigger on one clock**: Lenis is driven from `gsap.ticker`
  (with `lagSmoothing(0)`) and pings `ScrollTrigger.update` — the canonical
  wiring that keeps pinned scrubs judder-free. `ScrollTrigger.refresh()` runs
  after `document.fonts.ready` so pin distances are measured with real fonts.
- **StrictMode-safe GSAP**: every trigger is created inside `useGSAP` with a
  scope, so React 19's dev double-invoke can't leak duplicate ScrollTriggers.

## Accessibility & Performance

- `prefers-reduced-motion` honored at three layers: Framer
  (`MotionConfig reducedMotion="user"`), GSAP (`gsap.matchMedia` skips scenes
  and sets end states; Lenis is never instantiated), and CSS (all looping
  keyframes disabled).
- Only `transform` / `opacity` / `stroke-*` / `clip-path` are animated;
  counters write to `textContent` via refs — never React state per tick.
- Semantic landmarks and heading order per page, focus-visible rings
  everywhere, `aria-invalid`/`aria-describedby`/`role="alert"` on the form,
  keyboard-reachable carousel and rail cards, `tabular-nums` on all counters.
- Per-route Metadata API + OpenGraph, `sitemap.ts`, `robots.ts`, JSON-LD
  `LocalBusiness`, SVG favicon.

## What I'd Do Next

- Wire the contact form to a real endpoint (Route Handler + email service)
- A thin CMS (or MDX) for the content module
- Playwright smoke tests for the form state machine and reduced-motion paths
- Per-service OG images via `next/og`

---

Built with Next.js 15 · Tailwind v4 · Motion · GSAP · Lenis.
