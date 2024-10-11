import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './testOptions';
import { DARK_THEME } from './src/app/@theme/styles/theme.dark';


require('dotenv').config();

export default defineConfig<TestOptions>({
  
  timeout:10000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    globalQaUrl:'"https://www.globalsqa.com/demo-site/drapanddrop/"',
    trace: 'on-first-retry',
    video:'off',
    
  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL:'http://localhost:4201' },//replace dev url 
    },
    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
      baseURL:'http://localhost:4202' },//replace stage url 
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { browserName:'firefox' },
    },

  ]
});
