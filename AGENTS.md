# Agents Instructions

### Behavior
- Replace `{placeholders}` when using templates.
- `{slug}`: a short (≤20 chars), unique identifier for an artifact.
- Chat: user language. Code/docs: `English`.
- Concise; closed questions one at a time when unclear.

### Environment
- **`.agents/`** — Agent skills, prompts, and workflow tooling.
- **`project/`** — Product specs, plans, architecture docs, and reports.
- **`src/`** — Application source (see **Technology**).
- **OS** `Windows`
- **Shell** `PowerShell` | `bash`
- **Git** `https://github.com/AlbertoBasalo/express-boilerplate.git`
- **Git Branch** default `main`

**Layout:**
```txt
express2026/
├── `AGENTS.md`
├── `.agents/`
│   ├── `skills/`
│   ├── `prompts/`
│   └── `agents/`
├── `project/`
│   ├── `specs/`
│   ├── `plans/`
│   ├── `arch/`
│   ├── `rules/`
│   ├── `design/`
│   └── `reports/`
├── `src/`
├── `tests/`
├── `README.md`
├── `CHANGELOG.md`
```

###  Git
- Conventional commits; branches `feat/{slug}` | `fix/{slug}` | `chore/{slug}`.
- Create a new branch before coding. The branch name is `feat/{slug}`.
- Commit at the end of any skill execution.

### AIDD product artifacts
Under `project/`:

| Artifact | Path |
|---|---|
| Spec | `specs/{slug}.spec.md` |
| Plan | `plans/{slug}.{source?}.{tier?}.plan.md` |
| Report | `reports/{slug}.{type}.report.md` |

- `{source?}`: `spec` | `report` | omit.
- `{tier?}`: `back` | `front` | `db` | `fullstack` | omit.
- `{type}`: `quality` | `compliance` | `accessibility` | `verify`

### Implementation context (brownfield)

When `project/arch/` or `rules/` exist (from `/explore` and `/extract`), `/planify`, `/codify`, and `/verify` read the files below in order. Skip missing files. Do not duplicate arch content into rules files.

| # | File | Skills |
|---|------|--------|
| 1 | `arch/system.arch.md` | `/planify` |
| 2 | `arch/{tier}.arch.md` | `/planify`, `/codify` |
| 3 | `arch/ADR.md` | `/planify` |
| 4 | `rules/{tier}.rules.md` | `/codify` |
| 5 | `rules/naming.rules.md` | `/codify` |
| 6 | `rules/testing.rules.md` | `/codify`, `/verify` |

**Apply:** Plans and code respect ADRs and arch constraints; match naming, roles, and errors from tier rules; tests follow `testing.rules.md` when present.

### Spec status
```yaml
---
spec-slug: {slug}
status: draft | planned | in-progress | verified | released | cancelled
released-version:
released-at:
---
```
#### Spec status state machine

| Status | Action | New Status |
|--------|--------|------------|
| - | `/specify` | `draft` |
| `draft` | `/planify` | `planned` |
| `planned` | `/codify` | `in-progress` |
| `draft` or `planned` | `/codify` (user skips `/planify`) | `in-progress` |
| `in-progress` | `/verify` | `verified` |
| `verified` | `/release` | `released` |
| `released` | No action. | `released` |
| `cancelled` | No action. | `cancelled` |

## Technology

TypeScript 6 on Node.js ESM with Express 5, Biome linting, Vitest unit tests, and Playwright E2E.

| Tier | Folder | Language | Framework | Build | Run | Test |
|------|--------|----------|-----------|-------|-----|------|
| Back | `src/` | TypeScript 6 | Express 5 | `npm run build` | `npm run dev` / `npm run start` | `npm run test:unit` |
| E2E | `tests/` | TypeScript 6 | Playwright | `—` | `—` | `npm run test:e2e` |

## Product

**Express2026** is a TypeScript Express 5 boilerplate for building REST APIs with strict layering and minimal dependencies.

- Per-route layered modules: router, validation, controller, service, repository
- Structured errors and validation without third-party schema libraries
- JSON file storage under `data/`, sample `home` route, Vitest unit tests and Playwright E2E

## Principles
1. **Think** — surface tradeoffs; don't assume or hide confusion.
2. **Simplicity** — minimum code; nothing speculative.
3. **Surgical** — touch only what's needed; clean only your mess.
4. **Goal-driven** — loop until success criteria are verified.

> last updated: May 2026
