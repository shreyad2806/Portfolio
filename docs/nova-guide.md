# Nova — SHREYA.EXE portfolio guide

Nova is the interactive, deterministic guide embedded in the portfolio. It is intentionally separate from an LLM chat product: visitor questions are handled in the browser by a small intent matcher and a curated set of portfolio answers.

## Runtime architecture

```text
ExplorerHero / GlobalNova
        |
        v
   NovaAssistant
   - conversation state
   - quick prompts
   - destination shortcuts
   - minimize / close / reset
        |
        v
    answerNova()
    lib/nova-engine.ts
   - normalize visitor input
   - match known topics and projects
   - return a grounded answer
   - optionally return a destination ID
        |
        v
   onNavigate(destinationId)
   - homepage: smooth-scroll to section
   - interior pages: return to the matching homepage section
```

There is no network request, model provider, API key, server-side conversation history, or persistence of visitor messages. Conversation state lives in React component state and disappears when the page is refreshed.

## Five destinations

| Destination | Purpose | Homepage section |
| --- | --- | --- |
| Basecamp | Profile, background, technical skills | `#skills` |
| Build Lab | Projects, systems, repositories | `#projects` |
| Journey | Experience, education, hackathons, leadership | `#journey` |
| Frontier | Current explorations and engineering interests | `#focus` |
| Connection Hub | Contact and collaboration links | `#contact` |

The homepage and interior-page dock both use the same `NovaAssistant` component. The only difference is the navigation callback passed by the host page.

## Answer flow

1. `NovaAssistant` receives a visitor question.
2. `answerNova` normalizes casing and punctuation.
3. Ordered topic matchers identify a project or portfolio topic.
4. The engine returns a concise, curated answer, optional destination ID, and suggested follow-up questions.
5. The component appends the visitor and assistant messages to local state.
6. If a destination is relevant, the visitor can select the action to navigate there.

Specific project matchers run before broad project matchers so a question about Kavach or CloseLoop gets a focused explanation instead of a generic project list.

## Adding or updating knowledge

Edit `lib/nova-engine.ts`:

- Add a topic matcher to `answerNova`.
- Place specific project or employer matchers before broad categories.
- Return `makeReply(answer, destinationId, suggestions)`.
- Use only facts already supported by the portfolio content.
- Use one of the five destination IDs so the guide can offer a working navigation action.

For new navigation destinations, update `novaDestinations` and the corresponding host-page section mapping. Keep the IDs stable because both the homepage and global dock depend on them.

## UI and accessibility

- The portrait, destination cards, conversation, suggestion chips, and input are contained in `NovaAssistant`.
- `app/nova.css` owns the Nova-specific responsive styles.
- The guide supports minimize, close/reopen, reset conversation, keyboard form submission, and screen-reader live announcements.
- Reduced-motion preferences are respected by the Nova-specific CSS and Framer Motion animations.
