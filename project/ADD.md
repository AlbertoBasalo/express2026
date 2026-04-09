# Express2026 Architectural Design Document

TypeScript Express 5 boilerplate for a small REST API with strict layering and minimal dependencies.

### Table of Contents
- [Express2026 Architectural Design Document](#express2026-architectural-design-document)
		- [Table of Contents](#table-of-contents)
	- [Stack and tooling](#stack-and-tooling)
		- [Technology Stack](#technology-stack)
		- [Development Tools](#development-tools)
	- [Systems Architecture](#systems-architecture)
	- [Software Architecture](#software-architecture)
	- [Architecture Decisions Record (ADR)](#architecture-decisions-record-adr)
		- [ADR 1: Runtime bootstrap and app composition separation](#adr-1-runtime-bootstrap-and-app-composition-separation)
		- [ADR 2: Layered route architecture with local wiring](#adr-2-layered-route-architecture-with-local-wiring)
		- [ADR 3: Error and validation strategy without third-party schema libraries](#adr-3-error-and-validation-strategy-without-third-party-schema-libraries)
		- [ADR 4: File-based content source for bootstrap simplicity](#adr-4-file-based-content-source-for-bootstrap-simplicity)

## Stack and tooling

### Technology Stack
- **Language**: TypeScript in strict mode, ES2022 target, Node ESM
- **Runtime**: Node.js with Express
- **Data source**: JSON files in `data/` folder, accessed via a repository abstraction
- **Testing**: Vitest for unit tests and Playwright for end-to-end tests.
- **Static analysis**: Biome plus TypeScript type checking.

### Development Tools
- **Package management and scripts**: npm scripts from `package.json`.
- **Local development workflow**:
  - `npm run dev` runs `tsx watch src/server.ts` with `NODE_ENV=development`.
  - `npm run test:dev` runs Vitest in watch mode.
- **Quality and validation workflow**:
  - `npm run lint` runs Biome checks/fixes and `tsc --noEmit`.
  - `npm run test:unit` runs unit tests.
  - `npm run test:e2e` runs e2e tests.
  - `npm test` runs unit tests then e2e tests.
- **Build and deployment workflow**:
  - `npm run build` compiles to `dist/`.
  - `npm start` builds then starts `dist/server.js`.
- **CI/CD**: Not configured in repository yet

## Systems Architecture

The system is a single-process HTTP API server. Requests enter through Express middleware, route into a bounded route module (`home`), pass through controller-service-repository layers, and return either success payloads or structured errors. Runtime configuration is centralized in `src/env.config.ts`. Persistent content currently comes from local JSON files in `data/`.

```mermaid
C4Context
    title Express2026 System Context
    Person(dev, "API Consumer", "Browser, test runner, or HTTP client")
    System(api, "Express2026 API", "TypeScript Express REST API")
    SystemDb(data, "JSON Data Files", "Local filesystem data source")
    Rel(dev, api, "Calls HTTP endpoints")
    Rel(api, data, "Reads content files")
```

```mermaid
flowchart TD
    A[Client HTTP Request] --> B[Express App createApp]
    B --> C[JSON Parser Middleware]
    C --> D[Request ID Middleware]
    D --> E[Request Logger Middleware]
    E --> F[API Router]
    F --> G[Route Validator Middleware]
    G --> H[Sample Controller]
    H --> I[Sample Service]
    I --> J[Sample Repository]
    J --> K[data/Sample.content.json]
    F --> L[NotFoundError for unmatched routes]
    L --> M[Error Handler Middleware]
    H --> M
    M --> N[JSON Error Response]
    H --> O[Success Response]
```

## Software Architecture

The software architecture follows a layered modular style per route domain with thin framework edge and explicit infrastructure boundaries.

- **Composition boundary**: `src/app.factory.ts` builds middleware and router graph; `src/server.ts` only starts listening.
- **Route module structure**:
  - `sample.controller.ts` handles HTTP contract and response codes.
  - `sample.service.ts` contains business logic (message assembly with timestamp).
  - `sample.repository.ts` isolates data access.
  - `sample.validation.ts` validates request shape.
- **Cross-cutting modules**:
  - `request-id.middleware.ts` for request correlation (`x-request-id`) across logs and error responses.
  - `logger.middleware.ts` for request timing and status logging.
  - `error.middleware.ts` for translating `AppError` to `ApiErrorResponse` payloads and handling unknown errors.
  - `validate.middleware.ts` adapter that converts validator class methods into Express middleware.
  - `rest.consts.ts` for HTTP status codes and shared transport contracts such as `ApiErrorResponse`.
- **Data flow**:
  - Request: middleware -> router -> validator -> controller -> service -> repository -> file utility.
  - Response: controller success path or centralized error middleware path.
- **Design patterns in use**:
  - **Factory functions** (`createApp`, `createApiRouter`) for top-level bootstrap.
  - **Object-Oriented classes** for route layers (`HomeController`, `HomeService`, `HomeRepository`).
  - **Dependency injection via constructor defaults** (class accepts dependencies with defaults).
  - **Repository pattern** for persistence abstraction.
  - **Middleware chain** for transport concerns.

## Architecture Decisions Record (ADR)

### ADR 1: Runtime bootstrap and app composition separation
- **Decision**: Keep `src/server.ts` runtime-only (`listen`) and compose the Express instance in `src/app.factory.ts`.
- **Status**: Accepted
- **Context**: Tight coupling between bootstrap and app wiring makes testing and reuse harder, especially in small projects that still need e2e and unit feedback loops.
- **Consequences**: App composition is import-safe for tests and future hosting variants; startup behavior remains explicit and isolated.

### ADR 2: Layered route architecture with local OOP class wiring
- **Decision**: Use `controller -> service -> repository` OOP classes per route module, with local constructor defaults instead of a global composition root.
- **Status**: Accepted
- **Context**: The project optimizes for workshop readability and low ceremony while preserving dependency direction.
- **Consequences**: Navigation is straightforward and each route remains self-contained; scaling to many routes may eventually require a centralized composition mechanism.

### ADR 3: Error and validation strategy without third-party schema libraries
- **Decision**: Perform request validation through custom OOP validator classes and middleware; standardize domain errors via `AppError`, centralized error middleware, and a shared `ApiErrorResponse` contract for error payload shape.
- **Status**: Accepted
- **Context**: The baseline aims to minimize dependencies and keep transport concerns at the HTTP edge.
- **Consequences**: Low dependency footprint and explicit behavior with a single reusable error-response shape; complex schemas may become verbose and could motivate introducing a schema library later.

### ADR 4: File-based content source for bootstrap simplicity
- **Decision**: Use filesystem JSON files in `data/` as the repository data source (`readJsonFile`).
- **Status**: Accepted
- **Context**: A lightweight baseline without database setup reduces onboarding friction.
- **Consequences**: Setup is trivial and deterministic for local/dev scenarios; concurrent writes, indexing, and operational scaling are limited compared to a real database.
