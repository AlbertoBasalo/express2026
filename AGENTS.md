# Agents Instructions

- **Root_Folder**: `/`
- **Agents_Folder**: `/.agents` 
- **Agents_file**: `/AGENTS.md`
- **Project_Folder**: `/project` 

## Product Overview

**Node Express 2026** is a TypeScript Express 5 boilerplate for building REST APIs with a layered structure per route.

## Technical Implementation

### Tech Stack

- **Language**: TypeScript (`^6.0.2`) targeting ES2022 with strict compiler options
- **Framework**: Express (`^5.2.1`) on Node.js ESM (`module: nodenext`)
- **Database**: No database, just json files at `./data` folder 
- **Security**: No security configured yet
- **Testing**: Vitest (`^4.1.3`) for unit tests, Playwright (`^1.59.1`) for e2e
- **Logging**: Custom request logger middleware + `console` output

### Development workflow

```bash
# Set up the project
npm install

# While developing, watch for changes and run tests automatically
# Static linting and type checking
npm run lint
# Watch and compile the project
npm run dev
# Watch and run unit tests
npm run test:dev

# Run unit tests
npm run test:unit
# Run end-to-end tests
npm run test:e2e

# Run all tests before merging or publishing
npm run test

# Build/Compile the project for production
npm run build
# Run the project as a production server
npm start
```

### Folder structure
```text
.                         # Project root  
├── AGENTS.md             # Agent instructions for this repository
├── README.md             # Project overview
├── package.json          # Scripts and dependencies
├── tsconfig.json         # TypeScript compiler config
├── playwright.config.ts  # E2E test configuration
├── data/                 # Runtime JSON data source(s)
│   └── home.content.json
├── dist/                 # Compiled output
├── project/              # Project-specific documentation
│   └── ADD.md            # Architecture Design Document
├── src/                  # Application source
│   ├── server.ts
│   ├── app.factory.ts
│   ├── api.routes.ts
│   ├── env.config.ts
│   ├── middleware/       # Middleware for the main server
│   ├── routes/           # Routes for the main server
│   └── shared/           # Shared utilities for server and routes
└── tests/                # Playwright e2e tests
```

## Environment
- **OS dev**: `Windows`
- **Terminal**: `PowerShell`
- **Default branch**: `main`
- **Git remote**: Not configured yet (no remote returned by `git remote -v`)

## Behavior Guidelines

- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness when needed to fit response limits.
- When using templates, replace placeholders with concrete, repository-derived values.
- Always lint with `npm run lint` before staging and committing changes.

### Naming Conventions

- TypeScript file naming conventions: `<domain>.<technology>.ts`
- Tests file naming conventions: `<file_or_spec-slug>.test.ts`

Use slugs with hyphens for any identifiers or non code file names.

Prefix commit messages with the following tags:

- `chore:` : For routine tasks, maintenance, or non-functional changes.
- `docs:` : For documentation changes.
- `feat:` : For new features or significant changes.
- `fix:` : For bug fixes or minor improvements.
- `refactor:` : For code refactoring or improvements.
- `test:` : For adding or updating tests.

For specifications and branches use only `chore_`,`feat_` or `fix_` as prefixes.