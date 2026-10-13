import { defineConfig, devices } from '@playwright/test';
import { BASE } from './tests/e2e/base';

const origem = 'http://localhost:4321';
const site = `${origem}${BASE}/`;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  use: {
    // O dev server já serve o site sob o `base` do Astro.
    baseURL: site,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // `--ignore-lock` mantém o dev server do Astro 7 em foreground (sem virar daemon),
    // que é o que o Playwright espera de um webServer.
    command: 'npx astro dev --ignore-lock --port 4321',
    url: site,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
