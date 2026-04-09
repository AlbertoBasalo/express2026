---
name: testing-unit-vitest
description: "Writes and maintains unit tests using Vitest. To be used for testing business logic in services and utilities."
---

# Unit Testing Skill

Use this skill to write and maintain unit tests for business logic implemented in `src/`.

## Scope

- **Must** add unit tests for new services/utilities with business logic.
- **Must** add or update tests for bug fixes to prevent regressions.
- **Should** cover edge cases, boundary conditions, and error handling for complex logic.
- **Must** keep tests passing before and after refactoring.

## File Naming and Location

- **Must** colocate unit tests next to source files (e.g., `validation.test.ts` next to `validation.ts`).
- **Must** use `{filename}.test.ts` naming.
- **Must not** place unit tests in `tests/`; that directory is for Playwright E2E tests.

## Test Structure

- **Should** use `describe`/`it` with the Arrange-Act-Assert pattern.
- **Must** keep tests independent.
- **Must** use descriptive test names focused on behavior.

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('MyService', () => {
  beforeEach(() => {
    // Setup for each test
  });

  describe('methodName', () => {
    it('should do something specific', () => {
      // Arrange: Set up test data
      const input = { /* ... */ };
      
      // Act: Execute the code under test
      const result = service.method(input);
      
      // Assert: Verify the outcome
      expect(result).toBe(expected);
    });
  });
});
```

## Mocking Dependencies

- **Should** use `vi.fn()` for repositories and external dependencies.
- **Must** avoid real I/O in unit tests.

```typescript
import { vi } from 'vitest';

const mockRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
};

// Inject mocked repository using constructor injection (OOP class pattern)
const service = new MyService(mockRepo as unknown as MyRepo);

// Set return values
vi.mocked(mockRepo.findById).mockReturnValue(mockData);

// Verify calls
expect(mockRepo.save).toHaveBeenCalledWith(expected);
expect(mockRepo.save).toHaveBeenCalledTimes(1);
```

## Workflow

### 1. Before writing tests
- **Must** understand expected behavior (spec, issue, or implementation contract).
- **Should** identify dependencies to mock.

### 2. Writing tests
- **Must** cover the main success path.
- **Should** add failure/edge-case coverage for non-trivial logic.
- **Should** prefer behavior assertions over implementation details.

### 3. After writing tests
- **Must** run unit tests with a one-time run command.
- **Must** investigate and fix failing tests when possible.
- **Must** report unresolved failures with likely root cause.
- **Should** run `npm run lint` before creating a commit.
- **May** create a commit only when explicitly requested by the user/workflow.

### When to stop testing
- **Must** stop when targeted unit tests pass and required coverage is complete.
- **Must** stop when repeated failures require deeper debugging and report blockers.

## Commands

- **Must use one-time run**: `npm run test:unit` (once after refactoring ).
- **May use watch mode**: `npm run test:dev` (auto-rerun unit tests during testing development).
- **May run full suite**: `npm run test` (unit + e2e) for broader validation.

## Best Practices

- **Must** test behavior, not implementation details.
- **Should** keep each test focused; use multiple assertions only for closely related outcomes.
- **Should** keep tests fast and deterministic.

## Common Vitest Matchers

```typescript
expect(value).toBe(expected);              // Strict equality
expect(value).toEqual(expected);           // Deep equality
expect(value).toBeInstanceOf(Class);       // Instance check
expect(value).toBeUndefined();             // Undefined check
expect(array).toHaveLength(3);             // Array length
expect(() => fn()).toThrow(ErrorClass);    // Exception check
expect(mockFn).toHaveBeenCalledWith(arg);  // Mock verification
expect(mockFn).toHaveBeenCalledTimes(1);   // Call count
```
## Advanced Features

For advanced features, see [Vitest documentation](https://vitest.dev/guide/learn/writing-tests.html):
- Snapshot testing
- Testing async code
- Custom matchers
- Performance testing

## Output Checklist

- [ ] Unit tests are colocated with the source files in `src/`.
- [ ] Test file names follow `{filename}.test.ts`.
- [ ] Required behavior and relevant edge cases are covered.
- [ ] Unit tests run successfully or blockers are reported.
- [ ] Commit is created only when explicitly requested.

