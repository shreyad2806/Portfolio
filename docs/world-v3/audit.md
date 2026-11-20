# World V3 — repository audit (Phase 1)

Baseline: `main` @ 1f61cb7 (Nova V1 + V2 merged). Stack: Next.js 15.3.9, React 18, TypeScript, Tailwind 3, framer-motion 11, vitest. No GSAP, no Three.js.

## 1. Existing architecture
- `app/layout.tsx` mounts, for every route: `SiteBackdrop`, `InteractionLayer`, `{children}`, `SiteFooter`, and the global `NovaWidget` (launcher → panel). Ten CSS files are imported globally (`globals.css` is 2.7k lines).
- Interior routes: `/projects`, `/projects/[slug]`, `/experience`, `/journal`, `/contact` (+ a legacy `/blog`). They use `theme/PageHero` and `theme/NextDestinations`.
- Nova (V2) lives in `lib/nova/*` (engine, retrieval, providers, knowledge, tools) and `components/nova/*`. It returns `NavAction`s (`navigate` / `link`) built from whitelists in `lib/nova/tools/registry.ts`; the client (`NovaNavigationAction`, `NovaSources`) either `router.push`es or `scrollIntoView`s a section id on `/`.

## 2. Current homepage structure (`app/page.tsx`)
Linear stack: `Navbar` → `ExplorerHero` (`HeroBackdrop`, `HeroWorld`, `NovaAssistant` intro card) → `TechMarquee` → `TechnicalExpertise` (#skills) → `RouteDivider` → `FeaturedProjects` (#projects) → `JourneySection` (#journey) → `CurrentFocus` (#focus) → `LatestBlog` → `ContactCTA` (#contact), with `RouteDivider`s between. Section ids are the anchors Nova and the navbar use.

## 3. Reusable assets
- Island artwork: `public/images/island-{basecamp,buildlab,journey,frontier,connection}.webp` (55–107 KB each) plus `.svg` variants, `explorer-world.svg`, `nova-3d.webp`. Enough for a 2.5D camera/parallax world without WebGL.
- Data: `lib/portfolio-data.ts` (profile, `technicalExpertise`, projects, contact), `lib/flagship.ts` (flagship display metadata, thumbs in `public/images/home-projects`), `lib/project-pages.ts` / `project-detail-data.ts` (case studies), `data/experience.ts`, `data/blog.ts`, `data/contact.ts`.
- Design tokens/colour map: `components/theme/destinations.ts` (`PLACES`, accents violet `#b49aff`, cyan `#66e9f4`, amber `#ffc46e`, mint `#78e5bd`, pink `#f58dc8`).
- Reusable components: `TechnicalExpertise` (data-driven), `FeaturedProjects`, `ContactCTA`, `LatestBlog`, project card/section components.

## 4. Existing animations
- framer-motion: `whileInView` fades in every home section, hover lifts, `NovaAssistant` tilt springs, `Navbar` indicator.
- CSS keyframes in `explorer-hero.css`/`world-theme.css` (floating islands, rings, gems).
- `InteractionLayer` (cursor/pointer effects) and `SiteBackdrop` (global starfield) on every route.
No scroll-linked or pinned animation exists.

## 5. Duplicate / conflicting / obsolete code
| Item | Finding |
|---|---|
| `WorldCanvas`, `WorldAtlas`, `NovaSidekick`, `Hero`, `ArchitectureFlow`, `SystemsGraph`, `EngineeringSnapshot`, `CurrentlyExploring`, `HackathonStrip` | **No importers** (dead experiments / earlier iterations; `NovaSidekick` is only imported by dead `WorldCanvas`). Not reused; left untouched in this PR and listed for later removal. |
| Destination lists | Defined three times: `ExplorerHero.destinations`, `theme/destinations.PLACES`, `lib/nova/tools/registry.DESTINATIONS`. V3 adds one world registry that derives from `PLACES` and is the only thing Nova's adapter may target. |
| Experience data | **`JourneySection` hardcodes its own timeline** (StartupCrafters, LawGPT, achievements) separate from `data/experience.ts`. They disagree: the hardcoded section and the resume say **"AI Engineer Intern"** at LawGPT; `data/experience.ts` says **"AI Research Intern"**. V3 reads experience from one source (`data/experience.ts` + the shared achievements list) so the conflict exists in exactly one place; **this needs an owner decision** (Nova's knowledge base treats the resume as approved). |
| Hero metrics | `ExplorerHero` hard-codes "8+ projects", "4+ production-style systems", "20+ technologies" and `FeaturedProjects` shows stats like "17+ workflow nodes". These are existing claims; V3 does not invent new ones and drops the unsourced counters from the entrance. |
| Navbar | Logo links to `#home`; links are route-based. On the world page it must also drive the world controller. |

## 6. Nova integration points
- `NovaWidget` is global and stays. Conversation state lives in `useNova` (one instance in the widget).
- Navigation is already validated server-side (whitelist ids → hrefs). V3 adds a **client-side navigation adapter**: validated `NavAction` → `world:navigate` event (only when on `/` and the target is a world destination) → master controller. Otherwise unchanged `router.push`. The LLM never touches GSAP.
- Context awareness: the world publishes the current destination (`data-world-destination` on `<html>` + a `world:arrived` event); `useNova` can send it as a hint with the request.

## 7. Proposed scene architecture
One `WorldExperience` client component owns **one** GSAP master timeline + **one** ScrollTrigger (pin + snap), labels `intro, basecamp, buildlab, journey, frontier, connection`. Layers (starfield, nebula, routes, islands, foreground) are plain DOM/SVG transformed by the timeline (transform/opacity only). Scene content panels are normal React components revealed by timeline-driven opacity. A `useWorldNavigation` hook is the single entry point (scroll, keys, map, Nova, hash) and calls `scrollTo(label position)`; ScrollTrigger remains the only source of truth for progress, so state never forks. React state updates only on destination change (not per frame).
Fallbacks: `prefers-reduced-motion`, small/touch-hostile viewports or no-JS render the same scenes as an ordinary stacked, non-pinned page (every section preserved).

## 8. Files
**Add:** `components/world/**`, `lib/world/*` (registry, gsap client module), `docs/world-v3/*`, world CSS (`app/world.css`).
**Modify:** `app/page.tsx` (compose `WorldExperience`), `app/layout.tsx` (css import), `Navbar` (world-aware), `NovaNavigationAction` / `NovaSources` (adapter), `package.json` (gsap, @gsap/react), interior route heroes (Return to World).
**Preserve (unchanged):** `lib/nova/**` engine/knowledge/providers, `NovaWidget` + chat UI, interior route pages/data, `lib/portfolio-data.ts`, project case-study components, all island assets.
**Not touched / dead:** see §5.

## 9. Risks
Pinned scroll vs. mobile browser chrome (use `100svh` + `ignoreMobileResize`), keyboard/screen-reader traps (non-pinned fallback + skip link), duplicate ScrollTriggers on route change (`useGSAP` scope + revert), CLS (fixed-size stage), bundle size (GSAP core + ScrollTrigger ≈ 45 KB gz, dynamic-imported on the home route only).
