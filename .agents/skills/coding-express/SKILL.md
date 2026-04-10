---
name: coding-express
description: "Implements and updates Express API routes/endpoints following the project layered architecture (router, validation, controller, service, repository), error contract, and testing workflow. Use when a route or API endpoint is added, modified, or refactored."
---

# Express Route Coding Skill

Use this skill when creating or changing any API endpoint in `src/routes/`.

## Goal

Deliver endpoint changes that stay aligned with the current architecture in `project/ADD.md`:
- Local route module wiring with `controller -> service -> repository`.
- Transport concerns at the edge (validation + controller), business logic in service.
- Centralized error handling through `AppError` and error middleware.

## Route Module Contract

For each route domain, keep these files and responsibilities explicit:

- `*.routes.ts`
  - Defines Express paths/methods and attaches middleware.
  - Wires `validate(...)` before controller handlers.
- `*.validation.ts`
  - Validates request shape and returns a `Result` type (`Ok` or `Err`) rather than `null`.
  - Implemented as OOP classes (e.g., `SampleValidator`) with arrow function properties to preserve `this` context when used in middleware.
  - Must not contain business logic or persistence logic.
- `*.controller.ts`
  - Handles HTTP contract: reads request input, calls service, sets response code/body.
  - Should stay thin and deterministic.
- `*.service.ts`
  - Contains business rules and orchestration.
  - Depends on repository abstraction (classes), not Express request/response types.
- `*.repository.ts`
  - Encapsulates data access (currently JSON file based for this project).
  - Returns data structures consumed by service logic.

## Implementation Rules

- Must preserve dependency direction: `routes -> validation/controller -> service -> repository`.
- Must keep local class-based Object-Oriented wiring in the route module via constructor dependency injection (avoid global container changes unless explicitly requested).
- Must use shared HTTP constants/contracts when returning status/error payloads.
- Must use `AppError`-compatible behavior for expected failures so middleware can produce standard error responses.
- Should keep endpoint handlers small and push branching logic into service/validation.
- Should avoid leaking file-system details outside repository.

## Adding a New Endpoint

1. Update the relevant `*.routes.ts` with method/path and middleware chain.
2. Add/update validation in `*.validation.ts` for request params/query/body.
3. Add/update controller handler in `*.controller.ts`.
4. Add/update service method in `*.service.ts`.
5. Add/update repository method in `*.repository.ts` if data access changes are needed.
6. Ensure errors map cleanly to existing error middleware flow.

## Changing an Existing Endpoint

- Keep response contract stable unless change is explicitly requested.
- If contract changes, update both route-level tests and any related e2e tests.
- Keep compatibility in mind for status codes and error shape.
- Refactor by layer; avoid mixing controller/service/repository concerns in one file.

## Testing Requirements

- Must add or update unit tests for changed business/validation behavior.
- Should colocate unit tests next to source files with `{name}.test.ts`.
- May add/update Playwright tests in `tests/` for externally visible endpoint behavior.
- Must run targeted tests and then `npm run lint` before considering work done.

Recommended commands:
- `npm run test:unit`
- `npm run test:e2e` (when endpoint behavior affects API contracts)
- `npm run lint`

## Definition of Done

- [ ] Route wiring follows existing module pattern.
- [ ] Validation, controller, service, and repository responsibilities are separated.
- [ ] Error handling follows centralized `AppError`/middleware contract.
- [ ] Tests updated for changed behavior and passing.
- [ ] Lint/type checks pass.
