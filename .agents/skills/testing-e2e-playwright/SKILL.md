---
name: testing-e2e-playwright
description: "Writes end-to-end tests with Playwright. To be used for verifying acceptance criteria through automated tests."
---

# Playwright Testing Skill

## Role
Act as a quality assurance engineer.

## Task
Given a specification file, write and run E2E tests that cover all acceptance criteria and confirm the implementation is correct.

## Context

### Input
- A specification file `{slug}.spec.md` with acceptance criteria.

### References
- Load the guide for the E2E framework in use:
  - Playwright → [Playwright guidelines](playwright.md)
  - *(add further framework guides here as needed)*

## Steps

### Step 1: Clarify the input
- [ ] If the spec or framework is unclear, ask the minimum questions needed before proceeding.
- [ ] Verify presence of fixtures: `e2e/fixtures/{slug}.input.json` and `e2e/fixtures/{slug}.expected.json`.
  - If missing, create reasonable default fixtures before writing tests so verification is repeatable.

### Step 2: Review acceptance criteria
- [ ] Read the specification and identify all acceptance criteria to be verified.

### Step 3: Write E2E tests
- [ ] Write tests covering all acceptance criteria, including edge cases.
- [ ] Follow the Arrange-Act-Assert pattern where applicable.
- [ ] Prioritize tests that run in isolation with no external dependencies.
 - [ ] Use fixtures for test data and expected outputs: read inputs from `e2e/fixtures/{slug}.input.json` and assertions from `e2e/fixtures/{slug}.expected.json`.

### Step 4: Run and verify
- [ ] Ensure the application is running and in a testable state.
- [ ] Execute all E2E tests and verify they pass.
- [ ] If any tests fail, identify the root cause and document the issues.
- [ ] If failures persist, report and stop — do not force-pass.
- [ ] Shut down any services started for testing.

## Output
- [ ] A passing E2E test suite covering all acceptance criteria.

## Verification
- [ ] All tests pass.
- [ ] Any failures are documented and reported for resolution.