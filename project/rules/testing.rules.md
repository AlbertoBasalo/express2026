# Testing Conventions — Express2026

## Summary

Vitest 4 for unit tests colocated under `src/` (`*.test.ts`); Playwright for HTTP E2E in `tests/`. Unit tests focus on controller and service layers with mocked dependencies via constructor injection and `vi.fn()`. Repositories, routers, and middleware are not unit-tested in the baseline — E2E and indirect coverage apply. Tests use English names and Arrange / Act / Assert comments.

## Back (unit)

### Infrastructure

- **Framework**: Vitest 4
- **Runner**: `npm run test:unit` (`vitest run ./src`); watch: `npm run test:dev`
- **Config**: Vitest defaults (no dedicated config file; scope is `./src` in npm script)

### Placement and Naming

- **Placement**: Colocated beside implementation (`src/routes/home/*.test.ts`)
- **File naming**: `{module}.test.ts` — `home.controller.test.ts`, `home.service.test.ts`
- **Test naming**: `describe("{ClassName}")` → nested `describe("{methodName}")` → `it("{behavior in plain English}")`

### Setup

- Import `describe`, `expect`, `it` from `vitest`; add `vi`, `beforeEach`, `afterEach` when mocking or faking time.
- Instantiate class under test directly; pass mocks via constructor (no global test harness).
- Service tests that depend on `Date`: `vi.useFakeTimers()` in `beforeEach`, `vi.useRealTimers()` and `vi.restoreAllMocks()` in `afterEach`.

### Mocking

- **Mocked**: Downstream layer injected in constructor — `HomeService` mocked in controller tests, `HomeRepository` in service tests.
- **How**: `vi.fn().mockResolvedValue(...)` + `as unknown as Interface` for partial mocks; Express `req`/`res` cast with `as unknown as Request/Response`.
- **Not mocked**: `Result` helpers (`ok`, `err`) — use real implementations.

### Canonical Example

(from `home.controller.test.ts`):

```typescript
describe("HomeController", () => {
	describe("getHome", () => {
		it("returns 200 with the service response", async () => {
			// Arrange
			const serviceMock = {
				getHome: vi.fn().mockResolvedValue("Hello from service"),
			} as unknown as HomeService;
			const controller = new HomeController(serviceMock);
			// Act
			await controller.getHome({} as Request, responseMock);
			// Assert
			expect(serviceMock.getHome).toHaveBeenCalledOnce();
		});
	});
});
```

### Coverage by Artifact Role

- **Controller**: Yes — validators (happy + error paths) and handlers (status + body via mocked service).
- **Service**: Yes — business logic with mocked repository; time-sensitive output uses fake timers.
- **Repository**: No — thin `readJsonFile` wrapper; no unit tests in baseline.
- **Router / middleware**: No — covered indirectly or by E2E.
- **Shared utilities**: No — only tested when a failure case warrants it.

## E2E

- **Framework**: Playwright (`@playwright/test`)
- **Location**: `tests/*.test.ts`
- **Runner**: `npm run test:e2e` (Chromium project)
- **Config**: `playwright.config.ts` — `testDir: ./tests`, `baseURL: http://localhost:3000`, `webServer` runs `npm run dev`
- **Scope**: HTTP behavior end-to-end (status codes, response body text); complements unit tests. Does not replace controller/service unit coverage for branching logic.

### E2E patterns

- **Naming**: `test.describe("{feature}")` + `test("{scenario}")`
- **Assertions**: `page.goto`, `expect(response?.status())`, `expect(body).toContainText(...)`
- **Canonical example** (from `home.test.ts`): root route welcome text; query string → `400` with error message in body.

## What NOT to Test

- **Repositories** in unit tests when they only delegate to `readJsonFile` — add tests when non-trivial parsing or write logic exists.
- **Express wiring** in Vitest — use Playwright for route registration and middleware chains.
- **Third-party Express internals** — mock at constructor boundaries (service/repository), not deep HTTP stack unless necessary.
