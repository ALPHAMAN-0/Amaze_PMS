- Build (dev): `npm run dev` → `next dev --turbopack` (package.json)
- Build (prod): `npm run build` → `next build --turbopack` (package.json)
- Start: `npm run start` → `next start` (package.json)
- Lint: `npm run lint` → `eslint` (package.json)
- No test script defined in package.json.
- package-lock.json present at repo root — use npm, not yarn/pnpm.

Files worth reading first:
- README.md — stack, architecture rationale, accessibility/perf conventions
- src/lib/data.ts — all typed content lives here, components render whatever they're fed
- src/app/layout.tsx — root layout, fonts, providers, JSON-LD

Architecture: see ARCHITECTURE.md — read before structural changes
