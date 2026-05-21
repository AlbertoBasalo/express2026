import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.test.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,       // fail CI if test.only left in
  retries: process.env.CI ? 2 : 0,    // retry flakes in CI only
  workers: process.env.CI ? '50%' : undefined, // half CPU in CI, auto locally
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['./verify-reporter.ts']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // Artifact collection
    trace: 'on-first-retry',          // full trace on first retry only
    screenshot: 'only-on-failure',     // screenshot on failure
    video: 'retain-on-failure',        // video only kept for failures
    javaScriptEnabled: true
  },

  timeout: 10_000,

  expect: {
    timeout: 3_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,      // 1 min for cold builds
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
