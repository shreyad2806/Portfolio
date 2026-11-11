# Knowledge management

Ground truth is `nova-knowledge/` (Markdown) derived from the portfolio data and the resume. **Nova must never state anything that is not in these files.**

## Add or change knowledge
1. Create/edit a Markdown file in the matching folder (`profile, education, projects, experience, achievements, skills, interests, portfolio`):
   ```md
   ---
   title: My New Project
   category: projects
   source: portfolio data / resume / README
   last_updated: 2026-11-12
   verified: true      # false until Shreya has confirmed every statement
   tags: [project, fastapi, rag]
   ---
   # My New Project
   ## Overview
   ...
   ```
2. Unknown details: write `TODO(human): …` instead of guessing, and set `verified: false`. Unverified documents are never used to answer (Nova says it has a note that isn't confirmed yet).
3. Run `npm run nova:ingest`, then commit `nova-knowledge/index.json` and `manifest.json` with the change. CI/pre-merge: `npm run nova:ingest:check`.
4. For an answer that must be exact, add an entry to `nova-knowledge/faq.json` (served without any LLM).
5. Run `npm test` and `npm run nova:eval`; add a question to `scripts/nova/evaluate.ts` for the new content.

## Open items needing human verification
Documents with `verified: false`: `experience/bluestock`, `projects/thumblyai`, `achievements/leadership-community`, `achievements/open-source` (9 `TODO(human)` markers in total). Known inconsistencies in the sources: the LawGPT role title (Journey page "AI Research Intern" vs resume "AI Engineer Intern") and the ET GenAI Hackathon year (2026 vs 2025).

## Deliberately excluded
`public/SDE.pdf` is an older resume that contains a personal phone number and outdated facts; it is not ingested (`sources.json` is empty). Consider replacing or removing it from `public/`.
