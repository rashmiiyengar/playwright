import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./testOptions";

require("dotenv").config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "allure-playwright",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:4200/",
    globalQaUrl: '"https://www.globalsqa.com/demo-site/drapanddrop/"',
    trace: "on-first-retry",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",

      use: { ...devices["iPhone 13 Pro"] },
    },
  ],

  webServer: {
    command: "npm run start",
    url: "http://localhost:4200/",
    reuseExistingServer: true,
    timeout: 180 * 1000,
  },
});
