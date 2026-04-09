# Architecture Design Document (ADD)

## Scope

This document captures architecture decisions derived from `AGENTS.md` and implemented in the boilerplate to keep workshop projects simple, small, and extensible without extra dependencies.

## Architecture Goals

- Keep runtime simple and workshop-friendly.
- Preserve strict dependency direction (`controller -> service -> repository`).
- Keep framework concerns at the HTTP edge.
- Keep observability and error handling consistent.
- Avoid third-party dependencies for validation and logging abstractions.
- Unit test only services, validators and pure functions.

## Architecture Rules

- `src/server.ts` is runtime-only and starts the server.
- `src/app.factory.ts` is the HTTP composition boundary and creates middlewares and API router instances.
- Route modules create controllers.
- Controllers create services.
- Services consume repositories.
- Request validation must happen at the controller/middleware edge (no external validation dependencies).

## Implemented Decisions

### 1) App bootstrap split: `app` vs `server`

- `src/app.factory.ts`  builds and returns the Express app.
- `src/server.ts`  handles runtime bootstrap (`listen`) only.

Why:
- Prevents side effects when importing app modules in tests.
- Makes it easier to reuse the app in integration tests and alternate runtimes.

### 2) Local wiring by layer (no composition root)

- `src/api.routes.ts` creates the home controller.
- `home.controller.ts` creates the home service by default.
- `home.service.ts` creates/uses the repository adapter by default.

Why:
- Reduces indirection for workshops and small codebases.
- Keeps navigation simple for students reading files top-down.
- Preserves the layered pipeline without extra architectural ceremony.

### 3) Config boundary

- Added `src/config/env.ts` with `appConfig`.
- `PORT` now comes from config with safe default fallback.

Why:
- Removes hidden runtime constants from server bootstrap.
- Establishes one place for environment parsing and defaults.

### 4) Logging abstraction without new libraries

- Added `src/shared/logger.utils.ts` (`Logger` interface + `consoleLogger` implementation).
- `src/app.ts` creates middleware instances using this logger.

Why:
- Decouples application behavior from direct `console` calls.
- Allows future replacement with structured logging without touching middleware logic.

### 5) Request validation boundary (dependency-free)

- Added `src/middleware/validate.middleware.ts`.
- Exposes `createRequestValidator` with a simple `(req) => errorMessage | null` contract.

Why:
- Keeps request-shape checks at the controller edge.
- Avoids polluting service/domain logic with transport-level validation.
- Keeps workshop setup minimal with no external schema library.

## Current File Additions

- `src/app.ts`
- `src/config/env.ts`
- `src/shared/logger.utils.ts`
- `src/middleware/error.middleware.ts`
- `src/middleware/validate.middleware.ts`

## Dependency Direction Rules

- Controllers can import Express types and call services.
- Services cannot import Express.
- Repositories cannot import Express.
- `app.factory.ts` creates middleware/router instances.
- Route modules create controllers.
- Controller modules create services.
- Service modules consume repositories.

## Suggested Next Steps

- Keep `api.routes.ts` small; split into route modules only when multiple bounded contexts are added.
- Add a shared API error response type (optionally in `src/shared/rest.consts.ts` or a dedicated response contract file).
- Add a minimal `requestId` middleware and include it in logger/error payloads.
