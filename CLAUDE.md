# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is the project workspace for **Tarik Invest s.r.o.** (a Czech investment company). It is currently **pre-code**: there is no application source, no `package.json`, no build system, and it is not a git repository. The only concrete assets are:

- `assets/TARIK_Invest_logo_transparent.png` — the brand logo (transparent PNG).
- `.claude/rules/` — a library of design "skill" rule files that act as project instructions.

There are no build, lint, or test commands because there is no codebase yet. When work begins (likely a website or web app for the company), scaffold the stack first, then add the relevant commands to this file.

## The design skill system (`.claude/rules/`)

The center of gravity for this project is the set of `SKILL.md` files under `.claude/rules/`. These are **active project instructions** (loaded via the CLAUDE.md instruction mechanism) — they are not documentation to be ignored. They override default behavior. `.claude/rules/llms.txt` is the index describing each one:

- **taste-skill** — primary skill for premium frontend code (layout, type, color, spacing, motion). Has dial config: `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 4`.
- **gpt-tasteskill** — Awwwards-level GSAP-driven UI; requires a `<design_plan>` block before any UI code.
- **soft-skill** — expensive, soft "Apple/Linear-tier" UI with nested "Double-Bezel" cards and motion choreography.
- **minimalist-skill** — clean editorial Notion/Linear style, warm monochrome, strict bans.
- **brutalist-skill** — Swiss/industrial-telemetry UI, extreme type contrast (Beta).
- **redesign-skill** — audit-and-fix workflow for upgrading existing projects (do not rewrite from scratch).
- **image-to-code-skill** — image-first: generate design reference images, deeply analyze them, then implement to match.
- **imagegen-frontend-web / imagegen-frontend-mobile / brandkit** — image-generation-only skills (no code output); one horizontal image per section for web, per-screen for mobile.
- **stitch-skill** — generates `DESIGN.md` files for Google Stitch; the committed `.claude/rules/stitch-skill/DESIGN.md` is the current design-system source of truth.
- **output-skill** — anti-laziness: forbids placeholder comments (`// ...`, `// TODO`), skeletons, and "rest follows the same pattern" omissions. Deliver complete files.

### Cross-cutting rules these skills enforce (apply to all frontend work here)

- **No emojis** anywhere — in code, comments, markup, or alt text.
- **Banned fonts:** `Inter`, Roboto, Arial, Helvetica, Open Sans for premium contexts. Use `Geist`, `Satoshi`, `Cabinet Grotesk`, or `Outfit`. Generic serifs banned; use `Fraunces`/`Instrument Serif` only if a serif is needed.
- **No pure black** (`#000000`) — use Zinc-950 / off-black. **No "AI purple/blue"** neon gradients, no oversaturated accents (max one accent, <80% saturation).
- **Layout:** `min-h-[100dvh]` not `h-screen`; CSS Grid over flexbox percentage math; no generic 3-equal-card feature rows; max-width container (~1400px); generous section padding.
- **Content:** no generic names ("John Doe", "Acme"), no fake round numbers (`99.99%`), no copywriting clichés ("Elevate", "Seamless", "Unleash").
- **Assets:** use `https://picsum.photos/seed/{seed}/...` placeholders, never Unsplash links.
- **Performance:** animate only `transform`/`opacity`; isolate CPU-heavy/perpetual animations in `'use client'` leaf components; `IntersectionObserver` not scroll listeners.

### Default stack assumed by the skills

Unless a task specifies otherwise, the skills assume React/Next.js (default to Server Components, isolate interactivity in `'use client'` leaves), Tailwind CSS (check version v3 vs v4 before touching config), `@phosphor-icons/react` or `@radix-ui/react-icons`, and Framer Motion for UI motion (GSAP/Three.js only for isolated scrolltelling/canvas — never mix with Framer Motion in one component tree). **Always verify a dependency exists before importing it; output the install command if missing.**

## Working notes

- The directory name and paths contain non-ASCII characters and spaces (`проєкти Claud/Tarik Invest s.r.o.`). Quote paths in shell commands.
- When choosing a design direction, pick **one** skill aesthetic and commit to it for the whole output rather than mixing (e.g., minimalist vs. brutalist vs. soft).
