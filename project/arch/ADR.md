# Architecture Decision Records (ADR) — Express2026

## ADR-1: Runtime bootstrap and app composition separation
- **Status**: Accepted
- **Decision**: Keep `src/server.ts` runtime-only (`listen`) and compose the Express instance in `src/app.factory.ts`.
- **Rationale**: Tight coupling between bootstrap and app wiring makes testing and reuse harder, especially in small projects that still need E2E and unit feedback loops.
- **Consequences**: App composition is import-safe for tests and future hosting variants; startup behavior remains explicit and isolated. New hosting entry points must import `createApp`, not duplicate middleware wiring in `server.ts`.

## ADR-2: Layered route architecture with functional router and OOP controller/service/repository
- **Status**: Accepted
- **Decision**: Use `router → controller → service → repository` layering per route module, with a functional router module and OOP classes for controller, service, and repository. Keep local constructor defaults instead of a global composition root, and bind controller methods in the router when passing callbacks to Express.
- **Rationale**: The project optimizes for readability for OOP-oriented teams while keeping Express wiring idiomatic and low-ceremony.
- **Consequences**: Routing stays compact and familiar to Express users; controller classes stay clean and class-oriented. Router files carry explicit `bind` noise by design. New domains are added as folders under `src/routes/`, not as flat handler files.

## ADR-3: Error and validation strategy without third-party schema libraries
- **Status**: Accepted
- **Decision**: Perform request validation with controller-level validator methods returning `Result` types (`Ok` and `Err`). Adapt those validators with `makeMiddleware` in `validate.middleware.ts`. Standardize expected failures via `AppError`, centralized error middleware, and a shared `ApiErrorResponse` contract.
- **Rationale**: Minimize dependencies, keep transport concerns at the HTTP edge, avoid repeating `isOk`/400 boilerplate in every route, and avoid null-checks by using explicit `Result` objects.
- **Consequences**: Low dependency footprint and a single reusable error-response shape; route folders stay compact. Complex schemas may become verbose and could motivate a schema library later—any introduction must preserve `ApiErrorResponse` and error middleware behavior.

## ADR-4: File-based content source for bootstrap simplicity
- **Status**: Accepted
- **Decision**: Use filesystem JSON files in `data/` as the repository data source (`readJsonFile` via shared file utilities).
- **Rationale**: A lightweight baseline without database setup reduces onboarding friction and keeps the sample stack runnable with zero external services.
- **Consequences**: Setup is trivial and deterministic for local and dev scenarios. Concurrent writes, indexing, migrations, and operational scaling are out of scope until a real database tier is introduced. Repositories must not assume SQL or ORM semantics.

## ADR-5: Controller-level validation and shared functional validation utilities
- **Status**: Accepted
- **Decision**: Validation is mandatory at the controller level for every endpoint. Do not create `*.validation.ts` files inside route folders. If validation logic is repeated across routes, extract reusable functional helpers to `src/shared/`.
- **Rationale**: Prefer an OOP mental model with fewer files per route module and concentrate HTTP responsibility in controller and router.
- **Consequences**: Route module navigation stays simple and consistent; controller files may grow and need periodic refactoring. `/planify` and `/codify` must not introduce per-route validation files unless this ADR is superseded.
