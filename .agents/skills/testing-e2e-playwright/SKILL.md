---
name: testing-e2e-playwright
description: "Writes end-to-end tests with Playwright. To be used for verifying acceptance criteria through automated tests."
---

# Playwright Testing Skill

Use this skill to validate end-to-end behavior and acceptance criteria through HTTP/UI flows.

- Tests file naming conventions: `<file-or-spec-slug>.test.ts`

- Configuration: Playwright is configured to run against the development server with `webServer` in `playwright.config.ts`. It will automatically start the server before tests and stop it afterward.

## Scope

- **Must** validate user-visible behavior and acceptance criteria.
- **Must** cover regressions for bug fixes that affect end-to-end flows.
- **Should** focus on stable, high-value user journeys.

## File Naming and Location

- **Must** place test files in `tests/`.
- **Must** use `.test.ts` suffix.
- **Must** keep unit tests separate in `src/` as colocated `*.test.ts` files.


## Test Structure

- **Should** use `describe` blocks to group related tests.
- **Must** use `test` blocks for individual behaviors.
- **Must** keep tests independent.
- **Should** keep each suite focused on a single feature or flow.

- **Should** follow Arrange-Act-Assert (AAA) for clarity:
  - **Arrange**: Set up the initial state and context.
  - **Act**: Perform the actions to be tested.
  - **Assert**: Verify the expected outcomes.

## Workflow

### 1. Before writing tests
- **Must** read the specification (if present) to understand acceptance criteria.
- **Should** identify required environment/setup assumptions.

### 2. Writing tests
- **Must** create/modify test files in `tests/` using `*.test.ts` naming.
- If a specification exists:
  - **Must** test each acceptance criterion from the specification.
  - **Should** follow the planned testing tasks from the issue body when available.
- If no specification exists:
  - **Should** derive test coverage from implemented behavior and expected user flows.

### 3. After writing tests
- **Must** run `npm run test:e2e`.
- If tests fail:
  - **Must** investigate and fix when possible.
  - **Must** report unresolved failures with likely root cause.
- **Should** rely on Playwright to manage server lifecycle when `webServer` is configured.
- **Should** run `npm run lint` before creating a commit.
- **May** create a commit only when explicitly requested by the user/workflow.

### When to stop testing

- **Must** stop when all targeted tests pass.
- **Must** stop when repeated failures require deeper debugging and report blockers.

## Commands

- **Must use e2e run command**: `npm run test:e2e`.
- **May run full suite**: `npm run test` (unit + e2e) for broader validation.

## Best Practices

- **Must** assert externally observable outcomes (status, body, rendered content).
- **Should** avoid brittle selectors and timing assumptions.
- **Should** keep tests deterministic and isolated from unrelated data.

## Common Playwright Matchers

```typescript
expect(page.getByText('Hello, world!')).toBeVisible();
expect(page.getByRole('button', { name: 'Click me' })).toBeEnabled();
expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('John Doe');
expect(page.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
expect(page.getByRole('radio', { name: 'Option 2' })).toBeChecked();
expect(page.getByRole('select', { name: 'Color' })).toHaveValue('blue');
expect(page.getByRole('table', { name: 'Users' })).toBeVisible();
```

### Advanced Features
For advanced features, see [Playwright documentation](https://playwright.dev/docs/writing-tests):
- Page Object Pattern
- Actionability checks
- Asynchronous operations
- Debugging tips
- Parallel testing
- CI/CD integration

## Output Checklist

- [ ] All test changes are made on the intended implementation branch.
- [ ] Modified or new test code is in `tests/`.
- [ ] All planned testing tasks are completed or blockers are reported.
- [ ] Commit is created only when explicitly requested, and summarizes coverage/issues.
