# Instructions

## Product

{short description of the product, its purpose, and main features}

## Environment

### Configuration

- **Root_Folder**: `/`
- **Agents_Folder**: `/.agents` | `/.claude` | `/.github`
- **Agents_file**: `/AGENTS.md` | `/CLAUDE.md` | `/.github/copilot-instructions.md`
- **Project_Folder**: `/project` | `/docs`
- **OS dev**: `Windows` | `Linux` | `MacOS`
- **Terminal**: `PowerShell` | `Git Bash` | `Terminal`
- **Default branch**: `main` | `master` | `trunk`
- **Git remote**: {URL of the git remote repository}

### Behavior

- When using templates, replace {placeholders} with concrete values.
- Code and documentation must be in {language}.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness when needed to fit response limits.
- Always lint with `npm run lint` before staging and committing changes.

### Conventions

Use slugs with hyphens for any identifiers: `add-task`, `fix-bug`, `update-deps`.

## Technology

### Stack

- **Language**: {Programming language(s) used in the project}
- **Framework**: {Framework(s) used in the project}
- **Database**: {Database(s) used in the project}
- **Security**: {Security configuration}
- **Testing**: {Testing frameworks}
- **Logging**: {Logging configuration}

### Workflow

```bash
# Set up the project
{commands to set up the project}

# While developing, watch for changes and run tests automatically
# Watch and compile the project while developing
{commands to watch and compile the project}
# Watch and run unit tests while writing tests
{commands to watch and run unit tests}
# Static linting and type checking after writing code
{commands to lint the project}

# Run unit tests
{commands to run unit tests}
# Run end-to-end tests
{commands to run end-to-end tests}

# Run all tests before merging or publishing
{commands to run all tests}

# Build/Compile the project for production
{commands to build the project}
# Run the project as a production server
{commands to run the project}
```

### TreeView

```text
.                         # Project root
├── {agents_file}         # This file contains instructions for agents
├── README.md             # Project overview
├── {agents_folder}/      # Agents skills and prompts
│   └── skills/           # Agent skills for specific tasks
├── {project_folder}/     # Project-specific documentation
│   ├── ADD.md            # Architecture Design Document
│   ├── PRD.md            # Product Requirements Document
│   └── specs/            # Project specifications
├── src/                  # Application source
└── other/                # Any other relevant folders or files
```


