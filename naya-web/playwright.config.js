import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // Directory containing Playwright tests

  use: {
    baseURL: 'http://localhost:3000',
    headless: true, // Run headless by default; set false for visible browser
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0, // No global timeout for individual actions
  },

  webServer: {
    command: 'npm start',
    port: 3000,
    timeout: 240 * 1000,
    reuseExistingServer: !process.env.CI // Reuse server in local runs
  },
});
