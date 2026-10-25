import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['json', { outputFile: 'tests/reports/playwright-results.json' }],
    ['html', { open: 'never', outputFolder: 'tests/reports/playwright-html' }],
  ],
  use: {
    baseURL: 'http://localhost:5050',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: [
    {
      command: 'npm run start --prefix backend',
      url: 'http://localhost:5050/api/health',
      reuseExistingServer: true,
      timeout: 30000,
    },
    {
      command: 'npm run dev --prefix admin',
      url: 'http://localhost:5180',
      reuseExistingServer: true,
      timeout: 30000,
    },
  ],
});
