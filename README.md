# Shreya Dubey — AI Engineer Portfolio

A minimal, dark, production-grade homepage built with Next.js 15, TypeScript,
Tailwind CSS, and Framer Motion. The homepage answers who Shreya is, what she
builds, her best work, and how to get in touch — all within the first
viewport and scroll.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx      Root layout, fonts (Inter + JetBrains Mono), metadata
  page.tsx         Homepage — composes all sections
  globals.css      Design tokens and shared utility classes
components/
  Navbar.tsx             Sticky top navigation
  Hero.tsx               Hero copy, CTAs, tech chips
  SystemsGraph.tsx       Signature hub-and-spoke AI systems diagram
  EngineeringSnapshot.tsx  Four stat cards
  FeaturedProjects.tsx   TalentLens (large) + 2 medium project cards
  CurrentFocus.tsx       "Currently building: ContextOS"
  LatestBlog.tsx         Single featured article card
  ContactCTA.tsx         Contact links + footer
```

## Design tokens

| Token       | Value     |
|-------------|-----------|
| Background  | `#09090B` |
| Card        | `#111217` |
| Border      | `#23242C` |
| Primary     | `#8B5CF6` |
| Text        | `#F8FAFC` |
| Muted       | `#94A3B8` |
| Radius      | `16px`    |

Display/body typeface: **Inter**. Technical labels, chips, and node labels in
the systems graph use **JetBrains Mono** — a deliberate nod to the engineering
subject matter.

## Notes

- `resume.pdf` is referenced by the Resume buttons — drop your resume file
  into `public/resume.pdf` (create the `public/` folder if it doesn't exist).
- `/projects`, `/experience`, `/blog`, and `/contact` are linked from the nav
  and "View all" links but not yet built — only the homepage is implemented,
  per the brief.
- Respects `prefers-reduced-motion`.
