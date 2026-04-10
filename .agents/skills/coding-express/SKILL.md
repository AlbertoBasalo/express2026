---
name: coding-express
description: "Implements and updates Express API routes/endpoints following the project layered architecture (router, validation, controller, service, repository), error contract, and testing workflow. Use when a route or API endpoint is added, modified, or refactored."
---

# Express Route Coding Skill

Use this skill when creating or changing any API endpoint in `src/routes/`.

## Goal

Deliver endpoint changes that stay aligned with the current architecture in `project/ADD.md`:
- Local route module wiring with `router -> controller -> service -> repository`.
- Transport concerns at the edge (validation + controller), business logic in service.
- Centralized error handling through `AppError` and error middleware.

## Route Module Contract

For each route domain, keep these files and responsibilities explicit:

- `*.router.ts`
  - Defines Express paths/methods and attaches middleware in a functional router module (no router class required).
  - Wires validation middleware before controller handlers.
  - Must bind classic controller methods when passing callbacks (`controller.method.bind(controller)`).
- `*.controller.ts`
  - Handles HTTP contract: request validation methods and response handlers.
  - Prefer classic OOP instance methods (non-arrow) unless a route explicitly needs a different pattern.
  - Must define request validation methods at controller level (no per-route validation files).
  - Should stay thin and deterministic.
- `shared` validation utilities (optional, cross-route only)
  - Reusable functional helpers may live in `src/shared/` when the same validation logic appears in multiple routes.
  - Route-specific validation must stay in the corresponding controller methods.
  - Must not contain business logic or persistence logic.
- `*.service.ts`
  - Contains business rules and orchestration.
  - Depends on repository abstraction (classes), not Express request/response types.
- `*.repository.ts`
  - Encapsulates data access (currently JSON file based for this project).
  - Returns data structures consumed by service logic.

## Implementation Rules

- Must preserve dependency direction: `router -> controller -> service -> repository`.
- Must keep local class-based Object-Oriented wiring in controller/service/repository via constructor dependency injection (avoid global container changes unless explicitly requested).
- Must use shared HTTP constants/contracts when returning status/error payloads.
- Must use `makeMiddleware` from `validate.middleware.ts` for request validation adaptation to avoid repeating `isOk`/`400` mapping in each route.
- Must use `AppError`-compatible behavior for expected failures so middleware can produce standard error responses.
- Should keep endpoint handlers small and push branching logic into service and focused validation methods.
- Should avoid leaking file-system details outside repository.

## Adding a New Endpoint

1. Update or create the relevant `*.router.ts` with method/path and middleware chain. If it's a new domain, register the router in `api.routes.ts`.
2. Add/update validation methods in `*.controller.ts` for params/query/body. Do not create `*.validation.ts` files in route folders.
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
- [ ] Validation logic is implemented in controller methods, with service/repository concerns separated.
- [ ] Error handling follows centralized `AppError`/middleware contract.
- [ ] Tests updated for changed behavior and passing.
- [ ] Lint/type checks pass.
