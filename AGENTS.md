# Instructions

## Product

**Node Express 2026** is a TypeScript Express 5 boilerplate for building REST APIs with a layered structure per route.

## Environment

### Configuration

- **Root_Folder**: `/`
- **Agents_Folder**: `/.agents`
- **Agents_file**: `/AGENTS.md`
- **Project_Folder**: `/project`
- **OS dev**: `Windows`
- **Terminal**: `PowerShell` or `Git Bash`
- **Default branch**: `main`
- **Git remote**: `https://github.com/AlbertoBasalo/express2026.git`

### Behavior

- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness when needed to fit response limits.
- When using templates, replace {placeholders} with concrete values.
- Always lint with `npm run lint` before staging and committing changes.

### Conventions

Use slugs with hyphens for any identifiers: `add-task`, `fix-bug`, `update-deps`.

## Technology

### Stack

- **Language**: `TypeScript 6` targeting ES2022 with strict compiler options
- **Framework**: `Express 5` on `Node.js ESM`
- **Database**: No database, just json files at `./data` folder
- **Security**: No security configured yet
- **Testing**: `Vitest 4` for unit tests, `Playwright 1.5` for e2e
- **Logging**: Custom request logger middleware + `console` output

### Workflow

```bash
# Set up the project
npm install

# While developing, watch for changes and run tests automatically
# Watch and compile the project while developing
npm run dev
# Watch and run unit tests while writing tests
npm run test:dev
# Static linting and type checking after writing code
npm run lint

# Run unit tests
npm run test:unit
# Run end-to-end tests
npm run test:e2e

# Run all tests before merging or publishing
npm test

# Build/Compile the project for production
npm run build
# Run the project as a production server
npm start
```

### TreeView

```text
.                         # Project root
├── AGENTS.md             # This file contains instructions for agents
├── README.md             # Project overview
├── .agents/              # Agents skills and prompts
│   └── skills/           # Agent skills for specific tasks
├── project/              # Project-specific documentation
│   ├── ADD.md            # Architecture Design Document
│   ├── PRD.md            # Product Requirements Document
│   └── specs/            # Project specifications
├── src/                  # Application source
├── tests/                # Playwright e2e tests
├── data/                 # Runtime JSON data source(s)
└── dist/                 # Compiled output
```


