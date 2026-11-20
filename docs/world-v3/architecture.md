# SHREYA.EXE V3 — GSAP world: architecture & timeline

## Architecture
- `app/page.tsx` renders `<WorldExperience/>` (components/world). One pinned stage, one ScrollTrigger (`pin`, `scrub: 0.7`, `end: +=5 viewports`), one GSAP master timeline.
- `lib/world/gsap.ts` is the only place GSAP plugins are registered (ScrollTrigger, ScrollToPlugin, useGSAP).
- `lib/world/destinations.ts` is the validated destination registry (ids, chapter, colour, island position, camera pose, legacy hash aliases).
- `lib/world/navigation.ts` is the single navigation layer: `WORLD_TRAVEL` / `WORLD_ARRIVED` events, `travelTo`, `resolveDestination`, `worldTravelFromAction` (Nova adapter), hash/history sync.
- Wheel, trackpad, touch, keyboard (←/→, [ ]), world map, progress dock, direct select, back/forward and deep links all go through the same controller (`goTo`) and a directional snap, so one gesture is one island.
- Nova: the global widget and its single conversation state are untouched. Navigation actions are validated against the registry, converted to a world event, then animated by GSAP. The LLM never touches GSAP. The current island is sent as `state.destination` (validated server-side) so answers are island-aware.
- Content comes from `portfolioData`, `data/experience.ts` and `lib/world/content.ts` (derived, no invented metrics).
- Modes: pinned (default) and stacked (prefers-reduced-motion or the "Simple page" toggle, persisted in localStorage). Both render the same scene components.
- Interior routes (/projects, /projects/[slug], /experience, /journal, /contact) are preserved; they get a short GSAP entrance and a "Return to the world" link (`/#<island>`).

## Timeline
Master timeline duration is exactly 5; one unit per leg; labels `intro → basecamp → buildlab → journey → frontier → connection`. A proxy camera `{cx, cy, s, r}` is tweened per leg (scale dip for the flight arc, small bank rotation) and written as direct `transform` to the world plane and four parallax layers. Route paths draw via stroke-dashoffset, the accent colour var is tweened per stop, and each panel reveals with autoAlpha plus staggered `[data-reveal]`. Only transform/opacity are animated. The timeline is rebuilt only on a real viewport change; progress is preserved.

## Known caveats
- LawGPT title differs between `data/experience.ts` (AI Research Intern) and the resume (AI Engineer Intern); needs an owner decision.
- ET GenAI year: data says 2026, the old home page said 2025.
- `/SDE.pdf` is an older resume that contains a phone number.
- Legacy homepage components are now unused but left in place (cleanup follow-up).
- Touch was verified through emulation only; live LLM not tested (no API key in sandbox).
